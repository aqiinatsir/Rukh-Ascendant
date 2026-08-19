document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Copy IP functionality
    const ipContainer = document.getElementById('ip-container');
    const toast = document.getElementById('toast');

    if (ipContainer) {
        ipContainer.addEventListener('click', () => {
            const ipText = ipContainer.getAttribute('data-ip') || 'play.rukh-mc.net';

            if (navigator.clipboard && window.isSecureContext) {
                // navigator clipboard api method
                navigator.clipboard.writeText(ipText).then(() => {
                    showToast('IP Berhasil Disalin! 🎉');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    fallbackCopyTextToClipboard(ipText);
                });
            } else {
                // text area method
                fallbackCopyTextToClipboard(ipText);
            }
        });
    }

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast('IP Berhasil Disalin! 🎉');
            } else {
                showToast('Gagal menyalin IP.');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            showToast('Gagal menyalin IP.');
        }

        document.body.removeChild(textArea);
    }

    // Function to show toast
    let toastTimeout;
    function showToast(message) {
        if (!toast) return;

        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add("show");

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Interactive glow effect for cards tracking mouse position
    const cards = document.querySelectorAll('.store-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Ripep Card Interaction - Floating Heart Effect
    const ripepCards = document.querySelectorAll('.ripep-card');
    ripepCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('a') || e.target.closest('button')) return;
            createFloatingHeart(e.clientX, e.clientY);
        });
    });

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        // Using font-awesome heart icon
        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.color = '#ff4757';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        heart.style.transform = 'translate(-50%, -50%) scale(1)';
        heart.style.opacity = '1';
        heart.style.textShadow = '0 0 15px rgba(255, 71, 87, 0.8)';
        
        document.body.appendChild(heart);
        
        // Trigger animation
        setTimeout(() => {
            heart.style.transform = `translate(-50%, -150px) scale(${Math.random() * 0.5 + 1.2})`;
            heart.style.opacity = '0';
        }, 10);
        
        // Remove element after animation
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});
