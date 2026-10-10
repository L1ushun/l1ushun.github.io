// 使用CDN引入mermaid
document.addEventListener('DOMContentLoaded', function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
  script.onload = function() {
    // 初始化mermaid
    window.mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default'
    });
  };
  document.body.appendChild(script);
});
