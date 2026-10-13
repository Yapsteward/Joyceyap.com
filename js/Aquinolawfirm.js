/**
 * ============================================================================
 * PROJECT: AQUINO AND CO. LAW FIRM — MODULE
 * File: js/Aquinolawfirm.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window) {
  'use strict';

  if (!window.ProjectDetailsApp) {
    console.error('ProjectDetailsApp is required before loading Aquinolawfirm.js');
    return;
  }

  window.ProjectDetailsApp.register('law-firm', {
    title: 'Legal Intake Autopilot Booking & Lead Capture System',
    category: 'Autopilot Booking & Lead Capture System',
    client: 'Atty. Glenn Aquino • Aquino and Co. Law Firm',
    timeline: 'Started: Dec 2025 | Launch: Jan 2026 + Ongoing Maintenance Support',
    img: '06. Projectshowcase/01. Imagelawfirm/Project-Law Firm Showcase.jpg',
    themeClass: 'theme-law-firm',
    hasCustomView: false,

    lead: 'Modernized a walk-in dependent practice in Santiago, Isabela into a high-performance 24/7 client acquisition engine. Automates legal intake, consultation bookings, and GCash payment verifications into a centralized Google Sheets pipeline — with zero ongoing SaaS overhead.',

    // System Architecture Features (Grounding in 01.Lawfirmcasestudies.html)
    features: [
      '<strong>24/7 Autopilot Consultation Booking:</strong> Replaced scattered walk-in inquiries with an automated booking funnel that captures client matters and logs appointment data instantly into Google Sheets.',
      '<strong>Dual-Channel Automated Email Dispatch:</strong> Instantly sends structured consultation confirmation emails with preparation instructions to the client and new lead alerts to the legal team.',
      '<strong>Free Legal Guide Lead Magnet Funnel:</strong> Automates delivery of free legal guide resources to prospective clients, pre-educating them while expanding the firm’s verified client database.',
      '<strong>Direct GCash Payment Receipt Verification:</strong> Streamlined fee payments with a direct GCash receipt upload workflow syncing files into Google Drive with real-time verification alerts.',
      '<strong>Zero Recurring Software Fees:</strong> Engineered exclusively on Google Workspace (Google Apps Script, Sheets, Drive, Gmail) and modern front-end code with $0 monthly subscriptions.'
    ],

    // Measurable Impact
    metrics: 'Modernized a walk-in dependent practice into an automated engine, cutting off-hours inquiry loss by <strong>100%</strong> and enabling round-the-clock client booking and tracking.',

    // Text Stack Chips (Fallback)
    tools: [
      'Visual Studio',
      'HTML',
      'CSS',
      'Claude AI',
      'Google Appscript',
      'GoHighLevel'
    ],

    // Rich Visual Tools with Photos from 01. Imagelawfirm
    toolsVisual: [
      {
        name: 'Visual Studio',
        icon: '06. Projectshowcase/01. Imagelawfirm/vsc.png'
      },
      {
        name: 'HTML',
        icon: '06. Projectshowcase/01. Imagelawfirm/html.png'
      },
      {
        name: 'CSS',
        icon: '06. Projectshowcase/01. Imagelawfirm/css.png'
      },
      {
        name: 'Claude AI',
        icon: '06. Projectshowcase/01. Imagelawfirm/claude ai.png'
      },
      {
        name: 'Google Appscript',
        icon: '06. Projectshowcase/01. Imagelawfirm/Appscript.png'
      },
      {
        name: 'GoHighLevel',
        icon: '06. Projectshowcase/01. Imagelawfirm/GHL.png'
      }
    ],

    // Video Presentation Walkthrough (Compressed Local MP4 Embed with Direct Link)
    video: {
      src: '06. Projectshowcase/05. Video Lawfirm/Lawfirmwalkthroughpresentation.mp4',
      directUrl: 'https://youtu.be/VyPhIySaKqM',
      title: 'Law Firm System Video Walkthrough Presentation — Aquino and Co. Law Firm',
      poster: '06. Projectshowcase/01. Imagelawfirm/Project-Law Firm Showcase.jpg'
    },

    gallerySub: 'Proof of  back-end codes and deployment',

    // Production Showcase & Code Architecture Gallery
    gallery: [
      {
        src: '06. Projectshowcase/01. Imagelawfirm/vcsbackend.png',
        caption: 'VS Code Backend Architecture & Automation Workflows',
        badge: 'Backend Architecture'
      },
      {
        src: '06. Projectshowcase/01. Imagelawfirm/Github Deployment.png',
        caption: 'Official GitHub Repository Deployment & Architecture Documentation',
        badge: 'GitHub Deployment'
      },
      {
        src: '06. Projectshowcase/01. Imagelawfirm/Automated Gmail for Client.png',
        caption: 'Automated Dual-Channel Email Confirmation for Client Bookings',
        badge: 'Client Notification'
      },
      {
        src: '06. Projectshowcase/01. Imagelawfirm/Automated Gmail for Lawfirm.png',
        caption: 'Real-Time Urgent Booking & Lead Alerts Dispatched to the Law Firm',
        badge: 'Law Firm Alert'
      },
      {
        src: '06. Projectshowcase/01. Imagelawfirm/Google search console verified.png',
        caption: 'Google Search Console Verified Domain Ownership & Indexing',
        badge: 'Google Verified'
      }
    ],

    // Embedded Case Studies Blueprint
    caseStudyUrl: '06.%20Projectshowcase/01.Lawfirmcasestudies.html',
    caseStudyLabel: 'Case Studies Blueprint'
  });

})(window);
