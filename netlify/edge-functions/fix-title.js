// This Edge Function will modify the HTML content to fix the title and description
export default async (request, context) => {
  // Get the response from the origin
  const response = await context.next();

  // Only process HTML responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }

  // Get the HTML content
  let html = await response.text();

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

  // Return the modified response
  return new Response(html, {
    headers: {
      'content-type': 'text/html',
      'cache-control': 'no-cache, no-store, must-revalidate',
      'pragma': 'no-cache',
      'expires': '0',
    },
  });
};
