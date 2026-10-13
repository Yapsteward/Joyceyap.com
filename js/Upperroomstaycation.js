/**
 * ============================================================================
 * PROJECT: THE UPPER ROOM AT AZURE NORTH STAYCATION — MODULE
 * File: js/Upperroomstaycation.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window) {
  'use strict';

  if (!window.ProjectDetailsApp) {
    console.error('ProjectDetailsApp is required before loading Upperroomstaycation.js');
    return;
  }

  window.ProjectDetailsApp.register('staycation', {
    title: 'The Upper Room at Azure North Staycation',
    category: 'Hospitality Booking & Lead Capture System',
    client: 'Crisselle Joy & Francisnasser',
    business: 'The Upper Room at Azure North Staycation',
    timeline: 'Started: July 2026 | Launch: August 2026',
    dateStarted: 'July 2026',
    dateLaunch: 'August 2026',
    img: '06. Projectshowcase/03.ImagesUpperroomstaycation/Project - Condounit Staycation.png',
    themeClass: 'theme-staycation',
    hasCustomView: true,

    lead: 'The new direct-booking website established a credible, independent staycation brand that operates 24/7 with zero double-bookings—completely freeing the business from heavy third-party platform fees.',

    // System Architecture Features
    features: [
      '<strong>3-Step Dynamic Reservation Wizard:</strong> Developed an interactive date picker featuring automated pricing logic (Weekdays ₱2,800/night for 2 pax + ₱250/extra pax, Weekends ₱3,000/night for 2 pax + ₱300/extra pax) and flexible downpayment options (₱500 reservation hold, 50% deposit, or full payment).',
      '<strong>Real-Time Schedule Lock & Conflict Prevention:</strong> Synchronizes guest bookings directly to Google Sheets with automatic calendar date-blocking to eliminate double-booking risks entirely.',
      '<strong>Direct Base64 Payment Receipt Google Drive Ingestion:</strong> Streamlined deposit verification with a direct file upload workflow syncing receipts into Google Drive with instant owner notifications.',
      '<strong>Dual-Channel Automated Email Dispatch:</strong> Instantly sends structured reservation confirmation vouchers with house rules to guests and real-time booking alerts to unit owners.',
      '<strong>Zero Recurring SaaS Fees:</strong> Engineered on Google Workspace (Google Apps Script, Google Sheets, Drive, Gmail) and modern front-end code with ₱0 monthly software overhead, bypassing 15-20% third-party OTA commissions.'
    ],

    // Measurable Impact
    metrics: 'The new direct-booking website established a credible, independent staycation brand that operates <strong>24/7 with zero double-bookings</strong>—completely freeing the business from heavy third-party platform fees.',

    // Text Stack Chips (Fallback)
    tools: [
      'Antigravity IDE',
      'Gemini AI',
      'HTML5',
      'CSS3',
      'Google Apps Script'
    ],

    // Pure Unframed Brand Tools
    toolsVisual: [
      {
        name: 'Antigravity IDE',
        icon: '06. Projectshowcase/03.ImagesUpperroomstaycation/Antigravity IDE.jpg'
      },
      {
        name: 'Gemini AI',
        icon: '06. Projectshowcase/03.ImagesUpperroomstaycation/Gemini AI.jpg'
      },
      {
        name: 'HTML5',
        icon: '06. Projectshowcase/03.ImagesUpperroomstaycation/html.png'
      },
      {
        name: 'CSS3',
        icon: '06. Projectshowcase/03.ImagesUpperroomstaycation/css.png'
      },
      {
        name: 'Google Apps Script',
        icon: '06. Projectshowcase/03.ImagesUpperroomstaycation/Appscript.png'
      }
    ],

    // Embedded Case Studies Blueprint
    caseStudyUrl: '06.%20Projectshowcase/Upperroomstaycationcasestudies.html',
    caseStudyLabel: 'Case Studies Blueprint',

    /**
     * Interactive hook for Full Desktop View with CSS auto slide showcase
     */
    init: function () {
      const track = document.getElementById('staycationDesktopTrack');
      const dot1 = document.getElementById('staycationDot1');
      const dot2 = document.getElementById('staycationDot2');
      const prevBtn = document.getElementById('staycationArrowLeft');
      const nextBtn = document.getElementById('staycationArrowRight');
      const caption = document.getElementById('staycationSlideCaption');
      const badge = document.getElementById('staycationSlideBadge');
      const fsBtn = document.getElementById('staycationSlideFsBtn');

      if (!track) return;

      const slides = [
        {
          src: '06. Projectshowcase/03.ImagesUpperroomstaycation/Project - Condounit Staycation.png',
          caption: 'Capture Prospect Clients by Offering 50% Off',
          badge: 'Lead Generation Funnel'
        },
        {
          src: '06. Projectshowcase/03.ImagesUpperroomstaycation/Project - Condounit Staycationwithbookingcp.png',
          caption: 'Systematic steps from booking to payment flow with automated Gmail notification',
          badge: 'Automated Booking System with Payment Receipt Verification'
        }
      ];

      let currentIndex = 0;

      function goToSlide(idx) {
        currentIndex = idx;
        track.style.animation = 'none';
        track.style.transform = 'translateX(-' + (currentIndex * 50) + '%)';
        if (dot1 && dot2) {
          dot1.classList.toggle('active', currentIndex === 0);
          dot2.classList.toggle('active', currentIndex === 1);
        }
        if (caption) caption.textContent = slides[currentIndex].caption;
        if (badge) badge.textContent = slides[currentIndex].badge;
      }

      if (dot1) dot1.onclick = function (e) { e.stopPropagation(); goToSlide(0); };
      if (dot2) dot2.onclick = function (e) { e.stopPropagation(); goToSlide(1); };
      if (prevBtn) prevBtn.onclick = function (e) { e.stopPropagation(); goToSlide(currentIndex === 0 ? 1 : 0); };
      if (nextBtn) nextBtn.onclick = function (e) { e.stopPropagation(); goToSlide(currentIndex === 0 ? 1 : 0); };
      if (fsBtn) {
        fsBtn.onclick = function (e) {
          e.stopPropagation();
          if (window.openReportLightbox) {
            window.openReportLightbox(slides[currentIndex].src, slides[currentIndex].caption);
          }
        };
      }
    }
  });

})(window);
