// ==== THEME INIT + TOGGLE (persist ke localStorage) ====
(function initTheme() {
  try {
    const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

export function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch {}
}
// untuk dipakai dari HTML (onclick)
window.toggleTheme = toggleTheme;

// ==== IMPORT MODUL KAMU (tetap sama) ====
import {home} from "./js/home.js";
import {bride} from "./js/bride.js";
import {time} from "./js/time.js";
import {galeri} from "./js/galeri.js";
import {wishas} from "./js/wishas.js";
import {navbar} from "./js/navbar.js";
import {welcome} from "./js/welcome.js";

// ==== LOAD CONTENT ====
document.addEventListener('DOMContentLoaded', () => {
  // AOS (aman bila AOS belum ada)
  try { AOS?.init?.(); } catch {}

  welcome();
  navbar();
  home();
  bride();
  time();
  galeri();
  wishas();
});
