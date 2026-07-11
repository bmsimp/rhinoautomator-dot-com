// Blog sidebar interaction
// The sidebar markup is baked in at build time (_includes/sidebar.njk); this script
// highlights the active page (from the aside's data-active attribute, set per page
// via blogActive front matter) and expands its ancestor sections.

(function () {
  var sidebar = document.querySelector('.blog-sidebar');
  if (!sidebar) return;

  var active = sidebar.getAttribute('data-active') || '';
  if (!active) return;

  var links = sidebar.querySelectorAll('[data-blog-nav]');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('data-blog-nav') !== active) continue;
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
