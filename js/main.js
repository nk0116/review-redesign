/* ============================================
   個別指導レビュー - 共通JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    hamburger.classList.add('is-active');
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('is-active');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* --- Smooth Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* --- Scroll Fade-in Animation --- */
  const fadeElements = document.querySelectorAll('.js-fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for siblings
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach((el, index) => {
      // Auto-assign stagger delay for grid children
      const parent = el.parentElement;
      if (parent) {
        const siblings = parent.querySelectorAll('.js-fade-in');
        if (siblings.length > 1) {
          const siblingIndex = Array.from(siblings).indexOf(el);
          el.dataset.delay = siblingIndex * 100;
        }
      }
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --- Header scroll shadow enhancement --- */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
});
