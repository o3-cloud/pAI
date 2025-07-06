# 🔧 Troubleshooting Guide

This guide helps you diagnose and resolve common issues when setting up and running pAI agents. Most problems fall into one of these categories: environment setup, agent configuration, GitHub Actions, or runtime issues.

## 🚨 Quick Diagnostic Commands

Run these commands to quickly identify the most common issues:

```bash
# Check all prerequisites
task --version && echo "✅ Taskfile installed" || echo "❌ Install Taskfile"
docker --version && echo "✅ Docker installed" || echo "❌ Install Docker"
agentman --version && echo "✅ Agentman installed" || echo "❌ Install Agentman"

# Check environment variables
echo $OPENAI_API_KEY | grep -q "sk-" && echo "✅ OpenAI API Key set" || echo "❌ OpenAI API Key missing"
echo $GMAIL_AUTH_KEYS | grep -q "." && echo "✅ Gmail auth keys set" || echo "❌ Gmail auth keys missing"

# Check Docker daemon
docker ps > /dev/null 2>&1 && echo "✅ Docker running" || echo "❌ Docker not running"
```

## 🔧 Environment Setup Issues

### Issue: `command not found: task`
**Symptoms:** Terminal shows "command not found" when running `task`
**Solutions:**
1. Install Taskfile: `brew install go-task/tap/go-task` (macOS) or `npm install -g @go-task/cli`
2. Alternative: Use `npx task` instead of `task`
3. Verify with: `task --version`

### Issue: `command not found: agentman`
**Symptoms:** Terminal shows "command not found" when running `agentman`
**Solutions:**
1. Install globally: `npm install -g agentman`
2. Alternative: Use `npx agentman` instead of `agentman`
3. Check Node.js version: `node --version` (requires Node.js 16+)

### Issue: Docker daemon not running
**Symptoms:** 
- "Cannot connect to the Docker daemon" error
- "docker: command not found"
**Solutions:**
1. Start Docker Desktop (GUI applications)
2. Linux: `sudo systemctl start docker`
3. macOS: `brew services start docker`
4. Verify with: `docker ps`

