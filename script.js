// Typing effect for the entire hero headline
window.addEventListener('DOMContentLoaded', () => {
  const typeSpan = document.querySelector('.type-animate');
  if (!typeSpan) return;
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
      setTimeout(type, 32); // 0.75x speed (slower)
    }
  }
  type();

  // Simple glowing animation for profile image
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
      // Remove and re-add animation classes for a fresh effect
      const animatedEls = aboutSection.querySelectorAll('.about-title, .about-summary, .education-block, .about-highlights, .edu-item');
      animatedEls.forEach(el => {
        el.style.animation = 'none';
        // Force reflow
        void el.offsetWidth;
        el.style.animation = '';
      });
    });
  }

  // Advanced scroll-triggered About section animation: burst effect for words
  if (aboutSection) {
    const animatedEls = aboutSection.querySelectorAll('.about-title, .about-summary, .education-block, .about-highlights, .edu-item');
    const aboutWords = aboutSection.querySelectorAll('.about-animate-word');
    let hasAnimated = false;
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          // Animate block elements
          animatedEls.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = '';
          });
          // Burst effect: animate each word in rapid succession
          aboutWords.forEach((el, i) => {
            el.style.animation = 'none';
            void el.offsetWidth;
            setTimeout(() => {
              el.style.animation = `thrownInLeft 0.7s cubic-bezier(.22,1,.36,1) both`;
              el.style.animationDelay = '0s';
            }, 0.5 * i * 100); // 0.5x delay (50ms) between each word
          });
          hasAnimated = true;
        }
        if (!entry.isIntersecting) {
          hasAnimated = false;
        }
      });
    }, { threshold: 0.3 });
    observer.observe(aboutSection);
  }
}); 