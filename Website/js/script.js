document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AUTOMATIC NAVIGATION LINK HIGHLIGHTING
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // ==========================================
    // 2. MOBILE HAMBURGER MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Close menu automatically when clicking any nav link on mobile
        const menuItems = navLinksContainer.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });
    }


    // ==========================================
    // 3. FEE CALCULATOR WITH ERROR HANDLING
    // ==========================================
    const feesForm = document.getElementById('fees-form');

    if (feesForm) {
        feesForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const activityVal = document.getElementById('activity').value;
            const participantsVal = document.getElementById('participants').value;
            const dateVal = document.getElementById('date').value;

            // Error handling: check for empty fields
            if (!activityVal || !participantsVal || !dateVal) {
                alert('Error: Please fill in all required fields (Activity, Participants, and Date).');
                return;
            }

            const activityPrice = parseFloat(activityVal);
            const participants = parseInt(participantsVal, 10);
            const accommodationCost = parseFloat(document.getElementById('accommodation').value) || 0;
            const equipmentCost = parseFloat(document.getElementById('equipment').value) || 0;

            // Error handling: validate participant range
            if (isNaN(participants) || participants <= 0) {
                alert('Error: Number of participants must be at least 1.');
                document.getElementById('participants').focus();
                return;
            }

            // Calculations
            const baseActivityTotal = activityPrice * participants;
            const addOnsTotal = (accommodationCost + equipmentCost) * participants;
            const finalTotal = baseActivityTotal + addOnsTotal;

            // Target result displays
            const resultBox = document.getElementById('fees-result');
            const totalDisplay = document.getElementById('total-price-display');
            const breakdownDetails = document.getElementById('breakdown-details');

            totalDisplay.textContent = `R${finalTotal.toFixed(2)}`;
            breakdownDetails.innerHTML = `
                <p><strong>Base Activity Cost:</strong> R${baseActivityTotal.toFixed(2)} (${participants} participant/s)</p>
                <p><strong>Add-ons & Equipment:</strong> R${addOnsTotal.toFixed(2)}</p>
                <p style="color: #28a745; margin-top: 5px; font-weight: 500;">✓ Calculation generated successfully!</p>
            `;
            
            resultBox.style.display = 'block';
            resultBox.style.borderLeft = '4px solid #28a745';
        });
    }


    // ==========================================
    // 4. CONTACT FORM VALIDATION & ERROR HANDLING
    // ==========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !subject || !message) {
                showContactFeedback('Error: Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showContactFeedback('Error: Please enter a valid email address (e.g., user@example.com).', 'error');
                document.getElementById('email').focus();
                return;
            }

            // Validate phone number length
            if (phone.length < 10) {
                showContactFeedback('Error: Please enter a valid phone number (at least 10 digits).', 'error');
                document.getElementById('phone').focus();
                return;
            }

            // Success handling
            showContactFeedback('Success! Your message has been sent successfully.', 'success');
            contactForm.reset();
        });
    }

    function showContactFeedback(message, type) {
        const feedbackBox = document.getElementById('form-feedback');
        if (!feedbackBox) return;

        feedbackBox.textContent = message;
        feedbackBox.style.display = 'block';

        if (type === 'error') {
            feedbackBox.style.backgroundColor = '#f8d7da';
            feedbackBox.style.color = '#721c24';
            feedbackBox.style.border = '1px solid #f5c6cb';
        } else {
            feedbackBox.style.backgroundColor = '#d4edda';
            feedbackBox.style.color = '#155724';
            feedbackBox.style.border = '1px solid #c3e6cb';
        }
    }

});