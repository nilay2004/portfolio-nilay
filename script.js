document.addEventListener('DOMContentLoaded', () => {
  // Typing effect for the entire hero headline
  const typeSpan = document.querySelector('.type-animate');
  if (typeSpan) {
    const text = "Hi, I'm\nNilay Pandya\n— Full Stack Developer & Data Scientist 🚀";
    let i = 0;
    typeSpan.textContent = '';
    function type() {
      if (i < text.length) {
        if (text[i] === '\n') {
          typeSpan.innerHTML += '<br>';
        } else {
          typeSpan.innerHTML += text[i];
        }
        i++;
        setTimeout(type, 32);
      }
    }
    type();
  }

  // Simple glowing animation for profile image (if element exists)
  const profileImg = document.querySelector('.profile-img-placeholder');
  if (profileImg) {
    profileImg.animate([
      { boxShadow: '0 0 20px 5px #00ffd0, 0 0 40px 10px #7f5cff' },
      { boxShadow: '0 0 40px 10px #7f5cff, 0 0 80px 20px #00ffd0' },
      { boxShadow: '0 0 20px 5px #00ffd0, 0 0 40px 10px #7f5cff' }
    ], {
      duration: 3000,
      iterations: Infinity
    });
  }

  // Scroll and animate About section on nav click
  const aboutLink = document.querySelector('a[href="#about"]');
  const aboutSection = document.getElementById('about');
  if (aboutLink && aboutSection) {
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const animatedEls = aboutSection.querySelectorAll('.about-title, .about-summary, .education-block, .about-highlights, .edu-item');
      animatedEls.forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
    });
  }

  // --- SMOOTH SCROLL FOR NAVBAR LINKS ---
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navbar = document.querySelector('.navbar');

  if (navLinks.length > 0 && navbar) {
    const navbarHeight = navbar.offsetHeight;

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Special re-animation for the 'About' section if it's the target
          if (targetId === '#about') {
              const animatedEls = targetElement.querySelectorAll('.about-title, .about-summary, .education-block, .about-highlights, .edu-item');
              setTimeout(() => {
                  animatedEls.forEach(el => {
                      el.style.animation = 'none';
                      void el.offsetWidth;
                      el.style.animation = '';
                  });
              }, 700); // Delay matches smooth scroll duration
          }
        }
      });
    });
  }

  // Advanced scroll-triggered About section animation
  if (aboutSection) {
    const aboutWords = aboutSection.querySelectorAll('.about-animate-word');
    let hasAnimated = false;
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated && aboutWords.length > 0) {
          aboutWords.forEach((el, i) => {
            el.style.animation = 'none';
            void el.offsetWidth;
            setTimeout(() => {
              el.style.animation = `thrownInLeft 0.7s cubic-bezier(.22,1,.36,1) both`;
            }, 50 * i);
          });
          hasAnimated = true;
        }
        if (!entry.isIntersecting) {
          hasAnimated = false; // Allow animation to re-trigger
        }
      });
    }, { threshold: 0.3 });
    observer.observe(aboutSection);
  }

  // --- NEW, ROBUST SKILLS TABS FUNCTIONALITY ---
  const tabsContainer = document.querySelector('.skills-tabs');
  const gridsContainer = document.querySelector('.skills-grid-container');

  if (tabsContainer && gridsContainer) {
    const tabs = tabsContainer.querySelectorAll('.skill-tab-btn');
    const grids = gridsContainer.querySelectorAll('.skills-grid');

    tabsContainer.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.skill-tab-btn');
      
      if (!clickedTab) return; // Exit if the click was not on a tab button

      // Prevent default button behavior
      event.preventDefault();

      // Get the target grid's ID from the data-tab attribute
      const targetId = clickedTab.dataset.tab;
      const targetGrid = gridsContainer.querySelector(`#${targetId}`);

      // Deactivate all tabs and grids
      tabs.forEach(tab => tab.classList.remove('active'));
      grids.forEach(grid => grid.classList.remove('active'));

      // Activate the clicked tab and the corresponding grid
      clickedTab.classList.add('active');
      if (targetGrid) {
        targetGrid.classList.add('active');
      }
    });
  }

  // --- ADVANCED SCROLL-TRIGGERED ANIMATIONS FOR ALL SECTIONS ---
  const scrollAnimatedEls = document.querySelectorAll(
    '.about-section, .about-title, .about-summary, .about-highlights, .edu-item, .skills-section, .projects-section, .contact-section, .exp-item, .timeline-item, .skill-card, .hero-section, .stat-item, .terminal-card'
  );

  // Add pre-animate class initially
  scrollAnimatedEls.forEach(el => el.classList.add('pre-animate'));

  // Intersection Observer for scroll animations (trigger on enter and leave)
  const scrollObserver = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
        } else {
          entry.target.classList.remove('animate-on-scroll');
        }
      });
    },
    { threshold: 0.15 }
  );

  scrollAnimatedEls.forEach(el => {
    scrollObserver.observe(el);
  });

  // --- PROJECTS SECTION ANIMATION ---
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    projectCards.forEach(card => {
      card.classList.add('pre-animate');
    });
    const projectObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
          } else {
            entry.target.classList.remove('animate-on-scroll');
          }
        });
      },
      { threshold: 0.18 }
    );
    projectCards.forEach(card => {
      projectObserver.observe(card);
    });
  }
});

// --- ADVANCED CUSTOM CURSOR ANIMATION ---
const cursor = document.getElementById('custom-cursor');
if (cursor) {
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = 0.92;
  });

  const hoverTargets = 'a, button, .btn, input, textarea, select, .skill-card, .terminal-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  window.addEventListener('mouseout', () => cursor.style.opacity = 0);
  window.addEventListener('mouseover', () => cursor.style.opacity = 0.92);
}