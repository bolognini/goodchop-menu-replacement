# GoodChop Menu Replacement 🍖

<p align="center"><img src="src/renderer/assets/goodchop-logo.png" alt="Good Chop Logo" width="60"></p>
<p align="center">&laquo;<b>A simplified desktop application for recipe replacements - built for non-technical users</b>&raquo;</p>
<p align="center">This project runs scripts from another service owned by HelloFresh.</p>
<br />
<br />

## Overview

GoodChop Menu Replacement is an Electron-based desktop application that streamlines the process of swapping recipe indexes in Kubernetes pods. It provides a user-friendly GUI for operations that typically require technical knowledge to run terminal commands, making it accessible to non-technical team members.

The objective is empowering non-tech teammates on the operational team to make meal replacements themselves, avoiding the bottleneck and Engineering dependency.

## How It Works

The app walks you through connecting to the right Kubernetes pod, then lets you specify which recipes to swap and for which weeks. It runs the necessary commands in the background, waits for the CSVs to be generated, and gives you a button to copy them all to your desktop when they're ready.

## Prerequisites

Before using this application, you need to complete a **one-time setup** of AWS and Kubectl.

You'll need the following tools to authenticate and work with EKS:

- [kubelogin](https://azure.github.io/kubelogin/index.html)

  ```
  brew install Azure/kubelogin/kubelogin
  ```

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Setup

1. Download [eksconfig.sh](https://github.com/hellofresh/hf-kubernetes/raw/master/eks/eksconfig.sh) and [eksconfig.yml](https://github.com/hellofresh/hf-kubernetes/raw/master/eks/eksconfig.yml) by clicking File > Save Page As > `eksconfig.sh|eksconfig.yml`

2. Make the script executable

```
chmod +x eksconfig.sh
```

3. Run `eksconfig.sh` to setup your EKS Kube config by executing the following commands:

```
./eksconfig.sh
```

4. Set KUBECONFIG environment variable

```
export KUBECONFIG=$HOME/.kube/config:$HOME/.kube/eksconfig
```

This sets your Kube config to use `config` and the newly generated `eksconfig`. Also, be sure to set this in your `.bashrc` or `.zshrc`.

## System Requirements

- macOS (primary support)
- Node.js 16+ and Yarn
- AWS CLI configured
- Kubectl installed and configured
- Access to HelloFresh Kubernetes clusters

## Getting Started

### Installation for End Users

If you received a `.dmg` file and encounter a "damaged app" warning, **see the [Installation Guide](INSTALL.md)** for instructions on how to safely install the app.

Remember that you still need to do the **one-time setup** [mentioned above](#prerequisites). This requires running simple commands in the terminal. If you're not used to it, please reach out to an Engineer to help you out setting this up.

### Installation for Development

**Clone the repository, install dependencies and run in development mode**

```bash
git clone <repository-url>
cd menu-replacement
yarn install && yarn dev
```

### Building the Application

To create a distributable application:

```bash
# Build the app
yarn build

# Package for macOS
yarn electron:pack
```

The built application will be available in the `release/` directory.

## Usage Guide

### Step 1: Authentication & Setup

1. Click **"OIDC Authentication"** to authenticate with AWS
2. Click **"Set Context"** to configure the Kubernetes namespace
3. Click **"Connect to Box-Content-Service Pod"** to establish pod connection

### Step 2: Configure Recipe Swap

1. **Courses**: Enter course IDs (e.g., `10,9`)
2. **Week**: Choose single week or enable multi-week selection
   - Single: `2023-W13`
   - Multi-week: From `2023-W13` to `2023-W15`
3. **Indexes Replacement**: Define replacements (e.g., `10=108,9=103`)

### Step 3: Execute & Export

1. Click **"Swap Recipes Indexes"** to run the swap commands
2. Wait for CSV generation (the app will retry automatically)
3. Once all CSVs are ready, click **"Copy CSV to Desktop"**

## Important Notes

### Security

- This application executes shell commands on your system
- All commands are validated against an allowlist
- Only use on trusted machines with proper access controls

### Terminal Windows

- The app opens system Terminal windows for kubectl commands
- **Do not close these terminals** until operations complete
- Multiple terminal windows may open for multi-week operations

### CSV Detection

- The app monitors terminal output to detect CSV filenames
- Uses pattern matching: `selection_replace_[A-Z]+_\d{4}-W\d{2}_[A-Z0-9\-%_]+\.csv`
- Retries up to 20 times with 15-second intervals per week

## 🐛 Troubleshooting

### "CSV filename not found"

- Ensure the vault command completed successfully
- Check terminal output manually for the CSV filename
- Verify you're connected to the correct pod

### "Pod verification failed"

- Confirm you completed all authentication steps
- Check that you're in the `/home/hellofresh` directory in the pod
- Restart the authentication flow

### Terminal not opening

- Check macOS terminal permissions
- Ensure AppleScript is enabled
- Try running commands manually to test connectivity

## License

This project is internal to HelloFresh/GoodChop.
