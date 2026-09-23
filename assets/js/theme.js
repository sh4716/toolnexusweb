/**
 * ToolNexus 主题切换与持久化存储引擎 (Zero-FOUC 防闪烁)
 */
(function () {
  'use strict';
  var STORAGE_KEY = 'tool_nexus_theme';

  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {}
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  }

  function updateButtons(theme) {
    var isZh = typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/zh/');
    var btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(function (btn) {
      btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
      btn.setAttribute('title', theme === 'light' ? (isZh ? '切换为暗色模式' : 'Switch to Dark Mode') : (isZh ? '切换为亮色模式' : 'Switch to Light Mode'));
      btn.setAttribute('aria-label', theme === 'light' ? (isZh ? '切换为暗色模式' : 'Switch to Dark Mode') : (isZh ? '切换为亮色模式' : 'Switch to Light Mode'));
    });
  }

  function applyTheme(theme, save) {
    save = (save === undefined) ? true : save;
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {}
    }
    updateButtons(theme);
  }

  // 1. 立即设置 HTML 属性（首屏渲染前毫秒级生效，彻底阻断深色闪烁）
  var initialTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  // 2. 页面就绪后同步按钮图标
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateButtons(document.documentElement.getAttribute('data-theme') || initialTheme);
    });
  } else {
    updateButtons(initialTheme);
  }

  // 3. 全局切换函数
  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  };

  // 4. 监听操作系统颜色主题变化（当用户未主动手动选定模式时）
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      } catch (err) {}
    });
  }
})();