### Issue: OpenAI API key not working
**Symptoms:**
- "Invalid API key" or "Authentication failed"
- "API key not set" errors
**Solutions:**
1. Check key format: Must start with `sk-`
2. Export correctly: `export OPENAI_API_KEY="sk-your-actual-key"`
3. Verify key works: `curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models`
4. Check quotas: [OpenAI Usage Dashboard](https://platform.openai.com/usage)

## 📧 Gmail MCP Server Issues

### Issue: Gmail authentication fails
**Symptoms:**
- "Gmail authentication failed" in logs
- "Permission denied" when accessing Gmail
- "Invalid credentials" errors
**Solutions:**
1. Set up Gmail MCP server credentials properly:
   ```bash
   # Create Gmail MCP directory
   mkdir -p ~/.gmail-mcp
   
   # Follow setup guide from server-gmail-autoauth-mcp
   npx @gongrzhe/server-gmail-autoauth-mcp --setup
   ```
2. Verify credentials files exist:
   ```bash
   ls ~/.gmail-mcp/
   # Should show: credentials.json, token.json
   ```
3. Test MCP server directly:
   ```bash
   npx @gongrzhe/server-gmail-autoauth-mcp --test
   ```

### Issue: MCP server connection timeout
**Symptoms:**
- "MCP server not responding" errors
- Long delays before agent starts
- Connection timeout messages
**Solutions:**
1. Check internet connectivity: `ping google.com`
2. Verify MCP server installation: `npm list -g @gongrzhe/server-gmail-autoauth-mcp`
3. Clear npm cache: `npm cache clean --force`
4. Reinstall MCP server: `npm install -g @gongrzhe/server-gmail-autoauth-mcp`

## 🤖 Agent Configuration Issues

### Issue: Agent fails to start
**Symptoms:**
- "Agent configuration invalid" errors
- "Cannot find agent.py" errors
- Container exits immediately
**Solutions:**
1. Check Agentfile syntax:
   ```bash
   cd @Home/gmail-curator
   cat Agentfile  # Verify all required fields are present
   ```
2. Verify agent directory structure:
   ```bash
   ls -la  # Should show: Agentfile, Taskfile.yml, agent/, README.md
   ```
3. Check agent.py exists:
   ```bash
   ls agent/  # Should show: agent.py, fastagent.config.yaml
   ```

### Issue: prompt.txt not generated
**Symptoms:**
- "No prompt file found" errors
- Empty or missing prompt.txt
- Agent runs but produces generic responses
**Solutions:**
1. Run prompt generation manually:
   ```bash
   cd @Home/gmail-curator
   task prompt
   ```
2. Check ME.md exists and has content:
   ```bash
   cat ../ME.md  # Should show your personal context
   ```
3. Verify Taskfile.yml prompt task:
   ```bash
   cat Taskfile.yml | grep -A 2 "prompt:"
   ```

### Issue: Agent produces generic responses
**Symptoms:**
- Agent doesn't use personal context
- Generic email summaries
- No personalization in responses
**Solutions:**
1. Update ME.md with detailed personal context:
   ```bash
   nano @Home/ME.md
   # Add: name, location, preferences, work details
   ```
2. Regenerate prompt:
   ```bash
   task prompt
   cat prompt.txt  # Verify personal context is included
   ```
3. Check Agentfile instruction field is specific to your needs

## 🔄 GitHub Actions Issues

### Issue: Workflow permissions denied
**Symptoms:**
- "Permission denied" in GitHub Actions logs
- "Cannot access repository" errors
- Workflow fails at authentication step
**Solutions:**
1. Check repository permissions:
   - Go to Settings → Actions → General
   - Ensure "Allow GitHub Actions to create and approve pull requests" is enabled
2. Verify environment variables are set:
   - Go to Settings → Secrets and variables → Actions
   - Check: `OPENAI_API_KEY`, `GMAIL_AUTH_KEYS`, `GMAIL_CREDS`
3. Check workflow file permissions:
   ```yaml
   permissions:
     contents: read
     actions: read
   ```

### Issue: Scheduled workflow not running
**Symptoms:**
- Workflow shows as "scheduled" but never runs
- No logs or execution history
- Agents not running automatically
**Solutions:**
1. Check cron syntax in workflow file:
   ```yaml
   schedule:
     - cron: '0 8,11,19 * * *'  # 8AM, 11AM, 7PM EST
   ```
2. Verify workflow is in `.github/workflows/` directory
3. Check if repository is active (GitHub disables scheduled workflows in inactive repos)
4. Manually trigger workflow to test: Actions → Workflow → Run workflow

### Issue: Environment variables not available in GitHub Actions
**Symptoms:**
- "Environment variable not set" in workflow logs
- Agent fails with authentication errors
- Variables work locally but not in GitHub Actions
**Solutions:**
1. Set secrets in repository settings:
   - Go to Settings → Secrets and variables → Actions
   - Add: `OPENAI_API_KEY`, `GMAIL_AUTH_KEYS`, `GMAIL_CREDS`
2. Reference secrets correctly in workflow:
   ```yaml
   env:
     OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
   ```
3. Check secret names match exactly (case-sensitive)

## 🏃 Runtime Issues

### Issue: Agent runs but produces no output
**Symptoms:**
- Agent completes without errors
- No email summaries or results
- Empty or minimal logs
**Solutions:**
1. Check if there are emails to process:
   ```bash
   # Gmail Curator specifically looks for unprocessed emails
   # Check your Gmail inbox for recent emails
   ```
2. Increase logging level:
   ```bash
   # Edit Agentfile to add debug logging
   ENV FASTAGENT_LOG_LEVEL=DEBUG
   ```
3. Run with verbose output:
   ```bash
   task agent -- --verbose
   ```

### Issue: Out of memory errors
**Symptoms:**
- "Out of memory" in Docker logs
- Agent crashes mid-execution
- Container exits with code 137
**Solutions:**
1. Increase Docker memory limit:
   ```bash
   # Docker Desktop: Settings → Resources → Memory
   # Allocate at least 4GB for agent processing
   ```
2. Optimize agent instructions to use fewer tokens:
   ```bash
   # Edit Agentfile to be more specific and concise
   INSTRUCTION "Summarize only the 5 most important emails from today"
   ```
3. Process emails in batches rather than all at once

### Issue: Token limit exceeded
**Symptoms:**
- "Token limit exceeded" from OpenAI API
- Agent fails partway through processing
- Large email threads cause failures
**Solutions:**
1. Reduce context window in agent instructions:
   ```bash
   # Edit Agentfile to limit scope
   INSTRUCTION "Analyze only emails from the last 24 hours"
   ```
2. Use a model with larger context window:
   ```bash
   MODEL gpt-4-turbo  # Instead of gpt-4
   ```
3. Implement email pre-filtering to reduce token usage

## ✅ Success Indicators

### Everything is working correctly if you see:

**Local Agent Execution:**
```bash
$ task run
✅ Prompt generated from ME.md
✅ Docker container started
✅ MCP server connected
✅ Gmail authentication successful
✅ Processing X emails...
✅ Generated personalized summary
✅ Agent execution completed
```

**GitHub Actions Workflow:**
```yaml
✅ Workflow triggered on schedule
✅ Environment variables loaded
✅ Agent container started
✅ MCP server connection established
✅ Gmail processing completed
✅ Results stored/reported
```

**Agent Output Quality:**
- Mentions your name and personal context from ME.md
- Email summaries are relevant and personalized
- No generic or templated responses
- Appropriate categorization and prioritization

## 📊 Performance Indicators

### Expected Performance Metrics:
- **Startup time**: < 30 seconds for agent initialization
- **Email processing**: ~2-3 seconds per email
- **Memory usage**: < 2GB during execution
- **Token usage**: 1000-5000 tokens per email (depending on length)

### Performance Warning Signs:
- Startup time > 2 minutes (check Docker/MCP server)
- Processing time > 1 minute per email (check token limits)
- Memory usage > 4GB (optimize agent instructions)
- High token usage (>10K per email) indicates inefficient prompting

## 🆘 Still Having Issues?

If you're still experiencing problems after following this guide:

1. **Check logs systematically:**
   ```bash
   # Local execution logs
   task agent 2>&1 | tee agent.log
   
   # Docker container logs
   docker logs $(docker ps -q --filter ancestor=pAI)
   
   # GitHub Actions logs
   # View in GitHub UI: Actions → Workflow → Run details
   ```

2. **Create a minimal reproduction:**
   ```bash
   # Test with minimal setup
   cd @Home/test-agent
   task run
   ```

3. **Verify the complete setup:**
   ```bash
   # Run the comprehensive diagnostic
   ./scripts/diagnose.sh  # If available
   ```

4. **Get help:**
   - Open an issue with complete error logs
   - Include system information: OS, Docker version, Node.js version
   - Provide the output of diagnostic commands above

## 🔍 Debug Mode

For detailed troubleshooting, enable debug mode:

```bash
# Set debug environment
export FASTAGENT_LOG_LEVEL=DEBUG
export DOCKER_BUILDKIT=1

# Run with full logging
task agent --verbose 2>&1 | tee debug.log
```

This will generate detailed logs showing exactly where the process fails.

---

**Most issues are resolved by:** ✅ Checking environment variables ✅ Verifying Docker is running ✅ Ensuring all prerequisites are installed ✅ Following the setup steps in order