import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { spawn, exec } from 'child_process'

let mainWindow: BrowserWindow
let terminalOpened = false
let podConnected = false
let monitoringInterval: NodeJS.Timeout | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Maximize window but not fullscreen
  mainWindow.maximize()

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

function openSystemTerminal(command: string): void {
  const platform = process.platform

  if (platform === 'darwin') {
    // macOS - use Terminal.app
    // For complex commands with nested quotes, use a different approach
    const isComplexCommand =
      command.includes('kubectl exec') &&
      command.includes('$(') &&
      command.includes("'")

    if (isComplexCommand) {
      // Write command to temp shell script and execute it directly
      const fs = require('fs')
      const path = require('path')
      const os = require('os')

      const tempScript = path.join(
        os.tmpdir(),
        `menu-replacement-${Date.now()}.sh`
      )

      // Create a shell script that executes the command and then starts an interactive shell
      const scriptContent = `#!/bin/bash
${command}
# Keep the shell open after command execution
exec bash
`
      fs.writeFileSync(tempScript, scriptContent, { mode: 0o755 })

      // Execute the script in Terminal
      if (!terminalOpened) {
        const script = `tell application "Terminal"
          activate
          do script "bash '${tempScript}'; rm -f '${tempScript}'"
        end tell`

        exec(`osascript -e '${script}'`, (error) => {
          if (error) {
            console.error('Failed to open Terminal:', error)
            // Clean up temp file on error
            try {
              fs.unlinkSync(tempScript)
            } catch (e) {}
          } else {
            terminalOpened = true
          }
        })
      } else {
        const script = `tell application "Terminal"
          activate
          do script "bash '${tempScript}'; rm -f '${tempScript}'" in front window
        end tell`

        exec(`osascript -e '${script}'`, (error) => {
          if (error) {
            console.error('Failed to run command in Terminal:', error)
            // Clean up temp file on error
            try {
              fs.unlinkSync(tempScript)
            } catch (e) {}
            terminalOpened = false
            openSystemTerminal(command)
          }
        })
      }
    } else {
      // Simple commands - use direct escaping
      const escapedCommand = command.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

      if (!terminalOpened) {
        const script = `tell application "Terminal"
          activate
          do script "${escapedCommand}"
        end tell`

        exec(`osascript -e '${script}'`, (error) => {
          if (error) {
            console.error('Failed to open Terminal:', error)
          } else {
            terminalOpened = true
          }
        })
      } else {
        const script = `tell application "Terminal"
          activate
          do script "${escapedCommand}" in front window
        end tell`

        exec(`osascript -e '${script}'`, (error) => {
          if (error) {
            console.error('Failed to run command in Terminal:', error)
            terminalOpened = false
            openSystemTerminal(command)
          }
        })
      }
    }
  } else if (platform === 'win32') {
    // Windows - use cmd
    if (!terminalOpened) {
      exec(`start cmd /k "${command}"`, (error) => {
        if (error) {
          console.error('Failed to open cmd:', error)
        } else {
          terminalOpened = true
        }
      })
    } else {
      // For Windows, we'll send keystrokes to the existing cmd window
      // This is more complex, but we can try using powershell to send keys
      const psScript = `
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.SendKeys]::SendWait("${command}{ENTER}")
      `
      exec(`powershell -Command "${psScript}"`, (error) => {
        if (error) {
          console.error('Failed to send command to cmd:', error)
          // Fallback: open new window
          exec(`start cmd /k "${command}"`)
        }
      })
    }
  } else {
    // Linux - try common terminal emulators
    const terminals = ['gnome-terminal', 'xterm', 'konsole', 'xfce4-terminal']

    if (!terminalOpened) {
      for (const terminal of terminals) {
        try {
          if (terminal === 'gnome-terminal') {
            exec(`${terminal} -- bash -c "${command}; exec bash"`, (error) => {
              if (!error) {
                terminalOpened = true
                return
              }
            })
          } else {
            exec(
              `${terminal} -e "bash -c '${command}; exec bash'"`,
              (error) => {
                if (!error) {
                  terminalOpened = true
                  return
                }
              }
            )
          }
          break
        } catch (error) {
          continue
        }
      }
    } else {
      // For Linux, we'll try to use xdotool to send keystrokes to the active terminal
      exec(`xdotool type "${command}" && xdotool key Return`, (error) => {
        if (error) {
          console.error('Failed to send command to terminal:', error)
          // Fallback: open new terminal
          terminalOpened = false
          openSystemTerminal(command)
        }
      })
    }
  }
}

