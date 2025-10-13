# Installation Guide - GoodChop Menu Replacement

## macOS Installation

When you download and try to open the app, macOS may show a warning: **"GoodChop Menu Replacement.app" is damaged and can't be opened.**

**This is NOT actually damaged**. It's because the app isn't code-signed with an Apple Developer certificate, which costs $99/year at the time this doc was written. I don't have access to it at the moment, so here's how to install it without this error popping up:

1. Download the latest `.dmg` on the [releases page](https://github.com/bolognini/goodchop-menu-replacement/releases)
2. Double-click the app and move to Applications folder to install it (warning will show up)
3. Open **Terminal** (Applications → Utilities → Terminal)
4. Run this command:
   ```bash
   xattr -cr "/Applications/GoodChop Menu Replacement.app"
   ```
5. The app should now open normally from now on
