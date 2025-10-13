# GoodChop Menu Replacement 🍖

<p align="center"><img src="src/renderer/assets/goodchop-logo.png" alt="Good Chop Logo" width="60"></p>
<p align="center">&laquo;<b>A simplified desktop application for managing recipe replacements in Kubernetes - built for non-technical users.</b>&raquo;</p>
<p align="center">This project runs scripts from another service owned by HelloFresh.</p>
<br />
<br />

## 📋 Overview

GoodChop Menu Replacement is an Electron-based desktop application that streamlines the process of swapping recipe indexes in Kubernetes pods. It provides a user-friendly GUI for operations that typically require technical knowledge to run terminal commands, making it accessible to non-technical team members.

The objective is empowering non-tech teammates on the operational team to make meal replacements themselves, avoiding the bottleneck and Engineering dependency.

## ✨ Features

- **Guided Workflow**: Step-by-step authentication and pod connection process
- **Multi-Week Support**: Process multiple weeks of recipe swaps in a single operation
- **Automatic CSV Detection**: Automatically captures generated CSV filenames from command output
- **Batch CSV Export**: Copy all generated CSVs to your desktop with one click
- **Real-time Status Updates**: Visual feedback for all operations with retry mechanisms
- **Safe Execution**: Built-in validation ensures commands run in the correct environment

## 🔧 Prerequisites

Before using this application, you need to complete a **one-time setup** of AWS and Kubectl. Follow the instructions here:

👉 [Setup Guide](https://github.com/hellofresh/hf-kubernetes/tree/master/eks#setup)

### System Requirements

- macOS (primary support)
- Node.js 16+ and Yarn
- AWS CLI configured
- Kubectl installed and configured
- Access to HelloFresh Kubernetes clusters

## 🚀 Getting Started

### Installation for End Users

If you received a `.dmg` file and encounter a "damaged app" warning, **see the [Installation Guide](INSTALL.md)** for instructions on how to safely install the app.

### Installation for Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd menu-replacement
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Run in development mode**
   ```bash
   yarn dev
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

## 📖 Usage Guide

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

## 🏗️ Project Structure

```
menu-replacement/
├── src/
│   ├── main/              # Electron main process
│   │   ├── main.ts        # Main process logic
│   │   └── preload.ts     # Preload script (IPC bridge)
│   └── renderer/          # React UI
│       ├── App.tsx        # Main application component
│       ├── styles.ts      # Styled components
│       ├── index.tsx      # React entry point
│       └── assets/        # Images and static files
├── dist/                  # Build output (gitignored)
├── package.json           # Dependencies and scripts
└── webpack.config.js      # Webpack configuration
```

## 📦 Distribution

### Creating Release Builds

1. **macOS DMG**

   ```bash
   yarn build
   yarn electron:pack
   ```

   The `.dmg` file will be in `release/`

2. **Add Application Icon** (Optional)
   - Create an icon file (`.icns` for macOS)
   - Update `package.json` build configuration:
     ```json
     "build": {
       "mac": {
         "icon": "path/to/icon.icns"
       }
     }
     ```

### Sharing with Team

Options for distributing to non-technical users:

1. **GitHub Releases**: Upload the built `.dmg` file to GitHub releases
2. **Internal Server**: Host the `.dmg` on a company server
3. **Direct Share**: Share the `.dmg` via email or Slack

**Important**: Users will need to follow the [Installation Guide](INSTALL.md) to bypass macOS Gatekeeper warnings since the app is not code-signed.

### Code Signing (Optional)

For production distribution without warnings, you'll need an Apple Developer account ($99/year):

1. Update `package.json` mac configuration:

   ```json
   "mac": {
     "target": "dmg",
     "category": "public.app-category.developer-tools",
     "hardenedRuntime": true,
     "gatekeeperAssess": false,
     "entitlements": "build/entitlements.mac.plist",
     "entitlementsInherit": "build/entitlements.mac.plist",
     "notarize": {
       "teamId": "${APPLE_TEAM_ID}"
     }
   }
   ```

2. Set environment variables before building:

   ```bash
   export APPLE_ID="your-apple-id@email.com"
   export APPLE_APP_SPECIFIC_PASSWORD="xxxx-xxxx-xxxx-xxxx"
   export APPLE_TEAM_ID="YOUR_TEAM_ID"
   ```

3. Build: `yarn build && yarn electron:pack`

The entitlements file is already included in `build/entitlements.mac.plist`.

## ⚠️ Important Notes

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Run `yarn format` before committing
- Follow existing code patterns
- Add comments for complex logic

## 📝 License

This project is internal to HelloFresh/GoodChop.

## 👥 Support

For issues or questions:

- Open an issue in the repository
- Contact the GoodChop development team
- Refer to the [Kubernetes setup guide](https://github.com/hellofresh/hf-kubernetes/tree/master/eks#setup)

## 🔄 Version History

### v1.0.0 (Current)

- Initial release
- Multi-week recipe swap support
- Automatic CSV detection and export
- GoodChop branding
- User-friendly guided workflow

---

**Made with ❤️ for the GoodChop team**
