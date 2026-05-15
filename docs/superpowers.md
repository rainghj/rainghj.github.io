# ⚡ Superpowers 命令参考

Superpowers 是一个 Claude Code 技能集合，将 Claude Code 从通用助手升级为遵循工程纪律的虚拟开发团队。

## 安装

```bash
/plugin install superpowers
```

安装后，Superpowers 的技能会在特定场景下自动触发。

---

## 自动触发技能

Superpowers 采用「技能优先」模式，以下场景会自动触发对应技能：

| 场景 | 触发技能 |
|------|---------|
| 开始任何创意工作（创建功能、构建组件） | `superpowers:brainstorming` |
| 有多步任务需求，开始写代码前 | `superpowers:writing-plans` |
| 执行实现计划，任务相对独立 | `superpowers:subagent-driven-development` |
| 实现任何功能或 bugfix | `superpowers:test-driven-development` |
| 完成任务或实现重大功能 | `superpowers:requesting-code-review` |
| 发现 bug 或调试问题 | `superpowers:systematic-debugging` |
| 开始分支工作 | `superpowers:using-git-worktrees` |

> **注意：** 技能通过 `Skill` 工具调用，不是命令。输入技能名称即可激活。

---

## 七阶段工作流

```
Brainstorming → Writing Plans → Subagent-Driven → TDD → Code Review → Finishing
```

### 阶段 1: Brainstorming `/superpowers:brainstorming`

Socratic 式追问，厘清需求边界，生成设计文档。

**何时触发：** 当你要创建新功能、构建组件、添加功能或修改行为时

**流程：**
1. 探索项目上下文
2. 提问理解需求（一问一答）
3. 提出 2-3 个方案及权衡
4. 呈现设计并获得批准
5. 写入设计文档 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
6. 用户审核后，调用 `writing-plans` 技能

### 阶段 2: Writing Plans `/superpowers:writing-plans`

将需求拆成 2-5 分钟可验证的微任务。

**何时触发：** 有了设计规格后，开始实现前

**输出：** `docs/superpowers/plans/YYYY-MM-DD-<feature>.md`

**计划结构：**
```markdown
# [Feature] Implementation Plan

## Task 1: [Component]
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Task 2: [Component]
- [ ] Step 1
- [ ] Step 2
```

### 阶段 3: Subagent-Driven `/superpowers:subagent-driven-development`

并行子 Agent 执行 + 两阶段 Review。

**何时触发：** 执行实现计划时

**流程：**
```
每个任务：
1. 派遣实现 subagent
2. Spec 合规审查
3. 代码质量审查
4. 修复问题（如有）
5. 进入下一个任务
```

### 阶段 4: Test-Driven `/superpowers:test-driven-development`

强制 Red-Green-Refactor，先写失败测试再实现。

**核心铁律：**
```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

**循环：**
```
RED → 写失败的测试 → 验证失败
GREEN → 写最小代码通过测试 → 验证通过
REFACTOR → 清理代码 → 保持测试绿色
```

### 阶段 5: Code Review `/superpowers:requesting-code-review`

自动生成 Review 意见，关键问题直接 Block。

**何时触发：** 每个任务完成后、合并到主分支前

### 阶段 6: Finishing `/superpowers:finishing-a-development-branch`

测试通过 → 合并/PR 建议 → 清理 Worktree。

---

## 核心命令速查

### 安装与更新

| 命令 | 说明 |
|------|------|
| `/plugin install superpowers` | 安装 Superpowers |
| `/plugin update superpowers` | 更新到最新版本 |
| `/help` | 查看所有可用命令 |

### 技能调用

| 命令 | 说明 |
|------|------|
| `/superpowers:brainstorming` | 激活脑暴技能 |
| `/superpowers:writing-plans` | 激活写计划技能 |
| `/superpowers:subagent-driven-development` | 激活子代理开发技能 |
| `/superpowers:test-driven-development` | 激活 TDD 技能 |
| `/superpowers:requesting-code-review` | 激活代码审查技能 |
| `/superpowers:systematic-debugging` | 激活调试技能 |

### 工作流命令

| 命令 | 说明 |
|------|------|
| `/superpowers:using-git-worktrees` | 创建隔离工作分支 |
| `/superpowers:finishing-a-development-branch` | 完成分支并合并 |

---

## 自动触发规则

Superpowers 技能会在特定时刻自动触发，无需手动调用：

| 触发条件 | 技能 |
|---------|------|
| 任何创意工作开始 | `brainstorming` |
| 有多步任务规格 | `writing-plans` |
| 执行计划时 | `subagent-driven-development` |
| 写任何代码前 | `test-driven-development` |
| 完成任何任务后 | `requesting-code-review` |
| 发现 bug 时 | `systematic-debugging` |

**核心原则：**
> 没有失败测试，就不写生产代码

---

## 文件位置

Superpowers 自动创建的目录：

```
docs/superpowers/
├── specs/          # 设计规格文档
│   └── YYYY-MM-DD-<topic>-design.md
├── plans/         # 实现计划
│   └── YYYY-MM-DD-<feature>.md
└── ...
```

---

## 常见场景

### 开发新功能

```
用户: 帮我开发一个用户登录功能

→ 自动触发 brainstorming
→ 设计批准后 → writing-plans
→ 计划完成 → subagent-driven-development
→ 每个任务: TDD → Code Review
→ 所有任务完成 → Finishing
```

### 修复 Bug

```
用户: 登录页面白屏了

→ 自动触发 systematic-debugging
→ 定位问题后 → 写失败的测试
→ TDD 循环修复 bug
→ Code Review
```

### 代码审查

```
→ 请求 requesting-code-review
→ 获得审查意见
→ 修复 Critical/Important 问题
→ 再次审查（如需要）
```

---

## 状态报告

Subagent 完成任务后会报告四种状态：

| 状态 | 含义 |
|------|------|
| `DONE` | 完成，移交审查 |
| `DONE_WITH_CONCERNS` | 完成但有疑虑 |
| `NEEDS_CONTEXT` | 需要更多信息 |
| `BLOCKED` | 无法完成，需要帮助 |