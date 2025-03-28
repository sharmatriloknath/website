// Navigation Toggle
// DOM Elements
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarLinks');
const menuClose = document.getElementById('menuClose');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.navbar-link');

// Theme Management
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
};

// Navigation Management
const toggleMenu = () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

const closeMenu = () => {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    document.body.style.overflow = '';
};

// Scroll Management
const handleScroll = () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Active Link Management
const setActiveLink = () => {
    let current = '';
    
    navLinks.forEach(link => {
        // Get the section id from the href attribute
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

// Event Listeners
window.addEventListener('load', () => {
    loadTheme();
    handleScroll();
    setActiveLink();
});

window.addEventListener('scroll', () => {
    handleScroll();
    setActiveLink();
});

navbarToggle.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', closeMenu);

// Close menu when clicking outside
navbarMenu.querySelector('.menu-backdrop').addEventListener('click', closeMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Close menu on window resize (if desktop size)
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navbarMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Enhanced Interactions for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    initTypewriter();
    
    // Terminal typing effect
    initTerminalTyping();
    
    // Resume viewer functionality
    initResumeViewer();
    
    // Scroll indicator functionality
    initScrollIndicator();
    
    // Floating shapes animation
    initFloatingShapes();
    
    // Initialize scroll reveal animations
    initScrollReveal();
});

// Typewriter effect implementation
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const roles = ['Data Scientist', 'ML Engineer', 'AI Specialist', 'Analytics Expert'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}

// Terminal typing effect
function initTerminalTyping() {
    const terminalText = document.querySelector('.terminal-text p');
    const originalText = terminalText.textContent;
    terminalText.textContent = '';
    
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < originalText.length) {
            terminalText.textContent += originalText.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
            // Add the blinking cursor at the end
            setTimeout(() => {
                document.querySelector('.terminal-prompt').style.display = 'flex';
            }, 500);
        }
    }, 20);
}

// Resume viewer functionality
function initResumeViewer() {
    const viewFullscreen = document.getElementById('view-fullscreen');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const resumeViewer = document.getElementById('resumeViewer');
    
    // Example PDF URL - replace with your actual resume PDF
    const resumePdfUrl = "portfolio_media/Trilok Nath CV.pdf";
    
    // Initialize the PDF viewer with your resume URL
    resumeViewer.src = resumePdfUrl;
    
    // Fullscreen functionality
    viewFullscreen.addEventListener('click', () => {
        if (resumeViewer.requestFullscreen) {
            resumeViewer.requestFullscreen();
        } else if (resumeViewer.mozRequestFullScreen) { // Firefox
            resumeViewer.mozRequestFullScreen();
        } else if (resumeViewer.webkitRequestFullscreen) { // Chrome, Safari and Opera
            resumeViewer.webkitRequestFullscreen();
        } else if (resumeViewer.msRequestFullscreen) { // IE/Edge
            resumeViewer.msRequestFullscreen();
        }
    });
    
    // Download PDF functionality
    downloadPdfBtn.addEventListener('click', () => {
        downloadPDF(resumePdfUrl, 'Trilok_Nath_Resume.pdf');
    });
    
    // Download PDF function
    function downloadPDF(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const projectsSection = document.getElementById('projects');
    
    scrollIndicator.addEventListener('click', () => {
        projectsSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Hide scroll indicator when scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 300);
        } else {
            scrollIndicator.style.display = 'flex';
            setTimeout(() => {
                scrollIndicator.style.opacity = '0.7';
            }, 10);
        }
    });
}

// Enhanced floating shapes animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Apply different starting positions
        shape.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg)`;
        
        // Create random movement with mouse interaction
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            const moveX = (mouseX - 0.5) * 20 * (index + 1) * 0.3;
            const moveY = (mouseY - 0.5) * 20 * (index + 1) * 0.3;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
        });
    });
}

// Intersection Observer for revealing elements on scroll
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add scroll reveal to sections when they come into view
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
}

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Preload any necessary resources
window.addEventListener('load', () => {
    // You can preload additional resources here if needed
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navbarLinks.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate Stats Progress Bars
function animateStats() {
    const statsElements = document.querySelectorAll('.stats-progress');
    statsElements.forEach(element => {
        const width = element.style.width;
        element.style.width = '0';
        setTimeout(() => {
            element.style.width = width;
        }, 300);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
            entry.target.style.opacity = 1;
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
    element.style.opacity = 0;
    observer.observe(element);
});


// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // Here you would typically send the form data to your backend
    alert('Thanks for your message! I will get back to you soon.');
    contactForm.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Check if this card has expandable content
        const expandedContent = card.querySelector('.expanded-content');
        const description = card.querySelector('.project-desc');
        
        // Only add click handler if there's expanded content or the description is truncated
        if (expandedContent || isTextTruncated(description)) {
            // Add click event to the card
            card.addEventListener('click', function(event) {
                // Prevent click if the github link was clicked
                if (event.target.closest('.github-link')) {
                    return;
                }
                
                // Toggle expanded state
                this.classList.toggle('expanded');
                
                // If any other card is expanded, collapse it
                projectCards.forEach(otherCard => {
                    if (otherCard !== this && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                    }
                });
            });
        } else {
            // Hide the expand indicator if there's no extra content
            const expandIndicator = card.querySelector('.expand-indicator');
            if (expandIndicator) {
                expandIndicator.style.display = 'none';
            }
        }
    });
    
    // Function to check if text is actually truncated
    function isTextTruncated(element) {
        return element.scrollHeight > element.clientHeight;
    }
    
    // Prevent github links from triggering card expansion
    document.querySelectorAll('.github-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Change button state
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission with timeout
    setTimeout(() => {
        // This is where you would send the data to your server
        // For demonstration, we're simulating a successful submission
        
        // Show success message
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Your message has been sent successfully!';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
        }, 5000);
        
    }, 1500);
    
    // In a real implementation, you would use fetch or axios to send the data
    // Example implementation:
    /*
    fetch('your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Your message has been sent successfully!';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    })
    .catch(error => {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'There was an error sending your message. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    });
    */
});
}
});