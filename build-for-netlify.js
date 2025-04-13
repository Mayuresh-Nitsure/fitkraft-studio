import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Generate a timestamp for this build
const buildTimestamp = new Date().toISOString();
console.log(`Build started at: ${buildTimestamp}`);

// Clean the dist directory if it exists
if (fs.existsSync('dist')) {
  console.log('Cleaning dist directory...');
  fs.rmSync('dist', { recursive: true, force: true });
}

// Run the build
console.log('Building the application...');
execSync('npm run build', { stdio: 'inherit' });

// Copy favicon to the dist directory
console.log('Copying favicon to dist directory...');
fs.copyFileSync('public/favicon.ico', 'dist/favicon.ico');

// Create a _headers file in the dist directory
console.log('Creating _headers file in dist directory...');
fs.writeFileSync('dist/_headers', `/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
`);

// Create a build-info.json file with the timestamp
console.log('Creating build-info.json file in dist directory...');
const buildNumber = Date.now();
fs.writeFileSync('dist/build-info.json', JSON.stringify({
  buildTimestamp,
  version: '1.0.0',
  buildNumber,
  openingHoursUpdated: true,
  faviconFixed: true
}, null, 2));

// Update index.html to include version query parameters and ensure correct title
console.log('Updating index.html with version query parameters and correct title...');
let indexHtml = fs.readFileSync('dist/index.html', 'utf8');

// Add version query parameters to assets
indexHtml = indexHtml.replace(/(\/assets\/[^"']+)("|')/g, `$1?v=${buildNumber}$2`);

// Ensure correct title - try multiple approaches
indexHtml = indexHtml.replace(/<title>[^<]*<\/title>/, '<title>Fitkraft Studio</title>');
indexHtml = indexHtml.replace(/fitkraft-landing-wizard/g, 'Fitkraft Studio');
indexHtml = indexHtml.replace(/FitKraft Studio - Transform Your Fitness Journey/g, 'Fitkraft Studio');
indexHtml = indexHtml.replace(/fitkraft - personal training/g, 'Fitkraft Studio');

// Ensure correct meta description - try multiple approaches
indexHtml = indexHtml.replace(/<meta name="description" content="[^"]*"/, '<meta name="description" content="FITKRAFT Personal Fitness Studio"');
indexHtml = indexHtml.replace(/Fitkraft Studio - Personal Fitness Training/g, 'FITKRAFT Personal Fitness Studio');

// Add a script to force the title and description
const titleScript = `
<script>
  // Force correct title and description
  document.addEventListener('DOMContentLoaded', function() {
    document.title = 'Fitkraft Studio';

    // Find and update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'FITKRAFT Personal Fitness Studio');
    }
  });
</script>
`;

// Add the script right before the closing head tag
indexHtml = indexHtml.replace('</head>', titleScript + '</head>');

fs.writeFileSync('dist/index.html', indexHtml);

// Remove lovable-uploads directory from the build
console.log('Removing lovable-uploads directory from the build...');
if (fs.existsSync('dist/lovable-uploads')) {
  fs.rmSync('dist/lovable-uploads', { recursive: true, force: true });
}

// Search for any files with 'lovable' in the name and remove them
console.log('Searching for and removing any lovable-related files...');
function removeFilesWithLovable(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip node_modules directory
      if (file.name !== 'node_modules') {
        removeFilesWithLovable(fullPath);
      }
    } else if (file.name.toLowerCase().includes('lovable') || file.name.toLowerCase().includes('loveable')) {
      console.log(`Removing file: ${fullPath}`);
      fs.unlinkSync(fullPath);
    }
  }
}

removeFilesWithLovable('dist');

console.log('Build completed successfully!');
