// === Одразу викликаємо функцію без чекання DOMContentLoaded ===
loadMediaSidebar();




// === Функція завантаження HTML та ініціалізації ===
function loadMediaSidebar() {
  fetch("./components/media-sidebar.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#media-sidebar-placeholder").innerHTML = html;

      fadeInMediaSidebar();  // Плавна поява сайдбара
      insertLogosSVG();      // Вставка SVG-іконок
      initSidebarToggle();   // Логіка кнопки перемикання
    })
    .catch(err => {
      console.error("❌ Помилка завантаження media-sidebar.html:", err);
    });
}

// === Плавна поява сайдбара ===
function fadeInMediaSidebar() {
  const sidebar = document.querySelector(".media-sidebar-fadein");
  if (sidebar) {
    // Переконуємось, що сторінка "готова до анімації"
    requestAnimationFrame(() => {
      setTimeout(() => {
        sidebar.classList.add("visible");
      }, 50); // мінімальна затримка, щоб браузер встиг застосувати початкові стилі
    });
  }
}


// === Вставка SVG логотипів ===
function insertLogosSVG() {
  const logos = [
    { id: "github-logo", path: "./assets/img/logo/github.svg" },
    { id: "dribble-logo", path: "./assets/img/logo/dribble.svg" },
    { id: "figma-logo", path: "./assets/img/logo/figma.svg" },
    { id: "toggle-sidebar-icon", path: "./assets/img/icons/arrow-down.svg" }
  ];

  logos.forEach(({ id, path }) => {
    fetch(path)
      .then(res => res.text())
      .then(svg => {
        const container = document.querySelector(`#${id}`);
        if (container) container.innerHTML = svg;
      })
      .catch(err => {
        console.error(`❌ Помилка завантаження ${path}:`, err);
      });
  });
}

// === Логіка перемикання сайдбара ===
function initSidebarToggle() {
  const sidebar = document.querySelector(".media-sidebar");
  const toggleBtn = sidebar.querySelector(".toggle-sidebar");
  const icon = toggleBtn.querySelector("#toggle-sidebar-icon");

  let state = parseInt(localStorage.getItem("mediaSidebarState")) || 0;

  function applyState() {
    sidebar.classList.remove("state-0", "state-1", "state-2");
    sidebar.classList.add(`state-${state}`);

    if (state === 2) {
      icon.classList.add("rotated");
    } else {
      icon.classList.remove("rotated");
    }

    localStorage.setItem("mediaSidebarState", state);
  }

  toggleBtn.addEventListener("click", () => {
    state = (state + 1) % 3;
    applyState();
  });

  sidebar.style.transition = "none";
  sidebar.classList.add(`state-${state}`);

  requestAnimationFrame(() => {
    sidebar.style.transition = "";
    requestAnimationFrame(() => {
      applyState();
    });
  });
}


