const hamburgerBtn = document.getElementById('hamburger-toggle');
const mobileNav = document.getElementById('mobile-navigation');
const navOverlay = document.getElementById('nav-overlay');
const body = document.body;

function toggleMenu() {
    hamburgerBtn.classList.toggle('is-active');
    mobileNav.classList.toggle('is-active');
    navOverlay.classList.toggle('is-active');
    body.classList.toggle('body-no-scroll');
}

hamburgerBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);