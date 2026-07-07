// Scroll Reveal Logic
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            
            // Trigger Promise/Reality Counters when section1 is visible
            if (reveals[i].id === 'section1' && !window.percentCountersStarted) {
                startPercentCounters();
                window.percentCountersStarted = true;
            }

            // Trigger Debt Counter Animation when visible
            if(reveals[i].querySelector('#debt-counter') && !window.counterStarted) {
                startCounter();
                window.counterStarted = true;
            }
        }
    }
}

window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal); // Check on load

// Number Counter Logic
window.counterStarted = false;
function startCounter() {
    const counterElement = document.getElementById('debt-counter');
    const targetNumber = 350000;
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepValue = targetNumber / steps;
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += stepValue;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        counterElement.innerText = '$' + Math.floor(currentNumber).toLocaleString();
    }, Math.floor(duration / steps));
}

// Percent Counter Logic
window.percentCountersStarted = false;
function startPercentCounters() {
    animateValue("promise-counter", 0, 15, 2000, false);
    animateValue("reality-counter", 0, 1.5, 2000, true);
}

function animateValue(id, start, end, duration, isFloat) {
    let obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let current = progress * (end - start) + start;
        
        obj.innerHTML = isFloat ? current.toFixed(1) : Math.floor(current) + (current >= 8 && current < 15 ? '-15' : ''); 
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = isFloat ? '0.5-1.5' : '8-15'; // snap to exact text at end
        }
    };
    window.requestAnimationFrame(step);
}

// Flashlight Effect Logic
document.addEventListener("DOMContentLoaded", () => {
    const section1 = document.getElementById('section1');
    if (section1) {
        section1.addEventListener('mousemove', (e) => {
            const rect = section1.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            section1.style.setProperty('--cursor-x', `${x}px`);
            section1.style.setProperty('--cursor-y', `${y}px`);
        });
    }
});
