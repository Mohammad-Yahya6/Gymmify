// ============================================================
//  shared.js — Gymmify shared UI logic
//  Handles: hamburger nav toggle + theme toggle
//  Include on every page BEFORE auth.js
// ============================================================

(function () {
    // ===== HAMBURGER =====
    const toggle = document.getElementById('menu-toggle');
    const nav    = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== THEME TOGGLE =====
    const root = document.documentElement;
    const btn  = document.getElementById('theme-toggle');
    const ICON_DARK  = '☽';
    const ICON_LIGHT = '☀';

    function applyTheme(light) {
        root.classList.toggle('light-mode', light);
        if (btn) {
            const img = btn.querySelector('img');
            if (img) img.style.display = 'none';
            btn.style.fontSize = '16px';
            btn.textContent = light ? ICON_LIGHT : ICON_DARK;
        }
    }

    applyTheme(localStorage.getItem('gymmify-theme') === 'light');

    if (btn) {
        btn.addEventListener('click', () => {
            const isLight = root.classList.toggle('light-mode');
            localStorage.setItem('gymmify-theme', isLight ? 'light' : 'dark');
            applyTheme(isLight);
        });
    }
})();
