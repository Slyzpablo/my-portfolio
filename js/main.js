/* 
   -----------------------------------------
   MAIN JAVASCRIPT
   -----------------------------------------
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const toggleTheme = () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            icon.className = 'bi bi-moon-stars';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            icon.className = 'bi bi-sun';
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggle.addEventListener('click', toggleTheme);

    // Check for saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.setAttribute('data-theme', 'light');
        icon.className = 'bi bi-sun';
    }

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const links = document.querySelectorAll('a, button, .project-card, .service-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('follower-hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('follower-hover');
        });
    });

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Smooth Scrolling for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    // Add reveal class to revealable elements
    const revealables = document.querySelectorAll('.hero-content, .hero-visual, .section-header, .about-text, .about-skills, .about-visual, .project-card, .service-card, .contact-info, .contact-form');
    revealables.forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });
});
