// Site-wide interactivity for rhinoautomator.com
// Nav, footer, and sidebar are baked in at build time by Eleventy (_includes/*.njk);
// this file only handles behavior that genuinely needs JS.

// ── Intrapage navigation — auto-generated from headings with ids ──
// Usage: Add <div id="page-nav"></div> anywhere on the page.
// Scans h1/h2/h3 elements with an id (plus any [data-nav-label] element) and
// builds a sticky right-side table of contents. Active state updates on scroll.
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
      var a2 = document.createElement('a');
      a2.href = '#' + h.id;
      a2.textContent = h.label;
      a2.setAttribute('data-target', h.id);
      if (h.indent) a2.style.paddingLeft = '24px';
      if (h.indent) a2.style.fontSize = 'var(--fs-pagenav-sub)';
      li.appendChild(a2);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

// ── Mobile nav toggle — global so the onclick in nav.njk can call it ──
function toggleMobileNav(btn) {
  var nav = btn.closest('.site-nav');
  if (!nav) return;
  var open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// ── Nav dropdown toggle — global so the onclick in nav.njk can call it ──
function setNavDropdownState(dd, open) {
  dd.classList.toggle('open', open);
  var trigger = dd.querySelector('a');
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
