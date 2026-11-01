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

$(document).ready(function () {
    // scroll progress bar
    $("body").prepend('<div id="scroll-progress"></div>');

    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $("#scroll-progress").css("width", scrollPercent + "%");
    });

    // I'm so lazy
    function lazyLoadImages() {
        const windowBottom = $(window).scrollTop() + $(window).height();

        $(".lazy-img").each(function () {
            const $img = $(this);
            const imgTop = $img.offset().top;

            if (windowBottom > imgTop - 100) {
                const realSrc = $img.attr("data-src");
                if (realSrc && $img.attr("src") !== realSrc) {
                    $img.attr("src", realSrc).addClass("loaded");
                }
            }
        });
    }

    $(window).on("scroll", lazyLoadImages);
    lazyLoadImages();
});