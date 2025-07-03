# 🧰 Technology Stack

This document outlines the core technologies used in the pAI@Home project.

---

### [Fast Agent](https://fast-agent.ai/agents/defining/#basic-agents)
- **Purpose**: A framework for defining, prompting, and testing AI agents with minimal boilerplate code.
- **Role**: Used to build the core logic of the `gmail-curator` and `gmail-newsletter` agents.

---

### [Agentman](https://github.com/AgentO3/agentman)
- **Purpose**: A platform for creating and deploying AI agents.
- **Role**: Used to generate the initial boilerplate code for the agents in this project.

---

### [Taskfile](https://taskfile.dev/)
- **Purpose**: A simple and modern task runner used to automate development and operational tasks.
- **Role**: Used to define and run tasks for building, testing, and deploying the agents.

---

### [GitHub Actions](https://docs.github.com/en/actions)
- **Purpose**: A CI/CD platform that allows for automation of workflows.
- **Role**: Used to run the agents on a schedule (e.g., daily for `gmail-curator`, weekly for `gmail-newsletter`).

---

### [Gmail-MCP-Server](https://github.com/GongRzhe/Gmail-MCP-Server)
- **Purpose**: A server that enables agents to interact with Gmail using the Model Context Protocol (MCP).
- **Role**: Provides the connection to Gmail, allowing the agents to read and process emails.