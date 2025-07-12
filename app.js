document.addEventListener('DOMContentLoaded', function() {
    // Video hover functionality
    const videos = [
        document.getElementById('projectVideo1'),
        document.getElementById('projectVideo2'),
        document.getElementById('projectVideo3')
    ];

    videos.forEach(video => {
        if (video) {
            const container = video.parentElement;
            
            container.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play failed:', e));
                container.style.transform = 'translateY(-10px)';
            });
            
            container.addEventListener('mouseleave', () => {
                video.pause();
                container.style.transform = 'translateY(0)';
            });
            
            // Reset video on mouse leave
            container.addEventListener('mouseleave', () => {
                video.currentTime = 0;
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('header ul a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-box form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Scroll reveal animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .project-card, .skills-box, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.card, .project-card, .skills-box, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});