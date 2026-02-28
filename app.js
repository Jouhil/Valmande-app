// ============================================
// TAB NAVIGATION
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.tab-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Remove active class from all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to target section
        document.getElementById(targetId).classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Set Tacksamhet as default active tab
document.getElementById('gratitude').classList.add('active');

// ============================================
// AUTO DARK MODE (19:00 - 07:00)
// ============================================
function checkDarkMode() {
    const now = new Date();
    const hour = now.getHours();
    
    // Dark mode between 19:00 (19) and 07:00 (7)
    const isDarkTime = hour >= 19 || hour < 7;
    
    if (isDarkTime) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Check dark mode on load and update every minute
checkDarkMode();
setInterval(checkDarkMode, 60000);

// ============================================
// BREATHING EXERCISE (Flik 2)
// ============================================
const breathingCircle = document.getElementById('breathingCircle');
const breathInstruction = document.getElementById('breathInstruction');
const breathTimer = document.getElementById('breathTimer');
const startBreathingBtn = document.getElementById('startBreathing');
const stopBreathingBtn = document.getElementById('stopBreathing');
const rainToggle = document.getElementById('rainToggle');
const rainVolume = document.getElementById('rainVolume');
const volumeLabel = document.getElementById('volumeLabel');
const rainAudio = document.getElementById('rainAudio');

let isBreathing = false;
let breathingCycle = 0;

const breathingStages = [
    { phase: 'inhale', instruction: 'Andas in', duration: 4 },
    { phase: 'hold', instruction: 'Håll andan', duration: 4 },
    { phase: 'exhale', instruction: 'Andas ut', duration: 4 }
];

function updateBreathingDisplay(stage, timeLeft) {
    breathInstruction.textContent = stage.instruction;
    breathTimer.textContent = timeLeft;
}

async function runBreathingCycle() {
    for (const stage of breathingStages) {
        if (!isBreathing) break;
        
        breathingCircle.className = `breathing-circle ${stage.phase}`;
        
        for (let i = stage.duration; i > 0; i--) {
            if (!isBreathing) break;
            updateBreathingDisplay(stage, i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    if (isBreathing) {
        // Reset and continue cycle
        await new Promise(resolve => setTimeout(resolve, 500));
        if (isBreathing) {
            runBreathingCycle();
        }
    }
}

startBreathingBtn.addEventListener('click', () => {
    isBreathing = true;
    startBreathingBtn.disabled = true;
    stopBreathingBtn.disabled = false;
    
    // Start rain sound if toggled
    if (rainToggle.checked) {
        rainAudio.play().catch(err => console.log('Audio play error:', err));
    }
    
    runBreathingCycle();
});

stopBreathingBtn.addEventListener('click', () => {
    isBreathing = false;
    startBreathingBtn.disabled = false;
    stopBreathingBtn.disabled = true;
    breathingCircle.className = 'breathing-circle';
    breathInstruction.textContent = 'Andas in';
    breathTimer.textContent = '4';
    
    // Stop rain sound
    rainAudio.pause();
    rainAudio.currentTime = 0;
});

// Rain sound controls
rainToggle.addEventListener('change', () => {
    if (rainToggle.checked && isBreathing) {
        rainAudio.play().catch(err => console.log('Audio play error:', err));
    } else {
        rainAudio.pause();
        rainAudio.currentTime = 0;
    }
});

rainVolume.addEventListener('input', (e) => {
    const volume = e.target.value;
    rainAudio.volume = volume / 100;
    volumeLabel.textContent = volume + '%';
});

// ============================================
// MOTIVATION QUOTE (Flik 3)
// ============================================
const getMotivationBtn = document.getElementById('getMotivation');
const motivationDisplay = document.getElementById('motivationDisplay');
const inspirationList = document.getElementById('inspirationList');

const motivations = [
    "Jag gör så gott jag kan – och det räcker för idag.",
    "Jag är värd respekt från andra och från mig själv.",
    "Jag tillåter mig själv att vila, även om jag inte 'förtjänat' det.",
    "Jag lär mig och utvecklas varje dag.",
    "Varje dag tar jag steg mot mitt bästa jag.",
    "Jag är kapabel att hantera utmaningar.",
    "Jag är mer än tillräcklig, och jag har allt jag behöver inom mig.",
    "Jag accepterar och älskar mig själv precis som jag är.",
    "Mina känslor är ok, även de trötta och irriterade.",
    "Jag är tålmodig mot min egen utveckling.",
    "Jag ser mina styrkor och växer varje dag.",
    "Jag tillåter glädje och självkärlek."
];

let lastMotivationIndex = -1;

function getRandomMotivation() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * motivations.length);
    } while (randomIndex === lastMotivationIndex && motivations.length > 1);
    
    lastMotivationIndex = randomIndex;
    return motivations[randomIndex];
}

getMotivationBtn.addEventListener('click', () => {
    const motivation = getRandomMotivation();
    motivationDisplay.innerHTML = `<p>${motivation}</p>`;
    motivationDisplay.style.animation = 'none';
    
    // Trigger animation
    setTimeout(() => {
        motivationDisplay.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);