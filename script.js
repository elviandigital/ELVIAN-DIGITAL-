/* ==========================================================
   ELVIAN Digital — script.js
   Modules: CONFIG, DATA, Links, Mail, Nav, Tabs/Cards, Form, UI
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. Configuration ---------- */
  const CONFIG = {
    brand: 'ELVIAN Digital',
    email: 'elviandigital@gmail.com',
    instagram: 'https://www.instagram.com/elviandigital/',
    links: {
      dnsp1: 'https://my.dnsphost.in/project-guidance?ref=elviandigital', // Student section trigger
      dnsp2: 'https://my.dnsphost.in/project-leads?ref=elviandigital'     // General business section trigger
    }
  };

  /* ---------- 2. Service data ---------- */
  // [name, icon, category key, short description]
  const STUDENT_CATEGORIES = [
    { key: 'commerce', label: 'Commerce & Finance' },
    { key: 'booking', label: 'Booking & Listings' },
    { key: 'management', label: 'Management Systems' },
    { key: 'content', label: 'Content & Community' }
  ];

  const STUDENT_PROJECTS = [
    ['E-commerce Web Portal', '🛒', 'commerce', 'Product catalogue, cart and checkout flow.'],
    ['Donation Web Portal', '🤝', 'commerce', 'Collect and track donations for causes.'],
    ['Real Estate Listing', '🏠', 'booking', 'Property listings with search and enquiries.'],
    ['Tourism Booking', '🧳', 'booking', 'Browse destinations and book tour packages.'],
    ['Online Selling Portal', '🏷️', 'commerce', 'Let sellers list items and manage orders.'],
    ['Pharmacy Management', '💊', 'management', 'Medicine stock, billing and prescriptions.'],
    ['Hotel Reservation', '🏨', 'booking', 'Room availability and booking system.'],
    ['Grocery Delivery App', '🥕', 'commerce', 'Order groceries with delivery scheduling.'],
    ['Visual Tour Guide', '🗺️', 'content', 'Interactive visual guide to places.'],
    ['Student Management', '🎓', 'management', 'Student records, attendance and results.'],
    ['Crowd Funding Platform', '💡', 'commerce', 'Campaigns, pledges and funding progress.'],
    ['Job Portal System', '💼', 'content', 'Job posts, applications and employer panel.'],
    ['Digital Learning LMS', '📚', 'content', 'Courses, lessons and learner tracking.'],
    ['Jim Management', '🏋️', 'management', 'Members, plans and fee tracking.'],
    ['Doctor Consultation', '🩺', 'booking', 'Find doctors and book appointments.'],
    ['Event Ticket', '🎟️', 'booking', 'Event listing with ticket booking.'],
    ['Online Auction System', '🔨', 'commerce', 'Live bidding with auction timers.'],
    ['Courier Tracker', '📦', 'commerce', 'Parcel booking and shipment tracking.'],
    ['Car Rental Portal', '🚗', 'booking', 'Browse vehicles and reserve rentals.'],
    ['Food Blog and Recipe', '🍲', 'content', 'Publish recipes with categories and search.'],
    ['Social Media Forum', '💬', 'content', 'Threads, replies and user profiles.'],
    ['News Magazine', '📰', 'content', 'Article publishing with sections.'],
    ['Platform Portfolio App', '🧩', 'content', 'Showcase multiple projects in one platform.'],
    ['Portfolio Site', '🖼️', 'content', 'A personal portfolio to present your work.'],
    ['Inventory Management', '🗃️', 'management', 'Stock levels, suppliers and reports.'],
    ['Salon Booking', '💇', 'booking', 'Service menu and appointment slots.'],
    ['Library Management', '📖', 'management', 'Book issue, return and member records.'],
    ['Complaint Portal', '📣', 'management', 'Submit, assign and resolve complaints.'],
    ['E-wallet Interface', '👛', 'commerce', 'Wallet balance, transfers and history.'],
    ['Task Management', '✅', 'management', 'Tasks, deadlines and progress boards.']
  ];

  const BUSINESS_CATEGORIES = [
    { key: 'web', label: 'Web & Design' },
    { key: 'growth', label: 'Hosting & Growth' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'legal', label: 'Legal & Registration' }
  ];

  const BUSINESS_SERVICES = [
    ['Website Designing', '🎨', 'web', 'Modern, responsive websites tailored to your brand.'],
    ['Domain and Hosting', '🌐', 'growth', 'Domain registration and reliable web hosting.'],
    ['E-commerce Web Portal', '🛍️', 'web', 'Online stores built to sell and scale.'],
    ['Logo and Creative Designing', '✏️', 'web', 'Logos, branding and creative assets.'],
    ['Trademark Registration', '®️', 'legal', 'Protect your brand name and logo.'],
    ['Business Email Services', '📧', 'growth', 'Professional email on your own domain.'],
    ['SEO and Google Listing', '🔍', 'growth', 'Get found on search and local listings.'],
    ['Corporate Website', '🏢', 'web', 'A credible online presence for your company.'],
    ['Tourism Website', '🌴', 'web', 'Showcase destinations, packages and bookings.'],
    ['Real Estate Portal', '🏘️', 'web', 'Property listings with lead capture.'],
    ['Online Booking Site', '📅', 'web', 'Let customers book services online.'],
    ['School Management Portal', '🏫', 'web', 'Admissions, students, staff and notices.'],
    ['AI-based Web Platform', '🤖', 'web', 'Smart web platforms powered by AI features.'],
    ['Payment Gateway Integration', '💳', 'integrations', 'Accept online payments securely.'],
    ['SMS Gateway Integration', '📱', 'integrations', 'Send alerts and OTPs by SMS.'],
    ['API Gateway Integration', '🔌', 'integrations', 'Connect your systems through APIs.'],
    ['WhatsApp Gateway Integration', '💬', 'integrations', 'Automate WhatsApp messages and updates.'],
    ['Company Registration', '📝', 'legal', 'Support with registering your company.']
  ];

  /* ---------- 3. Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- 4. Dual referral routing ---------- */
  const Links = {
    // Any element with data-link="dnsp1" | "dnsp2" receives the matching URL.
    bind(root = document) {
      $$('[data-link]', root).forEach((el) => {
        const url = CONFIG.links[el.dataset.link];
        if (!url) return;
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      });
      $$('[data-social="instagram"]', root).forEach((el) => {
        el.setAttribute('href', CONFIG.instagram);
      });
    }
  };

  /* ---------- 5. Mailto handlers ---------- */
  const Mail = {
    build({ subject = '', body = '' } = {}) {
      const params = [];
      if (subject) params.push('subject=' + encodeURIComponent(subject));
      if (body) params.push('body=' + encodeURIComponent(body));
      return 'mailto:' + CONFIG.email + (params.length ? '?' + params.join('&') : '');
    },
    // data-body may contain %0A sequences; decode once so encodeURIComponent doesn't double-encode.
    safeDecode(str) {
      try { return decodeURIComponent(str); } catch (e) { return str; }
    },
    bind(root = document) {
      $$('[data-mail]', root).forEach((el) => {
        el.setAttribute('href', Mail.build({
          subject: el.dataset.subject || 'Enquiry from ' + CONFIG.brand,
          body: Mail.safeDecode(el.dataset.body || '')
        }));
      });
      const emailLink = $('#emailLink');
      if (emailLink) emailLink.textContent = CONFIG.email;
    }
  };

  /* ---------- 6. Mobile navigation (ARIA) ---------- */
  const Nav = {
    init() {
      const toggle = $('#navToggle');
      const nav = $('#primaryNav');
      if (!toggle || !nav) return;

      const set = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        nav.classList.toggle('open', open);
      };

      toggle.addEventListener('click', () => {
        set(toggle.getAttribute('aria-expanded') !== 'true');
      });

      nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) set(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          set(false);
          toggle.focus();
        }
      });

      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) set(false);
      });

      window.matchMedia('(min-width: 761px)').addEventListener('change', (m) => {
        if (m.matches) set(false);
      });
    }
  };

  /* ---------- 7. Service sections: cards + tabbed filtering ---------- */
  function createCard(item, categories, linkKey) {
    const [name, icon, cat, desc] = item;
    const catLabel = (categories.find((c) => c.key === cat) || {}).label || '';

    const card = document.createElement('article');
    card.className = 'card reveal';
    card.dataset.category = cat;

    const iconEl = document.createElement('div');
    iconEl.className = 'card-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = icon;

    const catEl = document.createElement('span');
    catEl.className = 'card-cat';
    catEl.textContent = catLabel;

    const title = document.createElement('h3');
    title.textContent = name;

    const text = document.createElement('p');
    text.textContent = desc;

    const link = document.createElement('a');
    link.className = 'card-link';
    link.dataset.link = linkKey;
    link.textContent = linkKey === 'dnsp1' ? 'Get guidance →' : 'Enquire now →';
    link.setAttribute('aria-label', (linkKey === 'dnsp1' ? 'Get guidance for ' : 'Enquire about ') + name);

    card.append(iconEl, catEl, title, text, link);
    return card;
  }

  function initServiceSection({ tabsId, gridId, countId, items, categories, linkKey, noun }) {
    const tabsEl = $(tabsId);
    const gridEl = $(gridId);
    const countEl = $(countId);
    if (!tabsEl || !gridEl) return;

    const tabList = [{ key: 'all', label: 'All' }].concat(categories);
    const panelId = gridEl.id;

    tabsEl.setAttribute('role', 'tablist');
    tabsEl.setAttribute('aria-label', 'Filter ' + noun + ' by category');
    gridEl.setAttribute('role', 'tabpanel');

    // Build cards
    items.forEach((item) => gridEl.appendChild(createCard(item, categories, linkKey)));
    const cards = $$('.card', gridEl);

    // Build tabs
    const tabs = tabList.map((t, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab';
      btn.id = tabsEl.id + '-' + t.key;
      btn.dataset.filter = t.key;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', panelId);
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.tabIndex = i === 0 ? 0 : -1;
      const total = t.key === 'all' ? items.length : items.filter((x) => x[2] === t.key).length;
      btn.textContent = t.label + ' (' + total + ')';
      tabsEl.appendChild(btn);
      return btn;
    });
    gridEl.setAttribute('aria-labelledby', tabs[0].id);

    function select(btn, focus) {
      const filter = btn.dataset.filter;
      tabs.forEach((t) => {
        const active = t === btn;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
      });
      gridEl.setAttribute('aria-labelledby', btn.id);

      let shown = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) { shown++; card.classList.add('visible'); }
      });
      if (countEl) {
        const label = filter === 'all' ? 'all categories' : btn.textContent.replace(/\s*\(\d+\)$/, '');
        countEl.textContent = 'Showing ' + shown + ' ' + noun + ' in ' + label;
      }
      if (focus) btn.focus();
    }

    tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[role="tab"]');
      if (btn) select(btn, false);
    });

    // Arrow-key navigation between tabs
    tabsEl.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(document.activeElement);
      if (idx < 0) return;
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });

    select(tabs[0], false);
    Links.bind(gridEl); // bind data-link on the freshly rendered cards
  }

  /* ---------- 8. Contact form -> mailto ---------- */
  const Form = {
    init() {
      const form = $('#contactForm');
      const errorEl = $('#formError');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const type = form.type.value;
        const message = form.message.value.trim();

        [form.name, form.email, form.message].forEach((f) => f.classList.remove('invalid'));
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const problems = [];
        if (!name) { form.name.classList.add('invalid'); problems.push('name'); }
        if (!emailOk) { form.email.classList.add('invalid'); problems.push('a valid email'); }
        if (!message) { form.message.classList.add('invalid'); problems.push('a message'); }

        if (problems.length) {
          errorEl.textContent = 'Please enter ' + problems.join(', ') + '.';
          errorEl.hidden = false;
          return;
        }
        errorEl.hidden = true;

        const body = [
          'Name: ' + name,
          'Email: ' + email,
          'Interested in: ' + type,
          '',
          message
        ].join('\n');

        window.location.href = Mail.build({
          subject: type + ' enquiry from ' + name,
          body
        });
      });
    }
  };

  /* ---------- 9. Small UI helpers ---------- */
  const UI = {
    year() {
      const y = $('#year');
      if (y) y.textContent = new Date().getFullYear();
    },
    reveal() {
      const els = $$('.reveal');
      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('visible'));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      els.forEach((el) => io.observe(el));
    }
  };

  /* ---------- 10. Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initServiceSection({
      tabsId: '#businessTabs', gridId: '#businessGrid', countId: '#businessCount',
      items: BUSINESS_SERVICES, categories: BUSINESS_CATEGORIES, linkKey: 'dnsp2', noun: 'services'
    });
    initServiceSection({
      tabsId: '#studentTabs', gridId: '#studentGrid', countId: '#studentCount',
      items: STUDENT_PROJECTS, categories: STUDENT_CATEGORIES, linkKey: 'dnsp1', noun: 'projects'
    });

    Links.bind();
    Mail.bind();
    Nav.init();
    Form.init();
    UI.year();
    UI.reveal();
  });
})();
