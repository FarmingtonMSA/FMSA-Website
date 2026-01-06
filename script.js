// FMSA Website JavaScript

// Initialize EmailJS
emailjs.init("osOerPkbsXjU8BTFC");

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Tab Switching for Articles & Videos
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const templateParams = {
            name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            message: document.getElementById('message').value,
            time: new Date().toLocaleString()
        };

        const serviceID = "service_alexon9";
        const templateID = "template_kc9rdwd";

        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                alert('Oops! Something went wrong. Please try again or email us directly.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Instagram Feed Integration
// Note: This is a placeholder. For actual Instagram feed, you'll need to:
// 1. Use Instagram Basic Display API or a service like Juicer.io
// 2. Get your access token
// 3. Fetch posts dynamically

function loadInstagramFeed() {
    const instagramFeed = document.getElementById('instagramFeed');
    
    if (!instagramFeed) return;

    // Placeholder Instagram posts - replace with actual API call
    const placeholderPosts = [
        {
            image: 'images/RetirementHomeVisitsImg.png',
            caption: 'Beautiful performance at local retirement home',
            link: 'https://www.instagram.com/fmsa.scholarsinsound/'
        },
        {
            image: 'images/HospitalHospicePerformancesImg.png',
            caption: 'Bringing comfort through music',
            link: 'https://www.instagram.com/fmsa.scholarsinsound/'
        },
        {
            image: 'images/MusicalShowcaceFundraisersImg.png',
            caption: 'Student showcase fundraiser success',
            link: 'https://www.instagram.com/fmsa.scholarsinsound/'
        }
    ];

    // Clear loading message
    instagramFeed.innerHTML = '';

    // Create post elements
    placeholderPosts.forEach(post => {
        const postElement = document.createElement('a');
        postElement.href = post.link;
        postElement.target = '_blank';
        postElement.className = 'instagram-post';

        postElement.innerHTML = `
            <img src="${post.image}" alt="Instagram post">
            <div class="instagram-overlay">
                <p>${post.caption}</p>
            </div>
        `;

        instagramFeed.appendChild(postElement);
    });

    // Add a note about live integration
    const note = document.createElement('p');
    note.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        color: var(--color-text-muted);
        margin-top: 2rem;
        font-style: italic;
    `;
    note.textContent = 'Follow us on Instagram @fmsa.scholarsinsound for live updates!';
    instagramFeed.appendChild(note);
}

// Load Instagram feed when page loads
document.addEventListener('DOMContentLoaded', loadInstagramFeed);

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .feature-card,
        .stat-card,
        .article-card,
        .reason-card,
        .team-member,
        .event-card,
        .partner-card,
        .gallery-item
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.3s ease ${index * 0.05}s`;
        observer.observe(el);
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(42, 38, 64, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(42, 38, 64, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// Scroll to top function
function scrollup() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Utility function for error handling (legacy)
function loadingerror(fallbackid, imgid) {
    const img = document.getElementById(imgid);
    const fallback = document.getElementById(fallbackid);
    if (img) img.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
}

// Add a "Back to Top" button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-yellow), var(--color-cream));
    color: var(--color-darker);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 10px 30px rgba(255, 232, 140, 0.4);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', scrollup);

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px)';
    backToTopButton.style.boxShadow = '0 15px 40px rgba(255, 232, 140, 0.6)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 10px 30px rgba(255, 232, 140, 0.4)';
});

console.log('%cFMSA Website Loaded Successfully!', 'font-size: 20px; color: #FFE88C; background: #4F4C71; padding: 10px; border-radius: 5px;');
console.log('%cFarmington Music Students Association', 'font-size: 14px; color: #C2BAE9;');
