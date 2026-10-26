const themeBtn = document.getElementById("theme-toggle-btn")
let isLightMode = false

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        if (!isLightMode) {
            document.body.style.backgroundColor = "#ffffff"
            themeBtn.textContent = "Unflashbang"
        } else {
            document.body.style.backgroundColor = '#141417';
            themeBtn.textContent = 'Flashbang';
        }
        
        isLightMode = !isLightMode
    })
}

// navigation using arrow keys
const navItems = document.querySelectorAll(".nav-menu a");
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