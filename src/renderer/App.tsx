import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  AppContainer,
  LogoContainer,
  Logo,
  Title,
  Subtitle,
  SmallText,
  SetupNotice,
  StatusMessage,
  SupportedCommands,
  SupportedCommandsTitle,
  CommandList,
  SpecialCommandsContainer,
  SpecialCommandsTitle,
  SpecialDescription,
  SpecialButtonsGrid,
  CommandFlowItem,
  FlowArrow,
  SpecialCommandButton,
  RecipeSwapContainer,
  RecipeSwapTitle,
  RecipeSwapButton,
  RecipeInputsContainer,
  RecipeInputsTitle,
  MultiWeekCheckboxContainer,
  InputsGrid,
  InputGroup,
  InputGroupLabel,
  RecipeInput,
  CsvInfoText,
} from './styles'
import logo from './assets/goodchop-logo.png'

declare global {
  interface Window {
    electronAPI: {
      executeCommand: (command: string) => Promise<string>
      onPodConnected: (callback: () => void) => void
      removeAllListeners: () => void
      verifyPodLocation: () => Promise<{
        currentPath: string
        isInPod: boolean
        success: boolean
      }>
      captureCsvFilename: () => Promise<{
        csvFilename: string
        success: boolean
      }>
      openNewTerminal: (command: string) => Promise<string>
    }
  }
}

