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
    .then(function (r) { return r.text(); })
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
    });
})();

// Toggle expandable sidebar sections
function toggleBlogSection(e, id) {
  e.preventDefault();
  var target = document.getElementById(id);
  var link = e.currentTarget;
  if (target.classList.contains('open')) {
    target.classList.remove('open');
    link.classList.remove('expanded');
  } else {
    target.classList.add('open');
    link.classList.add('expanded');
  }
}
