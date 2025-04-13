// Scroll animation utility

export const initScrollAnimations = () => {
  // Check if IntersectionObserver is available
  if (!('IntersectionObserver' in window)) {
    // If not supported, make all elements visible
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animate-in');
    });
    document.querySelectorAll('.stagger-children').forEach(el => {
      el.classList.add('animate-in');
    });
    return;
  }

  // Create observer for regular animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Observe all elements with stagger-children class
  document.querySelectorAll('.stagger-children').forEach(el => {
    observer.observe(el);
  });

  // Initialize smooth scrolling for anchor links
  initSmoothScrolling();
};

// Smooth scrolling functionality
export const initSmoothScrolling = () => {
  // Handle smooth scroll for anchor links
  const handleSmoothScroll = (e: Event) => {
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

    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight - 20, // Additional 20px for spacing
      behavior: 'smooth',
    });
  };

  // Add event listener to the document for better event delegation
  document.addEventListener('click', handleSmoothScroll);

  // Highlight active section in navigation
  const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      if (window.scrollY >= sectionTop - navbarHeight - 100) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveSection);

  // Initial highlight
  setTimeout(highlightActiveSection, 100);
};
