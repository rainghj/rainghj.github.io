# 🤖 Claude Code

Claude Code 是 Anthropic 官方的命令行工具，帮助你在终端中使用 Claude 进行编程。

## 安装

```bash
# 使用 npm 安装
npm install -g @anthropic-ai/claude-code

# 或使用 Claude Code 自带的安装命令
claude install
```

## 验证安装

```bash
claude --version
```

---

## 启动方式

### 交互模式（默认）

```bash
# 进入交互式会话
claude

# 继续最近的对话
claude -c
claude --continue

# 恢复指定会话
claude -r <session-id>
claude --resume <session-id>
```

### 非交互模式（管道）

```bash
# 打印输出后退出（适合管道）
claude -p "你的提示"

# 指定输出格式
claude -p --output-format json "你的提示"
claude -p --output-format stream-json "你的提示"
```

---

## 命令行选项

### 会话控制

| 选项 | 说明 |
|------|------|
| `-c, --continue` | 继续当前目录最近的对话 |
| `-r, --resume [value]` | 通过会话 ID 恢复会话，或打开交互式选择器 |
| `--session-id <uuid>` | 使用指定会话 ID |
| `--fork-session` | 恢复时创建新会话 ID（配合 --resume） |
| `--no-session-persistence` | 禁用会话持久化（仅 --print） |

### 模型选择

| 选项 | 说明 |
|------|------|
| `--model <model>` | 指定模型（如 `sonnet`、`opus` 或完整名称） |
| `--fallback-model <model>` | 默认模型过载时自动切换到指定模型（仅 --print） |
| `--effort <level>` | 设置努力级别：`low`, `medium`, `high`, `xhigh`, `max` |

### 权限与安全

| 选项 | 说明 |
|------|------|
| `--permission-mode <mode>` | 权限模式：`acceptEdits`, `auto`, `bypassPermissions`, `default`, `dontAsk`, `plan` |
| `--dangerously-skip-permissions` | 绕过所有权限检查（仅推荐沙盒环境） |
| `--allow-dangerously-skip-permissions` | 启用跳过权限选项（默认禁用） |

### 输入输出

| 选项 | 说明 |
|------|------|
| `-p, --print` | 打印响应后退出（管道模式） |
| `--output-format <format>` | 输出格式：`text`, `json`, `stream-json` |
| `--input-format <format>` | 输入格式：`text`, `stream-json` |
| `--json-schema <schema>` | 结构化输出验证的 JSON Schema |

### MCP 与插件

| 选项 | 说明 |
|------|------|
| `--mcp-config <configs...>` | 从 JSON 文件或字符串加载 MCP 服务器 |
| `--mcp-debug` | 启用 MCP 调试模式（显示服务器错误） |
| `--strict-mcp-config` | 仅使用 --mcp-config 指定的 MCP，忽略其他配置 |
| `--plugin-dir <path>` | 加载插件目录或 .zip（仅当前会话） |
| `--plugin-url <url>` | 从 URL 获取插件 .zip（仅当前会话） |
| `--disable-slash-commands` | 禁用所有 skills |

### 调试与日志

| 选项 | 说明 |
|------|------|
| `-d, --debug [filter]` | 启用调试模式，可选分类过滤（如 `api,hooks`） |
| `--debug-file <path>` | 将调试日志写入指定文件 |
| `--verbose` | 覆盖 verbose 模式设置 |

### 工作目录与上下文

| 选项 | 说明 |
|------|------|
| `--add-dir <directories...>` | 允许工具访问的额外目录 |
| `--add-dir` | 添加目录到允许列表 |
| `--system-prompt <prompt>` | 指定系统提示 |
| `--append-system-prompt <prompt>` | 追加系统提示 |
| `--exclude-dynamic-system-prompt-sections` | 将动态部分移到首个用户消息中 |
| `--setting-sources <sources>` | 加载设置的来源：`user`, `project`, `local` |
| `--settings <file-or-json>` | 加载额外设置的 JSON 文件或字符串 |

### 其他选项

