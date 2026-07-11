// Blog sidebar loader and interaction
// Loads sidebar.html and injects it, then highlights the active page.
//
// Usage: <div id="blog-sidebar" data-blogbase="." data-blog-active="auto-teams"></div>
//
// data-blogbase: relative path to /blog/ (e.g. "." from /blog/index.html, ".." from /blog/automations/x.html)
// data-blog-active: which sidebar item to highlight (matches data-blog-nav values in sidebar.html)

(function () {
  var el = document.getElementById('blog-sidebar');
  if (!el) return;

  var blogbase = el.getAttribute('data-blogbase') || '.';
  var active = el.getAttribute('data-blog-active') || '';

  fetch(blogbase + '/sidebar.html')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(function (html) {
      html = html.replace(/\{\{blogbase\}\}/g, blogbase);
      el.outerHTML = html;

      // Highlight active link
      var links = document.querySelectorAll('.blog-sidebar [data-blog-nav]');
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-blog-nav') === active) {
          links[i].classList.add('active');

          // If this is a sub-item, expand all ancestor sections
          var subItems = links[i].closest('.sub-items');
          while (subItems) {
            subItems.classList.add('open');
            var parentLink = subItems.previousElementSibling;
            if (parentLink) parentLink.classList.add('expanded');
            subItems = subItems.parentElement ? subItems.parentElement.closest('.sub-items') : null;
          }

          // If this is a parent link, expand its children
          var childId = links[i].getAttribute('data-children');
          if (childId) {
            var children = document.getElementById(childId);
            if (children) children.classList.add('open');
            links[i].classList.add('expanded');
          }
        }
      }
    })
    .catch(function (err) {
      console.warn('[blog] failed to load sidebar:', err);
      var placeholder = document.getElementById('blog-sidebar');
      if (placeholder) placeholder.remove();
    });
})();

// Toggle expandable sidebar sections
// If the parent link is already active (we're on that page), toggle its children.
// Otherwise, navigate to the link's href so the index page loads.
function toggleBlogSection(e, id) {
  var link = e.currentTarget;
  var target = document.getElementById(id);

  // If this section is already expanded (we're viewing it or a child), toggle collapse
  if (target.classList.contains('open')) {
    e.preventDefault();
    target.classList.remove('open');
    link.classList.remove('expanded');
  } else {
    // If the link itself is active (we're on the index page), just expand without navigating
    if (link.classList.contains('active')) {
      e.preventDefault();
      target.classList.add('open');
      link.classList.add('expanded');
    }
    // Otherwise, let the browser navigate to the href (index page)
  }
}
