# AI Knowledge Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static knowledge base site with fixed sidebar navigation and Markdown content rendering for AI plugins/agents documentation.

**Architecture:** Single-page app with client-side routing. Navigation loaded from nav.json, content rendered from Markdown files via marked.js. No backend required - pure static hosting on GitHub Pages.

**Tech Stack:** HTML, CSS, JavaScript (vanilla), marked.js (CDN), highlight.js (CDN)

---

## File Structure

```
/
├── index.html          # Main page - sidebar + content container
├── nav.json            # Navigation configuration
├── styles.css          # All styles including responsive breakpoints
├── app.js              # Navigation rendering + Markdown loading/rendering
└── docs/               # Documentation content
    ├── claude-code.md
    └── superpowers.md
```

---

## Task 1: Create nav.json

**Files:**
- Create: `nav.json`

- [ ] **Step 1: Create nav.json with sample navigation**

```json
{
  "title": "🛠️ AI 工具箱",
  "groups": [
    {
      "label": "插件",
      "items": [
        { "title": "Claude Code", "icon": "🤖", "doc": "docs/claude-code.md" },
        { "title": "Superpowers", "icon": "⚡", "doc": "docs/superpowers.md" }
      ]
    },
    {
      "label": "Agent",
      "items": [
        { "title": "MiniMax", "icon": "🎭", "doc": "docs/minimax.md" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add nav.json && git commit -m "feat: add nav.json with sample navigation structure"
```

---

## Task 2: Create styles.css

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Write complete CSS with all styles**

```css
:root {
  --bg: #f8fafc;
  --sidebar-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 60px;
  --card-bg: #ffffff;
  --text: #2c3e50;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --primary: #3b82f6;
  --primary-light: #eff6ff;
  --accent-orange: #f59e0b;
  --accent-green: #10b981;
  --accent-purple: #8b5cf6;
  --radius: 10px;
  --radius-sm: 6px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  min-height: 100vh;
}

/* Layout */
.app-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  padding: 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 100;
}

.sidebar-header {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
}

.nav-group {
  margin-bottom: 1.5rem;
}

.nav-group-label {
  color: #94a3b8;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.nav-item {
  color: #cbd5e1;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: #334155;
}

.nav-item.active {
  background: var(--primary);
  color: white;
}

.nav-item-icon {
  font-size: 1rem;
}

/* Content Area */
.content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 2rem;
  max-width: 900px;
}

.content-inner {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 2rem;
}

/* Mobile Menu Toggle */
.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 200;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1.2rem;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

/* Markdown Content Styles */
.content h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border);
}

.content h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.2rem 0 0.8rem;
}

.content p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.content ul, .content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.content li {
  margin-bottom: 0.4rem;
}

.content pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
  font-size: 0.85rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: "SF Mono", "Fira Code", monospace;
}

.content code {
  background: #f1f5f9;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: "SF Mono", "Fira Code", monospace;
  color: #334155;
}

.content pre code {
  background: transparent;
  padding: 0;
  color: #e2e8f0;
}

.content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.content th, .content td {
  text-align: left;
  padding: 0.65rem 0.9rem;
  border-bottom: 1px solid var(--border);
}

.content th {
  background: #f8fafc;
  font-weight: 700;
  color: #475569;
  font-size: 0.82rem;
  text-transform: uppercase;
}

.content tr:hover td {
  background: #fafcfd;
}

.content a {
  color: var(--primary);
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

.content img {
  max-width: 100%;
  border-radius: var(--radius-sm);
}

/* Callout boxes */
.callout {
  border-left: 4px solid var(--primary);
  background: var(--primary-light);
  padding: 0.9rem 1.2rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin: 1rem 0;
}

.callout.warn {
  border-left-color: var(--accent-orange);
  background: #fff7ed;
}

.callout.success {
  border-left-color: var(--accent-green);
  background: #ecfdf5;
}

/* Loading state */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--text-secondary);
}

.loading::after {
  content: "加载中...";
}

/* Error state */
.error {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: #dc2626;
}

/* Responsive - Tablet (768px-1023px) */
@media (max-width: 1023px) {
  .sidebar {
    width: var(--sidebar-collapsed-width);
    padding: 1rem 0.5rem;
  }

  .sidebar-header {
    font-size: 0;
    padding-bottom: 0.5rem;
  }

  .nav-group-label {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: 0.6rem;
    font-size: 1.2rem;
  }

  .nav-item-icon {
    font-size: 1.3rem;
  }

  .content {
    margin-left: var(--sidebar-collapsed-width);
  }
}

/* Responsive - Mobile (<768px) */
@media (max-width: 767px) {
  .sidebar {
    width: 280px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-overlay.open {
    display: block;
  }

  .content {
    margin-left: 0;
    padding: 1rem;
    padding-top: 4rem;
  }

  .content-inner {
    padding: 1.25rem;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add styles.css && git commit -m "feat: add styles.css with responsive sidebar styles"
```

