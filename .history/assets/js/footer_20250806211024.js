// виводю з папки svg зображення в файл html в #footer-logo
const footerLogo = document.getElementById('footer-logo');
fetch('./assets/img/logo/logo2.svg')
    .then(response => response.text())
    .then(svgContent => {
        footerLogo.innerHTML = svgContent;
    });

    const footerMe = document.getElementById('footer-logo');
fetch('./assets/img/logo/logo2.svg')
    .then(response => response.text())
    .then(svgContent => {
        footerLogo.innerHTML = svgContent;
    });