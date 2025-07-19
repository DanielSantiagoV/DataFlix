// auth.js - Versión Unificada DataFlix

document.addEventListener('DOMContentLoaded', () => {
    // Usuarios de ejemplo (demo)
    const validUsers = [
        { username: "nickdick", password: "password123", fullname: "Nick Company", email: "nickdick@gmail.com" },
        { username: "ethan.bennett", password: "greatplatform", fullname: "Ethan Bennett", email: "ethan.bennett@email.com" },
        { username: "testuser", password: "test", fullname: "Test User", email: "test@example.com" }
    ];

    // --- FUNCIONES DE SESIÓN UNIFICADAS ---
    function loginUser(user) {
        localStorage.setItem('dataflixIsLoggedIn', 'true');
        localStorage.setItem('dataflixLoggedUser', JSON.stringify(user));
    }
    function logoutUser() {
        localStorage.removeItem('dataflixIsLoggedIn');
        localStorage.removeItem('dataflixLoggedUser');
        window.location.href = 'login.html';
    }
    function checkSession() {
        return localStorage.getItem('dataflixIsLoggedIn') === 'true' && localStorage.getItem('dataflixLoggedUser');
    }
    function getLoggedUser() {
        try {
            return JSON.parse(localStorage.getItem('dataflixLoggedUser'));
        } catch (e) {
            return null;
        }
    }

    const currentPage = window.location.pathname;

    // --- LOGIN ---
    if (currentPage.includes('login.html')) {
        if (checkSession()) {
            window.location.href = 'profile.html';
            return;
        }
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const usernameInput = document.getElementById('username').value.trim().toLowerCase();
                const passwordInput = document.getElementById('password').value;
                const messageDiv = document.getElementById('message');
                // Buscar en usuarios registrados
                let users = JSON.parse(localStorage.getItem('dataflixUsers') || '[]');
                let userFound = users.find(u => u.email === usernameInput && u.password === passwordInput);
                // Si no está, buscar en usuarios demo
                if (!userFound) {
                    userFound = validUsers.find(user =>
                        (user.username === usernameInput || user.email === usernameInput) && user.password === passwordInput
                    );
                }
                if (userFound) {
                    loginUser(userFound);
                    messageDiv.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
                    messageDiv.style.color = '#4caf50';
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1000);
                } else {
                    messageDiv.textContent = "Usuario o contraseña incorrectos.";
                    messageDiv.style.color = '#e53935';
                }
            });
        }
    }
    // --- PERFIL ---
    else if (currentPage.includes('profile.html')) {
        if (!checkSession()) {
            window.location.href = 'login.html';
            return;
        }
        const user = getLoggedUser();
        if (user) {
            const fullnameEl = document.getElementById('profile-fullname');
            if (fullnameEl) fullnameEl.textContent = user.fullname || user.fullName;
            const usernameEl = document.getElementById('profile-username');
            if (usernameEl) usernameEl.textContent = (user.username || user.email.split('@')[0]);
            const emailEl = document.getElementById('profile-email');
            if (emailEl) emailEl.textContent = user.email;
        }
        // Modal logout (si existe)
        const logoutButton = document.getElementById('logout-button');
        const logoutModal = document.getElementById('logout-modal');
        const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
        const cancelLogoutBtn = document.getElementById('cancel-logout-btn');
        const body = document.body;
        function showLogoutModal() {
            if (logoutModal) {
                logoutModal.classList.add('is-visible');
                body.classList.add('body-no-scroll');
            }
        }
        function hideLogoutModal() {
            if (logoutModal) {
                logoutModal.classList.remove('is-visible');
                body.classList.remove('body-no-scroll');
            }
        }
        if (logoutButton) {
            logoutButton.onclick = showLogoutModal;
        }
        if (confirmLogoutBtn) {
            confirmLogoutBtn.onclick = logoutUser;
        }
        if (cancelLogoutBtn) {
            cancelLogoutBtn.onclick = hideLogoutModal;
        }
        if (logoutModal) {
            logoutModal.addEventListener('click', (event) => {
                if (event.target === logoutModal) hideLogoutModal();
            });
        }
    }
});