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

function updateDateTime() {
    const now = new Date()

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    const formattedDate = now.toLocaleDateString("en-US", options)
        .replace(" at ", ", ")

    const clockElement = document.getElementById("live-datetime")
    if (clockElement) {
        clockElement.innerHTML = `Arena Live Time: <strong>${formattedDate}</strong>`
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);