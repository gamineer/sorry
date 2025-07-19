// Create floating petals
function createPetals() {
    const header = document.querySelector('header');
    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random size
        const size = Math.random() * 15 + 5;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Random position
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        header.appendChild(petal);
    }
}

// Book interaction
function setupBookInteractions() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(bookCard => {
        bookCard.addEventListener('click', function() {
            // On desktop, close other open books
            if (window.innerWidth > 768) {
                const allBooks = document.querySelectorAll('.book-card');
                allBooks.forEach(book => {
                    if (book !== bookCard && book.classList.contains('active')) {
                        book.classList.remove('active');
                    }
                });
            }
            
            // Toggle current book
            this.classList.toggle('active');
            
            // Play chime sound if opening
            if (this.classList.contains('active')) {
                const chime = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
                chime.volume = 0.3;
                chime.play().catch(e => console.log('Audio play failed:', e));
            }
        });
    });
}

// Cursor tulip effect
function setupCursorTulip() {
    const cursorTulip = document.getElementById('cursorTulip');
    
    // Hide on touch devices
    if ('ontouchstart' in window) {
        cursorTulip.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        cursorTulip.style.left = `${e.clientX + 10}px`;
        cursorTulip.style.top = `${e.clientY + 10}px`;
        cursorTulip.style.opacity = '1';
        
        // Reset opacity after movement stops
        clearTimeout(window.cursorTimeout);
        window.cursorTimeout = setTimeout(() => {
            cursorTulip.style.opacity = '0';
        }, 1000);
    });
}

// Sticky bookmark navigation
function setupStickyBookmark() {
    const bookmark = document.getElementById('stickyBookmark');
    const chapters = document.querySelectorAll('.chapter');
    let currentChapter = 0;
    
    // Show/hide bookmark based on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show bookmark if not at the bottom
        if (scrollPosition < documentHeight - 100) {
            bookmark.classList.add('visible');
        } else {
            bookmark.classList.remove('visible');
        }
        
        // Update current chapter
        chapters.forEach((chap, index) => {
            const rect = chap.getBoundingClientRect();
            if (rect.top > 0 && rect.top < window.innerHeight) {
                currentChapter = index;
            }
        });
    });
    
    // Bookmark click handler
    bookmark.addEventListener('click', () => {
        // Scroll to next chapter
        if (currentChapter < chapters.length - 1) {
            chapters[currentChapter + 1].scrollIntoView({ behavior: 'smooth' });
        } else {
            // If on last chapter, scroll to letter
            document.getElementById('final-letter').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Reveal final letter
// Replace the setupLetterReveal function with this:
function setupLetterReveal() {
    const letter = document.getElementById('letterContainer');
    const button = document.getElementById('unfoldButton');
    
    // Make sure elements exist
    if (!letter || !button) return;
    
    // Initially hide the letter (we'll show it with animation)
    gsap.set(letter, { opacity: 0, y: 20 });
    
    button.addEventListener('click', () => {
        // Animate the letter in
        gsap.to(letter, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // Hide the button
        button.style.display = 'none';
        
        // Scroll to letter
        letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Initialize animations with GSAP
function initAnimations() {
    // Animate chapters on scroll
    const chapters = document.querySelectorAll('.chapter');
    
    chapters.forEach((chapter) => {
        gsap.from(chapter, {
            scrollTrigger: {
                trigger: chapter,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Animate final letter container
    gsap.from("#letterContainer", {
        scrollTrigger: {
            trigger: "#final-letter",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    setupBookInteractions();
    setupCursorTulip();
    setupStickyBookmark();
    setupLetterReveal();
    initAnimations();
});