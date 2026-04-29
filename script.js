// ========================================
// ANEEQ PORTFOLIO - ANIMATIONS & INTERACTIVITY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // CUSTOM CURSOR
  // ========================================
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 5 + 'px';
    cursor.style.top = mouseY - 5 + 'px';
  });
  
  // Smooth follower movement
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX - 15 + 'px';
    cursorFollower.style.top = followerY - 15 + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  
  // Cursor hover effect
  const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'scale(1.5)';
      cursorFollower.style.borderColor = '#ff6b35';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'scale(1)';
      cursorFollower.style.borderColor = '#ff6b35';
    });
  });

  // ========================================
  // PARTICLES BACKGROUND
  // ========================================
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  const particles = [];
  const particleCount = 80;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // ========================================
  // STATS COUNTER ANIMATION
  // ========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.count);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const updateCount = () => {
            current += increment;
            if (current < target) {
              stat.textContent = Math.floor(current) + '+';
              requestAnimationFrame(updateCount);
            } else {
              stat.textContent = target + '+';
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ========================================
  // PORTFOLIO FILTER
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ========================================
  // TESTIMONIALS AUTO SLIDE
  // ========================================
  const testimonialsSlider = document.querySelector('.testimonials-slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  testimonialsSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - testimonialsSlider.offsetLeft;
    scrollLeft = testimonialsSlider.scrollLeft;
  });
  
  testimonialsSlider.addEventListener('mouseleave', () => isDown = false);
  testimonialsSlider.addEventListener('mouseup', () => isDown = false);
  
  testimonialsSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialsSlider.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialsSlider.scrollLeft = scrollLeft - walk;
  });

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.padding = '15px 50px';
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      navbar.style.padding = '20px 50px';
      navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
  });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '15px';
  });

  // ========================================
  // CONTACT FORM SUBMIT
  // ========================================
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      btn.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
      btn.style.background = '#00d4aa';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });

  // ========================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // PARALLAX EFFECT ON HERO
  // ========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - scrolled / 700;
    }
  });

  // ========================================
  // SERVICE CARDS HOVER SOUND EFFECT (OPTIONAL)
  // ========================================
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ========================================
  // PRELOADER (Optional)
  // ========================================
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  
  // Set initial body opacity for fade-in effect
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
});

// ========================================
// ADDITIONAL: TILT EFFECT FOR CARDS
// ========================================
document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});