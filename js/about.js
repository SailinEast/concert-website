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