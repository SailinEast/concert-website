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


$(document).ready(() => {
    console.log("jQuery is ready!");

    const SEARCH_KEYWORDS = [
        "Static Siren",
        "Rust & Bone",
        "Thunderforge",
        "Blackout Riff",
        "Iron Echo",
        "Crunch Main Stage",
        "Distortion Tent",
        "The Pit Stage",
        "Heavy Metal",
        "Grunge",
        "Hard Rock",
        "Garage Punk",
        "Stoner",
        "Power",
        "Alt-Rock",
        "Classic Hard Rock & Pyro"
    ];

    function updateScheduleSearch(showDropdown) {
        const query = $("#schedule-search").val().trim();
        const queryLower = query.toLowerCase();

        // search filter
        $("#schedule-table tbody tr").filter(function () {
            const isMatch = $(this).text().toLowerCase().indexOf(queryLower) > -1;
            $(this).toggle(isMatch);
            return isMatch;
        });
       
        // highlight matches
        $("#schedule-table tbody td").each(function () {
            const cleanText = $(this).text();
            if (query.length > 0) {
                const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`(${safeQuery})`, "gi");
                $(this).html(cleanText.replace(regex, '<span class="search-highlight">$1</span>'));
            } else {
                $(this).html(cleanText);
            }
        });
        
        // autocomplete
        const $dropdown = $("#autocomplete-list");
        $dropdown.empty();
        
        if (showDropdown && query.length > 0) {
            const matches = SEARCH_KEYWORDS.filter(item => 
                item.toLowerCase().includes(queryLower)
            );
            
            if (matches.length > 0) {
                matches.forEach(match => {
                    $dropdown.append(`<li>${match}</li>`);
                });
                $dropdown.show();
            } else {
                $dropdown.hide();
            }
        } else {
            $dropdown.hide();
        }
    }
    
    $("#schedule-search").on("input", function () {
        updateScheduleSearch(true);
    });
    
    $("#schedule-search").on("blur", function () {
        $("#autocomplete-list").hide();
    });
    
    $(document).on("mousedown", "#autocomplete-list li", function (e) {
        e.preventDefault();
        $("#schedule-search").val($(this).text());
        updateScheduleSearch(false);
    });
});