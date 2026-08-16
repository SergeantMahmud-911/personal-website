document.addEventListener('DOMContentLoaded', () => {

    /* 1. Mobile Menu */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    if (navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    });

    /* 2. Theme Toggle */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            themeIcon.style.color = '#f59e0b';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeIcon.style.color = '';
        }
    }

    /* 3. Active Nav on Scroll */
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /* 4. Hobbies Filter */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hobbyCards = document.querySelectorAll('.hobby-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            hobbyCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                    }, 30);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* 5. Contact Form Simulation */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.style.color = '#10b981';
            contactForm.reset();
            setTimeout(() => { formStatus.textContent = ''; }, 5000);
        });
    }

    /* 6. Dynamic Year */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
});