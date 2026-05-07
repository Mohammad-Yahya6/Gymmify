// ============================================================
//  auth.js — Gymmify shared auth logic
//  Include on every page AFTER the Supabase CDN script
// ============================================================

const gymmifyAuth = (() => {
    const SUPABASE_URL = 'https://tjzlpsgwhvsrphnxicjo.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_95trdNvlzTRz4l7pdiDSGA_zoyOmkBD';

    // Always create own client — Supabase deduplicates sessions
    // internally so having two clients is safe
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    async function updateNav() {
        const { data: { user } } = await client.auth.getUser();
        const btn = document.querySelector('.icon-btn[data-auth]');
        if (!btn) return;

        if (user) {
            btn.innerHTML = `<span style="font-size:14px;font-weight:700;color:var(--white)">${user.email[0].toUpperCase()}</span>`;
            btn.title = user.email;
            btn.onclick = () => {
                if (confirm('Sign out of Gymmify?')) {
                    client.auth.signOut().then(() => window.location.reload());
                }
            };
        } else {
            btn.innerHTML = `<img src="/images/pfp.png" alt="Account" style="width:18px;height:18px;filter:brightness(0) invert(1);opacity:0.7;">`;
            btn.title = 'Login / Sign up';
            btn.onclick = () => {
                sessionStorage.setItem('authRedirect', window.location.href);
                window.location.href = 'login.html';
            };
        }
    }

    return { client, updateNav };
})();

document.addEventListener('DOMContentLoaded', () => gymmifyAuth.updateNav());