# AGENTS.md

GitHub Pages 静态知识库，用于 AI 工具文档。无构建步骤，无打包工具 — 推送到 `master` 即自动部署。

## 项目结构

- `index.html` — 单页应用外壳（侧边栏 + 内容区 + 主题切换器）
- `app.js` — 加载 `nav.json`，获取文档，通过 `marked.js` 渲染 md，或直接注入 html
- `nav.json` — **导航数据源**；驱动侧边栏、分组和文档路由
- `styles.css` — 共享布局/结构样式（CSS 自定义属性用于主题切换）
- `themes/*.css` — 主题覆盖文件：`dark.css`、`warm.css`、`editorial.css`
- `docs/` — markdown 和 HTML 文档文件

## 添加新文档

1. 在 `docs/` 目录下创建文件（`.md` 为 markdown，`.html` 为独立页面）
2. 在 `nav.json` 的对应分组下添加条目：
   ```json
   { "title": "标题", "icon": "📖", "doc": "docs/filename.md" }
   ```
3. 如果 `.html` 文件放在根目录（不在 `docs/` 下），`nav.json` 中的路径必须相对于根目录（例如 `"MiMo-Code 使用说明.html"`）

## 内容渲染方式

- `.md` 文件：获取文本 → `marked.parse()` → highlight.js 语法高亮
- `.html` 文件：获取文本 → 提取 `<style>` 标签 → 将 `<body>` 内容注入 `contentArea`
- `.html` 文档是自包含的 — 自带样式，样式会被提取并随 body 内容一起注入

## 主题系统

三个主题通过 `<body>` 上的 CSS 类切换：`theme-dark`、`theme-warm`、`theme-editorial`。每个主题文件（`themes/*.css`）定义 CSS 自定义属性。默认主题为 `warm`。用户偏好存储在 `localStorage` 中。

## 注意事项

- **无构建/部署步骤。** 修改 `master` 分支后 GitHub Pages 自动部署。
- **HTML 文档必须自包含。** 其 `<style>` 标签会被提取和注入 — 不要在独立 HTML 文档内依赖外部 CSS 链接。
- **`nav.json` 中的路径相对于根目录**，而非引用它的文件。例如 `"doc": "docs/foo.md"` 从站点根目录解析。
- **`app.js` 会提取 HTML 文档的 `<body>` 内容。** 不要在独立 HTML 文档内容外面再包一层 `<body>` 标签。
- **主题 CSS 使用自定义属性。** 如果添加新的主题化元素，需要在每个主题文件中定义变量，或回退到 `styles.css` 的默认值。