---

## Task 3: Create index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 工具箱</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Highlight.js for code syntax highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
</head>
<body>
    <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
    <div class="mobile-overlay" id="mobileOverlay" onclick="toggleMobileMenu()"></div>

    <div class="app-container">
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header" id="sidebarTitle">🛠️ AI 工具箱</div>
            <nav id="navContainer">
                <!-- Navigation items rendered here -->
            </nav>
        </aside>

        <main class="content">
            <article class="content-inner" id="contentArea">
                <div class="loading"></div>
            </article>
        </main>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html && git commit -m "feat: add index.html with sidebar layout"
```

---

## Task 4: Create app.js

**Files:**
- Create: `app.js`

- [ ] **Step 1: Write app.js with navigation and markdown rendering logic**

```javascript
// State
let navData = null;
let currentDoc = null;

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        // Load navigation
        const navResponse = await fetch('nav.json');
        if (!navResponse.ok) throw new Error('Failed to load navigation');
        navData = await navResponse.json();

        // Render sidebar
        renderSidebar();

        // Load first document
        const firstItem = findFirstItem(navData);
        if (firstItem) {
            await loadDocument(firstItem.doc);
        }
    } catch (error) {
        showError('加载导航失败: ' + error.message);
    }
}

function renderSidebar() {
    const container = document.getElementById('navContainer');
    const titleEl = document.getElementById('sidebarTitle');
    titleEl.textContent = navData.title || '🛠️ AI 工具箱';

    let html = '';

    navData.groups.forEach(group => {
        html += `<div class="nav-group">
            <div class="nav-group-label">${group.label}</div>`;

        group.items.forEach(item => {
            const isActive = currentDoc === item.doc ? 'active' : '';
            html += `<div class="nav-item ${isActive}"
                         data-doc="${item.doc}"
                         onclick="handleNavClick(this)">
                <span class="nav-item-icon">${item.icon}</span>
                <span class="nav-item-title">${item.title}</span>
            </div>`;
        });

        html += '</div>';
    });

    container.innerHTML = html;
}

function findFirstItem(navData) {
    for (const group of navData.groups) {
        if (group.items.length > 0) {
            return group.items[0];
        }
    }
    return null;
}

async function handleNavClick(element) {
    const doc = element.dataset.doc;

    // Update active state
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Load document
    await loadDocument(doc);
}

async function loadDocument(docPath) {
    currentDoc = docPath;
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(docPath);
        if (!response.ok) throw new Error('Document not found');

        const markdown = await response.text();

        // Configure marked
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });

        // Convert and render
        const html = marked.parse(markdown);
        contentArea.innerHTML = `<div class="content-inner">${html}</div>`;

        // Close mobile menu if open
        closeMobileMenu();

        // Update URL hash
        window.location.hash = docPath;

        // Re-render sidebar to update active state
        renderSidebar();

    } catch (error) {
        showError('加载文档失败: ' + error.message);
    }
}

function showError(message) {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `<div class="error">${message}</div>`;
}

// Mobile menu functions
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
}

