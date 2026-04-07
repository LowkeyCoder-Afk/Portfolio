document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animated Typing Text Logic
    const dynamicText = document.getElementById("animated-text");
    const words = ["Java Systems", "RESTful APIs", "Backend Logic", "Clean Code"];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Typing speeds
        let typeSpeed = isDeleting ? 50 : 100;
        
        // Word is fully typed out
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } 
        // Word is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);

    // 2. Scroll Animation Observer (Fade In Elements)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEntry = document.querySelector(targetId);
            
            if(targetEntry) {
                targetEntry.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // 4. Click Name for Contact Info
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.addEventListener('click', () => {
            alert("Contact Information:\n\n📧 Email: ikshitabhatnagar16@gmail.com\n📞 Phone: +91 7065653155\n📍 Location: Ghaziabad, UP\n\nLooking forward to connecting!");
        });
    }
    // 5. Technical Skill Clickable Links
    // Dictionary mapping your skills to their official sites
    const techLinks = {
        "Java": "https://dev.java/",
        "Python": "https://www.python.org/",
        "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        "SQL": "https://en.wikipedia.org/wiki/SQL",
        "Spring Boot": "https://spring.io/projects/spring-boot",
        "REST APIs": "https://restfulapi.net/",
        "JDBC": "https://docs.oracle.com/javase/tutorial/jdbc/",
        "React": "https://react.dev/",
        "MySQL": "https://www.mysql.com/",
        "Git": "https://git-scm.com/",
        "GitHub": "https://github.com/",
        "VS Code": "https://code.visualstudio.com/",
        "OOP": "https://en.wikipedia.org/wiki/Object-oriented_programming",
        "SDLC": "https://en.wikipedia.org/wiki/Systems_development_life_cycle",
        "Clean Code": "https://www.freecodecamp.org/news/clean-coding-for-beginners/",
        "Modular Architecture": "https://en.wikipedia.org/wiki/Modular_programming",
        "Exception Handling": "https://en.wikipedia.org/wiki/Exception_handling",
        "DSA": "https://en.wikipedia.org/wiki/Data_structure",
        "Core Java": "https://dev.java/",
        "Spring Data JPA": "https://spring.io/projects/spring-data-jpa",
        "Collections": "https://docs.oracle.com/javase/8/docs/technotes/guides/collections/",
        "Spotify Web API": "https://developer.spotify.com/documentation/web-api",
        "OAuth 2.0": "https://oauth.net/2/"
    };

    // Grab all skill tags from the Skills section AND the Projects section
    document.querySelectorAll('.tags span, .tech-stack span').forEach(tag => {
        const text = tag.textContent.trim();
        
        // If we defined a link for this tag in our dictionary above
        if (techLinks[text]) {
            // Make it look clickable
            tag.style.cursor = 'pointer';
            tag.style.transition = 'all 0.2s ease';
            tag.title = `Official site for ${text}`;
            
            // Open link in a new tab when clicked
            tag.addEventListener('click', (e) => {
                e.stopPropagation(); 
                window.open(techLinks[text], '_blank');
            });
            
            // Add a cool hover color effect using Javascript
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px)';
                tag.style.borderColor = 'var(--accent-color)'; 
                tag.style.color = 'var(--accent-color)';
            });
            
            // Remove hover effect when mouse leaves
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'none';
                tag.style.borderColor = '';
                tag.style.color = '';
            });
        }
    });

    
    // 6. Mini-Game: Squash the Bug
    const startGameBtn = document.getElementById('startGameBtn');
    const stopGameBtn = document.getElementById('stopGameBtn');
    const scoreBoard = document.getElementById('scoreBoard');
    const bugScoreEl = document.getElementById('bugScore');
    
    let gameInterval;
    let score = 0;
    let isPlaying = false;

    if (startGameBtn && stopGameBtn) {
        startGameBtn.addEventListener('click', () => {
            isPlaying = true;
            score = 0;
            bugScoreEl.textContent = score;
            startGameBtn.style.display = 'none';
            scoreBoard.style.display = 'flex';
            scoreBoard.style.alignItems = 'center';
            
            // Start spawning bugs
            gameInterval = setInterval(spawnBug, 1200);
        });

        stopGameBtn.addEventListener('click', () => {
            isPlaying = false;
            clearInterval(gameInterval);
            scoreBoard.style.display = 'none';
            startGameBtn.style.display = 'block';
            
            // Remove any remaining bugs
            document.querySelectorAll('.bug-enemy').forEach(bug => bug.remove());
        });
    }

    function spawnBug() {
        if (!isPlaying) return;

        const bug = document.createElement('i');
        bug.className = 'bx bxs-bug bug-enemy';
        
        // Random position within viewport safely
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        bug.style.left = `${x}px`;
        bug.style.top = `${y}px`;
        
        // Random starting rotation to make scurry direction varied
        const rotation = Math.random() * 360;
        bug.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(bug);

        // Squashing interaction
        bug.addEventListener('click', function(e) {
            if (this.classList.contains('bug-squashed')) return; // Already squashed
            
            this.classList.add('bug-squashed');
            score++;
            bugScoreEl.textContent = score;
            
            // Spawn a "+1" text locally
            const floatingScore = document.createElement('span');
            floatingScore.textContent = "+1";
            floatingScore.style.position = 'fixed';
            floatingScore.style.left = `${e.clientX}px`;
            floatingScore.style.top = `${e.clientY}px`;
            floatingScore.style.color = 'var(--code-string)';
            floatingScore.style.fontFamily = "'Fira Code', monospace";
            floatingScore.style.fontWeight = 'bold';
            floatingScore.style.zIndex = '10000';
            floatingScore.style.pointerEvents = 'none';
            floatingScore.style.transition = 'all 1s ease-out';
            floatingScore.style.transform = 'translateY(0)';
            document.body.appendChild(floatingScore);
            
            // Animate floating score up and fade out
            requestAnimationFrame(() => {
                floatingScore.style.transform = 'translateY(-30px)';
                floatingScore.style.opacity = '0';
            });
            setTimeout(() => { if (floatingScore.parentNode) floatingScore.remove(); }, 1000);

            // Remove bug after squashed animation
            setTimeout(() => {
                if (this.parentNode) this.remove();
            }, 300);
        });

        // Auto remove if missed after animation ends (3s)
        setTimeout(() => {
            if (bug.parentNode && !bug.classList.contains('bug-squashed')) {
                bug.remove();
            }
        }, 3000);
    }

    // 7. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                themeIcon.classList.replace('bx-sun', 'bx-moon');
            } else {
                themeIcon.classList.replace('bx-moon', 'bx-sun');
            }
            
            // Save preference to localStorage
            localStorage.setItem('theme', theme);
        });
    }
});
