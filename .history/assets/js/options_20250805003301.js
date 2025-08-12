function updateUserSetting(key, value) {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  if (value === undefined) {
    delete settings[key];
  } else {
    settings[key] = value;
  }

  localStorage.setItem('siteSettings', JSON.stringify(settings));
  applyUserSettings();
  updateActiveButtons();
}

function applyUserSettings() {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  // 🟣 1. Тема
  const theme = settings.theme || 'dark'; // за замовчуванням — темна
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');

  // 🟣 2. Акцентний колір
  const accentColor = settings.accentColor || '#C778DD';
  document.documentElement.style.setProperty('--accent-color', accentColor);

  // 🟣 3. Фіксований хедер
  const header = document.querySelector('header');
  if (header) {
    header.classList.remove('fixed', 'always-fixed');

    if (settings.fixedHeader === true) {
      header.classList.add('fixed');
    } else if (settings.fixedHeader === 'always') {
      header.classList.add('always-fixed');
    }
    // якщо undefined — нічого не додаємо
  }
}

function updateActiveButtons() {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};
  const buttons = document.querySelectorAll('.button-open-options-list-list-two-level button');

  buttons.forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (!onclick) return;

    const match = onclick.match(/updateUserSetting\(['"](.+?)['"],\s*([^\)]+)\)/);
    if (!match) return;

    const key = match[1];
    let value = match[2].trim();

    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (value === 'undefined') value = undefined;
    else if (value.startsWith("'") || value.startsWith('"')) {
      value = value.slice(1, -1);
    }

    const current = settings[key];

    if ((current === undefined && value === undefined) || current === value) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  const colorPicker = document.getElementById('accentColorPicker');
  const resetBtn = document.getElementById('accentColorResetBtn');
  const accentColor = settings.accentColor || '#C778DD';

  if (colorPicker) colorPicker.value = accentColor;
  if (resetBtn) {
    resetBtn.classList.toggle('active', !settings.accentColor);
    resetBtn.onclick = () => updateUserSetting('accentColor', undefined);
  }
}

// 🕓 Чекаємо, поки всі DOM-елементи зʼявляться
function waitForSettingsElements(retries = 15) {
  const picker = document.getElementById('accentColorPicker');
  const resetBtn = document.getElementById('accentColorResetBtn');
  const header = document.querySelector('header');

  if (!picker || !resetBtn || !header) {
    if (retries > 0) {
      setTimeout(() => waitForSettingsElements(retries - 1), 100);
    }
    return;
  }

  applyUserSettings();
  updateActiveButtons();

  picker.addEventListener('input', () => {
    updateUserSetting('accentColor', picker.value);
  });
}

// ⏱ Запускаємо
waitForSettingsElements();



const svgInsertions = [
  { containerId: 'button-open-options-button-icon', svgPath: './assets/img/icons/options.svg' },
  { containerId: 'button-hide-button-options-icon', svgPath: './assets/img/icons/arrow.svg' },
];

svgInsertions.forEach(({ containerId, svgPath }) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Контейнер з id="${containerId}" не знайдено`);
    return;
  }

  fetch(svgPath)
    .then(response => {
      if (!response.ok) throw new Error(`Помилка завантаження SVG з ${svgPath}`);
      return response.text();
    })
    .then(svgContent => {
      container.innerHTML = svgContent;
      container.querySelector('svg')?.classList.add('svg-inserted');
    })
    .catch(error => console.error(`Не вдалося вставити SVG:`, error));
});









document.querySelector('.button-open-options-button').onclick = function () {
    document.querySelector('.button-open-options-list').classList.toggle('open');
  };


  // Показати панель
document.querySelector('.button-open-options-button').onclick = function () {
  document.getElementById('draggable-options').classList.remove('hidden');
};

// Сховати панель
function closeSettingsPanel() {
  document.getElementById('draggable-options').classList.add('hidden');
}

// Draggable
const dragTarget = document.getElementById('draggable-options');
const dragHeader = dragTarget.querySelector('.settings-panel-header');
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

dragHeader.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = dragTarget.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  dragTarget.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  dragTarget.style.left = `${e.clientX - dragOffsetX}px`;
  dragTarget.style.top = `${e.clientY - dragOffsetY}px`;
  dragTarget.style.bottom = 'auto';
  dragTarget.style.transform = 'translateX(0)';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});


const openBtn = document.querySelector('.button-open-options-button');
const openBtnContainer = document.querySelector('.button-options-container');
const settingsPanel = document.getElementById('draggable-options');
const closeBtn = settingsPanel.querySelector('button[onclick="closeSettingsPanel()"]');

// Відкрити меню — сховати кнопку, показати меню
openBtn.addEventListener('click', () => {
  settingsPanel.classList.remove('hidden'); // показати меню
  openBtnContainer.classList.add('hidden'); // сховати кнопку разом з контейнером
});

// Закрити меню — сховати меню, показати кнопку
function closeSettingsPanel() {
  settingsPanel.classList.add('hidden');     // сховати меню
  openBtnContainer.classList.remove('hidden'); // показати кнопку
}
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let mouseDownInside = false;

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
});

// Слідкуємо за натисканням
document.addEventListener('mousedown', (event) => {
  const panel = document.getElementById('draggable-options');
  if (panel.contains(event.target)) {
    mouseDownInside = true;
  } else {
    mouseDownInside = false;
  }
});

// Слідкуємо за кліком
document.addEventListener('click', (event) => {
  const panel = document.getElementById('draggable-options');
  const openBtn = document.querySelector('.button-open-options-button');

  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  const resized = newWidth !== windowWidth || newHeight !== windowHeight;

  const clickedOutside = !panel.contains(event.target) && !openBtn.contains(event.target);

  if (
    !panel.classList.contains('hidden') && // Панель відкрита
    clickedOutside &&
    !resized &&
    !mouseDownInside // Не почали натискати всередині
  ) {
    closeSettingsPanel();
  }

  // Оновлюємо розміри після кліку
  windowWidth = newWidth;
  windowHeight = newHeight;
});





function initOptionsLogic() {
  const container = document.querySelector(".button-options-container");
  const hideButton = document.querySelector(".button-hide-button-options-icon");

  if (!container || !hideButton) {
    console.warn("Options elements not found yet");
    return false;
  }

  const STORAGE_KEY = "hideOptionsBlock";

  // Початковий стан
  const isHidden = localStorage.getItem(STORAGE_KEY) === "true";
  if (isHidden) {
    container.classList.add("hidden-options");
  }

  // Тепер одна кнопка — toggle
  hideButton.addEventListener("click", () => {
    const nowHidden = container.classList.toggle("hidden-options");
    localStorage.setItem(STORAGE_KEY, nowHidden);
  });

  return true;
}


// Чекаємо, поки елементи з'являться у DOM
function waitForOptionsElements(retries = 10) {
  const ok = initOptionsLogic();
  if (!ok && retries > 0) {
    setTimeout(() => waitForOptionsElements(retries - 1), 100);
  }
}

waitForOptionsElements();




updateActiveButtons(); // Вже одразу зараз, якщо DOM готовий (або викличи після перевірки)

document.addEventListener('DOMContentLoaded', () => {
  updateActiveButtons();
});




const resetBtn = document.getElementById('resetAllSettingsBtn');
const modal = document.getElementById('confirmResetModal');
const yesBtn = document.getElementById('confirmResetYes');
const noBtn = document.getElementById('confirmResetNo');

resetBtn.addEventListener('click', () => {
  modal.classList.remove('hidden'); // Показати модалку
});

noBtn.addEventListener('click', () => {
  modal.classList.add('hidden'); // Закрити модалку без дій
});

yesBtn.addEventListener('click', () => {
  // Скинути налаштування
  localStorage.removeItem('siteSettings');
  applyUserSettings();
  updateActiveButtons();

  modal.classList.add('hidden'); // Закрити модалку
});





