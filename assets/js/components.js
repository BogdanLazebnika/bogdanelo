const components = [
  { id: 'header-placeholder', htmlPath: './components/header.html', scriptPath: './assets/js/header.js' },
  { id: 'media-sidebar-placeholder', htmlPath: './components/media-sidebar.html', scriptPath: './assets/js/media-sidebar.js' },
  { id: 'footer-placeholder', htmlPath: './components/footer.html', scriptPath: './scripts/footer.js' }
  // додай інші компоненти сюди
];

async function loadComponent(id, htmlPath, scriptPath) {
  const placeholder = document.getElementById(id);
  if (!placeholder) return;

  // Завантажуємо HTML
  const response = await fetch(htmlPath);
  const html = await response.text();
  placeholder.innerHTML = html;

  // Після вставки HTML підключаємо скрипт компонента
  if (scriptPath) {
    const script = document.createElement('script');
    script.src = scriptPath;
    document.body.appendChild(script);
  }
}

async function loadAllComponents() {
  for (const comp of components) {
    await loadComponent(comp.id, comp.htmlPath, comp.scriptPath);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAllComponents();
});
