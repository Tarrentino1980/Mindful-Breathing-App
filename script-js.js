// DOM Elements
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const breathCount = document.getElementById('breathCount');
const leafLeft = document.querySelector('.leaf-left');
const leafRight = document.querySelector('.leaf-right');
const breathingText = document.getElementById('breathingText');
const vibrancyProgress = document.getElementById('vibrancyProgress');

// Variables
let isBreathing = false;
let breathCounter = 0;
let animationInterval;
let maxBreathLevel = 10; // After this many breaths, leaves will be fully vibrant

// Event Listeners
startBtn.addEventListener('click', toggleBreathing);
resetBtn.addEventListener('click', resetBreathing);

// Functions
function toggleBreathing() {
    if (!isBreathing) {
        // Start breathing
        startBreathing();
        startBtn.textContent = 'Pause';
    } else {
        // Pause breathing
        pauseBreathing();
        startBtn.textContent = 'Resume';
    }
    isBreathing = !isBreathing;
}

function startBreathing() {
    // Begin the breathing cycle
    breatheCycle();
    // Set interval for continuous breathing
    animationInterval = setInterval(breatheCycle, 8000); // 8s per full breath cycle
}

function breatheCycle() {
    // Inhale
    breathingText.textContent = "Inhale...";
    breathingText.style.opacity = "1";
    
    leafLeft.classList.add('inhale');
    leafRight.classList.add('inhale');
    leafLeft.classList.remove('exhale');
    leafRight.classList.remove('exhale');
    
    // After inhale, exhale
    setTimeout(() => {
        breathingText.textContent = "Exhale...";
        
        leafLeft.classList.remove('inhale');
        leafRight.classList.remove('inhale');
        leafLeft.classList.add('exhale');
        leafRight.classList.add('exhale');
        
        // Increment breath counter after exhale
        setTimeout(() => {
            incrementBreath();
        }, 4000); // After exhale completes
        
    }, 4000); // 4s for inhale
}

function incrementBreath() {
    breathCounter++;
    breathCount.textContent = breathCounter;
    
    // Update leaf vibrancy based on breath count
    updateLeafVibrancy();
}

function updateLeafVibrancy() {
    // Calculate current vibrancy level (0-100%)
    const vibrancyPercentage = Math.min(breathCounter / maxBreathLevel, 1) * 100;
    
    // Update progress bar
    vibrancyProgress.style.width = `${vibrancyPercentage}%`;
    
    // Create more vibrant colors as breathing continues
    const minSaturation = 1;
    const maxSaturation = 2;
    const currentSaturation = minSaturation + (maxSaturation - minSaturation) * (vibrancyPercentage / 100);
    
    // Calculate hue rotation for a more vibrant green
    const minHue = 0;
    const maxHue = 30; // slight shift toward yellow-green
    const currentHue = minHue + (maxHue - minHue) * (vibrancyPercentage / 100);
    
    // Update the leaves using filter
    leafLeft.style.filter = `hue-rotate(${currentHue}deg) saturate(${currentSaturation})`;
    leafRight.style.filter = `hue-rotate(${currentHue}deg) saturate(${currentSaturation})`;
    
    // Add brightness for a "glowing" effect as progression increases
    if (vibrancyPercentage > 50) {
        const brightness = 1 + ((vibrancyPercentage - 50) / 50) * 0.3;
        leafLeft.style.filter += ` brightness(${brightness})`;
        leafRight.style.filter += ` brightness(${brightness})`;
    }
    
    if (vibrancyPercentage >= 100) {
        // When fully vibrant, add a pulsing effect
        leafLeft.classList.add('fully-vibrant');
        leafRight.classList.add('fully-vibrant');
        breathingText.textContent = "Fully Vibrant!";
        breathingText.style.color = "#7fffd4";
    }
}

function pauseBreathing() {
    clearInterval(animationInterval);
    // Remove animation classes
    leafLeft.classList.remove('inhale', 'exhale');
    leafRight.classList.remove('inhale', 'exhale');
}

function resetBreathing() {
    // Stop any ongoing animation
    pauseBreathing();
    
    // Reset the breathing state
    isBreathing = false;
    startBtn.textContent = 'Start Breathing';
    
    // Reset counter
    breathCounter = 0;
    breathCount.textContent = breathCounter;
    
    // Reset progress bar
    vibrancyProgress.style.width = '0%';
    
    // Reset breathing text
    breathingText.textContent = "Ready to begin...";
    breathingText.style.color = "#4ecca3";
    
    // Reset leaf appearance
    leafLeft.style.filter = 'hue-rotate(0deg) saturate(1)';
    leafRight.style.filter = 'hue-rotate(0deg) saturate(1)';
    leafLeft.classList.remove('fully-vibrant');
    leafRight.classList.remove('fully-vibrant');
}

// Initialize with reset state
resetBreathing();
