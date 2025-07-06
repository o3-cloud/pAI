# Troubleshooting Guide

This guide helps you diagnose and resolve common issues when working with pAI agents.

## Quick Diagnostics

### System Health Check

Run this command to check your environment:

```bash
# Check all prerequisites
echo "=== System Check ==="
echo "Node.js: $(node --version 2>/dev/null || echo "❌ Not installed")"
echo "Python: $(python --version 2>/dev/null || echo "❌ Not installed")"
echo "Git: $(git --version 2>/dev/null || echo "❌ Not installed")"
echo "Task: $(task --version 2>/dev/null || echo "❌ Not installed")"
echo "Agentman: $(agentman --version 2>/dev/null || echo "❌ Not installed")"

echo -e "\n=== Environment Check ==="
echo "OpenAI API Key: ${OPENAI_API_KEY:+✅ Set}${OPENAI_API_KEY:-❌ Not set}"
echo "Gmail credentials: $([ -f ~/.gmail-mcp/credentials.json ] && echo "✅ Found" || echo "❌ Missing")"

echo -e "\n=== Network Check ==="
curl -s https://api.openai.com/v1/models > /dev/null && echo "✅ OpenAI API reachable" || echo "❌ OpenAI API unreachable"
curl -s https://registry.npmjs.org > /dev/null && echo "✅ npm registry reachable" || echo "❌ npm registry unreachable"
```

## Common Issues

### 1. Agent Startup Issues

#### Error: "OpenAI API key not found"

**Symptoms:**
```
Error: OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.
```

**Causes:**
- Environment variable not set
- Incorrect variable name
- Variable not exported

**Solutions:**

1. **Set the environment variable:**
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

2. **Add to shell profile for persistence:**
   ```bash
   # For bash
   echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.bashrc
   source ~/.bashrc
   
   # For zsh
   echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Use a .env file:**
   ```bash
   # Create .env file in project root
   echo "OPENAI_API_KEY=your-api-key-here" > .env
   
   # Install dotenv
   npm install dotenv
   ```

4. **Verify the key is set:**
   ```bash
   echo $OPENAI_API_KEY
   ```

#### Error: "Task command not found"

**Symptoms:**
```
bash: task: command not found
```

**Solutions:**

1. **Install Taskfile:**
   ```bash
   # macOS
   brew install go-task
   
   # Linux
   sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b ~/.local/bin
   
   # Windows
   choco install go-task
   ```

2. **Add to PATH if needed:**
   ```bash
   echo 'export PATH=~/.local/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Verify installation:**
   ```bash
   task --version
   ```

#### Error: "Agentman command not found"

**Symptoms:**
```
bash: agentman: command not found
```

**Solutions:**

1. **Install Agentman globally:**
   ```bash
   npm install -g agentman
   ```

