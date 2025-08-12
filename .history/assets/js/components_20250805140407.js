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
  // Після завантаження всіх компонентів застосувати налаштування
  if (typeof applyUserSettings === 'function') {
    applyUserSettings();
  }
  
}

document.addEventListener('DOMContentLoaded', loadAllComponents);


// options.js

// Функція для збереження кольорів в локальному сховищі
function saveColorSetting(key, value) {
  localStorage.setItem(key, value);
}

// Функція для відновлення кольорів з локального сховища
function loadColorSettings() {
  const accentColor = localStorage.getItem('accentColor');
  const backgroundColor = localStorage.getItem('backgroundColor');
  const textColor = localStorage.getItem('textColor');

  if (accentColor) {
    document.getElementById('accentColorPicker').value = accentColor;
  }
  if (backgroundColor) {
    document.getElementById('backgroundColorPicker').value = backgroundColor;
  }
  if (textColor) {
    document.getElementById('textColorPicker').value = textColor;
  }
}

// Функція для скидання кольорів
function resetColorSettings() {
  document.getElementById('accentColorPicker').value = '#000000'; // стандартний колір
  document.getElementById('backgroundColorPicker').value = '#ffffff'; // стандартний колір
  document.getElementById('textColorPicker').value = '#000000'; // стандартний колір
  saveColorSetting('accentColor', '#000000');
  saveColorSetting('backgroundColor', '#ffffff');
  saveColorSetting('textColor', '#000000');
}

// Функція для застосування налаштувань
function applyUser Settings() {
  loadColorSettings();

  document.getElementById('accentColorPicker').addEventListener('input', (event) => {
    saveColorSetting('accentColor', event.target.value);
  });

  document.getElementById('backgroundColorPicker').addEventListener('input', (event) => {
    saveColorSetting('backgroundColor', event.target.value);
  });

  document.getElementById('textColorPicker').addEventListener('input', (event) => {
    saveColorSetting('textColor', event.target.value);
  });

  document.getElementById('accentColorResetBtn').addEventListener('click', () => {
    resetColorSettings();
  });

  document.getElementById('backgroundColorResetBtn').addEventListener('click', () => {
    document.getElementById('backgroundColorPicker').value = '#ffffff'; // стандартний колір
    saveColorSetting('backgroundColor', '#ffffff');
  });

  document.getElementById('textColorResetBtn').addEventListener('click', () => {
    document.getElementById('textColorPicker').value = '#000000'; // стандартний колір
    saveColorSetting('textColor', '#000000');
  });

  document.getElementById('resetAllSettingsBtn').addEventListener('click', () => {
    // Відкриваємо модалку підтвердження
    document.getElementById('confirmResetModal').classList.remove('hidden');
  });

  document.getElementById('confirmResetYes').addEventListener('click', () => {
    // Скидаємо всі налаштування
    localStorage.clear();
    resetColorSettings();
    // Закриваємо модалку
    document.getElementById('confirmResetModal').classList.add('hidden');
  });

  document.getElementById('confirmResetNo').addEventListener('click', () => {
    // Закриваємо модалку
    document.getElementById('confirmResetModal').classList.add('hidden');
  });
}

// Викликаємо applyUser Settings після завантаження всіх компонентів
document.addEventListener('DOMContentLoaded', () => {
  loadColorSettings();
});
