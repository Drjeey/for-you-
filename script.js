
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const startBtn = document.getElementById('start-button');
    const mainContent = document.getElementById('main-content');
    const musicControl = document.getElementById('music-control');
    const typewriterText = document.getElementById('typewriter-text');

    // --- 1. MUSIC & START ---
    startBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 1s';
        
        music.play().then(() => {
            musicBtn.textContent = "🎵 Pause";
        }).catch(e => console.log("Audio play failed"));

        setTimeout(() => {
            overlay.remove();
            mainContent.classList.remove('hidden');
            musicControl.classList.remove('hidden');
            startTypewriter(); // Start the typing effect
        }, 1000);
    });

    // Music Toggle Button
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicBtn.textContent = "🎵 Pause";
        } else {
            music.pause();
            musicBtn.textContent = "▶️ Play";
        }
    });

    // --- 2. TYPEWRITER EFFECT ---
    const text = "Happy Valentine's Day, my love... scroll down.";
    let index = 0;

    function startTypewriter() {
        if (index < text.length) {
            typewriterText.innerHTML += text.charAt(index);
            index++;
            setTimeout(startTypewriter, 100); // Speed of typing
        }
    }

    // --- 3. SCROLL REVEAL ANIMATION ---
    // This makes photos fade in as they enter the screen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // --- 4. SURPRISE BUTTON ---
    const surpriseBtn = document.getElementById('surprise-btn');
    const hiddenMessage = document.getElementById('hidden-message');

    surpriseBtn.addEventListener('click', () => {
        hiddenMessage.classList.remove('hidden');
        surpriseBtn.style.display = 'none'; // Hide the button after clicking
        createPetals(); // More petals!
    });

    // --- 5. FALLING PETALS ---
    function createPetals() {
        const container = document.getElementById('petals-container');
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = Math.random() * 3 + 2 + 's';
            petal.style.width = Math.random() * 10 + 10 + 'px';
            petal.style.height = petal.style.width;
            container.appendChild(petal);
            
            // Remove petal after animation to keep DOM clean
            setTimeout(() => {
                petal.remove();
            }, 5000);
        }
    }

    // Start a few petals initially
    setInterval(createPetals, 3000);
});