2. **Fix npm permissions if needed:**
   ```bash
   npm config set prefix ~/.npm-global
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Verify installation:**
   ```bash
   agentman --version
   ```

### 2. Gmail Integration Issues

#### Error: "Gmail credentials not found"

**Symptoms:**
```
Error: Gmail credentials not found at ~/.gmail-mcp/credentials.json
```

**Solutions:**

1. **Generate Gmail credentials:**
   ```bash
   # Create directory
   mkdir -p ~/.gmail-mcp
   
   # Run Gmail MCP server to generate credentials
   npx -y @gongrzhe/server-gmail-autoauth-mcp
   ```

2. **Follow the OAuth flow:**
   - Browser will open automatically
   - Sign in to your Google account
   - Grant necessary permissions
   - Credentials will be saved automatically

3. **Verify credentials file:**
   ```bash
   ls -la ~/.gmail-mcp/credentials.json
   cat ~/.gmail-mcp/credentials.json  # Should show JSON content
   ```

4. **Test Gmail access:**
   ```bash
   # Test the MCP server
   npx -y @gongrzhe/server-gmail-autoauth-mcp --test
   ```

#### Error: "Gmail API quota exceeded"

**Symptoms:**
```
Error: Gmail API quota exceeded. Please try again later.
```

**Solutions:**

1. **Wait for quota reset:**
   - Gmail API has rate limits
   - Quotas reset daily at midnight Pacific Time

2. **Optimize agent queries:**
   ```python
   # Reduce query frequency
   # Use more specific search filters
   # Batch operations where possible
   ```

3. **Check Google Cloud Console:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Check API quotas and usage

#### Error: "Gmail authentication failed"

**Symptoms:**
```
Error: Gmail authentication failed. Token may be expired.
```

**Solutions:**

1. **Regenerate credentials:**
   ```bash
   # Remove old credentials
   rm ~/.gmail-mcp/credentials.json
   
   # Generate new credentials
   npx -y @gongrzhe/server-gmail-autoauth-mcp
   ```

2. **Check Google account security:**
   - Visit [Google Account Security](https://myaccount.google.com/security)
   - Ensure 2FA is properly configured
   - Check for any security alerts

### 3. MCP Server Issues

#### Error: "MCP server failed to start"

**Symptoms:**
```
Error: MCP server 'gmail' failed to start
```

**Solutions:**

1. **Check MCP server installation:**
   ```bash
   # Test Gmail MCP server
   npx -y @gongrzhe/server-gmail-autoauth-mcp --version
   
   # Test other MCP servers
   npx -y @modelcontextprotocol/server-fetch --version
   ```

2. **Verify MCP configuration:**
   ```yaml
   # agent/fastagent.config.yaml
   mcp:
     servers:
       gmail:
         transport: stdio
         command: npx
         args:
           - -y
           - '@gongrzhe/server-gmail-autoauth-mcp'
   ```

3. **Check network connectivity:**
   ```bash
   # Test npm registry access
   npm ping
   
   # Test proxy settings if behind corporate firewall
   npm config get proxy
   npm config get https-proxy
   ```

#### Error: "MCP server timeout"

**Symptoms:**
```
Error: MCP server 'gmail' timed out
```

**Solutions:**

1. **Increase timeout values:**
   ```yaml
   # In fastagent.config.yaml
   mcp:
     servers:
       gmail:
         transport: stdio
         command: npx
         args: [-y, '@gongrzhe/server-gmail-autoauth-mcp']
         timeout: 30000  # 30 seconds
   ```

2. **Check system resources:**
   ```bash
   # Check available memory
   free -h
   
   # Check CPU usage
   top
   ```

3. **Test server manually:**
   ```bash
   # Run MCP server directly
   npx -y @gongrzhe/server-gmail-autoauth-mcp
   ```

### 4. Agent Execution Issues

#### Error: "Agent execution failed"

**Symptoms:**
```
Error: Agent execution failed with status code 1
```

**Solutions:**

1. **Check agent logs:**
   ```bash
   # View agent output
   cat agent/output/agent.log
   
   # Check for error details
   tail -50 agent/output/agent.log
   ```

2. **Run agent in debug mode:**
   ```bash
   # Set debug environment
   export DEBUG=1
   task run
   ```

3. **Test agent components individually:**
   ```bash
   # Test prompt generation
   task prompt
   
   # Test agent without dependencies
   task agent --dry-run
   ```

#### Error: "No output generated"

**Symptoms:**
- Agent runs successfully but produces no output
- Empty output directory

**Solutions:**

1. **Check agent logic:**
   ```python
   # Ensure output directory is created
   import os
   os.makedirs("output", exist_ok=True)
   
   # Verify output generation
   print(f"Generating output to: {os.path.abspath('output')}")
   ```

2. **Debug agent execution:**
   ```python
   # Add debug logging
   import logging
   logging.basicConfig(level=logging.DEBUG)
   
   logger = logging.getLogger(__name__)
   logger.debug("Agent execution started")
   ```

3. **Check file permissions:**
   ```bash
   # Verify write permissions
   ls -la agent/
   
   # Fix permissions if needed
   chmod 755 agent/
   mkdir -p agent/output
   ```

### 5. GitHub Actions Issues

#### Error: "GitHub Actions workflow failed"

**Symptoms:**
- Workflow fails in GitHub Actions
- Works locally but not in CI

**Solutions:**

1. **Check GitHub Secrets:**
   - Go to repository Settings > Secrets
   - Verify `OPENAI_API_KEY` is set
   - Add `GMAIL_CREDENTIALS_JSON` if using Gmail

2. **Review workflow logs:**
   ```yaml
   # Add debugging to workflow
   - name: Debug environment
     run: |
       echo "Node version: $(node --version)"
       echo "Python version: $(python --version)"
       echo "OpenAI key set: ${OPENAI_API_KEY:+yes}"
   ```

3. **Check dependency installation:**
   ```yaml
   # Ensure all dependencies are installed
   - name: Install dependencies
     run: |
       npm install -g agentman
       curl -sL https://taskfile.dev/install.sh | sh
   ```

#### Error: "Secret not found in GitHub Actions"

**Symptoms:**
```
Error: Secret 'OPENAI_API_KEY' not found
```

**Solutions:**

1. **Add secrets to repository:**
   - Go to repository Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add `OPENAI_API_KEY` with your API key

2. **Use secrets in workflow:**
   ```yaml
   - name: Run agent
     env:
       OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
     run: task run
   ```

3. **For Gmail credentials:**
   ```yaml
   - name: Setup Gmail credentials
     env:
       GMAIL_CREDENTIALS_JSON: ${{ secrets.GMAIL_CREDENTIALS_JSON }}
     run: |
       mkdir -p ~/.gmail-mcp
       echo "$GMAIL_CREDENTIALS_JSON" > ~/.gmail-mcp/credentials.json
   ```

### 6. Performance Issues

#### Issue: "Agent running slowly"

**Symptoms:**
- Agent takes a long time to complete
- Timeout errors

**Solutions:**

1. **Optimize agent logic:**
   ```python
   # Use async operations
   async def process_data():
       # Concurrent processing
       tasks = [process_item(item) for item in items]
       results = await asyncio.gather(*tasks)
       return results
   ```

2. **Reduce API calls:**
   ```python
   # Batch operations
   # Cache frequently accessed data
   # Use more efficient queries
   ```

3. **Adjust model parameters:**
   ```python
   @fast.agent(
       model="gpt-3.5-turbo",  # Use faster model
       temperature=0.1,        # Reduce temperature
       max_tokens=500          # Limit output length
   )
   ```

#### Issue: "High API costs"

**Symptoms:**
- Unexpected OpenAI API charges
- Token usage higher than expected

**Solutions:**

1. **Monitor token usage:**
   ```python
   # Add token counting
   import tiktoken
   
   def count_tokens(text, model="gpt-4"):
       encoding = tiktoken.encoding_for_model(model)
       return len(encoding.encode(text))
   
   # Log token usage
   logger.info(f"Prompt tokens: {count_tokens(prompt)}")
   ```

2. **Optimize prompts:**
   ```python
   # Use concise instructions
   # Remove unnecessary context
   # Use system messages efficiently
   ```

3. **Choose appropriate models:**
   ```python
   # Use GPT-3.5 for simpler tasks
   # Use GPT-4 only when necessary
   # Consider model-specific optimizations
   ```

## Diagnostic Commands

### Environment Diagnostics

```bash
# Check pAI environment
cd /path/to/pAI
echo "=== pAI Environment ==="
echo "Repository: $(git remote get-url origin)"
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --oneline)"

