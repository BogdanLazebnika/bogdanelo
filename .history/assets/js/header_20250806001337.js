// === 📌 Вставка SVG ===
function insertSVG(url, containerId, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = data;
      if (callback) callback(container);
    })
    .catch(error => {
      console.error(`Помилка завантаження SVG (${url}):`, error);
    });
}

// === 📌 Використання SVG ===
insertSVG('./assets/img/logo/logo2.svg', 'logo-header');
insertSVG('./assets/img/icons/arrow-down.svg', 'down-arrow-language', () => {
  const downArrow = document.querySelector('#down-arrow-language svg');
  const languageSwitcherButton = document.querySelector('.language-switcher__button');
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageDropdown = document.querySelector('.language-switcher__dropdown');

  function closeLanguageMenu() {
    languageSwitcher.classList.remove('open');
    languageDropdown.classList.remove('open');
    if (downArrow) downArrow.classList.remove('rotated');
    languageSwitcherButton.setAttribute('aria-expanded', 'false');
  }

  languageSwitcherButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const isOpen = languageSwitcher.classList.contains('open');
    if (isOpen) {
      closeLanguageMenu();
    } else {
      languageSwitcher.classList.add('open');
      languageDropdown.classList.add('open');
      if (downArrow) downArrow.classList.add('rotated');
      languageSwitcherButton.setAttribute('aria-expanded', 'true');
    }
  });

  // === 📌 Закриття меню мови при кліку поза елементом
  document.addEventListener('click', (e) => {
    if (!languageSwitcher.contains(e.target)) {
      closeLanguageMenu();
    }
  });

  // === 📌 Закриття меню мови при скролі
  window.addEventListener('scroll', () => {
    closeLanguageMenu();
  });

  // === 📌 Логіка перемикання мови
  languageDropdown.querySelectorAll("button[data-lang]").forEach(langButton => {
    langButton.addEventListener("click", () => {
      const lang = langButton.getAttribute("data-lang");
      const pathParts = location.pathname.split("/");
      const currentFile = pathParts.pop() || "index.html";
      const isInEnFolder = pathParts.includes("en");

      let newPath;
      if (lang === "en" && !isInEnFolder) {
        newPath = "/en/" + currentFile;
      } else if (lang === "ua" && isInEnFolder) {
        newPath = "/" + currentFile;
      } else {
        return;
      }

      window.location.href = newPath;
    });
  });
});


// === 📌 Підсвічування активного пункту меню
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-list a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (linkPath === currentPath) {
    link.classList.add('active');
    link.addEventListener('click', e => {
      e.preventDefault();
    });
  } else {
    link.classList.remove('active');
  }
});


// === 📌 Логіка бургер-меню
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const header = document.querySelector('.header'); // Перенесено сюди

hamburger.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  hamburger.classList.toggle('active');

  // Додаємо/знімаємо клас для фіксованого хедера
  if (isActive) {
    header.classList.add('fixed-header');
    document.body.classList.add('no-scroll'); // щоб за потреби блокувати прокрутку
  } else {
    header.classList.remove('fixed-header');
    document.body.classList.remove('no-scroll');
  }
});


// === 📌 Логіка приховування хедера при скролі
// Змінні для глобального стану
let lastScrollTop = 0;
let headerPosition = 0;

// Функція для приховування хедера при скролі вниз
function headerScrollHandler() {
  const nav = document.getElementById('nav');
  const header = document.querySelector('.header');
  if (nav && nav.classList.contains('active')) return; // меню відкрите — не ховати

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    headerPosition = Math.min(headerPosition + (scrollTop - lastScrollTop), header.offsetHeight);
  } else {
    headerPosition = Math.max(headerPosition - (lastScrollTop - scrollTop), 0);
  }

  header.style.top = -headerPosition + 'px';
  lastScrollTop = scrollTop;
}

