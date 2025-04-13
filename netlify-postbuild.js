// This script runs after the build on Netlify
console.log('Running Netlify post-build script...');

// Import required modules
const fs = require('fs');
const path = require('path');

// Function to ensure the correct title and description in HTML files
function fixTitleAndDescription(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing title and description in ${filePath}...`);
    let html = fs.readFileSync(filePath, 'utf8');

    // Fix title
    html = html.replace(/<title>[^<]*<\/title>/g, '<title>Fitkraft Studio</title>');
    html = html.replace(/fitkraft-landing-wizard/g, 'Fitkraft Studio');
    html = html.replace(/FitKraft Studio - Transform Your Fitness Journey/g, 'Fitkraft Studio');
    html = html.replace(/fitkraft - personal training/g, 'Fitkraft Studio');

    // Fix description
    html = html.replace(/<meta name="description" content="[^"]*"/g, '<meta name="description" content="FITKRAFT Personal Fitness Studio"');

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

    // Add the script right before the closing head tag if it doesn't already exist
    if (!html.includes('Force correct title and description')) {
      html = html.replace('</head>', titleScript + '</head>');
    }

    fs.writeFileSync(filePath, html);
  }
}

// Get the build timestamp
const buildTimestamp = new Date().toISOString();
console.log(`Post-build script running at: ${buildTimestamp}`);

// Create a build-verification.html file
const verificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        .info-section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
        .highlight {
            font-weight: bold;
            color: #4a90e2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Build Verification</h1>

        <div class="info-section">
            <h2>Build Information</h2>
            <p>Build Timestamp: <span class="highlight">${buildTimestamp}</span></p>
            <p>Build Number: <span class="highlight">${Date.now()}</span></p>
        </div>

        <div class="info-section">
            <h2>Opening Hours</h2>
            <p>Monday to Friday: <span class="highlight">6:00 AM - 9:00 AM, 6:00 PM - 8:00 PM</span></p>
            <p>Saturday and Sunday: <span class="highlight">7:00 AM - 8:00 PM</span></p>
        </div>

        <p>This page confirms that the latest build has been deployed with the updated opening hours.</p>
    </div>
</body>
</html>
`;

// Write the verification file to the publish directory
fs.writeFileSync(path.join(process.env.PUBLISH_DIR || 'dist', 'build-verification.html'), verificationHtml);

// Remove any lovable-related directories or files
const publishDir = process.env.PUBLISH_DIR || 'dist';
console.log('Removing any lovable-related content from the build...');

// Check if lovable-uploads directory exists and remove it
if (fs.existsSync(path.join(publishDir, 'lovable-uploads'))) {
  console.log('Removing lovable-uploads directory...');
  fs.rmSync(path.join(publishDir, 'lovable-uploads'), { recursive: true, force: true });
}

// Search for any files with 'lovable' in the name and remove them
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

removeFilesWithLovable(publishDir);

// Fix title and description in all HTML files
console.log('Fixing title and description in all HTML files...');

// Fix the main index.html file
fixTitleAndDescription(path.join(publishDir, 'index.html'));

// Fix the build-verification.html file
fixTitleAndDescription(path.join(publishDir, 'build-verification.html'));

// Create a copy of index.html as 200.html (used by Netlify for SPA routing)
const indexHtmlPath = path.join(publishDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  console.log('Creating 200.html file...');
  fs.copyFileSync(indexHtmlPath, path.join(publishDir, '200.html'));
}

// Create a copy of index.html as 404.html
console.log('Creating 404.html file...');
fs.copyFileSync(indexHtmlPath, path.join(publishDir, '404.html'));

console.log('Post-build script completed successfully!');
