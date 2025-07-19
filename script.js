// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = window.innerWidth <= 768 ? 70 : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced header scroll effects with mobile optimization
let lastScrollTop = 0;
let ticking = false;

function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll (mobile only)
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
    }
});

// Enhanced mobile navigation with touch support
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (navToggle && navMenu) {
    // Toggle menu on click
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });

    // Close menu when clicking outside (desktop and mobile)
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });

    // Prevent scroll when menu is open on mobile
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Enhanced current status with real-time updates and mobile optimization
function updateCurrentStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + (currentMinute / 60);
    
    const openTime = 7.5; // 7:30 AM
    const closeTime = 22.5; // 10:30 PM
    
    const statusElements = document.querySelectorAll('.current-status');
    
    statusElements.forEach(statusElement => {
        if (currentTime >= openTime && currentTime <= closeTime) {
            statusElement.textContent = 'Open Now';
            statusElement.style.background = 'var(--success-green)';
            statusElement.style.animation = 'pulse 2s infinite';
        } else {
            if (currentTime < openTime) {
                statusElement.textContent = 'Opens at 7:30 AM';
            } else {
                statusElement.textContent = 'Opens tomorrow at 7:30 AM';
            }
            statusElement.style.background = '#dc3545';
            statusElement.style.animation = 'none';
        }
    });
}

// Pulse animation for open status
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Update status immediately and every minute
updateCurrentStatus();
setInterval(updateCurrentStatus, 60000);

// Enhanced intersection observer with mobile optimization
const observerOptions = {
    threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
    rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Progressive enhancement for animations with mobile considerations
document.addEventListener('DOMContentLoaded', function() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Animate sections
        const sections = document.querySelectorAll('.about, .menu, .hours, .contact, .features-strip');
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // Animate menu items with stagger (reduced on mobile)
        const menuItems = document.querySelectorAll('.menu-item');
        const staggerDelay = window.innerWidth <= 768 ? 0.05 : 0.1;
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * staggerDelay}s, transform 0.6s ease ${index * staggerDelay}s`;
            observer.observe(item);
        });

        // Animate feature items
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(feature);
        });

        // Animate contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
            observer.observe(card);
        });
    }
});

// Enhanced hover effects with touch device support
document.querySelectorAll('.menu-item').forEach(item => {
    // Only add hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Add touch feedback for mobile
    item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
        this.style.transition = 'transform 0.1s ease';
    });
    
    item.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});

// Phone number click tracking with enhanced mobile feedback
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            // Enhanced mobile feedback
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            this.textContent = 'Calling...';
            
            // Haptic feedback on supported devices
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.textContent = originalText;
            }, 1500);
            
            console.log('Phone number clicked');
        });
    });
});

// Enhanced image loading with mobile optimization
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.setAttribute('data-loaded', 'false');
        
        if (img.complete) {
            img.setAttribute('data-loaded', 'true');
        } else {
            img.addEventListener('load', function() {
                this.setAttribute('data-loaded', 'true');
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.5';
                console.warn('Failed to load image:', this.src);
            });
        }
    });
});

// Active navigation highlighting with mobile optimization
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Throttle scroll events on mobile for better performance
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        const offset = window.innerWidth <= 768 ? 100 : 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - offset)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, window.innerWidth <= 768 ? 100 : 50);
});

// Hero stats counter animation with mobile considerations
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Animate hero stats when they come into view
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                
                // Skip animation for time formats (contains colon)
                if (text.includes(':')) {
                    stat.dataset.animated = 'true';
                    return;
                }
                
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    stat.dataset.suffix = text.replace(/\d/g, '');
                    animateCounter(stat, number);
                }
            });
            heroStatsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }
});

// Enhanced accessibility features with mobile support
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-purple);
        color: white;
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1002;
        transition: top 0.3s;
        font-size: 0.875rem;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
});

// Performance optimization: Enhanced lazy loading for mobile
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: window.innerWidth <= 768 ? '50px' : '100px'
    });

    // Apply lazy loading to images below the fold
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// Touch and gesture support for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Add touch class for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Close mobile menu on orientation change
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('nav-open');
        }
        
        // Recalculate observer thresholds
        setTimeout(() => {
            observerOptions.threshold = window.innerWidth <= 768 ? 0.05 : 0.1;
            observerOptions.rootMargin = window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px';
        }, 100);
    });
});

// Smooth page transitions and loading states with mobile optimization
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class initially
    document.body.classList.add('loading');
    
    // Remove loading class when everything is ready
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, window.innerWidth <= 768 ? 50 : 100);
    });
});

// Enhanced error handling for external links with mobile feedback
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Add visual feedback for external links
                this.style.opacity = '0.7';
                
                // Mobile haptic feedback
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            } catch (error) {
                console.warn('External link interaction failed:', error);
            }
        });
    });
});

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    // Disable hover effects on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .menu-item:hover,
            .about-image-card:hover,
            .contact-card:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add touch feedback to buttons
    document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Viewport height fix for mobile browsers
function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVHProperty();
window.addEventListener('resize', setVHProperty);
window.addEventListener('orientationchange', () => {
    setTimeout(setVHProperty, 100);
});