const components = [
  {
    id: 'header-placeholder',
    htmlPath: './components/header.html',
    scriptPath: './assets/js/header.js'
  },
  {
    id: 'media-sidebar-placeholder',
    htmlPath: './components/media-sidebar.html',
    scriptPath: './assets/js/media-sidebar.js'
  },
  {
    id: 'options-placeholder',
    htmlPath: './components/options.html',
    scriptPath: './assets/js/options.js'
  },
  {
    id: 'footer-placeholder',
    htmlPath: './components/footer.html',
    scriptPath: './scripts/footer.js'
  }
];

async function loadComponent(id, htmlPath, scriptPath) {
  const placeholder = document.getElementById(id);
  if (!placeholder) return;

  try {
    const response = await fetch(htmlPath);
    if (!response.ok) throw new Error(`Failed to load ${htmlPath}`);

    const html = await response.text();
    placeholder.innerHTML = html;

    if (scriptPath) {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.defer = true; // гарантія, що виконається після DOM
      document.body.appendChild(script);
    }

  } catch (error) {
    console.error(`[Component Loader Error]: ${error.message}`);
  }
}

async function loadAllComponents() {
  for (const comp of components) {
    await loadComponent(comp.id, comp.htmlPath, comp.scriptPath);
  }
  if (typeof applyUserSettings === 'function') {
    applyUserSettings();
  }
  if (typeof initColorSettings === 'function') {
    initColorSettings(); // ініціалізуємо кольори після того, як опції завантажені
  }
}


// НЕ викликаємо тут
// initColorSettings();

async function loadAllComponents() {
  for (const comp of components) {
    await loadComponent(comp.id, comp.htmlPath, comp.scriptPath);
  }
  if (typeof applyUserSettings === 'function') {
    applyUserSettings();
  }
  if (typeof initColorSettings === 'function') {
    initColorSettings();  // <-- саме тут викликаємо
  }
}

document.addEventListener('DOMContentLoaded', loadAllComponents,);
