document.addEventListener("DOMContentLoaded", function () {
const animatedElements = document.querySelectorAll(
    '.animate-from-bottom, .animate-from-left, .animate-from-right'
);

// Початковий стан: прихований
animatedElements.forEach(el => el.classList.add('invisible'));

// Сюди будемо зберігати таймери по кожному елементу
const hideTimers = new Map();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
        // Стає видимим — показуємо і скасовуємо таймер зникнення
        el.classList.add('visible');
        el.classList.remove('invisible');

        // Якщо був таймер на приховування — зупини його
        if (hideTimers.has(el)) {
        clearTimeout(hideTimers.get(el));
        hideTimers.delete(el);
        }
    } else {
        // Не в полі зору — запускаємо таймер на 5 секунд
        const timer = setTimeout(() => {
        el.classList.remove('visible');
        el.classList.add('invisible');
        hideTimers.delete(el);
        }, 1000); // 5 секунд

        // Зберігаємо таймер для елемента
        hideTimers.set(el, timer);
    }
    });
}, {
    threshold: 0.1 // Частина елемента має бути видимою
});

animatedElements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.01}s`;
    observer.observe(el);
});
});






const COUNT = 15; // кількість SVG
const layer = document.getElementById('decor-layer');

// Тут твій SVG код
const svgCode = `
<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="85" height="85" stroke="currentColor"/>
</svg>

`;

for (let i = 0; i < COUNT; i++) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = svgCode;
  const svg = wrapper.firstElementChild;

  // Розмір
  const size = 20 + Math.random() * 40;
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);

  // Позиції
  svg.style.left = (Math.random() < 0.5
    ? (Math.random() * 8)               // зліва 0-8%
    : (92 + Math.random() * 8)) + '%';  // справа 92-100%
  svg.style.top = Math.random() * document.body.scrollHeight + 'px';

  layer.appendChild(svg);
}
