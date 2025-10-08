// Countdown Timer
function updateCountdown() {
    // Set target date (3 days from now at 12:00:00)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(12, 0, 0, 0);
    
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Jika countdown sudah berakhir
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector(".countdown").innerHTML = "<h3>Kami sudah kembali online!</h3>";
        return;
    }
    
    // Calculate days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown immediately
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// Animated progress bar
function animateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    let progress = 0;
    const targetProgress = 75; // Target progress percentage
    
    const progressInterval = setInterval(() => {
        if (progress >= targetProgress) {
            clearInterval(progressInterval);
            return;
        }
        
        progress++;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        // Change color based on progress
        if (progress < 30) {
            progressFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
        } else if (progress < 60) {
            progressFill.style.background = 'linear-gradient(90deg, #ffa726, #ffb74d)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
        }
    }, 40);
}

// Start progress bar animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateProgressBar, 1000);
});

// Add floating animation to social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add random color animation to gears
function randomizeGearColors() {
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9c74f'];
    const gears = document.querySelectorAll('.gear');
    
    gears.forEach(gear => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gear.style.color = randomColor;
        gear.style.filter = `drop-shadow(0 0 5px ${randomColor}40)`;
    });
}

// Change gear colors every 5 seconds
setInterval(randomizeGearColors, 5000);

// Add click effect to maintenance card
document.querySelector('.maintenance-card').addEventListener('click', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    
    this.style.transform = 'scale(0.99)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Create floating shapes in background
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const shapes = ['🔧', '⚙️', '🛠️', '🚀', '💻', '📱', '🔨', '💡'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.left = Math.random() * 100 + 'vw';
        shape.style.animationDelay = Math.random() * 15 + 's';
        shape.style.animationDuration = (Math.random() * 20 + 10) + 's';
        shape.style.fontSize = (Math.random() * 20 + 15) + 'px';
        shape.style.opacity = Math.random() * 0.1 + 0.05;
        
        shapesContainer.appendChild(shape);
    }
}

// Initialize floating shapes
createFloatingShapes();

// Add time box animation on countdown update
function animateTimeBoxes() {
    const timeBoxes = document.querySelectorAll('.time-box');
    timeBoxes.forEach(box => {
        box.style.transform = 'scale(1.05)';
        setTimeout(() => {
            box.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add animation to time boxes every second
setInterval(animateTimeBoxes, 1000);

// Email subscription handling
document.querySelector('.email-input button').addEventListener('click', function() {
    const emailInput = document.querySelector('.email-input input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Masukkan alamat email terlebih dahulu!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate API call
    this.textContent = 'Mengirim...';
    this.disabled = true;
    
    setTimeout(() => {
        showNotification('Terima kasih! Kami akan mengirim pemberitahuan ketika website kembali.', 'success');
        emailInput.value = '';
        this.textContent = 'Notify Me';
        this.disabled = false;
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add enter key support for email input
document.querySelector('.email-input input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.email-input button').click();
    }
});

// Add ripple effect to buttons
document.querySelectorAll('button, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .social-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize with random gear colors
randomizeGearColors();

console.log('Under Maintenance Page Loaded Successfully!');