function startTerminalMonitoring(): void {
  if (monitoringInterval || podConnected) {
    return
  }

  console.log('Starting terminal monitoring for pod connection...')

  monitoringInterval = setInterval(() => {
    // Use AppleScript to get terminal content
    const script = `tell application "Terminal"
      get contents of tab 1 of front window
    end tell`

    exec(`osascript -e '${script}'`, (error, stdout) => {
      if (error) {
        console.error('Failed to get terminal content:', error)
        return
      }

      const terminalContent = stdout.trim()

      // Look for indicators that we're in the pod
      // Check for common pod shell prompts and absence of local machine indicators
      const podIndicators = [
        /~ \$\s*$/m, // Basic shell prompt ending with ~ $
        /\/home\/hellofresh.*\$\s*$/m, // HelloFresh directory prompt
        /root@.*:\s*~/m, // Root user in container
      ]

      // Check for local machine indicators that should NOT be present
      const localIndicators = [
        /matheus\.bolognini/, // Local username
        /Documents\/HelloFresh/, // Local path
        /%.*zsh/, // Local zsh prompt
      ]

      const hasPodIndicators = podIndicators.some((pattern) =>
        pattern.test(terminalContent)
      )
      const hasLocalIndicators = localIndicators.some((pattern) =>
        pattern.test(terminalContent)
      )

      if (hasPodIndicators && !hasLocalIndicators) {
        console.log('Pod connection detected!')
        podConnected = true

        // Stop monitoring
        if (monitoringInterval) {
          clearInterval(monitoringInterval)
          monitoringInterval = null
        }

        // Notify the renderer process
        if (mainWindow) {
          mainWindow.webContents.send('pod-connected')
        }
      }
    })
  }, 3000) // Check every 3 seconds

  // Stop monitoring after 2 minutes to avoid infinite polling
  setTimeout(() => {
    if (monitoringInterval) {
      clearInterval(monitoringInterval)
      monitoringInterval = null
      console.log('Terminal monitoring stopped (timeout)')
    }
  }, 120000) // 2 minutes
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', () => {
  // Reset terminal state when app is closing
  terminalOpened = false
})

// Handle terminal command execution
ipcMain.handle('execute-command', async (event, command: string) => {
  return new Promise((resolve, reject) => {
    // Only allow specific safe commands
    const allowedCommands = [
      'ls',
      'ls -la',
      'cd',
      'pwd',
      'kubectl config use-context upn-eks-live',
      'kubectl config set-context --current --namespace=menu',
      "kubectl exec -it $(kubectl get pods | grep box-content-service-api | head -n 1 | awk '{print $1}') -c box-content-service-api -- sh -c 'cd /home/hellofresh && sh'",
      '/vault/vault-env box-content-service selection --country MR',
    ]
    if (
      !allowedCommands.some((allowed) => command.trim().startsWith(allowed))
    ) {
      reject(new Error('Command not allowed'))
      return
    }

    let fullCommand = command
    if (command.trim() === 'cd') {
      fullCommand = 'cd ~' // Default to home directory
    }

    try {
      // Open system terminal with the command
      openSystemTerminal(fullCommand)

      // Start monitoring if this is the kubectl exec command
      const isKubectlExec =
        command.includes('kubectl exec') &&
        command.includes('box-content-service-api')
      if (isKubectlExec) {
        console.log(
          'kubectl exec command detected, starting terminal monitoring...'
        )
        // Start monitoring after a short delay to allow terminal to open
        setTimeout(() => {
          startTerminalMonitoring()
        }, 5000)
      }

      resolve(`Terminal opened with command: ${fullCommand}`)
    } catch (error) {
      reject(new Error(`Failed to open terminal: ${error}`))
    }
  })
})

// Handle pwd verification in the active terminal
ipcMain.handle('verify-pod-location', async () => {
  return new Promise((resolve, reject) => {
    const platform = process.platform

    if (platform === 'darwin') {
      // Get current terminal content before running pwd
      const getContentScript = `tell application "Terminal"
        get contents of tab 1 of front window
      end tell`

      exec(`osascript -e '${getContentScript}'`, (error, beforeContent) => {
        if (error) {
          reject(new Error('Failed to access terminal'))
          return
        }

        // Run pwd command in the active terminal
        const runPwdScript = `tell application "Terminal"
          activate
          do script "pwd" in front window
        end tell`

        exec(`osascript -e '${runPwdScript}'`, (pwdError) => {
          if (pwdError) {
            reject(new Error('Failed to run pwd command'))
            return
          }

          // Wait a moment for command to execute, then get the output
          setTimeout(() => {
            exec(
              `osascript -e '${getContentScript}'`,
              (contentError, afterContent) => {
                if (contentError) {
                  reject(new Error('Failed to get terminal output'))
                  return
                }

                // Extract the pwd output by comparing before and after content
                const afterLines = afterContent.trim().split('\n')
                const beforeLines = beforeContent.trim().split('\n')

                // Find new lines that appeared after running pwd
                const newLines = afterLines.slice(beforeLines.length)

                // Look for the directory path in the new output
                let currentPath = ''
                for (const line of newLines) {
                  // Look for lines that look like directory paths
                  if (
                    line.startsWith('/') &&
                    !line.includes('$') &&
                    !line.includes('pwd')
                  ) {
                    currentPath = line.trim()
                    break
                  }
                }

                console.log('PWD verification - current path:', currentPath)

                const isInPod = currentPath === '/home/hellofresh'

                resolve({
                  currentPath,
                  isInPod,
                  success: true,
                })
              }
            )
          }, 1500) // Wait 1.5 seconds for pwd to execute and output to appear
        })
      })
    } else {
      reject(new Error('Pod verification only supported on macOS'))
    }
  })
})

