// Typing Animation
const roles = [
    "Problem Solver",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI/ML Enthusiast", 
];

// Name constants for cycling animation
const namePlain = "Hi, I'm Aditya Chilla";
const nameSegmentsCycle = [
    { text: "Hi, I'm ", isGradient: false, start: 0, end: 8 },
    { text: "Aditya", isGradient: true, start: 8, end: 14 },
    { text: " ", isGradient: false, start: 14, end: 15 },
    // { text: "Venkata", isGradient: true, start: 15, end: 22 },
    // { text: " ", isGradient: false, start: 15, end: 22 },
    { text: "Chilla", isGradient: true, start: 15, end: 21}
];

// Animation state
let charIndex = 0;
let nameTypingSpeed = 80;

// Type name
function typeName() {
    const nameElement = document.getElementById('nameText');
    const nameSegments = [
        { text: "Hi, I'm ", isGradient: false, start: 0, end: 8 },
        { text: "Aditya", isGradient: true, start: 8, end: 14 },
        { text: " ", isGradient: false, start: 14, end: 15 },
        // { text: "Venkata", isGradient: true, start: 15, end: 22 },
        // { text: " ", isGradient: false, start: 22, end: 23 },
        { text: "Chilla", isGradient: true, start: 15, end: 21}
    ];
    
    if (charIndex < 29) { // Total length: "Hi, I'm Aditya Venkata Chilla"
        let formattedText = '';
        
        for (let segment of nameSegments) {
            if (charIndex + 1 > segment.end) {
                // Full segment is visible
                if (segment.isGradient) {
                    formattedText += `<span class="gradient-text">${segment.text}</span>`;
                } else {
                    formattedText += segment.text;
                }
            } else if (charIndex + 1 > segment.start) {
                // Partial segment
                const visibleChars = charIndex + 1 - segment.start;
                const visibleText = segment.text.substring(0, visibleChars);
                if (segment.isGradient) {
                    formattedText += `<span class="gradient-text">${visibleText}</span>`;
                } else {
                    formattedText += visibleText;
                }
                break;
            }
        }
        
        nameElement.innerHTML = formattedText;
        charIndex++;
        setTimeout(typeName, nameTypingSpeed);
    } else {
        // Ensure final text is displayed correctly
        nameElement.innerHTML = 'Hi, I\'m <span class="gradient-text">Aditya</span> <span class="gradient-text">Chilla</span>';
        // Wait a bit, then start typing roles
        charIndex = 0;
        roleIndex = 0;
        isDeleting = false;
        rolesCompleted = false;
        nameCycleStarted = false;
        setTimeout(typeRole, 1000);
    }
}

// Type roles (cycling animation)
let roleIndex = 0;
let isDeleting = false;
let roleTypingSpeed = 100;
let rolesCompleted = false; // Track if all roles have been shown once
let nameCycleStarted = false; // Track if name cycle has been triggered

function typeRole() {
    const typedTextElement = document.getElementById('typedText');
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        roleTypingSpeed = 50;
    } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        roleTypingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        roleTypingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        const previousRoleIndex = roleIndex;
        roleIndex = (roleIndex + 1) % roles.length;
        
        // Check if we've completed a full cycle of all roles (when we wrap from last role back to first)
        if (previousRoleIndex === roles.length - 1 && roleIndex === 0) {
            rolesCompleted = true;
            // If name cycle is complete, restart it. Otherwise, start it for the first time.
            if (nameCycleComplete) {
                resetAndRestartNameCycle();
            } else if (!nameCycleStarted) {
                startNameCycle();
            }
        }
        
        roleTypingSpeed = 500; // Pause before next role
    }
    
    setTimeout(typeRole, roleTypingSpeed);
}

// Cycle name animation (continuously types and deletes)
let nameCharIndex = 0;
let nameIsDeleting = false;
let nameCycleSpeed = 100;
let nameCycleComplete = false;

