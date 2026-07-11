const SITE_URL = 'https://rhinoautomator.com';

module.exports = function (eleventyConfig) {
  // Only .html pages (and .njk layouts) are templates; .md files (README, CLAUDE) are ignored.
  // HTML content is NOT run through a template engine — several blog posts document
  // Rewst's Jinja syntax ({{ CTX.* }}) which must survive verbatim. Layouts are Nunjucks.

  // Preserve the site's existing URLs exactly: about/brand.html stays /about/brand.html
  // (Eleventy's default "pretty URL" would move it to /about/brand/).
  eleventyConfig.addGlobalData('permalink', () => {
    return (data) => `${data.page.filePathStem}.html`;
  });

  eleventyConfig.addGlobalData('layout', 'base.njk');

  eleventyConfig.addGlobalData('eleventyComputed', {
    canonical: (data) => SITE_URL + data.page.url.replace(/index\.html$/, ''),
    ogType: (data) =>
      data.ogType ||
      (data.page.url.startsWith('/blog/') && data.page.url !== '/blog/'
        ? 'article'
        : 'website'),
  });

  // Static assets copied verbatim to the output
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('blog/blog.css');
  eleventyConfig.addPassthroughCopy('blog/blog.js');
  eleventyConfig.addPassthroughCopy('favicon.svg');
  eleventyConfig.addPassthroughCopy('og-image.png');

  return {
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
    dir: {
      input: '.',
      includes: '_includes',
      output: '_site',
    },
  };
};
