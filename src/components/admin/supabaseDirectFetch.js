// Direct Supabase API access without any dependencies
const SUPABASE_URL = "https://xqmujsdspymsacjzhoyh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbXVqc2RzcHltc2Fjanpob3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTQ5NDUsImV4cCI6MjA1OTkzMDk0NX0.IspVcIDlUu5UDw1AnYhA5rV1erdQYBUa-irAO4wvtMM";

/**
 * Fetches contact submissions directly from Supabase REST API
 * @returns {Promise<Array>} Array of contact submissions
 */
export async function fetchContactSubmissions() {
  try {
    console.log('Fetching contact submissions directly...');
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }
}

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    return new Date(dateString).toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}
