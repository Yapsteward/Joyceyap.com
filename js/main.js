/**
 * ============================================================================
 * MAIN APPLICATION BOOTSTRAPPER (DIP: Dependency Inversion & Orchestration)
 * ============================================================================
 * Coordinates the initialization of each discrete module once the DOM is ready:
 * 1. PortfolioConstellation: High-performance canvas particle network
 * 2. PortfolioCards: 3D sticky stacking depth & continuous marquee synchronizer
 * 3. PortfolioUI: Scroll reveal, typewriter, 3D tilt, zoom modals & forms
 */

(function () {
  'use strict';

  function initApp() {
    // 1. Constellation Background Engine
    if (window.PortfolioConstellation && typeof window.PortfolioConstellation.init === 'function') {
      try {
        window.PortfolioConstellation.init();
      } catch (err) {
        console.error('[Portfolio] Error initializing Constellation:', err);
      }
    }

    // 2. 3D Cards Stack & Testimonials Marquee
    if (window.PortfolioCards && typeof window.PortfolioCards.init === 'function') {
      try {
        window.PortfolioCards.init();
      } catch (err) {
        console.error('[Portfolio] Error initializing Cards Stack:', err);
      }
    }

    // 3. UI Interactions, Lightbox Modal & Widgets
    if (window.PortfolioUI && typeof window.PortfolioUI.init === 'function') {
      try {
        window.PortfolioUI.init();
      } catch (err) {
        console.error('[Portfolio] Error initializing UI Interactions:', err);
      }
    }

    // 4. Mobile Responsiveness Engine & Drawer Controller
    if (window.PortfolioResponsive && typeof window.PortfolioResponsive.init === 'function') {
      try {
        window.PortfolioResponsive.init();
      } catch (err) {
        console.error('[Portfolio] Error initializing Responsive Engine:', err);
      }
    }
  }

  // Safe DOM ready execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
