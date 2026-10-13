/**
 * ============================================================================
 * PROJECT: FB PAGE AI CUSTOMER SUPPORT AGENT
 * File: js/FBPageAIAgentMessenger.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  if (!window.ProjectDetailsApp) return;

  window.ProjectDetailsApp.register('fb-page-ai-agent-messenger', {
    title: 'FB Page AI Customer Support Agent',
    themeClass: 'theme-fb-agent',
    
    init: function (app) {
      // 1. Setup Tab Navigation Logic
      const suite = document.getElementById('pFBPageAISupportSuite');
      if (!suite) return;

      const tabBtns = suite.querySelectorAll('.fb-agent-tab-btn');
      const tabContents = suite.querySelectorAll('.fb-agent-tab-content');

      tabBtns.forEach(btn => {
        // Remove existing listener to prevent duplicates if init is called multiple times
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', function () {
          // Remove active class from all buttons and contents within THIS suite
          suite.querySelectorAll('.fb-agent-tab-btn').forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          // Add active class to clicked button
          this.classList.add('active');

          // Show corresponding content
          const targetId = this.getAttribute('data-target');
          const targetContent = document.getElementById(targetId);
          if (targetContent) {
            targetContent.classList.add('active');
          }
        });
      });
    }
  });

})(window, document);
