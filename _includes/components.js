// Shared component loader for rhinoautomator.com
// Loads nav.html and footer.html from _includes/ and injects them into placeholder elements.
//
// Usage: Add these elements to any page:
//   <div id="site-nav" data-base="." data-active="home"></div>
//   <div id="site-footer" data-base="."></div>
//
// data-base: relative path to the site root (e.g. "." for root pages, ".." for subdirectories)
// data-active: which nav item to highlight. Values:
//   "home", "framework-about", "framework-assessment", "blog", "community-seen-me", "about-me", "brand"

(function () {
  var navEl = document.getElementById('site-nav');
  var footerEl = document.getElementById('site-footer');
  if (!navEl && !footerEl) { window.__includesReady = Promise.resolve(); return; }

  var base = (navEl || footerEl).getAttribute('data-base') || '.';
  var active = navEl ? (navEl.getAttribute('data-active') || '') : '';

  function loadInto(el, file) {
    return fetch(base + '/_includes/' + file)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        el.outerHTML = html.replace(/\{\{base\}\}/g, base);
      })
      .catch(function (err) {
        console.warn('[includes] failed to load ' + file + ':', err);
      });
  }

  function setActive() {
    // Highlight active nav links
    var links = document.querySelectorAll('.site-nav [data-nav]');
    for (var i = 0; i < links.length; i++) {
      var nav = links[i].getAttribute('data-nav');
      if (nav === active) {
        links[i].classList.add('active');
      }
      // Also highlight parent dropdown triggers when a sub-item is active
      if (nav === 'framework' && (active === 'framework-about' || active === 'framework-assessment')) {
        links[i].classList.add('active');
      }
      if (nav === 'community' && (active === 'community-seen-me')) {
        links[i].classList.add('active');
      }
      if (nav === 'about' && (active === 'about-me' || active === 'brand')) {
        links[i].classList.add('active');
      }
    }
  }

  var jobs = [];
  if (navEl) jobs.push(loadInto(navEl, 'nav.html'));
  if (footerEl) jobs.push(loadInto(footerEl, 'footer.html'));

  // Other scripts (page-nav below) can wait on this to know the includes are in the DOM.
  window.__includesReady = Promise.all(jobs).then(function () {
    setActive();
    // Give the skip link in nav.html a target: tag the page's main content region.
    if (!document.getElementById('main-content')) {
      var main = document.querySelector('.blog-main, .content, .team-layout, .hero, .section');
      if (main) {
        main.id = 'main-content';
        main.setAttribute('tabindex', '-1');
      }
    }
  });
})();

// Intrapage navigation — auto-generated from h2[id] elements
// Usage: Add <div id="page-nav"></div> anywhere on the page.
// The script scans for all h2 elements with an id attribute and builds a sticky
// right-side table of contents. Active state updates on scroll.
(function () {
  var container = document.getElementById('page-nav');
  if (!container) return;

  // Inject page-nav styles once
  var style = document.createElement('style');
  style.textContent =
    '.page-nav-wrapper { display: flex; gap: 32px; }' +
    '.page-nav-wrapper > :first-child { flex: 1; min-width: 0; }' +
    '.page-nav { position: sticky; top: 24px; width: 180px; flex-shrink: 0; max-height: calc(100vh - 48px); overflow-y: auto; }' +
    '.page-nav ul { list-style: none; margin: 0; padding: 0; border-left: 1px solid var(--border); }' +
    '.page-nav li { margin: 0; }' +
    '.page-nav a { display: block; padding: 6px 14px; font-family: var(--ff-body); font-size: var(--fs-pagenav); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); text-decoration: none; border-left: 2px solid transparent; margin-left: -1px; transition: all 0.15s; line-height: 1.4; }' +
    '.page-nav a:hover { color: var(--text); }' +
    '.page-nav a.active { color: var(--emerald); border-left-color: var(--emerald); }' +
    '@media (max-width: 960px) { .page-nav { display: none; } .page-nav-wrapper { display: block; } }';
  document.head.appendChild(style);

  function build() {
    // Collect h1[id], h2[id], h3[id] elements and any element with data-nav-label
    var hTags = document.querySelectorAll('h1[id], h2[id], h3[id]');
    var labeled = document.querySelectorAll('[data-nav-label]');
    // Merge into a single ordered list by document position
    var all = [];
    for (var a = 0; a < hTags.length; a++) {
      var tag = hTags[a].tagName;
      all.push({ el: hTags[a], label: hTags[a].textContent, id: hTags[a].id, indent: tag === 'H3' });
    }
    for (var b = 0; b < labeled.length; b++) {
      var el = labeled[b];
      all.push({ el: el, label: el.getAttribute('data-nav-label'), id: el.id, indent: el.hasAttribute('data-nav-indent') });
    }
    all.sort(function (x, y) {
      var pos = x.el.compareDocumentPosition(y.el);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    var headings = all;
    if (!headings.length) return;

    var nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.setAttribute('aria-label', 'Page sections');
    var ul = document.createElement('ul');

    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.label;
      a.setAttribute('data-target', h.id);
      if (h.indent) a.style.paddingLeft = '24px';
      if (h.indent) a.style.fontSize = 'var(--fs-pagenav-sub)';
      li.appendChild(a);
      ul.appendChild(li);
    }
    nav.appendChild(ul);
    container.appendChild(nav);

    // Scroll-spy: highlight the link whose section is currently in view
    var links = nav.querySelectorAll('a');
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var current = '';
        for (var j = 0; j < headings.length; j++) {
          if (headings[j].el.getBoundingClientRect().top <= 120) {
            current = headings[j].id;
          }
        }
        for (var k = 0; k < links.length; k++) {
          if (links[k].getAttribute('data-target') === current) {
            links[k].classList.add('active');
          } else {
            links[k].classList.remove('active');
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Build once the nav/footer includes are in the DOM (no timing race)
  function start() {
    (window.__includesReady || Promise.resolve()).then(build);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

// Mobile nav toggle — global so the onclick in nav.html can call it
function toggleMobileNav(btn) {
  var nav = btn.closest('.site-nav');
  if (!nav) return;
  var open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// Nav dropdown toggle — global so the onclick in nav.html can call it
function setNavDropdownState(dd, open) {
  dd.classList.toggle('open', open);
  var trigger = dd.firstElementChild;
  if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function toggleNavDropdown(e, id) {
  e.preventDefault();
  e.stopPropagation();
  var target = document.getElementById(id);
  var allDropdowns = document.querySelectorAll('.nav-dropdown');
  for (var i = 0; i < allDropdowns.length; i++) {
    if (allDropdowns[i] !== target) setNavDropdownState(allDropdowns[i], false);
  }
  setNavDropdownState(target, !target.classList.contains('open'));
}
document.addEventListener('click', function (e) {
  var allDropdowns = document.querySelectorAll('.nav-dropdown');
  for (var i = 0; i < allDropdowns.length; i++) {
    if (!allDropdowns[i].contains(e.target)) setNavDropdownState(allDropdowns[i], false);
  }
});