# Check agent structure
echo -e "\n=== Agent Structure ==="
find . -name "Agentfile" -exec dirname {} \; | sort
```

### Agent Diagnostics

```bash
# Check specific agent
cd @Home/gmail-curator

echo "=== Agent Configuration ==="
cat Agentfile

echo -e "\n=== MCP Configuration ==="
cat agent/fastagent.config.yaml

echo -e "\n=== Recent Outputs ==="
ls -la agent/output/

echo -e "\n=== Agent Logs ==="
tail -20 agent/output/agent.log 2>/dev/null || echo "No logs found"
```

### Network Diagnostics

```bash
# Test API endpoints
echo "=== API Connectivity ==="
curl -s -o /dev/null -w "OpenAI API: %{http_code}\n" https://api.openai.com/v1/models
curl -s -o /dev/null -w "Gmail API: %{http_code}\n" https://www.googleapis.com/gmail/v1/users/me/profile
curl -s -o /dev/null -w "npm registry: %{http_code}\n" https://registry.npmjs.org/
```

## Getting Help

### Log Analysis

When reporting issues, include:

1. **System information:**
   ```bash
   uname -a
   node --version
   python --version
   ```

2. **Error messages:**
   ```bash
   # Complete error output
   task run 2>&1 | tee error.log
   ```

3. **Configuration files:**
   ```bash
   # Sanitized configuration (remove secrets)
   cat Agentfile | sed 's/API_KEY.*/API_KEY=***/'
   ```

### Support Channels

1. **GitHub Issues**: [Create an issue](https://github.com/o3-cloud/pAI/issues)
2. **Documentation**: Review [README](../README.md) and guides
3. **Community**: Join discussions in the repository

### Before Reporting Issues

1. **Search existing issues** for similar problems
2. **Try the quick diagnostics** above
3. **Test with minimal configuration**
4. **Include complete error messages**
5. **Provide steps to reproduce**

## Preventive Measures

### Regular Maintenance

```bash
# Update dependencies
npm update -g agentman
task --upgrade

# Clean up old outputs
find . -name "output" -type d -exec rm -rf {} \; 2>/dev/null || true

# Verify environment
task --version
agentman --version
```

### Monitoring

```bash
# Check API usage
# Monitor token consumption
# Review agent performance
# Verify scheduled execution
```

### Best Practices

1. **Keep dependencies updated**
2. **Monitor API usage and costs**
3. **Regularly test agent functionality**
4. **Review and update configurations**
5. **Maintain backup of important data**

## Advanced Troubleshooting

### Deep Debugging

```python
# Add comprehensive logging
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

try:
    # Agent logic here
    pass
except Exception as e:
    logger.error(f"Agent failed: {e}")
    logger.error(traceback.format_exc())
    raise
```

### Performance Profiling

```python
# Add performance profiling
import time
import functools

def timing(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        start = time.time()
        result = await func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timing
async def process_data():
    # Your function here
    pass
```

### Memory Usage Monitoring

```python
# Monitor memory usage
import psutil
import os

def log_memory_usage(label):
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    print(f"{label}: RSS={memory_info.rss / 1024 / 1024:.2f}MB, "
          f"VMS={memory_info.vms / 1024 / 1024:.2f}MB")

# Use throughout agent execution
log_memory_usage("Agent start")
# ... agent logic ...
log_memory_usage("Agent end")
```

This troubleshooting guide should help you resolve most common issues. If you encounter problems not covered here, please create an issue on the repository with detailed information about your environment and the specific error.