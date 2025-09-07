import {data} from "../assets/data/data.js";
import {renderElement} from "../utils/helper.js";

export const navbar = () => {
  const containerNavbar = document.querySelector('nav');

  const listItemNavbar = (item) => (
    ` <a href="${item.path}">
        <i class="${item.icon}"></i>
        <span>${item.teks}</span>
      </a>`
  );

  // Render items
  renderElement(data.navbar, containerNavbar, listItemNavbar);

  // ===== Scroll hide/show behavior (existing) =====
  let lastScrollY = window.scrollY;
  document.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) {
      containerNavbar.classList.remove('scroll');
    } else {
      containerNavbar.classList.add('scroll');
    }
    lastScrollY = currentScrollY;
  });

  // ===== Active state on click & on scroll =====
  const links = Array.from(containerNavbar.querySelectorAll('a[href^="#"]'));
  const targets = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // Click: set active to clicked link
  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
    });
  });

  // Scroll spy: mark link active based on section in view
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = containerNavbar.querySelector(`a[href="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    root: null,
    // Trigger when ~middle of section crosses viewport
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0.01
  });

  targets.forEach(el => obs.observe(el));

  // Set an initial active (fallback) to first link if none
  if (!containerNavbar.querySelector('a.active') && links[0]) {
    links[0].classList.add('active');
  }
};
