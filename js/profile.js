const users = JSON.parse(localStorage.getItem("crunchrock-users") || "[]");
const sessionEmail = localStorage.getItem("crunchrock-session");
const currentUser = users.find(u => u.email === sessionEmail);

if (!currentUser) {
    window.location.href = "login.html";
} else {
    document.getElementById("profile-name").textContent = currentUser.name;
    document.getElementById("profile-email").textContent = currentUser.email;
    document.getElementById("profile-phone").textContent = currentUser.phone;
}