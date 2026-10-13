/**
 * ============================================================================
 * PROJECT DETAILS — CORE CONTROLLER & ROUTER
 * File: js/Projectdetails.js
 * Architecture: Registry & Facade Pattern (SOLID / Clean Code)
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  const ProjectDetailsApp = {
    registry: {},

    /**
     * Register a project into the application registry.
     * @param {string} slug - Unique identifier for query param (?project=slug)
     * @param {Object} config - Project definition and lifecycle hooks
     */
    register: function (slug, config) {
      if (!slug || !config) return;
      this.registry[slug] = {
        slug: slug,
        title: config.title || 'Project Details',
        category: config.category || '',
        client: config.client || '',
        timeline: config.timeline || '',
        img: config.img || '',
        lead: config.lead || '',
        features: config.features || [],
        metrics: config.metrics || '',
        tools: config.tools || [],
        toolsVisual: config.toolsVisual || null,
        themeClass: config.themeClass || '',
        video: config.video || null,
        gallery: config.gallery || null,
        gallerySub: config.gallerySub || null,
        caseStudyUrl: config.caseStudyUrl || '',
        caseStudyLabel: config.caseStudyLabel || '',
        hasCustomView: !!config.hasCustomView,
        init: typeof config.init === 'function' ? config.init : null
      };
    },

    /**
     * Retrieve project configuration by slug.
     */
    get: function (slug) {
      return this.registry[slug] || null;
    },

    /**
     * Extract current project slug from URL query params (?project=...)
     */
    getCurrentSlug: function () {
      const params = new URLSearchParams(window.location.search);
      let slug = params.get('project') || 'law-firm';
      if (!this.registry[slug]) {
        slug = 'law-firm';
      }
      return slug;
    },

    /**
     * Render standard project details view in the DOM.
     */
    renderStandard: function (p) {
      if (!p) return;

      const pTitle = document.getElementById('pTitle');
      const pCategory = document.getElementById('pCategory');
      const pClient = document.getElementById('pClient');
      const pTimeline = document.getElementById('pTimeline');
      const pLead = document.getElementById('pLead');
      const pImg = document.getElementById('pImg');
      const featContainer = document.getElementById('pFeatures');
      const pMetrics = document.getElementById('pMetrics');
      const toolsContainer = document.getElementById('pTools');
      const caseStudyWrap = document.getElementById('pCaseStudyBtnWrap');
      const caseStudyBtn = document.getElementById('btnCaseStudy');

      if (pTitle) pTitle.textContent = p.title;
      if (pCategory) pCategory.textContent = p.category;
      if (pClient) pClient.textContent = p.client;

      if (pTimeline) {
        if (p.timeline) {
          pTimeline.textContent = p.timeline;
          pTimeline.style.display = 'inline-flex';
        } else {
          pTimeline.style.display = 'none';
        }
      }

      if (pLead) pLead.textContent = p.lead;

      if (pImg) {
        pImg.src = p.img;
        pImg.alt = p.title + ' Showcase Preview';
      }

      if (featContainer && Array.isArray(p.features)) {
        featContainer.innerHTML = p.features.map(function (f) {
          return '<div class="pdetail-feature-item">' +
            '<i class="fa-solid fa-circle-check"></i>' +
            '<div>' + f + '</div>' +
            '</div>';
        }).join('');
      }

      if (pMetrics) {
        pMetrics.innerHTML = p.metrics;
      }

      // Visual Tools or Text Chips (Icon-Only Mode for toolsVisual)
      if (toolsContainer) {
        if (p.toolsVisual && Array.isArray(p.toolsVisual) && p.toolsVisual.length > 0) {
          toolsContainer.innerHTML = p.toolsVisual.map(function (tv) {
            return '<div class="pdetail-tool-visual-card" title="' + tv.name + '" aria-label="' + tv.name + '">' +
              '<img class="pdetail-tool-icon-img" src="' + tv.icon + '" alt="' + tv.name + '" loading="lazy">' +
              '</div>';
          }).join('');
          toolsContainer.className = 'pdetail-tools-visual-grid';
        } else if (Array.isArray(p.tools)) {
          toolsContainer.innerHTML = p.tools.map(function (t) {
            return '<span class="pdetail-tool-chip">' + t + '</span>';
          }).join('');
          toolsContainer.className = 'pdetail-tools-chips';
        }
      }

      // Case Studies Blueprint Button
      if (caseStudyWrap && caseStudyBtn) {
        if (p.caseStudyUrl) {
          caseStudyBtn.innerHTML = '<i class="fa-solid fa-book-bookmark"></i> ' + (p.caseStudyLabel || 'Case Studies Blueprint');
          caseStudyBtn.onclick = () => {
            this.openCaseStudy(p.caseStudyUrl, p.title);
          };
          caseStudyWrap.style.display = 'block';
        } else {
          caseStudyWrap.style.display = 'none';
        }
      }

      // 1. Optional Video Walkthrough Showcase (YouTube Embed or HTML5 Video)
      this.renderVideoSection(p.video);

      // 2. Production Showcase & Architecture Desktop Auto-Slider
      const gallerySection = document.getElementById('pGallerySection');
      const gallerySub = document.querySelector('.pdetail-gallery-sub');
      if (p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0 && gallerySection) {
        if (gallerySub && p.gallerySub) {
          gallerySub.textContent = p.gallerySub;
        }
        this.setupDesktopGallerySlider(p.gallery);
        gallerySection.style.display = 'block';
      } else if (gallerySection) {
        gallerySection.style.display = 'none';
        if (this._sliderTimer) {
          clearInterval(this._sliderTimer);
          this._sliderTimer = null;
        }
      }

      // Update page title
      document.title = p.title + ' — Project Details | Joyce Yap';

      // Apply project-specific theme class on body
      document.body.className = document.body.className
        .replace(/theme-[a-z0-9-]+/g, '')
        .trim();
      if (p.themeClass) {
        document.body.classList.add(p.themeClass);
      }
    },

    /**
     * Update active switcher button in the quick navigation bar.
     */
    highlightActiveButton: function (slug) {
      const allBtns = document.querySelectorAll('.pdetail-switch-btn');
      allBtns.forEach(function (btn) {
        btn.classList.remove('active');
      });

      const activeBtn = document.getElementById('btn-' + slug);
      if (activeBtn) {
        activeBtn.classList.add('active');
        // Smoothly auto-scroll active button into view in the horizontal slide
        try {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (err) {
          const track = document.getElementById('pDetailSwitcherTrack');
          if (track) {
            track.scrollLeft = activeBtn.offsetLeft - (track.clientWidth / 2) + (activeBtn.clientWidth / 2);
          }
        }
      }
    },

    /**
     * Observe video element for seamless autoplay when scrolled into view.
     */
    setupScrollAutoplay: function (videoEl) {
      if (!videoEl || typeof IntersectionObserver === 'undefined') return;

      // HTML5 video requires muted to autoplay on all browsers
      videoEl.muted = true;

      if (videoEl._scrollObserver) {
        videoEl._scrollObserver.disconnect();
      }

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            videoEl.play().catch(function () {});
          } else {
            videoEl.pause();
          }
        });
      }, { threshold: 0.25 });

      observer.observe(videoEl);
      videoEl._scrollObserver = observer;
    },

    /**
     * Render Video Section — Supports YouTube Iframe Embeds and HTML5 Video Players with Scroll Autoplay
     */
    renderVideoSection: function (video) {
      const self = this;
      const videoSection = document.getElementById('pVideoSection');
      const videoPlayer = document.getElementById('pVideoPlayer');
      const videoIframe = document.getElementById('pVideoIframe');
      const videoTitle = document.getElementById('pVideoTitle');
      const videoDirectLink = document.getElementById('pVideoDirectLink');

      if (!videoSection) return;

      if (video && (video.src || video.embedUrl || video.directUrl)) {
        if (videoTitle) videoTitle.textContent = video.title || 'Live System Video Walkthrough';

        const isYouTubeEmbed = (video.embedUrl && video.embedUrl.indexOf('youtu') !== -1) ||
                               (video.src && video.src.indexOf('youtu') !== -1);

        if (isYouTubeEmbed) {
          const embedSrc = video.embedUrl || (video.src && video.src.indexOf('embed') !== -1 ? video.src : 'https://www.youtube-nocookie.com/embed/VyPhIySaKqM');
          if (videoIframe) {
            videoIframe.src = embedSrc;
            videoIframe.style.display = 'block';
          }
          if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.style.display = 'none';
          }
        } else {
          if (videoIframe) {
            videoIframe.src = '';
            videoIframe.style.display = 'none';
          }
          if (videoPlayer) {
            videoPlayer.src = video.src;
            if (video.poster) videoPlayer.poster = video.poster;
            videoPlayer.muted = true;
            videoPlayer.loop = true;
            videoPlayer.playsInline = true;
            videoPlayer.style.display = 'block';
            self.setupScrollAutoplay(videoPlayer);
          }
        }

        if (videoDirectLink) {
          const direct = video.directUrl || (isYouTubeEmbed ? 'https://youtu.be/VyPhIySaKqM' : '');
          if (direct) {
            videoDirectLink.href = direct;
            videoDirectLink.style.display = 'inline-flex';
          } else {
            videoDirectLink.style.display = 'none';
          }
        }

        videoSection.style.display = 'block';
      } else {
        videoSection.style.display = 'none';
        if (videoPlayer) {
          videoPlayer.pause();
          videoPlayer.src = '';
        }
        if (videoIframe) {
          videoIframe.src = '';
          videoIframe.style.display = 'none';
        }
        if (videoDirectLink) {
          videoDirectLink.style.display = 'none';
        }
      }
    },

    /**
     * Setup Desktop Auto-Slider for Production Showcase & Architecture
     * Features: desktop viewport, auto-slide interval, pause on hover, click to advance,
     * dot indicators, side arrows, counter, and fullscreen zoom lightbox integration.
     */
    setupDesktopGallerySlider: function (items) {
      const self = this;
      const track = document.getElementById('sliderTrack');
      const viewport = document.getElementById('sliderViewport');
      const dotsContainer = document.getElementById('sliderDots');
      const counter = document.getElementById('pSliderCounter');
      const badge = document.getElementById('sliderBadge');
      const caption = document.getElementById('sliderCaption');
      const prevBtn = document.getElementById('sliderPrevBtn');
      const nextBtn = document.getElementById('sliderNextBtn');
      const arrowLeft = document.getElementById('sliderArrowLeft');
      const arrowRight = document.getElementById('sliderArrowRight');
      const zoomBtn = document.getElementById('sliderZoomBtn');

      if (!track || !viewport || !items || items.length === 0) return;

      // Clear any prior timer
      if (this._sliderTimer) {
        clearInterval(this._sliderTimer);
        this._sliderTimer = null;
      }

      let currentIndex = 0;
      const total = items.length;

      // 1. Populate Slides
      track.innerHTML = items.map(function (item, idx) {
        return '<div class="slider-slide" data-index="' + idx + '">' +
          '<img src="' + item.src + '" alt="' + (item.caption || ('Showcase ' + (idx + 1))) + '" loading="' + (idx === 0 ? 'eager' : 'lazy') + '">' +
          '</div>';
      }).join('');

      // 2. Populate Dots
      if (dotsContainer) {
        dotsContainer.innerHTML = items.map(function (_, idx) {
          return '<button type="button" class="slider-dot' + (idx === 0 ? ' active' : '') + '" data-index="' + idx + '" aria-label="Go to slide ' + (idx + 1) + '"></button>';
        }).join('');
      }

      function updateUI(idx) {
        currentIndex = (idx + total) % total;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        if (counter) {
          counter.textContent = (currentIndex + 1) + ' / ' + total;
        }

        const currentItem = items[currentIndex];
        if (badge && currentItem) {
          if (currentItem.badge) {
            badge.textContent = currentItem.badge;
            badge.style.display = 'inline-block';
          } else {
            badge.style.display = 'none';
          }
        }

        if (caption && currentItem) {
          caption.textContent = currentItem.caption || '';
        }

        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.slider-dot');
          dots.forEach(function (d, i) {
            d.classList.toggle('active', i === currentIndex);
          });
        }
      }

      function nextSlide() {
        updateUI(currentIndex + 1);
      }

      function prevSlide() {
        updateUI(currentIndex - 1);
      }

      function startAutoSlide() {
        stopAutoSlide();
        self._sliderTimer = setInterval(function () {
          nextSlide();
        }, 4200);
      }

      function stopAutoSlide() {
        if (self._sliderTimer) {
          clearInterval(self._sliderTimer);
          self._sliderTimer = null;
        }
      }

      // 3. Touch Gesture Navigation (Mobile Swipe Support)
      let touchStartX = 0;
      let touchStartY = 0;
      let isSwiping = false;

      viewport.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isSwiping = false;
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
          const diffX = e.touches[0].clientX - touchStartX;
          const diffY = e.touches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
            isSwiping = true;
          }
        }
      }, { passive: true });

      viewport.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              nextSlide();
            } else {
              prevSlide();
            }
            startAutoSlide();
          }
        }
      }, { passive: true });

      // Click anywhere on the viewport to advance to next picture (ignores swipe)
      viewport.onclick = function (e) {
        if (isSwiping) {
          isSwiping = false;
          return;
        }
        if (e.target.closest('button') || e.target.closest('.slider-nav-arrow') || e.target.closest('.slider-dot')) {
          return;
        }
        nextSlide();
        startAutoSlide();
      };

      // Double click opens high-res lightbox
      viewport.ondblclick = function (e) {
        if (e.target.closest('button') || e.target.closest('.slider-nav-arrow')) return;
        self.openLightbox(items[currentIndex].src, items[currentIndex].caption);
      };

      // Prev & Next navigation
      if (prevBtn) {
        prevBtn.onclick = function (e) {
          e.stopPropagation();
          prevSlide();
          startAutoSlide();
        };
      }
      if (arrowLeft) {
        arrowLeft.onclick = function (e) {
          e.stopPropagation();
          prevSlide();
          startAutoSlide();
        };
      }
      if (nextBtn) {
        nextBtn.onclick = function (e) {
          e.stopPropagation();
          nextSlide();
          startAutoSlide();
        };
      }
      if (arrowRight) {
        arrowRight.onclick = function (e) {
          e.stopPropagation();
          nextSlide();
          startAutoSlide();
        };
      }

      // Dots Navigation
      if (dotsContainer) {
        dotsContainer.onclick = function (e) {
          const dot = e.target.closest('.slider-dot');
          if (dot && dot.dataset.index !== undefined) {
            e.stopPropagation();
            updateUI(parseInt(dot.dataset.index, 10));
            startAutoSlide();
          }
        };
      }

      // Zoom Fullscreen Button
      if (zoomBtn) {
        zoomBtn.onclick = function (e) {
          e.stopPropagation();
          self.openLightbox(items[currentIndex].src, items[currentIndex].caption);
        };
      }

      // Pause on hover, resume on mouseleave
      viewport.onmouseenter = stopAutoSlide;
      viewport.onmouseleave = startAutoSlide;

      // Initial State and Kick Off Auto Slider
      updateUI(0);
      startAutoSlide();
    },

    /**
     * Initialize the Lightbox modal listeners.
     */
    setupLightbox: function () {
      const lb = document.getElementById('reportLightbox');
      const lbClose = document.getElementById('lbClose');

      if (lbClose) {
        lbClose.addEventListener('click', () => this.closeLightbox());
      }

      if (lb) {
        lb.addEventListener('click', (e) => {
          if (e.target === lb) this.closeLightbox();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lb && lb.classList.contains('active')) {
          this.closeLightbox();
        }
      });
    },

    /**
     * Open the high-resolution lightbox modal.
     */
    openLightbox: function (src, caption) {
      const lb = document.getElementById('reportLightbox');
      const lbImg = document.getElementById('lbImg');
      const lbCap = document.getElementById('lbCaption');
      if (lb && lbImg) {
        lbImg.src = src;
        if (lbCap) lbCap.textContent = caption || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    /**
     * Close the high-resolution lightbox modal.
     */
    closeLightbox: function () {
      const lb = document.getElementById('reportLightbox');
      if (lb) lb.classList.remove('active');
      document.body.style.overflow = '';
    },

    /**
     * Open embedded Case Study modal without opening new tab.
     */
    openCaseStudy: function (url, title) {
      const modal = document.getElementById('caseStudyModal');
      const iframe = document.getElementById('caseStudyIframe');
      const titleEl = document.getElementById('caseStudyModalTitle');
      if (!modal || !iframe) return;

      if (titleEl && title) {
        titleEl.textContent = 'Case Studies Blueprint — ' + title;
      }
      let safeUrl = url || '';
      if (safeUrl && !safeUrl.startsWith('/') && !safeUrl.startsWith('http')) {
        safeUrl = '/' + safeUrl;
      }
      safeUrl = safeUrl.replace(/ /g, '%20');
      if (!safeUrl.includes('?')) {
        safeUrl += '?v=3';
      }
      if (iframe.getAttribute('data-loaded-src') !== safeUrl) {
        iframe.src = safeUrl;
        iframe.setAttribute('data-loaded-src', safeUrl);
      }
      modal.style.display = 'flex';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    /**
     * Close embedded Case Study modal.
     */
    closeCaseStudy: function () {
      const modal = document.getElementById('caseStudyModal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
      }
      document.body.style.overflow = '';
    },

    /**
     * Set up Case Study Modal event listeners.
     */
    setupCaseStudyModal: function () {
      const modal = document.getElementById('caseStudyModal');
      const closeBtn = document.getElementById('closeCaseStudyBtn');

      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeCaseStudy());
      }
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeCaseStudy();
        });
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
          this.closeCaseStudy();
        }
      });
    },

    /**
     * Store timers for the 3 Toppers columns
     */
    _toppersTimers: [],

    /**
     * Clean up any active timers for the 3-column Toppers auto-sliders
     */
    cleanupToppersTrioSliders: function () {
      if (Array.isArray(this._toppersTimers)) {
        this._toppersTimers.forEach(function (t) {
          clearInterval(t);
        });
      }
      this._toppersTimers = [];
    },

    /**
     * Initialize the 3-column auto-sliding showcase for Toppers Tutorial Center.
     * Features:
     * - Staggered auto-advance (4.0s, 4.4s, 4.8s) for dynamic visual rhythm
     * - Hover-to-pause and mouseleave-to-resume
     * - Click anywhere on stage to advance slide
     * - Header & overlay left/right arrow controls
     * - Dynamic counter (e.g. 1 / 3), badge, and caption updates
     * - Interactive pagination dots
     * - Fullscreen lightbox preview on zoom button click or stage double-click
     */
    initToppersTrioSliders: function () {
      this.cleanupToppersTrioSliders();
      const self = this;

      const columns = [
        {
          id: 1,
          interval: 4000,
          track: document.getElementById('toppersCol1Track'),
          stage: document.getElementById('toppersCol1Stage'),
          counter: document.getElementById('toppersCol1Counter'),
          badge: document.getElementById('toppersCol1Badge'),
          caption: document.getElementById('toppersCol1Caption'),
          dotsContainer: document.getElementById('toppersCol1Dots'),
          prevBtn: document.getElementById('toppersCol1Prev'),
          nextBtn: document.getElementById('toppersCol1Next'),
          arrowLeft: document.getElementById('toppersCol1ArrowLeft'),
          arrowRight: document.getElementById('toppersCol1ArrowRight'),
          zoomBtn: document.getElementById('toppersCol1Zoom')
        },
        {
          id: 2,
          interval: 4400,
          track: document.getElementById('toppersCol2Track'),
          stage: document.getElementById('toppersCol2Stage'),
          counter: document.getElementById('toppersCol2Counter'),
          badge: document.getElementById('toppersCol2Badge'),
          caption: document.getElementById('toppersCol2Caption'),
          dotsContainer: document.getElementById('toppersCol2Dots'),
          prevBtn: document.getElementById('toppersCol2Prev'),
          nextBtn: document.getElementById('toppersCol2Next'),
          arrowLeft: document.getElementById('toppersCol2ArrowLeft'),
          arrowRight: document.getElementById('toppersCol2ArrowRight'),
          zoomBtn: document.getElementById('toppersCol2Zoom')
        },
        {
          id: 3,
          interval: 4800,
          track: document.getElementById('toppersCol3Track'),
          stage: document.getElementById('toppersCol3Stage'),
          counter: document.getElementById('toppersCol3Counter'),
          badge: document.getElementById('toppersCol3Badge'),
          caption: document.getElementById('toppersCol3Caption'),
          dotsContainer: document.getElementById('toppersCol3Dots'),
          prevBtn: document.getElementById('toppersCol3Prev'),
          nextBtn: document.getElementById('toppersCol3Next'),
          arrowLeft: document.getElementById('toppersCol3ArrowLeft'),
          arrowRight: document.getElementById('toppersCol3ArrowRight'),
          zoomBtn: document.getElementById('toppersCol3Zoom')
        }
      ];

      columns.forEach(function (col) {
        if (!col.track || !col.stage) return;

        const slides = col.track.querySelectorAll('.trio-slide');
        const total = slides.length;
        if (total === 0) return;

        let currentIndex = 0;
        let timer = null;

        function updateUI(index) {
          currentIndex = index;
          col.track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

          if (col.counter) {
            col.counter.textContent = (currentIndex + 1) + ' / ' + total;
          }

          const activeSlide = slides[currentIndex];
          if (activeSlide) {
            const badgeText = activeSlide.getAttribute('data-badge') || '';
            const captionText = activeSlide.getAttribute('data-caption') || '';
            if (col.badge) col.badge.textContent = badgeText;
            if (col.caption) col.caption.textContent = captionText;
          }

          if (col.dotsContainer) {
            const dots = col.dotsContainer.querySelectorAll('.trio-dot');
            dots.forEach(function (dot, i) {
              dot.classList.toggle('active', i === currentIndex);
            });
          }
        }

        function nextSlide() {
          const next = (currentIndex + 1) % total;
          updateUI(next);
        }

        function prevSlide() {
          const prev = (currentIndex - 1 + total) % total;
          updateUI(prev);
        }

        function startTimer() {
          stopTimer();
          timer = setInterval(nextSlide, col.interval);
          self._toppersTimers.push(timer);
        }

        function stopTimer() {
          if (timer) {
            clearInterval(timer);
            const idx = self._toppersTimers.indexOf(timer);
            if (idx !== -1) self._toppersTimers.splice(idx, 1);
            timer = null;
          }
        }

        function openActiveZoom() {
          const activeSlide = slides[currentIndex];
          if (!activeSlide) return;
          const img = activeSlide.querySelector('img');
          const caption = activeSlide.getAttribute('data-caption') || (img ? img.alt : '');
          if (img && img.src) {
            self.openLightbox(img.src, caption);
          }
        }

        // Navigation button events
        if (col.nextBtn) {
          col.nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            nextSlide();
            startTimer();
          });
        }
        if (col.prevBtn) {
          col.prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            prevSlide();
            startTimer();
          });
        }
        if (col.arrowRight) {
          col.arrowRight.addEventListener('click', function (e) {
            e.stopPropagation();
            nextSlide();
            startTimer();
          });
        }
        if (col.arrowLeft) {
          col.arrowLeft.addEventListener('click', function (e) {
            e.stopPropagation();
            prevSlide();
            startTimer();
          });
        }

        // Zoom button event
        if (col.zoomBtn) {
          col.zoomBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openActiveZoom();
          });
        }

        // Touch Gesture Navigation (Mobile Swipe Support for Trio Columns)
        let trioTouchStartX = 0;
        let trioTouchStartY = 0;
        let trioIsSwiping = false;

        col.stage.addEventListener('touchstart', function (e) {
          if (e.touches.length === 1) {
            trioTouchStartX = e.touches[0].clientX;
            trioTouchStartY = e.touches[0].clientY;
            trioIsSwiping = false;
          }
        }, { passive: true });

        col.stage.addEventListener('touchmove', function (e) {
          if (e.touches.length === 1) {
            const diffX = e.touches[0].clientX - trioTouchStartX;
            const diffY = e.touches[0].clientY - trioTouchStartY;
            if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
              trioIsSwiping = true;
            }
          }
        }, { passive: true });

        col.stage.addEventListener('touchend', function (e) {
          if (e.changedTouches.length === 1) {
            const diffX = e.changedTouches[0].clientX - trioTouchStartX;
            const diffY = e.changedTouches[0].clientY - trioTouchStartY;
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
              if (diffX < 0) {
                nextSlide();
              } else {
                prevSlide();
              }
              startTimer();
            }
          }
        }, { passive: true });

        // Stage click / dblclick / hover events
        col.stage.addEventListener('click', function (e) {
          if (trioIsSwiping) {
            trioIsSwiping = false;
            return;
          }
          if (e.target.closest('.trio-ctrl-btn') ||
              e.target.closest('.trio-nav-arrow') ||
              e.target.closest('.trio-zoom-btn') ||
              e.target.closest('.trio-dots')) {
            return;
          }
          nextSlide();
          startTimer();
        });

        col.stage.addEventListener('dblclick', function (e) {
          e.stopPropagation();
          openActiveZoom();
        });

        col.stage.addEventListener('mouseenter', stopTimer);
        col.stage.addEventListener('mouseleave', startTimer);

        // Dot click events
        if (col.dotsContainer) {
          const dots = col.dotsContainer.querySelectorAll('.trio-dot');
          dots.forEach(function (dot, i) {
            dot.addEventListener('click', function (e) {
              e.stopPropagation();
              updateUI(i);
              startTimer();
            });
          });
        }

        // Initialize state and start auto-slide timer
        updateUI(0);
        startTimer();
      });
    },

    /**
     * Seamless in-page Project Switcher.
     * Prevents full-page reloads and eliminates flash of stale content.
     */
    setupProjectSwitcher: function () {
      const self = this;
      const buttons = document.querySelectorAll('.pdetail-switch-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          const href = btn.getAttribute('href');
          if (href && href.includes('?project=')) {
            const parts = href.split('?project=');
            const targetSlug = parts[1] ? parts[1].split('&')[0].split('#')[0] : '';
            if (targetSlug && self.registry[targetSlug]) {
              e.preventDefault();
              window.history.pushState({ slug: targetSlug }, '', href);
              self.loadProject(targetSlug);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        });
      });

      window.addEventListener('popstate', function () {
        const slug = self.getCurrentSlug();
        self.loadProject(slug);
      });
    },

    /**
     * Load and render any project view dynamically and cleanly.
     * Ensures old/stale standard headers never pop up or flash.
     */
    loadProject: function (slug) {
      const project = this.get(slug);
      if (!project) return;

      const standardHeader = document.getElementById('pStandardHeader');
      const standardMedia = document.getElementById('pStandardMedia');
      const standardSpecs = document.getElementById('pStandardSpecs');
      const reportSuite = document.getElementById('pReportSuite');
      const lawFirmSuite = document.getElementById('pLawFirmSuite');
      const tcSuite = document.getElementById('pTutorialCenterSuite');
      const tcVideo = document.getElementById('toppersVideoPlayer');
      const staycationSuite = document.getElementById('pStaycationSuite');
      const fbAgentSuite = document.getElementById('pFBPageAISupportSuite');
      const collabFBSuite = document.getElementById('pCollabFBBookingSuite');
      const telegramSuite = document.getElementById('pTelegramSuite');
      const slackSuite = document.getElementById('pSlackSuite');
      const videoSection = document.getElementById('pVideoSection');
      const gallerySection = document.getElementById('pGallerySection');

      // 1. Hide ALL suites and sections first to prevent any visual overlap or leakage
      if (standardHeader) standardHeader.style.display = 'none';
      if (standardMedia) standardMedia.style.display = 'none';
      if (standardSpecs) standardSpecs.style.display = 'none';
      if (reportSuite) reportSuite.style.display = 'none';
      if (lawFirmSuite) lawFirmSuite.style.display = 'none';
      if (tcSuite) tcSuite.style.display = 'none';
      if (staycationSuite) staycationSuite.style.display = 'none';
      if (fbAgentSuite) fbAgentSuite.style.display = 'none';
      if (collabFBSuite) collabFBSuite.style.display = 'none';
      if (telegramSuite) telegramSuite.style.display = 'none';
      if (slackSuite) slackSuite.style.display = 'none';
      if (videoSection) videoSection.style.display = 'none';
      if (gallerySection) gallerySection.style.display = 'none';

      // 2. Stop running timers & media
      if (tcVideo) tcVideo.pause();
      const vp = document.getElementById('pVideoPlayer');
      if (vp) {
        vp.pause();
        vp.src = '';
      }
      const vi = document.getElementById('pVideoIframe');
      if (vi) {
        vi.src = '';
        vi.style.display = 'none';
      }
      this.cleanupToppersTrioSliders();
      if (this._sliderTimer) {
        clearInterval(this._sliderTimer);
        this._sliderTimer = null;
      }

      // 3. Highlight button & update theme
      this.highlightActiveButton(slug);

      document.body.className = document.body.className
        .replace(/theme-[a-z0-9-]+/g, '')
        .trim();
      if (project.themeClass) {
        document.body.classList.add(project.themeClass);
      }
      document.title = project.title + ' — Project Details | Joyce Yap';

      // 4. Activate selected suite
      if (slug === 'law-firm') {
        if (lawFirmSuite) lawFirmSuite.style.display = 'block';
        if (gallerySection && project.gallery && project.gallery.length > 0) {
          gallerySection.style.display = 'block';
          this.setupDesktopGallerySlider(project.gallery);
        }
        if (project.video) {
          this.renderVideoSection(project.video);
        }
      } else if (slug === 'tutorial-center') {
        if (tcSuite) tcSuite.style.display = 'block';
        if (tcVideo) {
          this.setupScrollAutoplay(tcVideo);
        }
        this.initToppersTrioSliders();
      } else if (slug === 'staycation') {
        if (staycationSuite) staycationSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else if (slug === 'facebook-brand-launch-kit') {
        // Clear Sky Travel & Tours has its own dedicated top header inside reportSuite
        if (reportSuite) reportSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else if (slug === 'fb-page-ai-agent-messenger') {
        if (fbAgentSuite) fbAgentSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else if (slug === 'collab-fb-booking' || slug === 'fb-page-messenger-ai') {
        if (collabFBSuite) collabFBSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else if (slug === 'ai-telegram-assistant') {
        if (telegramSuite) telegramSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else if (slug === 'ai-slacks-assistant') {
        if (slackSuite) slackSuite.style.display = 'block';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      } else {
        // Standard view for collaborative bots (e.g. legacy fallback)
        this.renderStandard(project);
        if (standardHeader) standardHeader.style.display = 'block';
        if (standardMedia) standardMedia.style.display = 'block';
        if (standardSpecs) standardSpecs.style.display = 'grid';
        if (typeof project.init === 'function') {
          project.init(this);
        }
      }
    },

    /**
     * Initialize Mobile Navigation Drawer & Hamburger Toggle
     */
    initNavMobile: function () {
      const menuBtn = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navlinks');
      if (!menuBtn || !navLinks) return;

      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuBtn.innerHTML = isOpen ? '✕' : '☰';
        menuBtn.classList.toggle('active', isOpen);
      });

      // Close drawer when clicking any link
      const links = navLinks.querySelectorAll('a');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '☰';
          menuBtn.classList.remove('active');
        });
      });

      // Close drawer when clicking outside
      document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuBtn) {
          navLinks.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '☰';
          menuBtn.classList.remove('active');
        }
      });

      // Close drawer on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '☰';
          menuBtn.classList.remove('active');
        }
      });
    },

    /**
     * Main application bootstrap.
     */
    init: function () {
      this.initNavMobile();
      this.setupLightbox();
      this.setupCaseStudyModal();
      this.setupProjectSwitcher();

      const slug = this.getCurrentSlug();
      this.loadProject(slug);
    }
  };

  // Expose global app and helper for compatibility
  window.ProjectDetailsApp = ProjectDetailsApp;
  window.openReportLightbox = function (src, caption) {
    ProjectDetailsApp.openLightbox(src, caption);
  };
  window.openCaseStudyModal = function (url, title) {
    ProjectDetailsApp.openCaseStudy(url, title);
  };

})(window, document);
