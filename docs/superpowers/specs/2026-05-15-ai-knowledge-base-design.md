# AI 知识库页面设计规格

## 概述

将旧的 Vue.js 应用重构为一个可自管理的知识库，用于展示 AI 插件/Agent 的说明文档。

**核心特性：**
- 固定左侧导航栏 + 右侧内容区
- 导航配置通过 JSON 文件管理，方便 AI 生成修改
- 文档内容使用 Markdown 格式，支持代码高亮、表格、提示框等
- 三断点响应式自适应（桌面/平板/移动）
- 纯静态站点，托管于 GitHub Pages

## 文件结构

```
/
├── index.html          # 主页面
├── nav.json            # 导航配置
├── styles.css          # 样式文件
├── app.js              # 渲染逻辑
└── docs/               # 文档目录
    ├── claude-code.md
    ├── mcp-servers/
    │   └── minimax.md
    └── superpowers/
        └── index.md
```

## 技术方案

| 项目 | 选择 |
|------|------|
| 导航配置 | nav.json（手动或 AI 编辑） |
| 内容格式 | Markdown |
| Markdown 渲染 | marked.js（CDN） |
| 代码高亮 | highlight.js（CDN） |
| 托管 | GitHub Pages（静态） |

## 响应式断点

| 断点 | 侧边栏宽度 | 行为 |
|------|-----------|------|
| ≥1024px | 260px | 固定显示 |
| 768-1023px | 60px | 图标模式 |
| <768px | 0 | 隐藏，汉堡菜单 |

## 导航配置格式

```json
{
  "title": "🛠️ AI 工具箱",
  "groups": [
    {
      "label": "插件",
      "items": [
        { "title": "Claude Code", "icon": "🤖", "doc": "docs/claude-code.md" },
        { "title": "Superpowers", "icon": "⚡", "doc": "docs/superpowers/index.md" }
      ]
    },
    {
      "label": "Agent",
      "items": [
        { "title": "MiniMax", "icon": "🎭", "doc": "docs/agents/minimax.md" }
      ]
    }
  ]
}
```

## 内容渲染样式

- 标题层级（h1-h6）
- 代码块（深色主题，带语言标签）
- 表格（斑马纹）
- 提示框（info/warn/success）
- 列表、有序列表
- 链接、图片

## 交互行为

1. 页面加载 → 获取 nav.json → 渲染左侧导航
2. 点击导航项 → 获取对应 .md 文件 → 渲染到右侧内容区
3. 移动端点击汉堡菜单 → 侧边栏从左侧滑入
4. 当前选中导航项高亮显示

## 约束

- 无后端，纯前端静态资源
- 所有内容通过 fetch 获取（需 CORS 支持，GitHub Pages 原生支持）
- 不支持需要服务器端渲染的功能