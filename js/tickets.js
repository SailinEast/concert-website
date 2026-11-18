const regForm = document.getElementById("contact-form");

// Select pass tier when clicking card button
document.querySelectorAll("[data-pass-select]").forEach(btn => {
    btn.addEventListener("click", function () {
        const ticketSelect = document.getElementById("ticket");
        if (ticketSelect) {
            ticketSelect.value = btn.getAttribute("data-pass-select");
            ticketSelect.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
});

if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        CrunchValidation.clearErrors();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPass = document.getElementById("confirm-password").value;
        const ticket = document.getElementById("ticket").value;

        if (!name) {
            CrunchValidation.showError("name-error", "Full name is required.");
        }
        if (!CrunchValidation.isEmail(email)) {
            CrunchValidation.showError("email-error", "Please enter a valid email address.");
        }
        if (!CrunchValidation.isPhone(phone)) {
            CrunchValidation.showError("phone-error", "Enter a phone number with 10 to 15 digits.");
        }
        if (!CrunchValidation.isStrongPassword(password)) {
            CrunchValidation.showError("password-error", "Use 8+ chars with uppercase, lowercase and a number.");
        }
        if (!confirmPass || password !== confirmPass) {
            CrunchValidation.showError("confirm-error", "Passwords do not match.");
        }
        if (!ticket) {
            CrunchValidation.showError("ticket-error", "Please choose a pass tier.");
        }
    });

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            regForm.reset();
            CrunchValidation.clearErrors();
        });
    }
}

$(document).ready(function () {
    // toast notification
    $("body").append('<div id="toast-container"></div>');

    function showToast(message) {
        const $toast = $(`<div class="crunch-toast">${message}</div>`);
        $("#toast-container").append($toast);
        $toast.fadeIn(250).delay(2500).fadeOut(400, function () {
            $(this).remove();
        });
    }

    // button spinner
    $("#contact-form").on("submit", function () {
        const hasErrors = $(".error-msg").text().trim().length > 0;
        if (!hasErrors) {
            const $submitBtn = $("#submit-btn");
            const originalText = $submitBtn.text();

            $submitBtn.prop("disabled", true);
            $submitBtn.html('<span class="btn-spinner"></span> Please wait...');

            setTimeout(function () {
                $submitBtn.prop("disabled", false);
                $submitBtn.text(originalText);
                $("#contact-form")[0].reset();
                showToast("Pass registration submitted successfully!");
            }, 1500);
        }
    });

    // copy promo
    $("#copy-promo-btn").on("click", function () {
        const $btn = $(this);
        const promoText = $("#promo-code").text();

        navigator.clipboard.writeText(promoText).then(function () {
            $btn.text("✔ Copied to clipboard!");
            showToast("Promo code " + promoText + " copied to clipboard!");

            setTimeout(function () {
                $btn.text("Copy Code");
            }, 2000);
        });
    });
});