/**
 * La Gran Tienda - Main JS
 * Navbar móvil, scroll suave, utilidades
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSuave();
  initFAQ();
  initScrollAnimations();
  initBottomCTA();
});

/**
 * Animaciones al hacer scroll (Intersection Observer) + stagger en cards
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger: delay en cada .stagger-item (50ms entre cada uno)
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            item.style.animationDelay = `${i * 50}ms`;
          });
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Navbar móvil - toggle menú
 */
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');
  const navLinks = document.querySelectorAll('.navbar-links a');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    // Cerrar al hacer click en un link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }
}

/**
 * Scroll suave para links internos (con offset del header sticky)
 */
function initScrollSuave() {
  const headerOffset = 72;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/**
 * FAQ - acordeón (delegación de eventos para contenido dinámico)
 */
function initFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (!question) return;
    const item = question.closest('.faq-item');
    if (!item) return;

    const isActive = item.classList.contains('active');
    list.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer')?.style.removeProperty('max-height');
      i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      question.setAttribute('aria-expanded', 'true');
    }
  });
}

/**
 * Barra CTA sticky inferior (móvil)
 */
function initBottomCTA() {
  const links = document.querySelectorAll('.bottom-cta-bar a[href^="#"]');
  const navLinks = document.querySelector('.navbar-links');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        navLinks?.classList.remove('open');
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
