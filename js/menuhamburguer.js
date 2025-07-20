// Menú hamburguesa para DataFlix
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const mobileNav = document.getElementById('mobile-navigation');
    const navOverlay = document.getElementById('nav-overlay');
    const body = document.body;

    // Verificar si los elementos existen
    if (!hamburgerBtn) {
        console.error('❌ No se encontró el botón hamburguesa');
        return;
    }
    if (!mobileNav) {
        console.error('❌ No se encontró la navegación móvil');
        return;
    }
    if (!navOverlay) {
        console.error('❌ No se encontró el overlay de navegación');
        return;
    }

    console.log('✅ Elementos del menú hamburguesa encontrados correctamente');

    function toggleMenu() {
        console.log('🔄 Alternando menú hamburguesa');
        hamburgerBtn.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
        navOverlay.classList.toggle('is-active');
        body.classList.toggle('body-no-scroll');
        
        // Log del estado actual
        const isActive = hamburgerBtn.classList.contains('is-active');
        console.log(`📱 Menú ${isActive ? 'abierto' : 'cerrado'}`);
    }

    // Event listeners
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    navOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    console.log('🎯 Event listeners del menú hamburguesa configurados');
});