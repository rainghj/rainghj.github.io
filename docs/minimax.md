# 🎭 MiniMax

MiniMax 是一个 AI Agent，通过 MCP（Model Context Protocol）协议与 Claude Code 集成。

## 安装 MCP Server

```bash
claude mcp add -s user MiniMax --env MINIMAX_API_KEY=your_key --env MINIMAX_API_HOST=https://api.minimaxi.com -- uvx minimax-coding-plan-mcp -y
```

## 验证连接

```bash
claude mcp list
```

应该看到：

```
MiniMax: uvx minimax-coding-plan-mcp -y - ✓ Connected
```

## 功能特点

- 代码生成与优化
- 自动化测试
- 项目结构分析
