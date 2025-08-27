// Main JavaScript file for ARATANI BASE website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initFeatherIcons();
    
    // Initialize page-specific features
    if (window.location.pathname.includes('news')) {
        initNewsFeatures();
    }
    
    if (window.location.pathname.includes('concept')) {
        initGallery();
        initSlideshow();
        initImageModal();
    }
});

// Mobile navigation menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = navMenu.classList.contains('active') 
                    ? 'rotate(45deg)' 
                    : 'rotate(0deg)';
            });
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'rotate(0deg)';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'rotate(0deg)';
                });
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade-in animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.closest('.features-grid') || entry.target.closest('.news-grid')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Feather icons
function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// News page specific features
function initNewsFeatures() {
    // Category filtering is already handled in news/index.html
    // This function can be extended for additional news features
    console.log('News page features initialized');
}

// Gallery tab functionality for concept page
function initGallery() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const gallerySections = document.querySelectorAll('.gallery-section-content');
    
    if (galleryTabs.length === 0 || gallerySections.length === 0) return;
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and sections
            galleryTabs.forEach(t => t.classList.remove('active'));
            gallerySections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Reinitialize feather icons for the new content
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
                
                // Trigger fade-in animations for gallery items
                const fadeInElements = targetSection.querySelectorAll('.gallery-item');
                fadeInElements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    console.log('Gallery features initialized');
}

// Slideshow functionality
let currentSlideIndex = 0;
let slides = [];

function initSlideshow() {
    slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Show first slide
    showSlide(0);
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    console.log('Slideshow initialized');
}

function changeSlide(direction) {
    if (slides.length === 0) return;
    
    // Hide current slide
    slides[currentSlideIndex].classList.remove('active');
    const currentIndicator = document.querySelectorAll('.indicator')[currentSlideIndex];
    if (currentIndicator) {
        currentIndicator.classList.remove('active');
    }
    const currentCaption = document.querySelectorAll('.slide-caption')[currentSlideIndex];
    if (currentCaption) {
        currentCaption.classList.remove('active');
    }
    
    // Calculate new index
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Show new slide
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    if (slides.length === 0) return;
    
    // Hide current slide
    slides[currentSlideIndex].classList.remove('active');
    const currentIndicator = document.querySelectorAll('.indicator')[currentSlideIndex];
    if (currentIndicator) {
        currentIndicator.classList.remove('active');
    }
    const currentCaption = document.querySelectorAll('.slide-caption')[currentSlideIndex];
    if (currentCaption) {
        currentCaption.classList.remove('active');
    }
    
    // Show selected slide
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    if (slides.length === 0 || index < 0 || index >= slides.length) return;
    
    // Show slide
    slides[index].classList.add('active');
    
    // Update indicator
    const indicator = document.querySelectorAll('.indicator')[index];
    if (indicator) {
        indicator.classList.add('active');
    }
    
    // Update caption
    const caption = document.querySelectorAll('.slide-caption')[index];
    if (caption) {
        caption.classList.add('active');
    }
}

// 画像モーダル機能
let modalImageData = {
    isDragging: false,
    isZoomed: false,
    startX: 0,
    startY: 0,
    translateX: 0,
    translateY: 0
};

function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) return;
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeImageModal();
        }
    });
    
    // モーダル背景をクリックして閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // 画像のドラッグ機能
    modalImage.addEventListener('mousedown', startDrag);
    modalImage.addEventListener('mousemove', drag);
    modalImage.addEventListener('mouseup', endDrag);
    modalImage.addEventListener('mouseleave', endDrag);
    
    // ダブルクリックでズーム
    modalImage.addEventListener('dblclick', toggleZoom);
    
    // タッチデバイス対応
    modalImage.addEventListener('touchstart', startDragTouch);
    modalImage.addEventListener('touchmove', dragTouch);
    modalImage.addEventListener('touchend', endDragTouch);
    
    console.log('Image modal initialized');
}

function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImage || !modalCaption) return;
    
    modalImage.src = src;
    modalImage.alt = alt;
    modalCaption.textContent = alt;
    modal.style.display = 'block';
    
    // リセット
    resetImagePosition();
    
    // アイコンを再描画
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        resetImagePosition();
    }
}

function resetImagePosition() {
    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;
    
    modalImage.classList.remove('zoomed');
    modalImage.style.transform = 'translate(0, 0)';
    modalImageData = {
        isDragging: false,
        isZoomed: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0
    };
}

function toggleZoom() {
    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;
    
    modalImageData.isZoomed = !modalImageData.isZoomed;
    
    if (modalImageData.isZoomed) {
        modalImage.classList.add('zoomed');
    } else {
        modalImage.classList.remove('zoomed');
        modalImage.style.transform = 'translate(0, 0)';
        modalImageData.translateX = 0;
        modalImageData.translateY = 0;
    }
}

function startDrag(e) {
    if (!modalImageData.isZoomed) return;
    
    modalImageData.isDragging = true;
    modalImageData.startX = e.clientX - modalImageData.translateX;
    modalImageData.startY = e.clientY - modalImageData.translateY;
    e.preventDefault();
}

function drag(e) {
    if (!modalImageData.isDragging || !modalImageData.isZoomed) return;
    
    modalImageData.translateX = e.clientX - modalImageData.startX;
    modalImageData.translateY = e.clientY - modalImageData.startY;
    
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.transform = `translate(${modalImageData.translateX}px, ${modalImageData.translateY}px)`;
    }
}

function endDrag() {
    modalImageData.isDragging = false;
}

// タッチイベント対応
function startDragTouch(e) {
    if (!modalImageData.isZoomed || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    modalImageData.isDragging = true;
    modalImageData.startX = touch.clientX - modalImageData.translateX;
    modalImageData.startY = touch.clientY - modalImageData.translateY;
    e.preventDefault();
}

function dragTouch(e) {
    if (!modalImageData.isDragging || !modalImageData.isZoomed || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    modalImageData.translateX = touch.clientX - modalImageData.startX;
    modalImageData.translateY = touch.clientY - modalImageData.startY;
    
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.transform = `translate(${modalImageData.translateX}px, ${modalImageData.translateY}px)`;
    }
    e.preventDefault();
}

function endDragTouch() {
    modalImageData.isDragging = false;
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\-\(\)\+\s]+$/;
    return re.test(phone);
}

// Contact form enhancements
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Remove error state on focus
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
    }
    
    // Apply visual feedback
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
    }
    
    return isValid;
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date for Japanese locale
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Generate unique ID
    generateId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Performance optimizations
window.addEventListener('resize', utils.debounce(function() {
    // Handle responsive adjustments
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}, 250));

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add paths to critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics integration placeholder
function initAnalytics() {
    // Google Analytics or other analytics service integration
    // Example:
    // gtag('config', 'GA_MEASUREMENT_ID');
}

// Cookie consent (if needed)
function initCookieConsent() {
    // Cookie consent implementation
    // Check if consent is already given
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent banner
        // This is a placeholder - implement according to your needs
    }
}

// Accessibility enhancements
function initAccessibility() {
    // Focus management for mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });
    }
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initContactForm();
});

// Export utilities for other scripts
window.ArataniBase = {
    utils: utils,
    validateEmail: validateEmail,
    validatePhone: validatePhone
};