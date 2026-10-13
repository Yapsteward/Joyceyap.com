/**
 * ============================================================================
 * PROJECT: TOPPERS TUTORIAL CENTER — MODULE
 * File: js/Topperstutorialcenter.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window) {
  'use strict';

  if (!window.ProjectDetailsApp) {
    console.error('ProjectDetailsApp is required before loading Topperstutorialcenter.js');
    return;
  }

  window.ProjectDetailsApp.register('tutorial-center', {
    title: 'Toppers Tutorial Center',
    category: 'Student Enrollment Accelerator & Lead Engine',
    client: 'Ms. Rizaline Tribunal • Toppers Tutorial Center',
    collaboration: 'Mark Dalumpines (Automation Workflow)',
    timeline: 'Started: Jan 2026 | Launch: Feb 2026 + Ongoing Support',
    img: '06. Projectshowcase/02.Images Topperstutorialcenter/Toppers (1).png',
    themeClass: 'theme-tutorial-center',
    hasCustomView: true,
    lead: 'Student Enrollment Accelerator and GoHighLevel CRM ecosystem featuring 4-page enrollment funnels, automated SMS & email follow-ups, and calendar booking sequences.',
    features: [
      '<strong>Instant Free Assessment Funnel:</strong> Frictionless multi-step registration forms paired with retargeting campaigns for active parents.',
      '<strong>Multi-Channel SMS & Email Nurturing:</strong> Automated follow-ups (Days 1, 3, 7, 14) and instant appointment confirmation sequences.',
      '<strong>Automated Pipeline Workflows:</strong> Real-time contact stage updates, survey completion triggers, and consultation booking notifications.',
      '<strong>Centralized GoHighLevel Engine:</strong> Unified marketing automation platform managing inquiries, appointments, and enrollment conversions.'
    ],
    metrics: 'Accelerated lead generation by pairing free assessment funnels with retargeting campaigns aimed at active parents.',
    tools: [
      'GoHighLevel',
      'Workflow Automations',
      'Email Campaigns',
      'SMS Nurturing',
      'Calendar Booking',
      'Assessment Funnels'
    ],
    video: {
      src: '06. Projectshowcase/05. Video Tutorialcenter/Topperstutorialcentervideoshowcase.mp4',
      directUrl: 'https://youtube.com/shorts/FiKS8BE3IHs?feature=share',
      title: 'Live System Video Walkthrough — Toppers Tutorial Center'
    },
    caseStudyUrl: '06.%20Projectshowcase/Tutorialcentercasestudies.html',
    caseStudyLabel: 'Case Studies Blueprint'
  });

})(window);
