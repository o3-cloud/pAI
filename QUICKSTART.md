# 🚀 Quick Start Guide

Get your first pAI agent running in 5 minutes! This guide will have you running the Gmail Curator agent with minimal setup.

## ⚡ One-Command Setup

```bash
# Clone, install dependencies, and run your first agent
git clone https://github.com/o3-cloud/pAI.git && cd pAI && ./setup.sh && cd @Home/gmail-curator && task run
```

*Don't have `setup.sh`? No problem - follow the manual setup below.*

## 📋 Prerequisites Checklist

Before you start, make sure you have:

- [ ] **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- [ ] **Taskfile** - [Install guide](https://taskfile.dev/installation/)
- [ ] **Agentman** - `npm install -g agentman`
- [ ] **Docker** - [Install Docker](https://docs.docker.com/get-docker/)
- [ ] **Gmail Access** - Personal Gmail account for testing

## 🎯 Run Your First Agent (3 Steps)

### Step 1: Set Environment Variables
```bash
export OPENAI_API_KEY="your-api-key-here"
export GMAIL_AUTH_KEYS="your-gmail-auth-keys"
export GMAIL_CREDS="your-gmail-credentials"
```

### Step 2: Customize Your Context
```bash
# Edit your personal context file
nano @Home/ME.md
```
*Fill in your name, location, and preferences - the agent uses this to personalize its responses.*

### Step 3: Run the Gmail Curator
```bash
cd @Home/gmail-curator
task run
```

**Expected output:** The agent will analyze your Gmail inbox and provide a summary of important emails.

## ✅ Test Your Setup

### Verify Prerequisites
```bash
# Check if all tools are installed
task --version      # Should show: Task version: v3.x.x
docker --version    # Should show: Docker version 20.x.x
agentman --version  # Should show: agentman version x.x.x
```

### Test Agent Execution
```bash
# Dry run without actually processing emails
cd @Home/gmail-curator
task prompt  # Should generate prompt.txt from ME.md
```

### Validate Environment
```bash
# Check if environment variables are set
echo $OPENAI_API_KEY | grep -q "sk-" && echo "✅ OpenAI API Key set" || echo "❌ OpenAI API Key missing"
```

## 🔧 Common Issues & Solutions

### Issue: "command not found: task"
**Solution:** Install Taskfile from [taskfile.dev](https://taskfile.dev/installation/)

### Issue: "Docker daemon not running"
**Solution:** Start Docker Desktop or run `sudo systemctl start docker`

### Issue: "OpenAI API key not set"
**Solution:** Export your API key: `export OPENAI_API_KEY="sk-your-key"`

### Issue: Gmail authentication fails
**Solution:** Set up Gmail MCP server credentials following [this guide](https://github.com/gongrzhe/server-gmail-autoauth-mcp)

## 🎉 Success Indicators

**You're ready to go if you see:**
- ✅ `task run` completes without errors
- ✅ Agent generates a personalized email summary
- ✅ No "authentication failed" messages
- ✅ Output mentions your name and context from ME.md

## 📚 Next Steps

Once your first agent is working:

1. **Explore other agents**: Check out `@Home/gmail-newsletter` or `@Work/pr-diff-auditor`
2. **Customize behavior**: Edit the `Agentfile` to change agent instructions
3. **Schedule automation**: Set up GitHub Actions workflows for automatic execution
4. **Create new agents**: Use `agentman create` to build your own custom agents

## 💡 Pro Tips

- Start with the Gmail Curator - it's the most stable and well-tested agent
- Keep your `ME.md` file updated for better personalization
- Use `task prompt` to regenerate prompts after changing ME.md
- Check the `CLAUDE.md` file for advanced configuration options

---

**Time to first success: < 5 minutes** | **Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open an issue.