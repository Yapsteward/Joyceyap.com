/**
 * ============================================================================
 * PROJECT: AI COLLABORATION ASSISTANTS — MODULE
 * File: js/Collaboration.js
 * Architecture: Registry & Facade Pattern (SOLID / Clean Code)
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window) {
  'use strict';

  if (!window.ProjectDetailsApp) {
    console.error('ProjectDetailsApp is required before loading Collaboration.js');
    return;
  }

  // ============================================================================
  // 1. COLLABORATION: AI BOOKING AGENT & CALENDAR INTEGRATION (FB MESSENGER)
  // ============================================================================
  const collabFBBookingConfig = {
    title: 'AI Booking Agent & Calendar Integration',
    category: 'FB Page AI Messenger',
    client: 'Project Collaboration — Kent Jintapa (n8n Automation Specialist)',
    timeline: 'Started: July 2026 | Launch: August 2026',
    img: '06. Projectshowcase/Project Colloboration/AI Booking Agen & Calendar Integration.PNG',
    themeClass: 'theme-collab-fb-booking',
    hasCustomView: true,
    lead: 'This project delivers an end-to-end appointment scheduling and customer inquiry agent integrated directly into Facebook Messenger. Built using n8n and powered by Google Gemini, the system autonomously answers client questions, checks real-time calendar availability, and books appointments on the spot 24/7 without human intervention.',

    features: [
      '<strong>Real-Time Calendar Availability Scanning:</strong> Automatically checks open appointment slots in Google Calendar before presenting options to clients, eliminating scheduling conflicts.',
      '<strong>Zero-Friction Direct Booking:</strong> Automatically writes confirmed appointments directly into Google Calendar with complete client details and eliminates manual back-and-forth.',
      '<strong>Google Gemini AI Reasoning:</strong> Natural language understanding, intent extraction, and conversational reasoning for complex customer questions and timing requests.',
      '<strong>Dynamic Docs Knowledge Base:</strong> Queries centralized Google Docs service menus, rates, and policies dynamically without hardcoding responses.',
      '<strong>Instant Webhook Acknowledgment:</strong> Responds to Meta verification handshakes within milliseconds via Respond to Webhook nodes to prevent retry loops.'
    ],

    metrics: 'Eliminated <strong>100% of double bookings</strong>, delivered instant <strong>under 60-second appointment booking 24/7</strong>, and reduced administrative scheduling overhead by <strong>85%</strong>.',

    tools: [
      'n8n Workflow Engine',
      'Google Gemini AI',
      'Meta Graph API',
      'Google Calendar API',
      'Google Docs DB',
      'Simple Memory'
    ],

    toolsVisual: [
      { name: 'n8n', icon: '05. Icons/n8n.png' },
      { name: 'Google Gemini', icon: '05. Icons/GEMINI.jpg' },
      { name: 'Google Calendar API', icon: '05. Icons/google workspace.png' },
      { name: 'Meta Graph API', icon: '05. Icons/html.png' }
    ],

    caseStudyUrl: '06. Projectshowcase/04. Collaboration/FB AI Agent Messenger with Google Calendar.html',
    caseStudyLabel: 'Case Studies Blueprint — Booking Agent',

    gallerySub: 'Proof of n8n booking workflows and calendar synchronization',
    gallery: [
      {
        src: '06. Projectshowcase/Project Colloboration/AI Booking Agen & Calendar Integration.PNG',
        caption: 'AI Booking Agent & Google Calendar Real-Time Workflow Architecture in n8n',
        badge: 'n8n Workflow Engine'
      },
      {
        src: '06. Projectshowcase/04. Collaboration/Brian Ai Telegram Personal Assistant/Facebook AI Messenger.PNG',
        caption: 'Autonomous Messenger Booking & Calendar Scheduling Node Execution',
        badge: 'Calendar Integration'
      }
    ],

    init: function (app) {
      if (window.CollabFBBookingInit) {
        window.CollabFBBookingInit(app);
      }
    }
  };

  // Register primary slug and legacy alias
  window.ProjectDetailsApp.register('collab-fb-booking', collabFBBookingConfig);
  window.ProjectDetailsApp.register('fb-page-messenger-ai', collabFBBookingConfig);

  // ============================================================================
  // 2. COLLABORATION: AI TELEGRAM PERSONAL ASSISTANT
  // ============================================================================
  window.ProjectDetailsApp.register('ai-telegram-assistant', {
    title: 'Multimodal AI Telegram Assistant with Voice-to-Text Processing',
    category: 'Telegram AI & Gemini Assistant',
    client: 'Project Collaboration — Kent Bryan Jintapa (n8n Automation Specialist)',
    timeline: 'Date Executed: August 2026',
    img: '06. Projectshowcase/Project Colloboration/Multimodal AI Telegram Assistant with Voice-to-Text Processing.PNG',
    themeClass: 'theme-telegram-ai',
    hasCustomView: true,
    lead: 'This project is an intelligent, multimodal personal assistant built within Telegram to help busy professionals, agency owners, and executives manage communication on the go. Powered by n8n and Google Gemini, the agent processes both written text and spoken voice notes seamlessly. It automatically transcribes voice memos, maintains conversational context across sessions, and generates instant, reasoned responses back to the user in Telegram.',

    features: [
      '<strong>Frictionless Mobile Productivity:</strong> Allows founders, operators, and busy professionals to dictate thoughts, questions, or instructions via voice memo while on the move, without stopping to type.',
      '<strong>Instant Information Synthesis:</strong> Transcribes voice notes and uses AI to summarize details, answer questions, or organize tasks in seconds.',
      '<strong>Continuous Context Retention:</strong> Remembers previous turns in the conversation, making it easy to handle complex follow-ups without repeating background details.',
      '<strong>Unified Channel Communication:</strong> Keeps personal workflows, quick brainstorming, and assistant tasks inside a single chat app instead of juggling multiple note-taking and AI tools.'
    ],

    metrics: 'Enabled instant voice-note querying, cutting the time spent typing queries on mobile by <strong>over 60%</strong>, and delivered <strong>24/7 zero-latency replies</strong> across mixed media.',

    tools: [
      'n8n',
      'Telegram Bot API',
      'Speech-to-Text Transcription Engine',
      'Google Gemini Chat Model',
      'n8n Simple Memory'
    ],

    toolsVisual: [
      { name: 'n8n', icon: '05. Icons/n8n.png' },
      { name: 'Google Gemini AI', icon: '05. Icons/GEMINI.jpg' },
      { name: 'Speech-to-Text Engine', icon: '05. Icons/Claude.webp' },
      { name: 'Telegram Bot API', icon: '05. Icons/cloudflare.png' }
    ],

    caseStudyUrl: '06. Projectshowcase/04. Collaboration/Telegram AI Assistant.html',
    caseStudyLabel: 'Case Studies Blueprint — Telegram AI',

    gallerySub: 'Proof of multimodal Telegram voice & text automation pipeline in n8n',
    gallery: [
      {
        src: '06. Projectshowcase/Project Colloboration/Multimodal AI Telegram Assistant with Voice-to-Text Processing.PNG',
        caption: 'Multimodal AI Telegram Assistant with Voice-to-Text Processing Architecture',
        badge: 'Telegram Architecture'
      },
      {
        src: '06. Projectshowcase/Project Colloboration/Brian Ai Telegram Personal Assistant.PNG',
        caption: 'Brian AI — Telegram Dual-Branch Voice & Text Workflow Execution Canvas',
        badge: 'Voice-to-Text Pipeline'
      }
    ],

    init: function (app) {
      if (window.TelegramAssistantInit) {
        window.TelegramAssistantInit(app);
      }
    }
  });

  // ============================================================================
  // 3. COLLABORATION: AI SLACKS ASSISTANT
  // ============================================================================
  window.ProjectDetailsApp.register('ai-slacks-assistant', {
    title: 'Multimodal Enterprise Slack AI Assistant with Model Fallback & Global Error Handling',
    category: 'Enterprise Slack AI & DeepSeek / Gemini Intelligence',
    client: 'Project Collaboration — Errol John Pascua (Automation Specialist)',
    timeline: 'Date Executed: January - February 2026',
    img: '06. Projectshowcase/Project Colloboration/AI Slacks Assistant1.PNG',
    themeClass: 'theme-slack-ai',
    hasCustomView: true,
    lead: 'This project is an enterprise-grade, multimodal AI workspace assistant built inside Slack using n8n. Designed for internal operations, agency teams, and tech companies, the system processes both real-time text threads and voice audio uploads. It incorporates an advanced dual-model architecture (DeepSeek Chat with Google Gemini fallback), modular subworkflows for specialized conversational intelligence, and a dedicated global error-handling circuit to ensure zero downtime in production environments.',

    features: [
      '<strong>Frictionless Team Collaboration:</strong> Enables team members and executives on the go to dictate voice memos or send text queries directly in Slack without breaking their focus or workflow.',
      '<strong>Continuous System Uptime:</strong> Features an automatic model fallback (DeepSeek to Google Gemini) so internal workflows never stall during provider rate limits or third-party outages.',
      '<strong>Modular Subject-Matter Expertise:</strong> Uses a dedicated subworkflow ("AI Slack Professor") to deliver specialized, in-depth knowledge and contextual assistance right inside message threads.',
      '<strong>Proactive Operational Monitoring:</strong> Includes a global error-handling circuit that detects failed runs and alerts ops teams immediately, preventing silent system failures.'
    ],

    metrics: 'Delivered <strong>100% Modality Coverage</strong> across text and voice notes, achieved <strong>99.9% uptime resilience</strong> via dual-model fallback, and eliminated context fragmentation inside Slack threads.',

    tools: [
      'n8n',
      'Slack API',
      'DeepSeek Chat Model',
      'Google Gemini Chat Model',
      'JavaScript (Code Nodes)',
      'n8n Simple Memory'
    ],

    toolsVisual: [
      { name: 'n8n', icon: '05. Icons/n8n.png' },
      { name: 'DeepSeek Chat Model', icon: '05. Icons/deepseek ai.png' },
      { name: 'Google Gemini AI', icon: '05. Icons/GEMINI.jpg' },
      { name: 'JavaScript Code Nodes', icon: '05. Icons/Visual Studio.jpg' }
    ],

    caseStudyUrl: '06. Projectshowcase/04. Collaboration/Slack AI Assistant.html',
    caseStudyLabel: 'Case Studies Blueprint — Slack AI Assistant',

    gallerySub: 'Proof of multimodal Slack architecture, AI Slack Professor subworkflow, and global error handling',
    gallery: [
      {
        src: '06. Projectshowcase/Project Colloboration/AI Slacks Assistant1.PNG',
        caption: 'Enterprise Slack AI Multi-Turn Thread Assistant Architecture & DeepSeek Integration',
        badge: 'Main Workflow'
      },
      {
        src: '06. Projectshowcase/Project Colloboration/AI Slack Professor.PNG',
        caption: 'Subworkflow Canvas: AI Slack Professor Reasoning Engine',
        badge: 'Subworkflow Canvas'
      },
      {
        src: '06. Projectshowcase/Project Colloboration/AI Slack Global Error.PNG',
        caption: 'Production Guardrail: Global Error Handling & Fail-Safe Alert Dispatch',
        badge: 'Global Error Circuit'
      }
    ],

    init: function (app) {
      if (window.SlackAssistantInit) {
        window.SlackAssistantInit(app);
      }
    }
  });

})(window);
