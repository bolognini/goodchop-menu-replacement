# GoodChop Menu Replacement 🍖

<p align="center"><img src="src/renderer/assets/goodchop-logo.png" alt="Good Chop Logo" width="60"></p>
<p align="center">&laquo;<b>A simplified desktop application for recipe replacements - built for non-technical users</b>&raquo;</p>
<p align="center">This project runs scripts from another service owned by HelloFresh.</p>
<br />
<br />

## Overview

GoodChop Menu Replacement is an Electron-based desktop application that streamlines the process of swapping recipe indexes in Kubernetes pods. It provides a user-friendly GUI for operations that typically require technical knowledge to run terminal commands, making it accessible to non-technical team members.

The app walks you through connecting to the right Kubernetes pod, then lets you specify which recipes to swap and for which weeks. It runs the necessary commands in the background, waits for the CSVs to be generated, and gives you a button to copy them all to your desktop when they're ready.

This app is built to be used only within HelloFresh company as it depends on internal accesses to run it properly. The objective is empowering non-technical teammates on the operational team to make meal replacements themselves, avoiding the bottleneck and Engineering dependency.

## Getting Started

### Setup

Before using this application, you need to complete a **one-time setup** of AWS and Kubectl. This also requires asking access to specific Azure groups.

Please follow the [Installation Guide](INSTALL.md) for instructions on how to setup the pre-requisites before running the application.

### App Installation

After finishing the one-time setup on your machine, you are ready to run the Good Chop Menu Replacement application.

1. Download the latest `.dmg` on the [releases page](https://github.com/bolognini/goodchop-menu-replacement/releases)
2. Double-click the `.dmg` file and, on the modal that shows up, drag and drop the Good Chop Menu Replacement to the Applications folder to install it
3. Open **Terminal** by going to Applications → Utilities → Terminal or Command + Space and searching for Terminal
4. Run this command:
   ```bash
   xattr -cr "/Applications/GoodChop Menu Replacement.app"
   ```
5. Open the Good Chop Menu Replacement application by hitting Command + Space and searching for Good Chop

#### Note

If you open the app before running the command above, macOS may show a warning: `"GoodChop Menu Replacement.app" is damaged and can't be opened.`
The app is **NOT** actually damaged. It's because the app isn't code-signed with an Apple Developer certificate, which costs $99/year at the time this doc was written, and this is not available at the moment. The command will add the application to the allowlist in order to run it.

### User Guide

More on how the application works and troubleshooting can be found in the [Usage Guide](USAGE_GUIDE.md)

<hr />

### Development

System Requirements

- macOS
- Node.js 16+ and Yarn
- AWS CLI configured
- Kubectl installed and configured
- Access to HelloFresh Kubernetes clusters

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

## License

This project is internal to HelloFresh/GoodChop.
