# Installation Guide - GoodChop Menu Replacement

## macOS Installation

When you download and try to open the app, macOS may show a warning: **"GoodChop Menu Replacement.app" is damaged and can't be opened.**

**This is NOT actually damaged** - it's because the app isn't code-signed with an Apple Developer certificate. Here's how to install it:

### Method 1: Right-Click to Open (Recommended)

1. Right-click (or Control+click) on the app
2. Select **"Open"** from the menu
3. Click **"Open"** in the dialog that appears
4. The app will now be trusted and can be opened normally

### Method 2: Remove Quarantine Attribute

1. Open **Terminal** (Applications → Utilities → Terminal)
2. Run this command:
   ```bash
   xattr -cr "/Applications/GoodChop Menu Replacement.app"
   ```
3. The app should now open normally

### Method 3: System Settings

1. Try to open the app (it will be blocked)
2. Go to **System Settings** → **Privacy & Security**
3. Scroll down to find "GoodChop Menu Replacement was blocked"
4. Click **"Open Anyway"**

## Why This Happens

macOS requires apps to be:

- Code-signed with an Apple Developer ID certificate ($99/year)
- Notarized by Apple

For internal tools, this may not be necessary. The methods above allow you to bypass this security check safely for apps you trust.

## Building from Source

If you prefer to build the app yourself:

```bash
# Install dependencies
yarn install

# Build the app
yarn build

# Package for your platform
yarn electron:pack
```

The built app will be in the `release/` directory.