function startNameCycle() {
    nameCycleStarted = true;
    nameCycleComplete = false;
    nameCharIndex = namePlain.length; // Start at full length (name is fully shown)
    nameIsDeleting = true; // Start by deleting since name is already shown
    nameCycleSpeed = 2000; // Pause first, then start deleting
    setTimeout(cycleName, nameCycleSpeed);
}

function cycleName() {
    const nameElement = document.getElementById('nameText');
    
    if (nameIsDeleting) {
        // Deleting - nameCharIndex represents how many characters to show (0 to namePlain.length)
        if (nameCharIndex > 0) {
            let formattedText = '';
            for (let segment of nameSegmentsCycle) {
                if (nameCharIndex > segment.end) {
                    // Full segment is visible
                    if (segment.isGradient) {
                        formattedText += `<span class="gradient-text">${segment.text}</span>`;
                    } else {
                        formattedText += segment.text;
                    }
                } else if (nameCharIndex > segment.start) {
                    // Partial segment
                    const visibleChars = nameCharIndex - segment.start;
                    const visibleText = segment.text.substring(0, visibleChars);
                    if (segment.isGradient) {
                        formattedText += `<span class="gradient-text">${visibleText}</span>`;
                    } else {
                        formattedText += visibleText;
                    }
                    break;
                }
            }
            nameElement.innerHTML = formattedText;
            nameCharIndex--;
            nameCycleSpeed = 50;
        } else {
            // Finished deleting, switch to typing
            nameIsDeleting = false;
            nameCharIndex = 0;
            nameCycleSpeed = 1000; // Pause before retyping
        }
    } else {
        // Typing
        if (nameCharIndex < namePlain.length) {
            let formattedText = '';
            for (let segment of nameSegmentsCycle) {
                if (nameCharIndex + 1 > segment.end) {
                    if (segment.isGradient) {
                        formattedText += `<span class="gradient-text">${segment.text}</span>`;
                    } else {
                        formattedText += segment.text;
                    }
                } else if (nameCharIndex + 1 > segment.start) {
                    const visibleChars = nameCharIndex + 1 - segment.start;
                    const visibleText = segment.text.substring(0, visibleChars);
                    if (segment.isGradient) {
                        formattedText += `<span class="gradient-text">${visibleText}</span>`;
                    } else {
                        formattedText += visibleText;
                    }
                    break;
                }
            }
            nameElement.innerHTML = formattedText;
            nameCharIndex++;
            nameCycleSpeed = 100;
        } else {
            // Name is fully typed back - cycle is complete, stop and wait for next role cycle
            // Ensure full name is displayed
            nameElement.innerHTML = 'Hi, I\'m <span class="gradient-text">Aditya</span> <span class="gradient-text">Chilla</span>';
            nameCycleComplete = true;
            nameCycleStarted = false; // Reset so it can be triggered again after next role cycle
            // Don't call cycleName again - wait for next role cycle to restart
            return;
        }
    }
    
    // Continue cycling if cycle is still active
    if (nameCycleStarted) {
        setTimeout(cycleName, nameCycleSpeed);
    }
}

// Function to reset and restart name cycle after roles complete
function resetAndRestartNameCycle() {
    // Reset name cycle state
    nameCycleComplete = false;
    // Start the name cycle again
    startNameCycle();
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation sequence (name then roles)
    typeName();
    
    // Add fade-in animation to elements
    const elementsToAnimate = document.querySelectorAll('.glass-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                description: formData.get('description')
            };
            
            // Here you can integrate with a backend service or email service
            // For now, we'll show a success message
            alert(`Thank you ${data.name}! Your message has been received. I'll get back to you soon at ${data.email}.`);
            
            // Reset form
            contactForm.reset();
            
            // Optional: You can integrate with services like:
            // - EmailJS (https://www.emailjs.com/)
            // - Formspree (https://formspree.io/)
            // - Your own backend API
        });
    }
});

// Scroll Progress Indicator (optional enhancement)
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // You can use this to add a progress bar if desired
    // document.querySelector('.progress-bar').style.width = scrollPercentage + '%';
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function setActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        } else {
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.remove('active');
            });
        }
    });
}

window.addEventListener('scroll', setActiveSection);