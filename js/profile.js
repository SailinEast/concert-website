const savedUsers = JSON.parse(localStorage.getItem("crunchrock-users") || "[]");
const activeEmail = localStorage.getItem("crunchrock-session");
const currentUser = savedUsers.find(u => u.email === activeEmail);

if (!currentUser) {
    window.location.href = "login.html";
} else {
    document.getElementById("profile-name").textContent = currentUser.name;
    document.getElementById("profile-email").textContent = currentUser.email;
    document.getElementById("profile-phone").textContent = currentUser.phone;
}