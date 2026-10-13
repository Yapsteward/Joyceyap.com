/**
 * ============================================================================
 * PROJECT: AI BOOKING AGENT & CALENDAR INTEGRATION
 * File: js/CollabFBBooking.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  function initCollabFBBooking() {
    const suite = document.getElementById('pCollabFBBookingSuite');
    if (!suite) return;

    const navTabs = suite.querySelector('.fb-agent-nav-tabs');
    if (!navTabs) return;

    const tabBtns = navTabs.querySelectorAll('.fb-agent-tab-btn');
    const tabContents = suite.querySelectorAll('.fb-agent-tab-content');

    tabBtns.forEach(btn => {
      // Clone to remove stale event listeners safely
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function () {
        // Clear active states in this suite
        navTabs.querySelectorAll('.fb-agent-tab-btn').forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Activate clicked button
        this.classList.add('active');

        // Show targeted content pane
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Expose init hook for Collaboration.js and Projectdetails.js
  window.CollabFBBookingInit = initCollabFBBooking;

  // If already registered in ProjectDetailsApp, attach init without wiping metadata
  if (window.ProjectDetailsApp && window.ProjectDetailsApp.registry) {
    const existing = window.ProjectDetailsApp.get('collab-fb-booking');
    if (existing) {
      existing.init = initCollabFBBooking;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCollabFBBooking();
  });

})(window, document);
