/**
 * ============================================================================
 * CARDS STACK & MARQUEE MODULE (SRP: 3D Scroll Depth & Marquee Sizing)
 * ============================================================================
 * Manages the dynamic 3D scale, brightness, and vertical depth of sticky stacking
 * service cards on scroll, as well as responsive dimension synchronization for the
 * continuous testimonials marquee (2 cards per row).
 */

(function () {
  'use strict';

  /**
   * Standalone Service Cards (Non-sticky, full-detail smooth scrolling)
   */
  function init3DStickyCardStack() {
    // Sticky stacking has been removed in favor of standalone full-detail cards
    // with smooth scroll-triggered reveal on scroll down and up.
    const cards = document.querySelectorAll('.svc-grid .svc-card');
    cards.forEach(card => {
      card.style.transform = '';
      card.style.filter = '';
    });
  }

  /**
   * Static Auto-Slide Testimonials Carousel
   * Cards stay static for 3 seconds, then slide automatically to the next card.
   */
  function initAutoSlideTestimonials() {
    const container = document.getElementById('testiCarousel');
    const viewport = container ? container.querySelector('.testi-carousel-viewport') : null;
    const track = document.getElementById('testiSliderTrack');
    if (!container || !viewport || !track) return;

    const slides = Array.from(track.querySelectorAll('.testi-slide'));
    if (!slides.length) return;

    const numUnique = Math.floor(slides.length / 2) || 4; // Dynamically calculated from slides (e.g. 4 unique testimonials)
    let currentIndex = 0;
    let autoSlideTimer = null;
    let isTransitioning = false;
    const INTERVAL_MS = 3000; // 3 seconds static hold
    const TRANSITION_DURATION_MS = 450;

    function getCardWidth() {
      return slides[0] ? slides[0].getBoundingClientRect().width : viewport.offsetWidth;
    }

    function updateDimensions() {
      const isMobile = window.innerWidth <= 820;
      const vWidth = viewport.offsetWidth;
      if (!vWidth) return;

      // On mobile: 1 card. On desktop: optimal card width (up to 580px on large screens, or vWidth / 2)
      let cardWidth;
      if (isMobile) {
        cardWidth = Math.max(300, vWidth - 20);
      } else if (vWidth > 1250) {
        cardWidth = 580;
      } else {
        cardWidth = vWidth / 2;
      }
      track.style.setProperty('--testi-card-width', `${cardWidth.toFixed(1)}px`);

      // Snap track position without animation on resize
      track.style.transition = 'none';
      const stepWidth = getCardWidth();
      track.style.transform = `translate3d(-${(currentIndex * stepWidth).toFixed(1)}px, 0, 0)`;
      void track.offsetHeight;
      track.style.transition = `transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`;
    }

    function goToSlide(index, animated) {
      const stepWidth = getCardWidth();
      if (!animated) {
        track.style.transition = 'none';
      } else {
        track.style.transition = `transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`;
      }
      track.style.transform = `translate3d(-${(index * stepWidth).toFixed(1)}px, 0, 0)`;
      currentIndex = index;
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      goToSlide(currentIndex, true);

      // If reached duplicate boundary (index >= numUnique), seamlessly reset to 0 after transition
      if (currentIndex >= numUnique) {
        setTimeout(() => {
          goToSlide(0, false);
          void track.offsetHeight;
          isTransitioning = false;
        }, TRANSITION_DURATION_MS + 20);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, TRANSITION_DURATION_MS);
      }
    }

    function prevSlide() {
      if (isTransitioning) return;
      if (currentIndex === 0) {
        goToSlide(numUnique, false);
        void track.offsetHeight;
      }
      setTimeout(() => {
        isTransitioning = true;
        currentIndex--;
        goToSlide(currentIndex, true);
        setTimeout(() => {
          isTransitioning = false;
        }, TRANSITION_DURATION_MS);
      }, 20);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, INTERVAL_MS);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    // Pause on hover so users can comfortably read
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // Pause when browser tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
      stopAutoSlide();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startAutoSlide();
    }, { passive: true });

    // Expose stepping for responsive/touch listeners
    if (window.PortfolioCards) {
      window.PortfolioCards.stepTestimonial = function (direction) {
        stopAutoSlide();
        if (direction > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoSlide();
      };
    }

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    startAutoSlide();
  }

  // Expose module initialization
  window.PortfolioCards = {
    init: function () {
      init3DStickyCardStack();
      initAutoSlideTestimonials();
    },
    stepTestimonial: null
  };
})();
