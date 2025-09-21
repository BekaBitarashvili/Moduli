// Partner Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Gallery lightbox functionality
    initGalleryLightbox();

    // Ticket purchase functionality
    initTicketPurchase();

    // Social sharing functionality
    initSocialSharing();

    // Scroll animations
    initScrollAnimations();

    // Interactive elements
    initInteractiveElements();
});

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const galleryImage = this.querySelector('.gallery-image');
            const computedStyle = window.getComputedStyle(galleryImage);
            const backgroundImage = computedStyle.backgroundImage;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <div class="lightbox-image" style="background-image: ${backgroundImage}"></div>
                    <button class="lightbox-close">&times;</button>
                    <div class="lightbox-nav">
                        <button class="lightbox-prev">&#10094;</button>
                        <button class="lightbox-next">&#10095;</button>
                    </div>
                </div>
            `;

            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;

            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: #fff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            `;

            const lightboxImage = lightbox.querySelector('.lightbox-image');
            lightboxImage.style.cssText = `
                width: 80vw;
                height: 60vh;
                max-width: 800px;
                max-height: 600px;
                background-size: cover;
                background-position: center;
            `;

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 10001;
                transition: all 0.3s ease;
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });

            // Close on background click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });

            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });

            // Add hover effects
            closeBtn.addEventListener('mouseenter', function() {
                this.style.background = '#ff6b35';
                this.style.color = '#fff';
            });

            closeBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                this.style.color = '#333';
            });
        });
    });
}

// Ticket Purchase Functionality
function initTicketPurchase() {
    const buyButtons = document.querySelectorAll('.buy-tickets-btn, .cta-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Create purchase modal
            const modal = document.createElement('div');
            modal.className = 'purchase-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Purchase Tickets</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="ticket-form">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" required placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" required placeholder="Enter your email">
                            </div>
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" required placeholder="Enter your phone number">
                            </div>
                            <div class="form-group">
                                <label>Number of Tickets</label>
                                <select required>
                                    <option value="">Select number of tickets</option>
                                    <option value="1">1 Ticket</option>
                                    <option value="2">2 Tickets</option>
                                    <option value="3">3 Tickets</option>
                                    <option value="4">4 Tickets</option>
                                    <option value="5">5+ Tickets</option>
                                </select>
                            </div>
                            <button type="submit" class="submit-btn">Complete Purchase</button>
                        </form>
                    </div>
                </div>
            `;

            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;

            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                background: #fff;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideInUp 0.3s ease;
            `;

            const modalHeader = modal.querySelector('.modal-header');
            modalHeader.style.cssText = `
                padding: 25px 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;

            const modalBody = modal.querySelector('.modal-body');
            modalBody.style.cssText = `
                padding: 30px;
            `;

            // Style form elements
            const formGroups = modal.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.cssText = `
                    margin-bottom: 20px;
                `;

                const label = group.querySelector('label');
                if (label) {
                    label.style.cssText = `
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                    `;
                }

                const input = group.querySelector('input, select');
                if (input) {
                    input.style.cssText = `
                        width: 100%;
                        padding: 12px 15px;
                        border: 2px solid #e1e1e1;
                        border-radius: 8px;
                        font-size: 16px;
                        transition: all 0.3s ease;
                    `;

                    input.addEventListener('focus', function() {
                        this.style.borderColor = '#ff6b35';
                        this.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                    });

                    input.addEventListener('blur', function() {
                        this.style.borderColor = '#e1e1e1';
                        this.style.boxShadow = 'none';
                    });
                }
            });

            const submitBtn = modal.querySelector('.submit-btn');
            submitBtn.style.cssText = `
                width: 100%;
                background: #ff6b35;
                color: #fff;
                border: none;
                padding: 15px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 10px;
            `;

            submitBtn.addEventListener('mouseenter', function() {
                this.style.background = '#e55a2e';
                this.style.transform = 'translateY(-2px)';
            });

            submitBtn.addEventListener('mouseleave', function() {
                this.style.background = '#ff6b35';
                this.style.transform = 'translateY(0)';
            });

            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
            `;

            closeBtn.addEventListener('mouseenter', function() {
                this.style.color = '#ff6b35';
            });

            closeBtn.addEventListener('mouseleave', function() {
                this.style.color = '#999';
            });

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close modal functionality
            function closeModal() {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }

            closeBtn.addEventListener('click', closeModal);

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Form submission
            const ticketForm = modal.querySelector('.ticket-form');
            ticketForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Show success message
                alert('Thank you for your purchase! You will receive a confirmation email shortly.');
                closeModal();
            });
        });
    });
}

// Social Sharing
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const pageTitle = document.title;

    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const platform = this.classList[1]; // facebook, twitter, etc.
            let shareUrl = '';

            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, 'share', 'width=600,height=400,scrollbars=yes,resizable=yes');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.info-content, .info-sidebar > div, .gallery-item, .event-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Add hover effects to artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add floating animation to venue features
    const venueFeatures = document.querySelectorAll('.venue-features span');
    venueFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = '#ff6b35';
        });

        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#666';
        });
    });

    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.animation = 'pulse 2s ease';
            setTimeout(() => {
                ctaButton.style.animation = '';
            }, 2000);
        }, 5000);
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .venue-features span {
        transition: all 0.3s ease;
    }
    
    .artist-card {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style);