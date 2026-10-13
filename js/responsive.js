/**
 * ============================================================================
 * MOBILE RESPONSIVE ENGINE (SOLID / SRP: Viewport, Touch & Mobile UI)
 * ============================================================================
 * Dedicated controller for mobile & tablet responsiveness across any screen size:
 * 1. Dynamic Mobile Viewport Fix (--vh / --app-height for iOS & Android address bars)
 * 2. Mobile Drawer Navigation (Backdrop, Scroll Lock, Esc & Nav Link Auto-Close)
 * 3. Mobile Touch Gestures & Swipe Support (Testimonials & Certifications)
 * 4. Screen-Size & Orientation Adapters (Debounced recalculation of card dimensions)
 * 5. Horizontal Overflow Protection Guard
 */

(function () {
  'use strict';

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  /**
   * 1. Dynamic Mobile Viewport Height Fix
   * Prevents UI jumps when mobile browser address bars expand/collapse.
   */
  function initViewportHeightFix() {
    function updateHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    }

    updateHeight();
    window.addEventListener('resize', debounce(updateHeight, 150), { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(updateHeight, 200);
    });
  }

  /**
   * 2. Mobile Drawer Navigation Controller
   * Handles toggle button, backdrop overlay, body scroll locking, and accessible closing.
   */
  function initMobileDrawer() {
    const menuBtn = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navlinks');
    const header = document.querySelector('header');

    if (!menuBtn || !navLinks) return;

    // Create backdrop overlay if it does not exist
    let backdrop = document.getElementById('mobileNavBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'mobileNavBackdrop';
      backdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    function openMenu() {
      navLinks.classList.add('open');
      menuBtn.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('nav-locked');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.innerHTML = '✕';
      menuBtn.setAttribute('aria-label', 'Close Navigation Menu');
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('nav-locked');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '☰';
      menuBtn.setAttribute('aria-label', 'Open Navigation Menu');
    }

    function toggleMenu() {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle button click
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleMenu();
    });

    // Close when tapping backdrop
    backdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });

    // Close when tapping any link inside the navigation drawer
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });

    // Auto-close if resized to desktop width (> 880px)
    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth > 880 && navLinks.classList.contains('open')) {
          closeMenu();
        }
      }, 100),
      { passive: true }
    );
  }

  /**
   * 3. Touch Gestures & Mobile Swipe Support
   * Adds intuitive swipe gestures to the Testimonials carousel on touch screens.
   */
  function initTouchSwiping() {
    const testiViewport = document.querySelector('.testi-carousel-viewport');
    if (!testiViewport) return;

    testiViewport.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    testiViewport.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
      },
      { passive: true }
    );

    function handleSwipeGesture() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only trigger horizontal swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (window.PortfolioCards && typeof window.PortfolioCards.stepTestimonial === 'function') {
          if (diffX < 0) {
            // Swiped left -> next card
            window.PortfolioCards.stepTestimonial(1);
          } else {
            // Swiped right -> prev card
            window.PortfolioCards.stepTestimonial(-1);
          }
        }
      }
    }
  }

  /**
   * 4. Screen-Size & Orientation Adapters
   * Dynamically measures viewport and updates CSS variables for responsive card fits.
   */
  function initAdaptiveLayout() {
    function updateDimensions() {
      const screenWidth = window.innerWidth;

      // Testimonial card responsive width
      if (screenWidth <= 480) {
        document.documentElement.style.setProperty('--testi-card-width', `${screenWidth - 32}px`);
      } else if (screenWidth <= 768) {
        document.documentElement.style.setProperty('--testi-card-width', `${screenWidth - 48}px`);
      } else if (screenWidth <= 1024) {
        document.documentElement.style.setProperty('--testi-card-width', '480px');
      } else {
        document.documentElement.style.setProperty('--testi-card-width', '540px');
      }

      // Flag touch capability
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      document.body.classList.toggle('is-touch-device', isTouch);
    }

    updateDimensions();
    window.addEventListener('resize', debounce(updateDimensions, 100), { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(updateDimensions, 200);
    });
  }

  /**
   * 5. Horizontal Overflow Protection Guard
   * Prevents accidental layout breaks on narrow mobile screens.
   */
  function initOverflowGuard() {
    function checkOverflow() {
      if (document.documentElement.scrollWidth > window.innerWidth) {
        document.documentElement.style.overflowX = 'clip';
        document.body.style.overflowX = 'clip';
      }
    }

    checkOverflow();
    window.addEventListener('resize', debounce(checkOverflow, 200), { passive: true });
  }

  /**
   * Utility: Debounce Function
   */
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Public API
   */
  const PortfolioResponsive = {
    init: function () {
      initViewportHeightFix();
      initMobileDrawer();
      initTouchSwiping();
      initAdaptiveLayout();
      initOverflowGuard();
    }
  };

  // Expose to global window scope for modular orchestration
  window.PortfolioResponsive = PortfolioResponsive;
})();
