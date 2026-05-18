// State
let navData = null;
let currentDoc = null;
let isLoading = false;
let currentTheme = localStorage.getItem('theme') || 'warm';

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        // Apply saved theme
        applyTheme(currentTheme);

        // Load navigation
        const navResponse = await fetch('nav.json');
        if (!navResponse.ok) throw new Error('Failed to load navigation');
        navData = await navResponse.json();

        // Render sidebar
        renderSidebar();

        // Attach click listener to nav container
        const container = document.getElementById('navContainer');
        container.addEventListener('click', async (e) => {
            const navItem = e.target.closest('.nav-item');
            if (!navItem) return;
            await handleNavClick(navItem);
        });

        // Load first document
        const firstItem = findFirstItem(navData);
        if (firstItem) {
            await loadDocument(firstItem.doc);
        }
    } catch (error) {
        showError('加载导航失败: ' + error.message);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderSidebar() {
    const container = document.getElementById('navContainer');
    const titleEl = document.getElementById('sidebarTitle');
    titleEl.textContent = navData.title || 'AI 工具箱';

    let html = '';

    navData.groups.forEach(group => {
        html += `<div class="nav-group">
            <div class="nav-group-label">${escapeHtml(group.label)}</div>`;

        group.items.forEach(item => {
            const isActive = currentDoc === item.doc ? 'active' : '';
            html += `<div class="nav-item ${isActive}"
                         data-doc="${escapeHtml(item.doc)}">
                <span class="nav-item-icon">${item.icon}</span>
                <span class="nav-item-title">${escapeHtml(item.title)}</span>
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
    if (isLoading) return;

    const doc = element.dataset.doc;

    // Update active state
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Load document
    await loadDocument(doc);
}

async function loadDocument(docPath) {
    if (isLoading) return;
    isLoading = true;
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
        currentDoc = null;
        showError('加载文档失败: ' + error.message);
    } finally {
        isLoading = false;
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
    setTimeout(async () => {
        if (navData) {
            const exists = navData.groups.some(g => g.items.some(i => i.doc === hashDoc));
            if (exists) {
                await loadDocument(hashDoc);
            }
        }
    }, 0);
}

// Theme switcher
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-dark', 'theme-warm', 'theme-editorial');

    // Apply new theme
    document.body.classList.add(`theme-${theme}`);
    currentTheme = theme;

    // Save preference
    localStorage.setItem('theme', theme);

    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function switchTheme(theme) {
    // Load theme CSS if not already loaded
    const themeLinkId = 'theme-stylesheet';
    let themeLink = document.getElementById(themeLinkId);
    const themePath = `themes/${theme}.css`;

    if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.id = themeLinkId;
        themeLink.rel = 'stylesheet';
        themeLink.href = themePath;
        document.head.appendChild(themeLink);
    } else if (themeLink.href !== themePath) {
        themeLink.href = themePath;
    }

    applyTheme(theme);
}

// Make switchTheme available globally
window.switchTheme = switchTheme;