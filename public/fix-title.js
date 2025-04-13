// Force correct title and description
document.addEventListener('DOMContentLoaded', function() {
  document.title = 'Fitkraft Studio';
  
  // Find and update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'FITKRAFT Personal Fitness Studio');
  }
});
