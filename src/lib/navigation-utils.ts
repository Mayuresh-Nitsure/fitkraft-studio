/**
 * Utility functions for navigation
 */

/**
 * Highlights the active section in the navigation based on scroll position
 */
export const highlightActiveSection = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Get the navbar height to use as offset
  const navbar = document.querySelector('header');
  const navbarHeight = navbar ? navbar.offsetHeight : 80;

  // Find the current section
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = (section as HTMLElement).offsetTop;
    const sectionHeight = (section as HTMLElement).offsetHeight;

    // If the scroll position is within the section (with some offset)
    if (window.scrollY >= sectionTop - navbarHeight - 100) {
      currentSection = section.getAttribute('id') || '';
    }
  });

  // Update active class on navigation links
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

/**
 * Handles smooth scrolling for anchor links
 */
export const handleSmoothScroll = (e: Event) => {
  const target = (e.target as HTMLElement).closest('a[href^="#"]');
  if (!target) return;

  e.preventDefault();
  const href = target.getAttribute('href');
  if (!href) return;

  const targetElement = document.querySelector(href);
  if (!targetElement) return;

  // Get the height of the navbar to offset the scroll position
  const navbar = document.querySelector('header');
  const navbarHeight = navbar ? navbar.offsetHeight : 80;

  // Calculate offset based on screen size (smaller offset for mobile)
  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? 10 : 20;

  window.scrollTo({
    top: (targetElement as HTMLElement).offsetTop - navbarHeight - offset,
    behavior: 'smooth',
  });
};

/**
 * Initializes navigation functionality
 */
export const initNavigation = () => {
  // Add event listener for smooth scrolling
  document.addEventListener('click', handleSmoothScroll);

  // Add event listener for highlighting active section
  window.addEventListener('scroll', highlightActiveSection);

  // Initial highlight
  setTimeout(highlightActiveSection, 100);

  return () => {
    // Cleanup
    document.removeEventListener('click', handleSmoothScroll);
    window.removeEventListener('scroll', highlightActiveSection);
  };
};
