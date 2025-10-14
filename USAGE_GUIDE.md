# Usage Guide

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
