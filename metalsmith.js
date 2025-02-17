const Metalsmith = require('metalsmith');
const markdown = require('@metalsmith/markdown');
const layouts = require('@metalsmith/layouts');
const permalinks = require('@metalsmith/permalinks');
const path = require('path');

Metalsmith(__dirname)
  .source('./src')  // Ensure source directory exists
  .destination('./build')
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    suppressNoFilesError: true, // Suppress error if no files found
  }))
  .build(err => {
    if (err) {
      console.error('Build failed:', err);
    } else {
      console.log('Build complete!');
    }
  });
