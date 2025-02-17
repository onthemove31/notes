const Metalsmith = require('metalsmith');
const markdown = require('@metalsmith/markdown');
const layouts = require('@metalsmith/layouts');
const permalinks = require('@metalsmith/permalinks');
const collections = require('@metalsmith/collections');
const fs = require('fs');

// Ensure source directory exists
if (!fs.existsSync('./src') || fs.readdirSync('./src').length === 0) {
  console.error("Error: 'src/' directory is missing or empty.");
  process.exit(1);
}

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(collections({
    pages: { pattern: '*.md' },
    guides: { pattern: 'guides/*.md' }
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    suppressNoFilesError: true // Prevents build failure if no files exist
  }))
  .use((files, metalsmith, done) => {
    console.log('Processing files:', Object.keys(files)); // Debugging output
    done();
  })
  .build(err => {
    if (err) console.error('Build failed:', err);
    else console.log('Wiki built successfully!');
  });
