// Shared validation helper functions (HTML validation disabled with novalidate)
window.CrunchValidation = {
    isEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    },
    isStrongPassword(value) {
        return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value);
    },
    isPhone(value) {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
    },
    showError(id, message) {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    },
    clearErrors() {
        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    }
};