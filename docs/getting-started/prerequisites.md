# Prerequisites Checklist

Use this checklist to ensure you have everything needed to run pAI agents successfully.

## System Requirements

### Operating System
- [ ] **macOS** (10.15 or higher)
- [ ] **Linux** (Ubuntu 20.04+ or equivalent)
- [ ] **Windows** (10 or higher with WSL2 recommended)

### Core Dependencies

#### Node.js & npm
- [ ] **Node.js v18.0.0 or higher**
  ```bash
  node --version  # Should show v18.0.0+
  npm --version   # Should show 8.0.0+
  ```
- [ ] **Installation method used:**
  - [ ] Official installer from nodejs.org
  - [ ] Package manager (brew, apt, etc.)
  - [ ] Node Version Manager (nvm)

#### Python
- [ ] **Python 3.8 or higher**
  ```bash
  python --version  # Should show 3.8.0+
  # OR
  python3 --version
  ```
- [ ] **pip package manager**
  ```bash
  pip --version    # Should show 20.0.0+
  # OR
  pip3 --version
  ```

#### Git
- [ ] **Git 2.20.0 or higher**
  ```bash
  git --version  # Should show 2.20.0+
  ```

## Required Tools

### Taskfile
- [ ] **Taskfile v3.0.0 or higher**
  ```bash
  task --version  # Should show 3.0.0+
  ```
- [ ] **Installation method:**
  - [ ] Homebrew: `brew install go-task`
  - [ ] Direct download: `sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b ~/.local/bin`
  - [ ] Package manager: `choco install go-task` (Windows)

### Agentman
- [ ] **Agentman latest version**
  ```bash
  agentman --version  # Should show latest version
  ```
- [ ] **Installation:**
  ```bash
  npm install -g agentman
  ```

## API Keys & Credentials

### OpenAI
- [ ] **OpenAI API key obtained** from [platform.openai.com](https://platform.openai.com/api-keys)
- [ ] **API key has sufficient credits**
- [ ] **Environment variable set:**
  ```bash
  echo $OPENAI_API_KEY  # Should show your key
  ```
- [ ] **Persistent configuration:**
  - [ ] Added to shell profile (.bashrc, .zshrc, etc.)
  - [ ] Added to environment management tool (.env, direnv, etc.)

### Gmail Integration (Optional)
- [ ] **Gmail account available**
- [ ] **Gmail MCP server tested:**
  ```bash
  npx -y @gongrzhe/server-gmail-autoauth-mcp
  ```
- [ ] **Credentials file generated:**
  ```bash
  ls ~/.gmail-mcp/credentials.json  # Should exist
  ```

## GitHub Integration (Optional)

### For Automated Scheduling
- [ ] **GitHub account**
- [ ] **Repository forked/cloned**
- [ ] **Repository secrets configured:**
  - [ ] `OPENAI_API_KEY` secret set
  - [ ] `GMAIL_CREDENTIALS_JSON` secret set (if using Gmail)

### For Development
- [ ] **SSH keys configured** for git operations
- [ ] **Git config set up:**
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

## Network Requirements

### Outbound Connections
- [ ] **OpenAI API access** (api.openai.com)
- [ ] **Gmail API access** (if using Gmail agents)
- [ ] **npm registry access** (registry.npmjs.org)
- [ ] **GitHub access** (github.com, api.github.com)

### Firewall/Proxy
- [ ] **Corporate proxy configured** (if applicable)
- [ ] **npm proxy settings** (if applicable):
  ```bash
  npm config set proxy http://proxy.company.com:8080
  npm config set https-proxy http://proxy.company.com:8080
  ```

## Verification Commands

Run these commands to verify your setup:

```bash
# Check all versions
echo "=== System Check ==="
node --version
python --version
git --version
task --version
agentman --version

# Check environment
echo "=== Environment Check ==="
echo "OpenAI API Key: ${OPENAI_API_KEY:0:20}..." # Shows first 20 chars
echo "Gmail credentials: $([ -f ~/.gmail-mcp/credentials.json ] && echo "✅ Found" || echo "❌ Missing")"

# Check network connectivity
echo "=== Network Check ==="
curl -s https://api.openai.com/v1/models > /dev/null && echo "✅ OpenAI API reachable" || echo "❌ OpenAI API unreachable"
curl -s https://registry.npmjs.org > /dev/null && echo "✅ npm registry reachable" || echo "❌ npm registry unreachable"
```

## Common Issues & Solutions

### Node.js Version Issues
```bash
# If you have an old version of Node.js
nvm install 18
nvm use 18
# OR
brew upgrade node
```

### Permission Issues
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Task Command Not Found
```bash
# Add to PATH if installed to ~/.local/bin
echo 'export PATH=~/.local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Ready to Continue?

Once you've completed this checklist, you're ready to:
1. Follow the [Quick Start Guide](quick-start.md)
2. Set up your [First Agent](first-agent.md)
3. Start developing with the [Agent Development Guide](../development/creating-agents.md)

## Need Help?

If you encounter issues with any of these prerequisites:
- Check the [Troubleshooting Guide](../troubleshooting/common-issues.md)
- Review the [FAQ](../troubleshooting/faq.md)
- Open an issue on the repository