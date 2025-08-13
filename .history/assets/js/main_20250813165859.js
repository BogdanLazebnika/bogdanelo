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