| 选项 | 说明 |
|------|------|
| `-n, --name <name>` | 设置会话显示名称 |
| `-w, --worktree [name]` | 为会话创建新的 git worktree |
| `--tmux` | 创建 tmux 会话（需配合 --worktree） |
| `--agent <agent>` | 为当前会话指定 agent |
| `--agents <json>` | 定义自定义 agents 的 JSON 对象 |
| `--betas <betas...>` | 在 API 请求中包含 Beta 头信息 |
| `--max-budget-usd <amount>` | 最大花费金额（仅 --print） |
| `--file <specs...>` | 启动时下载的文件资源 |
| `--bare` | 最小模式：跳过 hooks、LSP、插件同步等 |
| `--from-pr [value]` | 恢复关联到 PR 的会话 |
| `--remote-control [name]` | 启用远程控制 |
| `--include-partial-messages` | 包含部分消息块（仅 --print 和 stream-json） |
| `--include-hook-events` | 包含所有 hook 生命周期事件（仅 stream-json） |
| `--replay-user-messages` | 重新发出用户消息到 stdout（仅 stream-json） |
| `--ide` | 如果只有一个可用 IDE 则自动连接 |
| `--chrome` / `--no-chrome` | 启用/禁用 Chrome 集成 |

---

## 子命令

### `claude agents`

管理后台 agents：

```bash
claude agents list    # 列出所有 agent
claude agents start   # 启动 agent
claude agents stop    # 停止 agent
```

### `claude auth`

管理身份认证：

```bash
claude auth status     # 查看认证状态
claude auth logout     # 登出
```

### `claude mcp`

配置和管理 MCP 服务器：

```bash
claude mcp list                    # 列出已配置的 MCP 服务器
claude mcp add <name> <command>    # 添加 MCP 服务器
claude mcp remove <name>           # 移除 MCP 服务器
claude mcp start <name>            # 启动 MCP 服务器
claude mcp stop <name>             # 停止 MCP 服务器
```

### `claude plugin` / `claude plugins`

管理插件：

```bash
claude plugin list                  # 列出已安装插件
claude plugin install <name>        # 安装插件
claude plugin uninstall <name>      # 卸载插件
claude plugin update <name>         # 更新插件
```

### `claude project`

管理项目状态：

```bash
claude project status       # 查看项目状态
claude project init         # 初始化项目
```

### `claude doctor`

检查 Claude Code 自动更新器的健康状态：

```bash
claude doctor
```

### `claude ultrareview`

运行云端多 agent 代码审查：

```bash
claude ultrareview              # 审查当前分支
claude ultrareview 123          # 审查 PR #123
claude ultrareview main..feature # 审查分支差异
```

### `claude update` / `claude upgrade`

检查并安装更新：

```bash
claude update           # 检查更新
claude upgrade stable   # 升级到稳定版
claude upgrade latest   # 升级到最新版本
```

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `claude` | 启动交互式会话 |
| `claude -p "提示"` | 非交互模式执行 |
| `claude -c` | 继续最近对话 |
| `claude -r <id>` | 恢复指定会话 |
| `claude --help` | 显示帮助 |
| `claude --version` | 显示版本 |
| `claude mcp list` | 列出 MCP 服务器 |
| `claude plugin list` | 列出插件 |
| `claude doctor` | 检查健康状态 |
| `claude update` | 检查更新 |

---

## 环境变量

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 |
| `CLAUDE_CODE_SIMPLE` | 设置为 1 时启用最小模式 |
| `CLAUDE_API_KEY` | 备用 API 密钥变量 |

---

## 配置文件

Claude Code 配置文件位于：

- **用户级：** `~/.claude/config.json`
- **项目级：** `./.claude/config.json`
- **本地级：** `./.claude/local.json`

配置示例：

```json
{
  "model": "claude-sonnet-4-6",
  "temperature": 0.7,
  "permissionMode": "auto",
  "verbose": false
}
```

---

## 权限模式

| 模式 | 说明 |
|------|------|
| `default` | 默认行为，询问敏感操作 |
| `auto` | 自动批准安全操作 |
| `acceptEdits` | 自动接受编辑操作 |
| `dontAsk` | 不询问，直接执行 |
| `plan` | 仅允许计划操作 |
| `bypassPermissions` | 绕过所有权限检查 |