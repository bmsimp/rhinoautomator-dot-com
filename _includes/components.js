// Shared component loader for rhinoautomator.com
// Loads nav.html and footer.html from _includes/ and injects them into placeholder elements.
//
// Usage: Add these elements to any page:
//   <div id="site-nav" data-base="." data-active="home"></div>
//   <div id="site-footer" data-base="."></div>
//
// data-base: relative path to the site root (e.g. "." for root pages, ".." for subdirectories)
// data-active: which nav item to highlight. Values:
//   "home", "brand", "framework-about", "framework-assessment"

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
      // Also highlight the Framework parent dropdown trigger when a sub-item is active
      if (nav === 'framework' && (active === 'framework-about' || active === 'framework-assessment')) {
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

// Nav dropdown toggle — global so the onclick in nav.html can call it
function toggleNavDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('fw-dropdown').classList.toggle('open');
}
document.addEventListener('click', function (e) {
  var dd = document.getElementById('fw-dropdown');
  if (dd && !dd.contains(e.target)) dd.classList.remove('open');
});
