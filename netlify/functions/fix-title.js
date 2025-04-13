// This function will modify the HTML content to fix the title and description
exports.handler = async (event, context) => {
  // Only process HTML responses
  const isHtml = event.headers['content-type'] && event.headers['content-type'].includes('text/html');
  
  if (!isHtml) {
    return {
      statusCode: 200,
      body: event.body,
      headers: event.headers,
    };
  }

  // Get the HTML content
  let html = event.body;

  // Fix the title
  html = html.replace(/<title>[^<]*<\/title>/g, '<title>Fitkraft Studio</title>');
  html = html.replace(/fitkraft-landing-wizard/g, 'Fitkraft Studio');
  html = html.replace(/FitKraft Studio - Transform Your Fitness Journey/g, 'Fitkraft Studio');
  html = html.replace(/fitkraft - personal training/g, 'Fitkraft Studio');

  // Fix the description
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

  return {
    statusCode: 200,
    body: html,
    headers: {
      ...event.headers,
      'cache-control': 'no-cache, no-store, must-revalidate',
      'pragma': 'no-cache',
      'expires': '0',
    },
  };
};
