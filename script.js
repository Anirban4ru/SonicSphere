// DOM Elements
const bookButtons = document.querySelectorAll('.book-btn');
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close-modal');
const modalEventTitle = document.getElementById('modal-event-title');
const modalEventLocation = document.getElementById('modal-event-location');
const modalEventDate = document.getElementById('modal-event-date');
const bookingForm = document.getElementById('bookingForm');
const ticketType = document.getElementById('ticketType');
const ticketQuantity = document.getElementById('ticketQuantity');
const decreaseQuantity = document.getElementById('decreaseQuantity');
const increaseQuantity = document.getElementById('increaseQuantity');
const totalAmount = document.getElementById('totalAmount');
const confirmBooking = document.getElementById('confirmBooking');
const mobileMenuToggle = document.querySelector('.mobile-menu');
const filterButtons = document.querySelectorAll('.filter-btn');

// Event Data
const eventData = {
    'arijit-singh': {
        title: 'Arijit Singh: Enchanted Evening',
        location: 'DY Patil Stadium, Mumbai',
        date: 'May 15, 2025 | 7:00 PM'
    },
    'bryan-adams': {
        title: 'Bryan Adams: The Tour',
        location: 'Jawaharlal Nehru Stadium, Delhi',
        date: 'June 22, 2025 | 6:30 PM'
    },
    'jubin-nautiyal': {
        title: 'Jubin Nautiyal: Romantic Melodies',
        location: 'Indira Gandhi Arena, Hyderabad',
        date: 'July 08, 2025 | 8:00 PM'
    },
    'brandon-heath': {
        title: 'Brandon Heath: Live in India',
        location: 'Palace Grounds, Bangalore',
        date: 'July 19, 2025 | 7:30 PM'
    }
};

// Ticket Prices
const ticketPrices = {
    'standard': 2500,
    'premium': 5000,
    'vip': 8000
};

// Functions
function openModal(eventId) {
    const event = eventData[eventId];
    if (event) {
        modalEventTitle.textContent = event.title;
        modalEventLocation.textContent = event.location;
        modalEventDate.textContent = event.date;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    bookingForm.reset();
}

function updateTotalAmount() {
    const selectedTicketPrice = ticketPrices[ticketType.value];
    const quantity = parseInt(ticketQuantity.value);
    const total = selectedTicketPrice * quantity;
    totalAmount.textContent = `₹${total.toLocaleString()}`;
}

function decreaseQuantityHandler() {
    const currentValue = parseInt(ticketQuantity.value);
    if (currentValue > 1) {
        ticketQuantity.value = currentValue - 1;
        updateTotalAmount();
    }
}

function increaseQuantityHandler() {
    const currentValue = parseInt(ticketQuantity.value);
    if (currentValue < 10) {
        ticketQuantity.value = currentValue + 1;
        updateTotalAmount();
    }
}

function submitBookingForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;

    if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Animation to show success
    confirmBooking.textContent = 'Booking Confirmed!';
    confirmBooking.style.backgroundColor = '#4CAF50';

    // Simulate API call/processing
    setTimeout(() => {
        closeModalHandler();
        showBookingConfirmation();
        confirmBooking.textContent = 'Confirm Booking';
        confirmBooking.style.backgroundColor = '#6c63ff';
    }, 1500);
}

function showBookingConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'booking-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <h3>Booking Successful!</h3>
            <p>Your tickets have been booked successfully. A confirmation has been sent to your email.</p>
            <button id="closeConfirmation">Done</button>
        </div>
    `;

    // Add CSS for the confirmation popup
    const style = document.createElement('style');
    style.textContent = `
        .booking-confirmation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .confirmation-content {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
        }
        .confirmation-content i {
            font-size: 50px;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        .confirmation-content h3 {
            margin-bottom: 15px;
        }
        .confirmation-content p {
            margin-bottom: 25px;
            color: #666;
        }
        .confirmation-content button {
            padding: 10px 30px;
            background-color: #6c63ff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .confirmation-content button:hover {
            background-color: #5a52d5;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(confirmation);

    // Add close functionality
    document.getElementById('closeConfirmation').addEventListener('click', () => {
        document.body.removeChild(confirmation);
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

function filterEvents(category) {
    // This is a placeholder for filter functionality
    // In a real application, this would filter the events based on category
    console.log(`Filtering events by: ${category}`);

    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
}

// Event Listeners
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        const eventId = button.getAttribute('data-event');
        openModal(eventId);
    });
});

