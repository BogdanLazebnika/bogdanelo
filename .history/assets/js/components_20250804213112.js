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

// Функція для завантаження одного компонента
async function loadComponent(id, htmlPath, scriptPath) {
  const placeholder = document.getElementById(id);
  if (!placeholder) return; // Якщо контейнер не знайдено, виходимо

  try {
    const response = await fetch(htmlPath);
    if (!response.ok) throw new Error(`Failed to load ${htmlPath}`);

    const html = await response.text();
    placeholder.innerHTML = html;

    // Завантаження скрипта, якщо він вказаний
    if (scriptPath) {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.defer = true; // Гарантуємо, що скрипт виконається після завантаження DOM
      document.body.appendChild(script);
    }

  } catch (error) {
    console.error(`[Component Loader Error]: ${error.message}`);
  }
}

// Функція для завантаження всіх компонентів
async function loadAllComponents() {
  for (const comp of components) {
    await loadComponent(comp.id, comp.htmlPath, comp.scriptPath);
  }
  
  // Після завантаження всіх компонентів застосувати налаштування
  if (typeof applyUser Settings === 'function') {
    applyUser Settings();
  }
}

// Запускаємо завантаження компонентів після завантаження DOM
document.addEventListener('DOMContentLoaded', loadAllComponents);