// Handle hash on load
window.addEventListener('hashchange', handleHashChange);

async function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== currentDoc) {
        await loadDocument(hash);
    }
}

// Load from hash on init
if (window.location.hash) {
    const hashDoc = window.location.hash.slice(1);
    // Defer until navData is loaded
    setTimeout(async () => {
        if (navData) {
            const exists = navData.groups.some(g => g.items.some(i => i.doc === hashDoc));
            if (exists) {
                await loadDocument(hashDoc);
            }
        }
    }, 0);
}
```

- [ ] **Step 2: Commit**

```bash
git add app.js && git commit -m "feat: add app.js with navigation and markdown rendering"
```

---

## Task 5: Create sample documentation

**Files:**
- Create: `docs/claude-code.md`
- Create: `docs/superpowers.md`
- Create: `docs/minimax.md`

- [ ] **Step 1: Create docs/claude-code.md**

```markdown
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
```

- [ ] **Step 2: Create docs/superpowers.md**

```markdown
# ⚡ Superpowers

Superpowers 是一个 Claude Code 技能集合，将 Claude Code 从通用助手升级为遵循工程纪律的虚拟开发团队。

## 安装

```bash
/plugin install superpowers
```

## 核心技能

### Brainstorming

Socratic 式追问，厘清需求边界，生成设计文档。

### Writing Plans

将需求拆成 2-5 分钟可验证的微任务。

### Test-Driven Development

强制 Red-Green-Refactor，先写失败测试再实现。

## 工作流

1. **Brainstorming** → 2. **Using Git Worktrees** → 3. **Writing Plans** → 4. **Subagent-Driven Development** → 5. **Test-Driven Development** → 6. **Code Review** → 7. **Finishing a Branch**

> **核心原则：** 没有失败测试，就不写生产代码
```

- [ ] **Step 3: Create docs/minimax.md**

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add docs/ && git commit -m "feat: add sample documentation for Claude Code, Superpowers, and MiniMax"
```

---

## Task 6: Update nav.json with correct paths

**Files:**
- Modify: `nav.json`

- [ ] **Step 1: Update nav.json to match actual doc paths**

```json
{
  "title": "🛠️ AI 工具箱",
  "groups": [
    {
      "label": "插件",
      "items": [
        { "title": "Claude Code", "icon": "🤖", "doc": "docs/claude-code.md" },
        { "title": "Superpowers", "icon": "⚡", "doc": "docs/superpowers.md" }
      ]
    },
    {
      "label": "Agent",
      "items": [
        { "title": "MiniMax", "icon": "🎭", "doc": "docs/minimax.md" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add nav.json && git commit -m "fix: update nav.json doc paths"
```

---

## Task 7: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers to .gitignore**

```
.claude/
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore && git commit -m "chore: add .superpowers to gitignore"
```

---

## Task 8: Clean up and push

- [ ] **Step 1: Remove old static files that are no longer needed**

```bash
# Remove old Vue app files
rm -rf static/*.js static/*.css static/*.map 2>/dev/null

# Keep images if needed, otherwise clean
ls static/
```

- [ ] **Step 2: Verify site works locally**

If you have a local server, test the site. Alternatively verify file structure:

```bash
ls -la
# Should show: index.html, nav.json, styles.css, app.js, docs/, .gitignore
```

- [ ] **Step 3: Push to GitHub**

```bash
git push origin master
```

---

## Verification Checklist

After implementation, verify:

- [ ] Sidebar renders with navigation groups and items
- [ ] Clicking nav item loads corresponding Markdown content
- [ ] Markdown renders correctly (headings, code blocks, tables)
- [ ] Code syntax highlighting works
- [ ] Active nav item is highlighted
- [ ] Responsive layout works at all three breakpoints
- [ ] Mobile hamburger menu opens/closes sidebar
- [ ] URL hash updates when navigating
- [ ] Page loads from hash on refresh
- [ ] GitHub Pages deployment successful

---

**Plan complete.** Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?