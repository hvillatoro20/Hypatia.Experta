document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenuBtn.innerHTML = navList.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // =============================================
    // Smooth Scrolling for Navigation Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // =============================================
    // Header Scroll Effect
    // =============================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // =============================================
    // Testimonial Slider
    // =============================================
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    // Initialize slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
        resetTestimonialInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        resetTestimonialInterval();
    });
    
    // Auto-rotate testimonials
    startTestimonialInterval();
    
    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        startTestimonialInterval();
    });
    
    // =============================================
    // Team Filter Tabs
    // =============================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter team members
            const category = button.getAttribute('data-category');
            
            teamMembers.forEach(member => {
                if (category === 'all' || member.getAttribute('data-category') === category) {
                    member.style.display = 'flex';
                } else {
                    member.style.display = 'none';
                }
            });
        });
    });
    
    // =============================================
    // Form Validation and Submission
    // =============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                showAlert('Por favor complete todos los campos requeridos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Por favor ingrese un correo electrónico válido', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            showAlert('Gracias por su mensaje. Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Add to form
        contactForm.insertBefore(alert, contactForm.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    // =============================================
    // Animated Counter for Stats
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target + '+';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
    
    // =============================================
    // Scroll Animations
    // =============================================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
                
                // Trigger counters when stats section is visible
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections with hidden class
    document.querySelectorAll('.hidden').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize hidden sections for scroll animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show first section immediately
    document.querySelector('.hero').classList.remove('hidden');
    document.querySelector('.hero').classList.add('show');
    
    // =============================================
    // Current Year in Footer
    // =============================================
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});