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

const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const parent = this.parentElement;
        const body = this.nextElementSibling;

        parent.classList.toggle('active');

        if (parent.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + 'px';
        } else {
            body.style.maxHeight = '0px';
        }
    });
});

// thumbnail viewer

const thumbnails = document.querySelectorAll('.gallery-item');
const mainImg = document.getElementById("main-display-img");
const mainCaption = document.getElementById("main-display-caption");
if (mainImg && thumbnails.length > 0) {
    thumbnails[0].classList.add("active-thumb");
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            const thumbImg = this.querySelector("img");
            const thumbCaption = this.querySelector(".gallery-caption p");
            
            thumbnails.forEach(t => t.classList.remove("active-thumb"));
            this.classList.add("active-thumb");
            
            mainImg.style.opacity = "0.3";
            mainImg.style.transform = "scale(0.98)";
            
            setTimeout(() => {
                mainImg.src = thumbImg.src;
                mainImg.alt = thumbImg.alt;
                
                if (thumbCaption && mainCaption) {
                    mainCaption.textContent = thumbCaption.textContent;
                }
                
                mainImg.style.opacity = "1";
                mainImg.style.transform = "scale(1)";
            }, 150);
        });
    });
}

function displayGreeting() {
    const hour = new Date().getHours();
    let timePeriod;

    if (hour >= 5 && hour < 12) {
        timePeriod = 'morning';
    } else if (hour >= 12 && hour < 18) {
        timePeriod = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
        timePeriod = 'evening';
    } else {
        timePeriod = 'night';
    }

    let greetingMessage;
    switch (timePeriod) {
        case 'morning':
            greetingMessage = 'Good Morning, Rockers! Arena gates open at 16:00.';
            break;
        case 'afternoon':
            greetingMessage = 'Good Afternoon! Stage soundchecks are live.';
            break;
        case 'evening':
            greetingMessage = 'Good Evening! Main Stage headliners are taking over!';
            break;
        default:
            greetingMessage = 'Late Night Encore! Keep the energy loud.';
            break;
    }

    const greetingEl = document.getElementById("time-greeting");
    if (greetingEl) {
        greetingEl.textContent = greetingMessage;
    }
}

displayGreeting();

// sound effects and K00L skull 😎
let skullGif = document.getElementById("skull-gif");
const skullAudio = new Audio("../sounds/skull-guitar.mp3");

if (skullGif) {
    const gifUrl = skullGif.getAttribute("src");
    let frozenFrameUrl = "";
    let isPlaying = false;

    const AUDIO_DELAY = 2000;
    const GIF_DURATION = 4000;

    const tempImg = new Image();
    tempImg.src = gifUrl;
    tempImg.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = tempImg.width;
        canvas.height = tempImg.height;
        canvas.getContext("2d").drawImage(tempImg, 0, 0);
        frozenFrameUrl = canvas.toDataURL("image/png");
        skullGif.src = frozenFrameUrl;
    }

    skullGif.addEventListener("click", () => {
        if (isPlaying) return;
        isPlaying = true;

        skullGif.src = gifUrl + "?t=" + Date.now();

        setTimeout(() => {
            skullAudio.currentTime = 0;
            skullAudio.play();
        }, AUDIO_DELAY);

        setTimeout(() => {
            if (frozenFrameUrl) {
                skullGif.src = frozenFrameUrl;
            }
            isPlaying = false;
        }, GIF_DURATION);
    })
}