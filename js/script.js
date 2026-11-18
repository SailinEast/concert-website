const THEME_KEY = "crunchrock-theme";
let currentTheme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

const themeBtn = document.getElementById("theme-toggle-btn");
function updateThemeBtn() {
    if (themeBtn) {
        themeBtn.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";
    }
}
updateThemeBtn();

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem(THEME_KEY, currentTheme);
        updateThemeBtn();
    });
}

// Show/hide navbar links based on login session
const sessionEmail = localStorage.getItem("crunchrock-session");
let users;
try {
    users = JSON.parse(localStorage.getItem("crunchrock-users") || "[]");
} catch (e) {
    users = [];
}
const signedInUser = Array.isArray(users) ? users.find(u => u.email === sessionEmail) : null;

document.querySelectorAll(".auth-guest").forEach(el => el.hidden = !!signedInUser);
document.querySelectorAll(".auth-user").forEach(el => el.hidden = !signedInUser);

document.querySelectorAll(".logout-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        localStorage.removeItem("crunchrock-session");
        window.location.href = "login.html";
    });
});

// navigation using arrow keys
const navItems = document.querySelectorAll(".nav-menu a:not([hidden])");
if (navItems.length > 0) {
    let currentIndex = Array.from(navItems).indexOf(document.querySelector(".active"));
    if (currentIndex === -1) currentIndex = 0;

    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % navItems.length;
            navItems[currentIndex].focus();
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
            navItems[currentIndex].focus();
        }
    });
}

// scroll progress bar
if (!document.getElementById("scroll-progress")) {
    const bar = document.createElement("div");
    bar.id = "scroll-progress";
    document.body.prepend(bar);
}

function updateScrollBar() {
    const bar = document.getElementById("scroll-progress");
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (bar) bar.style.width = scrollPercent + "%";
}

// I'm so lazy
function lazyLoadImages() {
    document.querySelectorAll(".lazy-img").forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
            const realSrc = img.getAttribute("data-src");
            if (realSrc && img.getAttribute("src") !== realSrc) {
                img.setAttribute("src", realSrc);
                img.classList.add("loaded");
            }
        }
    });
}

window.addEventListener("scroll", () => {
    updateScrollBar();
    lazyLoadImages();
});
window.addEventListener("load", lazyLoadImages);
lazyLoadImages();