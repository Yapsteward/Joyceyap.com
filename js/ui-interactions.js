    /**
   * ScrollSpy: Dynamically update active navigation pill & mobile bottom dock based on scroll position
   */
  function initScrollSpy() {
    const desktopLinks = document.querySelectorAll('#navlinks a');
    const dockItems = document.querySelectorAll('.mobile-dock-item, .mobile-dock-center-btn');

    const sectionTargets = [
      { id: 'about', href: '#about' },
      { id: 'work', href: '#work' },
      { id: 'services', href: '#services' },
      { id: 'testimonials', href: '#testimonials' },
      { id: 'contact', href: '#contact' }
    ];

    const sections = [];
    sectionTargets.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        sections.push({ id: item.id, href: item.href, target: el });
      }
    });

    if (!sections.length) return;

    function updateActiveNav() {
      const scrollPos = window.scrollY + 250;
      let current = sections[0];

      for (let i = 0; i < sections.length; i++) {
        if (scrollPos >= sections[i].target.offsetTop) {
          current = sections[i];
        }
      }

      // Update desktop links
      desktopLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current.href);
      });

      // Update mobile bottom dock
      dockItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        const isActive = itemHref === current.href;
        item.classList.toggle('active', isActive);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /**
   * Typewriter Animation for "Modern Digital Era"
   * Types out character-by-character with brand color mix and glowing cursor.
   */
  function initTypewriter() {
    const el = document.querySelector('.typewriter-text');
    if (!el) return;

    const fullText = el.getAttribute('data-text') || el.textContent.trim() || 'Modern Digital Era';

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fullText;
      return;
    }

    let charIndex = 0;
    let isDeleting = false;
    el.textContent = '';

    // Begin typing 800ms after load
    setTimeout(tick, 800);

    function tick() {
      if (!isDeleting) {
        charIndex++;
        el.textContent = fullText.substring(0, charIndex);

        if (charIndex === fullText.length) {
          // Hold fully typed text for 3.5 seconds for comfortable reading
          setTimeout(() => {
            isDeleting = true;
            tick();
          }, 3500);
          return;
        }
        setTimeout(tick, 90);
      } else {
        charIndex--;
        el.textContent = fullText.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          // Hold empty state for 600ms before typing again
          setTimeout(tick, 600);
          return;
        }
        setTimeout(tick, 45);
      }
    }
  }

  /**
   * Smart Navigation: Hide on scroll down, show on scroll up
   */
  function initSmartNav() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Hide when scrolling down past 70px threshold
          if (currentScrollY > 70 && currentScrollY > lastScrollY) {
            header.classList.add('nav-hidden');
          } else {
            header.classList.remove('nav-hidden');
          }
          lastScrollY = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Expose module initialization
  window.PortfolioUI = {
    init: function () {
      initScrollReveal();
      init3DTilt();
      initZoomModal();
      initMobileDockNav();
      initMobileNav();
      initSmartNav();
      initScrollSpy();
      initTypewriter();
      initContactForm();
    }
  };
})();