const App: React.FC = () => {
  const [isExecuting, setIsExecuting] = useState(false)
  const [terminalOpened, setTerminalOpened] = useState(false)
  const [podConnected, setPodConnected] = useState(false)
  const [status, setStatus] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  // Recipe swap command variables
  const [courses, setCourses] = useState('10,9')
  const [week, setWeek] = useState('2023-W13')
  const [replacements, setReplacements] = useState('10=108,9=103')

  // Multi-week selection
  const [isMultiWeek, setIsMultiWeek] = useState(false)
  const [fromWeek, setFromWeek] = useState('2023-W13')
  const [toWeek, setToWeek] = useState('2023-W15')

  // CSV filenames captured after recipe swap
  const [csvFilenames, setCsvFilenames] = useState<string[]>([])
  const [expectedCsvCount, setExpectedCsvCount] = useState(0)

  // Set up pod connection listener
  useEffect(() => {
    const handlePodConnected = () => {
      console.log('Pod connection detected in React!')
      setPodConnected(true)
      setStatus({
        message: 'Authentication complete. You can now swap recipes indexes',
        type: 'success',
      })
    }

    window.electronAPI.onPodConnected(handlePodConnected)

    return () => {
      window.electronAPI.removeAllListeners()
    }
  }, [])

  const executeCommand = async (commandToExecute: string) => {
    if (!commandToExecute.trim()) {
      setStatus({
        message: 'Please enter a command',
        type: 'error',
      })
      return
    }

    const supportedCommands = [
      'kubectl config use-context upn-eks-live',
      'kubectl config set-context --current --namespace=menu',
      "kubectl exec -it $(kubectl get pods | grep box-content-service-api | head -n 1 | awk '{print $1}') -c box-content-service-api -- sh -c 'cd /home/hellofresh && sh'",
      '/vault/vault-env box-content-service selection --country MR',
    ]
    const isSupported = supportedCommands.some((cmd) =>
      commandToExecute.trim().startsWith(cmd)
    )

    if (!isSupported) {
      setStatus({
        message:
          'Command not supported. Please use one of the available commands.',
        type: 'error',
      })
      return
    }

    setIsExecuting(true)
    const statusMessage = terminalOpened
      ? `Running command in terminal: ${commandToExecute}`
      : `Opening terminal with command: ${commandToExecute}`

    setStatus({
      message: statusMessage,
      type: 'info',
    })

    try {
      await window.electronAPI.executeCommand(commandToExecute)

      const successMessage = terminalOpened
        ? `Command executed in your terminal window.`
        : `Terminal opened successfully! The command is running in your system terminal.`

      setStatus({
        message: successMessage,
        type: 'success',
      })
      setTerminalOpened(true)
    } catch (error) {
      setStatus({
        message: `Error executing command: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        type: 'error',
      })
    } finally {
      setIsExecuting(false)
    }
  }

  // Helper function to generate weeks between two week strings
  const generateWeekRange = (from: string, to: string): string[] => {
    const parseWeek = (weekStr: string) => {
      const [year, week] = weekStr.split('-W').map(Number)
      return { year, week }
    }

    const formatWeek = (year: number, week: number) => {
      return `${year}-W${week.toString().padStart(2, '0')}`
    }

    const fromParsed = parseWeek(from)
    const toParsed = parseWeek(to)

    const weeks: string[] = []
    let currentYear = fromParsed.year
    let currentWeek = fromParsed.week

    while (
      currentYear < toParsed.year ||
      (currentYear === toParsed.year && currentWeek <= toParsed.week)
    ) {
      weeks.push(formatWeek(currentYear, currentWeek))

      currentWeek++
      if (currentWeek > 52) {
        currentWeek = 1
        currentYear++
      }
    }

    return weeks
  }

  const handlePredefinedCommand = async (predefinedCommand: string) => {
    // Show status message for kubectl exec command
    const isKubectlExec =
      predefinedCommand.includes('kubectl exec') &&
      predefinedCommand.includes('box-content-service-api')

    if (isKubectlExec) {
      setStatus({
        message: 'Connecting to Box-Content-Service Pod...',
        type: 'info',
      })
    }

    await executeCommand(predefinedCommand)
  }

  const handleRecipeSwap = async () => {
    setIsExecuting(true)
    setCsvFilenames([]) // Reset CSV filenames
    setStatus({
      message: 'Verifying pod location...',
      type: 'info',
    })

    try {
      // First, verify we're in the correct location
      const verification = await window.electronAPI.verifyPodLocation()

      if (verification.isInPod) {
        // Determine which weeks to process
        const weeksToProcess = isMultiWeek
          ? generateWeekRange(fromWeek, toWeek)
          : [week]

        setExpectedCsvCount(weeksToProcess.length)
        console.log('Processing weeks:', weeksToProcess)

        setStatus({
          message: `Location verified! Processing ${weeksToProcess.length} week(s)...`,
          type: 'info',
        })

        // Process each week sequentially
        const collectedCsvs: string[] = []

        for (let i = 0; i < weeksToProcess.length; i++) {
          const currentWeek = weeksToProcess[i]

          setStatus({
            message: `Processing week ${currentWeek} (${i + 1}/${weeksToProcess.length})...`,
            type: 'info',
          })

          const vaultCommand = `/vault/vault-env box-content-service selection --country MR --courses ${courses} --sku-pattern MR-% --week ${currentWeek} --replace "${replacements}"`
          console.log('Generated vault command:', vaultCommand)
          await window.electronAPI.executeCommand(vaultCommand)

          // Wait and retry to capture CSV for this week
          let csvCaptured = false
          const maxAttempts = 20
          const retryInterval = 15000 // 30 seconds

          for (
            let attempt = 1;
            attempt <= maxAttempts && !csvCaptured;
            attempt++
          ) {
            setStatus({
              message: `Waiting for CSV (week ${i + 1}/${weeksToProcess.length}, attempt ${attempt}/${maxAttempts})...`,
              type: 'info',
            })

            await new Promise((resolve) =>
              setTimeout(resolve, attempt === 1 ? 5000 : retryInterval)
            )

            try {
              const result = await window.electronAPI.captureCsvFilename()
              // Check if this CSV was already collected
              if (!collectedCsvs.includes(result.csvFilename)) {
                collectedCsvs.push(result.csvFilename)
                setCsvFilenames([...collectedCsvs])
                csvCaptured = true
                console.log(
                  `CSV captured for week ${currentWeek}: ${result.csvFilename}`
                )
              }
            } catch (error) {
              if (attempt === maxAttempts) {
                setStatus({
                  message: `Failed to capture CSV for week ${currentWeek} after ${maxAttempts} attempts.`,
                  type: 'error',
                })
                setIsExecuting(false)
                return
              }
            }
          }
        }

        // All weeks processed successfully
        setStatus({
          message: `All ${weeksToProcess.length} week(s) processed! ${collectedCsvs.length} CSV file(s) ready.`,
          type: 'success',
        })
        setIsExecuting(false)
      } else {
        // Not in the correct location
        const currentPath = verification.currentPath || 'unknown location'
        setStatus({
          message: `Error: You must be in the pod to run this command. Current location: ${currentPath}. Expected: /home/hellofresh`,
          type: 'error',
        })
        setIsExecuting(false)
      }
    } catch (error) {
      setStatus({
        message: `Verification failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        type: 'error',
      })
      setIsExecuting(false)
    }
  }

  const handleCopyCsvToDesktop = async () => {
    if (csvFilenames.length === 0) {
      setStatus({
        message:
          'No CSV files available. Please run the recipe swap command first.',
        type: 'error',
      })
      return
    }

    if (csvFilenames.length !== expectedCsvCount) {
      setStatus({
        message: `Not all CSVs are ready yet. Expected ${expectedCsvCount}, have ${csvFilenames.length}. Please wait.`,
        type: 'error',
      })
      return
    }

    setIsExecuting(true)
    setStatus({
      message: `Copying ${csvFilenames.length} CSV file(s) to Desktop...`,
      type: 'info',
    })

    try {
      // Build a command that copies all CSV files
      const copyCommands = csvFilenames
        .map(
          (filename) =>
            `kubectl cp menu/$(kubectl get pods -n menu | grep box-content-service-api | head -n 1 | awk '{print $1}'):home/hellofresh/${filename} ~/Desktop/${filename}`
        )
        .join(' && ')

      console.log('Executing kubectl cp commands:', copyCommands)

      // Open a new terminal window with all commands
      await window.electronAPI.openNewTerminal(copyCommands)

      setStatus({
        message: `${csvFilenames.length} CSV file(s) will be copied to ~/Desktop/`,
        type: 'success',
      })
    } catch (error) {
      setStatus({
        message: `Error copying CSVs: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        type: 'error',
      })
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <AppContainer>
      <LogoContainer>
        <Logo src={logo} alt="GoodChop Logo" />
        <Title>Good Chop Menu Replacement</Title>
      </LogoContainer>
      <Subtitle>Simplified Recipe Management Tool for Non-Techies</Subtitle>
      <SmallText>
        This is a WIP tool. If you face issues, please reach out to the Good
        Chop team.
      </SmallText>

      <SetupNotice>
        <p>
          <strong>⚠️ Before anything</strong>, you need to first setup AWS and
          Kubectl. This is a <strong>one-time only</strong> setup. Please follow
          the instructions on this link:{' '}
          <a
            href="https://github.com/hellofresh/hf-kubernetes/tree/master/eks#setup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Setup Guide
          </a>
        </p>
      </SetupNotice>

      {status && (
        <StatusMessage $type={status.type}>{status.message}</StatusMessage>
      )}

      <SpecialCommandsContainer>
        <SpecialCommandsTitle>Menu Replacement Commands</SpecialCommandsTitle>
        <SpecialDescription>
          Execute these commands in order from top to bottom to set up your
          environment
        </SpecialDescription>
        <SpecialDescription>
          <strong>Do not</strong> close or click on the terminal window after
          executing the commands. Only follow the flow of the app.
        </SpecialDescription>
        <SpecialButtonsGrid>
          <CommandFlowItem>
            <SpecialCommandButton
              onClick={() =>
                handlePredefinedCommand(
                  'kubectl config use-context upn-eks-live'
                )
              }
              disabled={isExecuting}
            >
              OIDC Authentication
            </SpecialCommandButton>
            <FlowArrow />
          </CommandFlowItem>

          <CommandFlowItem>
            <SpecialCommandButton
              onClick={() =>
                handlePredefinedCommand(
                  'kubectl config set-context --current --namespace=menu'
                )
              }
              disabled={isExecuting}
            >
              Set Context
            </SpecialCommandButton>
            <FlowArrow />
          </CommandFlowItem>

          <CommandFlowItem>
            <SpecialCommandButton
              onClick={() =>
                handlePredefinedCommand(
                  "kubectl exec -it $(kubectl get pods | grep box-content-service-api | head -n 1 | awk '{print $1}') -c box-content-service-api -- sh -c 'cd /home/hellofresh && sh'"
                )
              }
              disabled={isExecuting}
            >
              Connect to Box-Content-Service Pod
            </SpecialCommandButton>
          </CommandFlowItem>
        </SpecialButtonsGrid>
      </SpecialCommandsContainer>

      <RecipeInputsContainer>
        <RecipeInputsTitle>Recipe Swap Configuration</RecipeInputsTitle>
        <MultiWeekCheckboxContainer>
          <input
            type="checkbox"
            checked={isMultiWeek}
            onChange={(e) => setIsMultiWeek(e.target.checked)}
          />
          📅 Multi-week Selection {isMultiWeek && '(Enabled)'}
        </MultiWeekCheckboxContainer>
        <SpecialDescription>
          Change the values below to replace the desired recipes indexes.
        </SpecialDescription>
        <InputsGrid>
          <InputGroup>
            <InputGroupLabel htmlFor="courses-input">Courses</InputGroupLabel>
            <RecipeInput
              id="courses-input"
              type="text"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              placeholder="10,9"
              pattern="[\d,\s]+"
              title="Enter numbers separated by commas (e.g., 10,9)"
            />
          </InputGroup>
          {!isMultiWeek ? (
            <InputGroup>
              <InputGroupLabel htmlFor="week-input">Week</InputGroupLabel>
              <RecipeInput
                id="week-input"
                type="text"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                placeholder="2023-W13"
                pattern="\d{4}-W\d{2}"
                title="Enter week in format YYYY-WNN (e.g., 2023-W13)"
              />
            </InputGroup>
          ) : (
            <>
              <InputGroup>
                <InputGroupLabel htmlFor="from-week-input">
                  From Week
                </InputGroupLabel>
                <RecipeInput
                  id="from-week-input"
                  type="text"
                  value={fromWeek}
                  onChange={(e) => setFromWeek(e.target.value)}
                  placeholder="2023-W13"
                  pattern="\d{4}-W\d{2}"
                  title="Enter starting week in format YYYY-WNN (e.g., 2023-W13)"
                />
              </InputGroup>
              <InputGroup>
                <InputGroupLabel htmlFor="to-week-input">
                  To Week
                </InputGroupLabel>
                <RecipeInput
                  id="to-week-input"
                  type="text"
                  value={toWeek}
                  onChange={(e) => setToWeek(e.target.value)}
                  placeholder="2023-W15"
                  pattern="\d{4}-W\d{2}"
                  title="Enter ending week in format YYYY-WNN (e.g., 2023-W15)"
                />
              </InputGroup>
            </>
          )}
          <InputGroup>
            <InputGroupLabel htmlFor="replacements-input">
              Indexes Replacement
            </InputGroupLabel>
            <RecipeInput
              id="replacements-input"
              type="text"
              value={replacements}
              onChange={(e) => setReplacements(e.target.value)}
              placeholder="10=108,9=103"
              pattern="[\d=,\s]+"
              title="Enter replacements in format A=B,C=D (e.g., 10=108,9=103)"
            />
          </InputGroup>
        </InputsGrid>
      </RecipeInputsContainer>

      <RecipeSwapContainer $enabled={true}>
        <RecipeSwapTitle>Recipe Swap Commands</RecipeSwapTitle>
        <RecipeSwapButton onClick={handleRecipeSwap} disabled={isExecuting}>
          Swap Recipes Indexes
        </RecipeSwapButton>
        <RecipeSwapButton
          onClick={handleCopyCsvToDesktop}
          disabled={
            isExecuting ||
            csvFilenames.length === 0 ||
            csvFilenames.length !== expectedCsvCount
          }
          style={{
            marginTop: '10px',
            opacity:
              csvFilenames.length > 0 &&
              csvFilenames.length === expectedCsvCount
                ? 1
                : 0.5,
          }}
        >
          Copy CSV{csvFilenames.length > 1 ? 's' : ''} to Desktop
        </RecipeSwapButton>
        {csvFilenames.length > 0 && (
          <CsvInfoText>
            📄 {csvFilenames.length} / {expectedCsvCount} CSV file
            {expectedCsvCount > 1 ? 's' : ''} ready
            {csvFilenames.length === expectedCsvCount && ' ✓'}
          </CsvInfoText>
        )}
      </RecipeSwapContainer>

      <SupportedCommands>
        <SupportedCommandsTitle>Information</SupportedCommandsTitle>
        <CommandList>
          <li>
            <strong>Menu Replacement Commands</strong> - Execute the kubectl
            setup commands in sequence to authenticate and connect to the
            Kubernetes pod
          </li>
          <li>
            <strong>Recipe Swap Configuration</strong> - Configure the courses,
            week (or week range), and replacement indexes using the input fields
            above
          </li>
          <li>
            <strong>Multi-week Selection</strong> - Enable this checkbox to
            process multiple weeks at once. Specify a week range (e.g., 2023-W13
            to 2023-W15) and the app will run the swap command sequentially for
            each week
          </li>
          <li>
            <strong>Swap Recipes Indexes</strong> - This button verifies your
            pod location and runs the vault command for each selected week. CSV
            filenames will be automatically detected after each command
            completes
          </li>
          <li>
            <strong>Copy CSV to Desktop</strong> - Once all CSVs are generated,
            this button copies all files from the Kubernetes pod to your Desktop
            in a single operation
          </li>
          <li>
            <strong>Command Validation</strong> - The app automatically checks
            if you're in the correct pod directory before executing sensitive
            commands
          </li>
        </CommandList>
      </SupportedCommands>
    </AppContainer>
  )
}

export default App