function applyUserSettings() {
  const header = document.querySelector('.header');
  const main = document.querySelector('main');
  const nav = document.getElementById('nav');
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  // Скидаємо класи і стилі
  header.classList.remove('fixed', 'hidden', 'always-fixed');
  main.style.paddingTop = '0px';
  header.style.top = '0';

  // Видаляємо попередній слухач скролу, якщо є
  window.removeEventListener('scroll', headerScrollHandler);
  lastScrollTop = 0;
  headerPosition = 0;

  if (settings.fixedHeader === true) {
    // Фіксована з приховуванням при скролі
    header.classList.add('fixed');
    main.style.paddingTop = header.offsetHeight + 'px';
    window.addEventListener('scroll', headerScrollHandler);

  } else if (settings.fixedHeader === "always") {
    // Фіксована, завжди зверху без приховування
    header.classList.add('fixed', 'always-fixed');
    main.style.paddingTop = header.offsetHeight + 'px';
    header.style.top = '0'; // завжди зверху

  } else {
    // Не фіксована
    main.style.paddingTop = '0px';
  }

  // Тема
  if (settings.theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  // Акцентний колір
  if (settings.accentColor) {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }
}








// вставка зображень в mobile-social-list"
const githubLogo = document.getElementById('github-logo-mobile-menu');
const dribbleLogo = document.getElementById('dribble-logo-mobile-menu');
const figmaLogo = document.getElementById('figma-logo-mobile-menu');

const svgFiles = [
  './assets/img/logo/github.svg',
  './assets/img/logo/dribble.svg',
  './assets/img/logo/figma.svg'
];

const logos = [githubLogo, dribbleLogo, figmaLogo];

logos.forEach((logo, index) => {
  const svgFile = svgFiles[index];
  fetch(svgFile)
    .then(response => response.text())
    .then(svgContent => {
      logo.innerHTML = svgContent;
    });
});


window.addEventListener('DOMContentLoaded', () => {
  applyUserSettings();
});



// === 📌 Перемикач фіксації хедера + padding для main
function applyUserSettings() {
  const header = document.querySelector('.header');
  const main = document.querySelector('main');
  const nav = document.getElementById('nav'); // бургер меню
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  // Скидаємо класи і стилі
  header.classList.remove('fixed', 'hidden', 'always-fixed');
  main.style.paddingTop = '0px';

  // Знімаємо обробник скролу, якщо був
  if (window.headerScrollHandler) {
    window.removeEventListener('scroll', window.headerScrollHandler);
    window.headerScrollHandler = null;
  }
  header.style.top = '0';

  if (settings.fixedHeader === true) {
    // Фіксована з приховуванням
    header.classList.add('fixed');
    main.style.paddingTop = header.offsetHeight + 'px';

    window.headerScrollHandler = function () {
      if (nav && nav.classList.contains('active')) return; // якщо меню відкрито

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (!window.lastScrollTop) window.lastScrollTop = 0;
      if (!window.headerPosition) window.headerPosition = 0;

      if (scrollTop > window.lastScrollTop) {
        window.headerPosition = Math.min(window.headerPosition + (scrollTop - window.lastScrollTop), header.offsetHeight);
      } else {
        window.headerPosition = Math.max(window.headerPosition - (window.lastScrollTop - scrollTop), 0);
      }

      header.style.top = -window.headerPosition + 'px';
      window.lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', window.headerScrollHandler);

  } else if (settings.fixedHeader === "always") {
    // Фіксована і завжди зверху (без приховування)
    header.classList.add('fixed', 'always-fixed');
    main.style.paddingTop = header.offsetHeight + 'px';
    header.style.top = '0';

  } else {
    // fixedHeader false або відсутній — звичайна шапка
    main.style.paddingTop = '0px';
  }

  // Теми і кольори — без змін
  if (settings.theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  if (settings.accentColor) {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }
}



function enableDynamicHeaderAtTop() {
  const header = document.querySelector('.header');
  const main = document.querySelector('main');

  let lastScrollTop = 0;
  let headerPosition = 0;
  let forceFixed = false; // режим "фіксована на 0"

  function dynamicHeaderHandler() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0 && !forceFixed) {
      // === 🧷 Фіксуємо шапку на самому верху
      forceFixed = true;
      header.classList.add('fixed', 'always-fixed');
      header.style.top = '1px';
      main.style.paddingTop = header.offsetHeight + 'px';
      return;
    }

    if (scrollTop > 1 && forceFixed) {
      // === 💨 Вимикаємо фіксований режим
      forceFixed = false;
      header.classList.remove('always-fixed');
      main.style.paddingTop = header.offsetHeight + 'px';
    }

    // Плавуча логіка (ховання при скролі)
    if (!forceFixed) {
      if (scrollTop > lastScrollTop) {
        headerPosition = Math.min(headerPosition + (scrollTop - lastScrollTop), header.offsetHeight);
      } else {
        headerPosition = Math.max(headerPosition - (lastScrollTop - scrollTop), 0);
      }

      header.style.top = -headerPosition + 'px';
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', dynamicHeaderHandler);
}
