const contactBtn = document.getElementById('contact-btn');
const contactModal = document.getElementById('contact-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

if (contactBtn && contactModal && closeModalBtn) {
    contactBtn.addEventListener('click', function () {
        contactModal.classList.add('open');
    });

    closeModalBtn.addEventListener('click', function () {
        contactModal.classList.remove('open');
    });

    window.addEventListener('click', function (e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('open');
        }
    });
}

// mock sending POST request from input data

function onContactSubmitted(statusText, isSuccess) {
    const statusEl = document.getElementById('contact-status');
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.style.color = isSuccess ? '#22c55e' : '#ef4444';
    }
}

function sendContactData(formData, callback) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            callback('Message sent successfully! (ID: ' + data.id + ')', true);
        })
        .catch(error => {
            callback('❌ Failed to send message. Try again.', false);
        });
}

const contactModalForm = document.getElementById('contact-modal-form');
if (contactModalForm) {
    contactModalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const payload = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            message: document.getElementById('contact-msg').value
        };

        onContactSubmitted('Sending...', true);
        sendContactData(payload, onContactSubmitted);
        contactModalForm.reset();
    });
}