closeModal.addEventListener('click', closeModalHandler);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

ticketType.addEventListener('change', updateTotalAmount);
ticketQuantity.addEventListener('input', updateTotalAmount);
decreaseQuantity.addEventListener('click', decreaseQuantityHandler);
increaseQuantity.addEventListener('click', increaseQuantityHandler);
bookingForm.addEventListener('submit', submitBookingForm);
mobileMenuToggle.addEventListener('click', toggleMobileMenu);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterEvents(button.textContent);
    });
});

// Prevent form submission when increasing/decreasing quantity
decreaseQuantity.addEventListener('click', (e) => e.preventDefault());
increaseQuantity.addEventListener('click', (e) => e.preventDefault());

// Initialize tooltips or other UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Animation for event cards on scroll
    const eventCards = document.querySelectorAll('.event-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    eventCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Search functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBox.value.trim().toLowerCase();
    if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        // Placeholder for search functionality
        alert(`Searching for: ${searchTerm}`);
        searchBox.value = '';
    }
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
const newsletterInput = document.querySelector('.newsletter input');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Simulate subscription
        const originalText = newsletterForm.querySelector('button').textContent;
        newsletterForm.querySelector('button').textContent = 'Subscribed!';
        newsletterForm.querySelector('button').style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            newsletterInput.value = '';
            newsletterForm.querySelector('button').textContent = originalText;
            newsletterForm.querySelector('button').style.backgroundColor = '#6c63ff';
        }, 2000);
    } else {
        alert('Please enter a valid email address.');
    }
});

// Notify button
const notifyBtn = document.querySelector('.notify-btn');

notifyBtn.addEventListener('click', () => {
    const notifyModal = document.createElement('div');
    notifyModal.className = 'modal';
    notifyModal.style.display = 'block';

    notifyModal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close-modal">&times;</span>
            <h2>Get Notified</h2>
            <p style="text-align: center; margin-bottom: 20px;">Enter your details to receive updates about A.R. Rahman's upcoming concert.</p>
            <form id="notifyForm">
                <div class="form-group">
                    <label for="notifyName">Full Name</label>
                    <input type="text" id="notifyName" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="notifyEmail">Email</label>
                    <input type="email" id="notifyEmail" placeholder="Enter your email address" required>
                </div>
                <div class="form-group">
                    <label for="notifyPhone">Phone Number (Optional)</label>
                    <input type="tel" id="notifyPhone" placeholder="Enter your phone number">
                </div>
                <button type="submit" style="width: 100%; padding: 14px; background-color: #ff6b6b; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: 500;">Get Notified</button>
            </form>
        </div>
    `;

    document.body.appendChild(notifyModal);
    document.body.style.overflow = 'hidden';

    // Close button functionality
    notifyModal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(notifyModal);
        document.body.style.overflow = 'auto';
    });

    // Form submission
    notifyModal.querySelector('#notifyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = notifyModal.querySelector('#notifyName').value;
        const email = notifyModal.querySelector('#notifyEmail').value;

        if (name && email) {
            notifyModal.querySelector('button[type="submit"]').textContent = 'Subscribed Successfully!';
            notifyModal.querySelector('button[type="submit"]').style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                document.body.removeChild(notifyModal);
                document.body.style.overflow = 'auto';
            }, 1500);
        }
    });
});