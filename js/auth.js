const USERS_KEY = "crunchrock-users";
const SESSION_KEY = "crunchrock-session";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        CrunchValidation.clearErrors();
        const status = document.getElementById("signup-status");
        status.textContent = "";

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const phone = document.getElementById("signup-phone").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirm = document.getElementById("signup-confirm").value;
        let valid = true;

        if (!name) { CrunchValidation.showError("signup-name-error", "Please enter your name."); valid = false; }
        if (!CrunchValidation.isEmail(email)) { CrunchValidation.showError("signup-email-error", "Please enter a valid email."); valid = false; }
        if (!CrunchValidation.isPhone(phone)) { CrunchValidation.showError("signup-phone-error", "Enter a 10 to 15 digit phone number."); valid = false; }
        if (!CrunchValidation.isStrongPassword(password)) { CrunchValidation.showError("signup-password-error", "Use 8+ chars with upper, lower and number."); valid = false; }
        if (!confirm || password !== confirm) { CrunchValidation.showError("signup-confirm-error", "Passwords do not match."); valid = false; }
        if (!valid) return;

        const users = getUsers();
        if (users.some(u => u.email === email)) {
            CrunchValidation.showError("signup-email-error", "Email is already registered.");
            return;
        }

        users.push({ name, email, phone, password });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        status.textContent = "Account created! You can now log in.";
        status.className = "form-status is-success";
        signupForm.reset();
    });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        CrunchValidation.clearErrors();
        const status = document.getElementById("login-status");
        status.textContent = "";

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        let valid = true;

        if (!CrunchValidation.isEmail(email)) { CrunchValidation.showError("login-email-error", "Please enter a valid email."); valid = false; }
        if (!password) { CrunchValidation.showError("login-password-error", "Please enter your password."); valid = false; }
        if (!valid) return;

        const user = getUsers().find(u => u.email === email && u.password === password);
        if (!user) {
            status.textContent = "Incorrect email or password.";
            status.className = "form-status is-error";
            return;
        }

        localStorage.setItem(SESSION_KEY, user.email);
        window.location.href = "profile.html";
    });
}