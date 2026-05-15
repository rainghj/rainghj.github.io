# 🤖 Claude Code

Claude Code 是 Anthropic 官方的命令行工具，帮助你在终端中使用 Claude 进行编程。

## 安装

首先确保已安装 Node.js（版本 ≥ 18），然后运行：

```bash
npm install -g @anthropic-ai/claude-code
```

## 验证安装

```bash
claude --version
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `/help` | 显示帮助信息 |
| `/plugin` | 管理插件 |
| `/model` | 切换模型 |

## 配置

可以通过 `~/.claude/config.json` 进行配置：

```json
{
  "model": "opus",
  "temperature": 0.7
}
```

> **提示：** 确保你已经设置了 `ANTHROPIC_API_KEY` 环境变量
