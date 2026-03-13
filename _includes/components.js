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
  if (!navEl && !footerEl) return;

  var base = (navEl || footerEl).getAttribute('data-base') || '.';
  var active = navEl ? (navEl.getAttribute('data-active') || '') : '';

  function inject(el, html) {
    el.outerHTML = html;
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

  var loaded = 0;
  var total = (navEl ? 1 : 0) + (footerEl ? 1 : 0);

  function done() {
    loaded++;
    if (loaded >= total) setActive();
  }

  if (navEl) {
    fetch(base + '/_includes/nav.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        inject(navEl, html.replace(/\{\{base\}\}/g, base));
        done();
      })
      .catch(function () { done(); });
  }

  if (footerEl) {
    fetch(base + '/_includes/footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        inject(footerEl, html.replace(/\{\{base\}\}/g, base));
        done();
      })
      .catch(function () { done(); });
  }
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

  // Build after a short delay so other components (nav/footer injection) finish first
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(build, 50); });
  } else {
    setTimeout(build, 50);
  }
})();

// Nav dropdown toggle — global so the onclick in nav.html can call it
function toggleNavDropdown(e, id) {
  e.preventDefault();
  e.stopPropagation();
  var target = document.getElementById(id);
  var allDropdowns = document.querySelectorAll('.nav-dropdown');
  for (var i = 0; i < allDropdowns.length; i++) {
    if (allDropdowns[i] !== target) allDropdowns[i].classList.remove('open');
  }
  target.classList.toggle('open');
}
document.addEventListener('click', function (e) {
  var allDropdowns = document.querySelectorAll('.nav-dropdown');
  for (var i = 0; i < allDropdowns.length; i++) {
    if (!allDropdowns[i].contains(e.target)) allDropdowns[i].classList.remove('open');
  }
});
