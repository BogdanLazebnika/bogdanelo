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

    // 👇 Після вставки options.html — оновити активні кнопки
    if (id === 'options-placeholder') {
      updateActiveButtons(); // ← ось ця ключова стрічка
    }

    if (scriptPath) {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.defer = true;
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
  // Після завантаження всіх компонентів застосувати налаштування
  if (typeof applyUserSettings === 'function') {
    applyUserSettings();
  }
}

document.addEventListener('DOMContentLoaded', loadAllComponents);


