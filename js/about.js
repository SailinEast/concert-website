const contactBtn = document.getElementById("contact-btn");
const contactModal = document.getElementById("contact-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

if (contactBtn && contactModal && closeModalBtn) {
    contactBtn.addEventListener("click", function () {
        contactModal.classList.add("open");
    });

    closeModalBtn.addEventListener("click", function () {
        contactModal.classList.remove("open");
    });

    window.addEventListener("click", function (e) {
        if (e.target === contactModal) {
            contactModal.classList.remove("open");
        }
    });
}

function onContactSubmitted(statusText, isSuccess) {
    const statusEl = document.getElementById("contact-status");
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.style.color = isSuccess ? "#22c55e" : "#ef4444";
    }
}

function sendContactData(formData, callback) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            callback("Message sent successfully! (ID: " + data.id + ")", true);
        })
        .catch(() => {
            callback("❌ Failed to send message. Try again.", false);
        });
}

const contactModalForm = document.getElementById("contact-modal-form");
if (contactModalForm) {
    contactModalForm.addEventListener("submit", function (e) {
        e.preventDefault();
        CrunchValidation.clearErrors();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const message = document.getElementById("contact-msg").value.trim();
        let valid = true;

        if (!name) { CrunchValidation.showError("contact-name-error", "Please enter your name."); valid = false; }
        if (!CrunchValidation.isEmail(email)) { CrunchValidation.showError("contact-email-error", "Please enter a valid email."); valid = false; }
        if (!CrunchValidation.isPhone(phone)) { CrunchValidation.showError("contact-phone-error", "Enter a 10 to 15 digit phone number."); valid = false; }
        if (!message) { CrunchValidation.showError("contact-msg-error", "Please enter your message."); valid = false; }
        if (!valid) return;

        onContactSubmitted("Sending...", true);
        sendContactData({ name, email, phone, message }, onContactSubmitted);
        contactModalForm.reset();
    });
}