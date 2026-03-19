// Wait for page to load
window.onload = function() {
    
    // Get elements for login/signup form
    var formOpenBtn = document.getElementById("form-open");
    var home = document.querySelector(".home");
    var formContainer = document.querySelector(".form_container");
    var signupLink = document.getElementById("signup");
    var loginLink = document.getElementById("login");
    
    // Open form when button is clicked
    if (formOpenBtn) {
        formOpenBtn.onclick = function() {
            home.classList.add("show");
            document.body.classList.add("no-scroll");
        };
    }
    
    // Close form when X is clicked
    var closeButtons = document.querySelectorAll(".xicon");
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            home.classList.remove("show");
            document.body.classList.remove("no-scroll");
        };
    }
    
    // Close form when clicking outside
    if (home) {
        home.onclick = function(e) {
            if (e.target === home) {
                home.classList.remove("show");
                document.body.classList.remove("no-scroll");
            }
        };
    }
    
    // Switch to signup form
    if (signupLink) {
        signupLink.onclick = function(e) {
            e.preventDefault();
            formContainer.classList.add("active");
        };
    }
    
    // Switch to login form
    if (loginLink) {
        loginLink.onclick = function(e) {
            e.preventDefault();
            formContainer.classList.remove("active");
        };
    }
    
    // Login form
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            var formData = new FormData(loginForm);
            var submitBtn = loginForm.querySelector(".button");
            submitBtn.value = "Logging in...";
            submitBtn.disabled = true;
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "user.php", true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        alert(data.message);
                        if (data.status === "success") {
                            loginForm.reset();
                            home.classList.remove("show");
                            document.body.classList.remove("no-scroll");
                            if (data.redirect) {
                                window.location.href = data.redirect;
                            }
                        }
                    } catch (err) {
                        alert("Login failed. Please try again.");
                    }
                } else {
                    alert("Login failed. Please try again.");
                }
                submitBtn.value = "Login Now";
                submitBtn.disabled = false;
            };
            xhr.onerror = function() {
                alert("Network error. Please check your connection.");
                submitBtn.value = "Login Now";
                submitBtn.disabled = false;
            };
            xhr.send(formData);
        };
    }
    
    // Signup form
    var signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.onsubmit = function(e) {
            e.preventDefault();
            var formData = new FormData(signupForm);
            var submitBtn = signupForm.querySelector(".button");
            submitBtn.value = "Signing up...";
            submitBtn.disabled = true;
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "user.php", true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        alert(data.message);
                        if (data.status === "success") {
                            signupForm.reset();
                            formContainer.classList.remove("active");
                        }
                    } catch (err) {
                        alert("Registration failed. Please try again.");
                    }
                } else {
                    alert("Registration failed. Please try again.");
                }
                submitBtn.value = "Signup Now";
                submitBtn.disabled = false;
            };
            xhr.onerror = function() {
                alert("Network error. Please check your connection.");
                submitBtn.value = "Signup Now";
                submitBtn.disabled = false;
            };
            xhr.send(formData);
        };
    }
    
    // Card flip functionality
    var cards = document.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        card.onmouseenter = function() {
            this.classList.add("is-flipped");
        };
        
        card.onmouseleave = function() {
            this.classList.remove("is-flipped");
        };
        
        card.onclick = function(e) {
            var btn = e.target.closest(".btn-white");
            if (!btn) {
                this.classList.toggle("is-flipped");
            }
        };
    }
    
    // Booking modal
    var bookingModal = document.getElementById("bookingModal");
    var bookingTourName = document.getElementById("bookingTourName");
    var bookingCloseBtn = document.querySelector(".booking-close-btn");
    var bookingForm = document.getElementById("bookingForm");
    var bookNowButtons = document.querySelectorAll(".btn-white");
    
    for (var i = 0; i < bookNowButtons.length; i++) {
        bookNowButtons[i].onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var tourCard = this.closest(".card");
            if (tourCard) {
                var tourName = tourCard.querySelector(".card-heading-color");
                if (tourName) {
                    bookingTourName.innerHTML = "Tour: " + tourName.innerHTML;
                }
            }
            
            bookingModal.classList.add("show");
            document.body.classList.add("no-scroll");
        };
    }
    
    // Close booking modal
    if (bookingCloseBtn) {
        bookingCloseBtn.onclick = function() {
            bookingModal.classList.remove("show");
            document.body.classList.remove("no-scroll");
        };
    }
    
    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.onclick = function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove("show");
                document.body.classList.remove("no-scroll");
            }
        };
    }
    
    // Booking form submission
    if (bookingForm) {
        bookingForm.onsubmit = function(e) {
            e.preventDefault();
            
            var formData = new FormData(bookingForm);
            var submitBtn = bookingForm.querySelector(".booking-submit-btn");
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "booking.php", true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        alert(data.message);
                        if (data.status === "success") {
                            bookingModal.classList.remove("show");
                            document.body.classList.remove("no-scroll");
                            bookingForm.reset();
                        }
                    } catch (err) {
                        alert("Booking failed. Please try again.");
                    }
                } else {
                    alert("Booking failed. Please try again.");
                }
                submitBtn.value = "Confirm Booking";
                submitBtn.disabled = false;
            };
            xhr.send(formData);
        };
    }
    
    // Smooth scroll for navigation links
    var anchorLinks = document.querySelectorAll("a[href^='#']");
    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].onclick = function(e) {
            e.preventDefault();
            var targetId = this.getAttribute("href");
            if (targetId === "#") {
                return;
            }
            
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var navHeight = document.querySelector(".navigation").offsetHeight;
                var viewportHeight = window.innerHeight;
                var elementHeight = targetElement.offsetHeight;
                var scrollPosition = targetElement.offsetTop - (viewportHeight / 2) + (elementHeight / 2);
                
                window.scrollTo(scrollPosition, "smooth");
            }
        };
    }
    
    // Password visibility toggle
    // This function is called from the HTML onclick attribute
    window.togglePassword = function(inputId, toggleIcon) {
        var passwordInput = document.getElementById(inputId);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.add("active");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.remove("active");
        }
    };
    
    // CTA button - show contact section
    var ctaContactBtn = document.getElementById("cta-contact-btn");
    var contactSection = document.getElementById("contact");
    var contactCloseBtn = document.getElementById("contact-close-btn");
    
    if (ctaContactBtn && contactSection) {
        ctaContactBtn.onclick = function(e) {
            e.preventDefault();
            contactSection.classList.remove("contact-hidden");
            contactSection.classList.add("contact-visible");
            
            setTimeout(function() {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        };
    }

    // Testimonials counter animation
    var counterElements = document.querySelectorAll(".stat-number");
    var testimonialSection = document.querySelector(".section-testimonials");
    
    if (testimonialSection && counterElements.length > 0) {
        // Simple animation without Intersection Observer
        function animateCounters() {
            for (var i = 0; i < counterElements.length; i++) {
                var element = counterElements[i];
                var target = parseInt(element.getAttribute("data-count"));
                var duration = 2000;
                var step = target / (duration / 16);
                var current = 0;
                
                function updateCounter() {
                    current = current + step;
                    if (current < target) {
                        element.innerHTML = Math.floor(current) + "+";
                        setTimeout(updateCounter, 16);
                    } else {
                        element.innerHTML = target + "+";
                    }
                }
                
                updateCounter();
            }
        }
        
        // Run animation after a delay
        setTimeout(animateCounters, 1000);
    }
};
