/**
 * ============================================================================
 * PROJECT: CLEAR SKY TRAVEL AND TOURS — DELIVERY REPORT MODULE
 * File: js/Clearskytravelandtours.js
 * Tech Steward Digital AI — Joyce Yap Portfolio
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  if (!window.ProjectDetailsApp) {
    console.error('ProjectDetailsApp is required before loading Clearskytravelandtours.js');
    return;
  }

  // 7 AI Concepts Data for Clear Sky Travel and Tours
  const conceptsData = [
    {
      tag: 'Concept #1 • Dream Vacation',
      title: 'Dream Vacation Aspirations',
      persona: 'Aspiring travelers longing for their dream getaway but hesitating on planning & budgeting.',
      hook: `✈️ Your dream escape is waiting! 🌴

Planning a vacation should feel exciting — not stressful.
From finding the right flights, choosing comfortable accommodations, arranging tour packages, and preparing travel requirements, Clear Sky Travel and Tours is here to make your journey easier.

Whether it’s a barkada getaway, family vacation, honeymoon, or your well-deserved break, we help you turn your travel plans into unforgettable memories.

🌎 Explore new places
🏝 Relax in amazing destinations
✨ Enjoy a hassle-free travel experience

Your next adventure starts with one message.
📩 Comment "BOOK" today and let Clear Sky plan your perfect trip!`,
      file: 'Concept 1 -.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/Concept 1 -.png'
    },
    {
      tag: 'Concept #2 • Busy Professional',
      title: 'Busy Professional Travel Solutions',
      persona: 'Corporate executives & working professionals short on planning time.',
      hook: `😩 Too busy to plan your vacation?

Between work deadlines, comparing flight options, checking hotels, preparing documents, and searching for the best deals — planning a trip can quickly become stressful.

That’s where Clear Sky Travel and Tours comes in. ✈️🌴

We help you arrange your travel needs from:
✈️ Flight Booking
🏨 Hotel Accommodation
🌎 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

Spend less time worrying about the details and more time enjoying the journey.

Whether you’re planning a barkada getaway, family vacation, business trip, or your dream escape, our team is ready to help make your travel experience smooth and hassle-free.

✨ Your vacation should start with excitement — not stress.
📩 Message Clear Sky Travel and Tours today, Comment " TRAVEL " and let us handle the details.`,
      file: 'CONCEPT 2.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 2.png'
    },
    {
      tag: 'Concept #3 • Barkada Trip',
      title: 'Barkada Trip Experiences',
      persona: 'Youth and peer groups coordinating group getaways and reunions.',
      hook: `🌴 Planning a Barkada trip? Make every moment count. ✈️

Gathering everyone, choosing destinations, comparing flights, booking accommodations, and organizing travel details can be stressful.

With Clear Sky Travel and Tours, planning your group getaway becomes easier and more convenient.

We help arrange your travel needs:
✈️ Flight Booking
🏨 Hotel Accommodation
🌎 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

Whether it’s a beach escape, weekend adventure, or dream destination with friends — we help you focus on what matters most:
✨ Creating unforgettable memories together.

Let us handle the booking while you enjoy the journey.
📩 Comment " BOOK " today and start planning your Barkada adventure!`,
      file: 'CONCEPT 3.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 3.png'
    },
    {
      tag: 'Concept #4 • Peace of Mind',
      title: 'Agency Service Awareness & Booking Peace-of-Mind',
      persona: 'First-time travelers and safety-conscious families seeking reliable support.',
      hook: `Your next adventure starts with the right travel partner. ✈️

Planning a trip involves many details — from booking flights, finding the perfect accommodation, choosing destinations, preparing travel documents, and making sure everything goes smoothly.

With Clear Sky Travel and Tours, you have a trusted travel partner to guide you every step of the way.

We provide:
✈️ Flight Booking
🏨 Hotel Accommodation
🌴 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

Whether you’re traveling for leisure, a family vacation, a Barkada getaway, or your dream international destination — we help make your travel experience easier, smoother, and more memorable.

✨ Less hassle. More adventures. More memories.

Start planning your journey today with Clear Sky Travel and Tours.
📩 Comment “ TRAVEL ” now and let’s create your next unforgettable trip!`,
      file: 'CONCEPT 4.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 4.png'
    },
    {
      tag: 'Concept #5 • Stress Relief',
      title: 'Hassle-Free Travel & Stress Relief',
      persona: 'Overwhelmed vacationers looking for genuine relaxation without logistical friction.',
      hook: `😰 Travel should feel exciting — not stressful. ✈️

Planning a trip can become overwhelming when you have to compare flights, search for hotels, prepare travel requirements, and organize every detail on your own.

With Clear Sky Travel and Tours, you don’t have to handle everything alone.

Our travel assistance helps you with:
✈️ Flight Booking
🏨 Hotel Accommodation
🌴 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

From your first travel plans until your departure, we help make your journey smoother, easier, and more enjoyable.

Spend less time worrying about the details and more time looking forward to your adventure. 🌎✨

Whether it’s your dream vacation, family trip, barkada getaway, or international journey — Clear Sky Travel and Tours is ready to assist you.

📩 Talk to a travel consultant today, comment " BOOK " and let us handle the details.`,
      file: 'CONCEPT 5.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 5.png'
    },
    {
      tag: 'Concept #6 • GC to Reality',
      title: '“Group Chat Plan to Reality” Travel Memories',
      persona: 'Friends whose travel plans consistently stall in group chat conversations.',
      hook: `💬 “Guys, travel tayo?”
✈️ “Saan tayo?”
💰 “Magkano kaya?”
📅 “Kailan tayo free?”

Sound familiar? 😅

Most Barkada trips start with exciting conversations in the group chat… but sometimes they stay there because planning becomes complicated.

Too many opinions.
Too many options.
No final decision.

With Clear Sky Travel and Tours, we help turn your travel ideas into an organized plan. 🌴✨

We assist with:
✈️ Flight Booking
🏨 Hotel Accommodation
🌎 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

Instead of spending weeks deciding, your Barkada can focus on what matters most — enjoying the journey and creating unforgettable memories together. 📸🌊

From “Someday tayo” to “Nandito na tayo.” ✈️

📩 Comment “BOOK” below for inquiry details and let’s start planning your Barkada adventure!`,
      file: 'CONCEPT 6.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 6.png'
    },
    {
      tag: 'Concept #7 • Work-Life Balance',
      title: 'Work-Life Balance & Well-Deserved Escapes',
      persona: 'Hardworking individuals and achievers deserving a restorative break.',
      hook: `💼 After all the deadlines, meetings, and busy days… you deserve a break. 🌴

Sometimes, the hardest part of traveling is not the destination — it’s finding the time to plan everything.

From comparing flights, choosing accommodations, preparing travel requirements, and organizing activities, your dream vacation can quickly feel like another task on your checklist.

With Clear Sky Travel and Tours, we help make your travel plans easier and more convenient.

We provide assistance for:
✈️ Flight Booking
🏨 Hotel Accommodation
🌴 Tour Packages
📄 Visa Assistance
🛡 Travel Insurance

You focus on enjoying your well-deserved getaway. We help handle the details from planning to boarding. ✨

Because memories are worth the time. 🌎💙

📩 Start planning your next adventure with Clear Sky Travel and Tours.
Comment “BOOK” for inquiry details.`,
      file: 'CONCEPT 7.png',
      src: '06. Projectshowcase/ClearskyTravelandtours-Images/CONCEPT 7.png'
    }
  ];

  window.ProjectDetailsApp.register('facebook-brand-launch-kit', {
    title: 'Facebook Brand Launch Kit',
    category: 'Social Brand & Lead Automation',
    client: 'Clear Sky Travel and Tours (Daisy G. Brilliantes)',
    img: '06. Projectshowcase/ClearskyTravelandtours-Images/FBPage.png',
    themeClass: 'theme-travel-launch',
    hasCustomView: true,
    lead: 'Full Project Delivery Report & Handover: End-to-end Facebook page architecture, 24/7 Messenger lead triage, custom Canva brand suite, and 29-day automated social media content engine.',
    features: [
      '<strong>Facebook Business Page Setup:</strong> Complete page configuration, vanity URL, verified contact channels, and primary booking CTA.',
      '<strong>24/7 Messenger Inbox Automation:</strong> Custom quick-reply interactive navigation menu with zero-delay routing for package pricing and FAQs.',
      '<strong>Custom Canva Brand Identity Suite:</strong> 6 reusable master layout templates ensuring long-term visual consistency and brand recall.',
      '<strong>29-Day Automated Content Package (Bonus):</strong> 7 AI-curated concept visuals, 7 direct-response ads scripts, and 7 educational value posts.'
    ],
    metrics: 'Established a <strong>100% turnkey social ecosystem</strong> with zero-delay automated customer triage, cutting routine inquiry handling by 80% and delivering a 1-month buffer of automated content.',
    tools: [
      'Facebook Business Suite',
      'Meta Messenger API',
      'Canva Pro Master Templates',
      'AI Generative Graphics',
      'Direct-Response Copywriting',
      'Editorial Scheduling Plan'
    ],

    /**
     * Interactive Report Suite Initialization
     */
    init: function (app) {
      // 1. Tab Switching Controller
      const tabBtns = document.querySelectorAll('.report-tab-btn');
      const tabPanes = document.querySelectorAll('.report-pane');

      tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          tabBtns.forEach(function (b) { b.classList.remove('active'); });
          tabPanes.forEach(function (pane) { pane.classList.remove('active'); });
          btn.classList.add('active');
          const target = document.getElementById(btn.dataset.tab);
          if (target) target.classList.add('active');
        });
      });

      // 2. 7 AI Concepts Interactive Selector
      const conceptBtns = document.querySelectorAll('.concept-pill-btn');
      const conceptImg = document.getElementById('conceptImg');
      const conceptTag = document.getElementById('conceptTag');
      const conceptTitle = document.getElementById('conceptTitle');
      const conceptPersona = document.getElementById('conceptPersona');
      const conceptHook = document.getElementById('conceptHook');
      const conceptFile = document.getElementById('conceptFile');
      const conceptImgCard = document.getElementById('conceptImgCard');

      function setConcept(idx) {
        const c = conceptsData[idx];
        if (!c || !conceptImg) return;

        conceptBtns.forEach(function (b, i) {
          b.classList.toggle('active', i === idx);
        });

        conceptImg.style.opacity = '0';
        setTimeout(function () {
          conceptImg.src = c.src;
          conceptImg.alt = c.title;
          if (conceptTag) conceptTag.textContent = c.tag;
          if (conceptTitle) conceptTitle.textContent = c.title;
          if (conceptPersona) conceptPersona.innerHTML = '<strong>Target Persona:</strong> ' + c.persona;
          if (conceptHook) {
            conceptHook.textContent = c.hook;
            conceptHook.style.whiteSpace = 'pre-line';
          }
          if (conceptFile) conceptFile.textContent = c.file;

          if (conceptImgCard) {
            conceptImgCard.onclick = function () {
              app.openLightbox(c.src, c.title + ' (' + c.file + ')');
            };
          }
          conceptImg.style.opacity = '1';
        }, 150);
      }

      conceptBtns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
          setConcept(idx);
        });
      });

      // Default concept card click handler
      if (conceptImgCard && conceptsData[0]) {
        conceptImgCard.onclick = function () {
          app.openLightbox(conceptsData[0].src, conceptsData[0].title + ' (' + conceptsData[0].file + ')');
        };
      }
    }
  });

})(window, document);