// Handle capturing terminal output to extract CSV filename
ipcMain.handle('capture-csv-filename', async () => {
  return new Promise((resolve, reject) => {
    const platform = process.platform

    if (platform === 'darwin') {
      // Get the number of windows first
      const countWindowsScript = `osascript -e 'tell application "Terminal" to count windows'`

      exec(countWindowsScript, (countError, windowCount) => {
        if (countError) {
          console.error('Failed to count terminal windows:', countError)
          reject(new Error('Failed to access terminal'))
          return
        }

        const numWindows = parseInt(windowCount.trim())
        console.log(`Found ${numWindows} terminal windows`)

        // Collect content from all windows
        let allContent = ''
        let windowsProcessed = 0

        // If no windows, reject immediately
        if (numWindows === 0) {
          reject(new Error('No terminal windows found'))
          return
        }

        // Get content from each window
        for (let i = 1; i <= numWindows; i++) {
          const getWindowContentScript = `osascript -e 'tell application "Terminal" to get contents of window ${i}'`

          exec(getWindowContentScript, (error, content) => {
            windowsProcessed++

            if (!error && content) {
              allContent += content + '\n---WINDOW-SEPARATOR---\n'
            }

            // After processing all windows, search for CSV
            if (windowsProcessed === numWindows) {
              console.log(
                'Searching terminal content for CSV filename...',
                allContent.substring(0, 500)
              )

              // Look for CSV filename in the output
              // Pattern: selection_replace_MR_2023-W13_MR-%_20251010121607.csv
              const csvMatch = allContent.match(
                /selection_replace_[A-Z]+_\d{4}-W\d{2}_[A-Z0-9\-%_]+\.csv/g
              )

              if (csvMatch && csvMatch.length > 0) {
                // Get the last match (most recent)
                const csvFilename = csvMatch[csvMatch.length - 1]
                console.log('Found CSV filename:', csvFilename)

                resolve({
                  csvFilename,
                  success: true,
                })
              } else {
                console.error('CSV not found. Terminal content:', allContent)
                reject(new Error('CSV filename not found in terminal output'))
              }
            }
          })
        }
      })
    } else {
      reject(new Error('Terminal capture only supported on macOS'))
    }
  })
})

// Handle opening a new terminal window for kubectl cp command
ipcMain.handle('open-new-terminal', async (event, command: string) => {
  return new Promise((resolve, reject) => {
    const platform = process.platform

    if (platform === 'darwin') {
      // For kubectl cp command with complex syntax, use temp script approach
      const fs = require('fs')
      const path = require('path')
      const os = require('os')

      const tempScript = path.join(os.tmpdir(), `kubectl-cp-${Date.now()}.sh`)

      // Create a shell script for the kubectl cp command
      const scriptContent = `#!/bin/bash
${command}
echo ""
echo "✅ CSV copy completed!"
echo "Press any key to close this window..."
read -n 1

# Close the terminal window using AppleScript
osascript -e 'tell application "Terminal" to close (every window whose name contains "kubectl-cp")' & exit 0
`
      fs.writeFileSync(tempScript, scriptContent, { mode: 0o755 })

      // Open a NEW terminal window (not a tab) with the script
      const script = `tell application "Terminal"
        activate
        do script "bash '${tempScript}'; rm -f '${tempScript}'"
      end tell`

      exec(`osascript -e '${script}'`, (error) => {
        if (error) {
          console.error('Failed to open new Terminal window:', error)
          // Clean up temp file on error
          try {
            fs.unlinkSync(tempScript)
          } catch (e) {}
          reject(new Error('Failed to open new terminal window'))
        } else {
          resolve('New terminal window opened successfully')
        }
      })
    } else {
      reject(new Error('New terminal window only supported on macOS'))
    }
  })
})
