// === 📌 1. Запуск при завантаженні DOM ===
document.addEventListener("DOMContentLoaded", () => {
  loadMediaSidebar(); // Головна ініціалізація сайдбара медіа
});

// === 📦 2. Завантаження HTML компоненту та подальша ініціалізація ===
function loadMediaSidebar() {
  fetch("./components/media-sidebar.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#media-sidebar-placeholder").innerHTML = html;

      fadeInMediaSidebar();  // Плавна поява сайдбара
      insertLogosSVG();      // Вставка SVG-іконок
      initSidebarToggle();   // Додаємо логіку для кнопки перемикання
    })
    .catch(err => {
      console.error("❌ Помилка завантаження media-sidebar.html:", err);
    });
}

// === 🧊 3. Плавна поява сайдбара ===
function fadeInMediaSidebar() {
  const sidebar = document.querySelector(".media-sidebar-fadein");
  if (sidebar) {
    setTimeout(() => {
      sidebar.classList.add("visible"); // Додаємо клас для видимості
    }, 100);
  }
}

// === 🖼️ 4. Завантаження та вставка SVG логотипів ===
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
        if (container) container.innerHTML = svg; // Вставка SVG в контейнер
      })
      .catch(err => {
        console.error(`❌ Помилка завантаження ${path}:`, err);
      });
  });
}

// === 🔄 5. Ініціалізація логіки перемикання сайдбара ===
function initSidebarToggle() {
  const sidebar = document.querySelector(".media-sidebar");
  const toggleBtn = sidebar.querySelector(".toggle-sidebar");
  const icon = toggleBtn.querySelector("#toggle-sidebar-icon");

  // Отримуємо з localStorage або починаємо з 0
  let state = parseInt(localStorage.getItem("mediaSidebarState")) || 0;

  function applyState() {
    sidebar.classList.remove("state-0", "state-1", "state-2");
    sidebar.classList.add(`state-${state}`);

    // Іконку крутимо (якщо треба)
    if(state === 2) {
      icon.classList.add("rotated");
    } else {
      icon.classList.remove("rotated");
    }

    localStorage.setItem("mediaSidebarState", state); // Зберігаємо стан у localStorage
  }

  toggleBtn.addEventListener("click", () => {
    state = (state + 1) % 3; // Змінюємо стан при натисканні
    applyState();
  });

  // Початкове застосування стану з плавністю (переконайся, що transition в CSS є)
  sidebar.style.transition = "none";
  sidebar.classList.add(`state-${state}`);

  requestAnimationFrame(() => {
    sidebar.style.transition = "";
    requestAnimationFrame(() => {
      applyState(); // Застосовуємо стан
    });
  });
}




