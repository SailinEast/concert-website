const regForm = document.getElementById('contact-form');
if (regForm) {
    regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
    
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        const successBox = document.getElementById('form-success');
        if (successBox) successBox.style.display = 'none';
    
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            document.getElementById('name-error').textContent = 'Full name is required.';
            isValid = false;
        }
    
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }
    
        const password = document.getElementById('password').value;
        if (password.length < 8) {
            document.getElementById('password-error').textContent = 'Password must be at least 8 characters long.';
            isValid = false;
        }
    
        const confirmPass = document.getElementById('confirm-password').value;
        if (password !== confirmPass) {
            document.getElementById('confirm-error').textContent = 'Passwords do not match.';
            isValid = false;
        }

        if (isValid) {
            if (successBox) {
                successBox.textContent = 'Registration successful! See you in the pit.';
                successBox.style.display = 'block';
            }
            regForm.reset();
        }
    })

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            regForm.querySelectorAll('input, textarea').forEach(input => input.value = '');
            document.getElementById("ticket").value = "";
            document.getElementById("color").value = "#facc15";
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");
        });
    }
}