document.addEventListener("DOMContentLoaded", function () {
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // якщо треба анімація лише один раз — можна відключити
        observer.unobserve(entry.target);
    }
    });
}, {
    threshold: 0.2 // елемент має бути хоча б на 20% в полі зору
});

animatedElements.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.2}s`;
  observer.observe(el);
});
