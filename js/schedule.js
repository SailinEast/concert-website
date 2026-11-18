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

const searchInput = document.getElementById("schedule-search");
const dropdown = document.getElementById("autocomplete-list");
const tableRows = document.querySelectorAll("#schedule-table tbody tr");
const tableCells = document.querySelectorAll("#schedule-table tbody td");

function updateScheduleSearch(showDropdown) {
    if (!searchInput) return;
    const query = searchInput.value.trim();
    const queryLower = query.toLowerCase();

    // 1. Filter table rows
    tableRows.forEach(row => {
        const isMatch = row.textContent.toLowerCase().includes(queryLower);
        row.style.display = isMatch ? "" : "none";
    });

    // 2. Highlight matching text
    tableCells.forEach(cell => {
        const cleanText = cell.textContent;
        if (query.length > 0) {
            const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(`(${safeQuery})`, "gi");
            cell.innerHTML = cleanText.replace(regex, '<span class="search-highlight">$1</span>');
        } else {
            cell.innerHTML = cleanText;
        }
    });

    // 3. Autocomplete dropdown
    if (!dropdown) return;
    dropdown.innerHTML = "";

    if (showDropdown && query.length > 0) {
        const matches = SEARCH_KEYWORDS.filter(item =>
            item.toLowerCase().includes(queryLower)
        );

        if (matches.length > 0) {
            matches.forEach(match => {
                const li = document.createElement("li");
                li.textContent = match;
                dropdown.appendChild(li);
            });
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    } else {
        dropdown.style.display = "none";
    }
}

if (searchInput) {
    searchInput.addEventListener("input", () => updateScheduleSearch(true));
    searchInput.addEventListener("blur", () => {
        if (dropdown) dropdown.style.display = "none";
    });
}

if (dropdown) {
    dropdown.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "LI") {
            e.preventDefault();
            searchInput.value = e.target.textContent;
            updateScheduleSearch(false);
        }
    });
}

// Sidebar Stage Filter (click stage to filter, click again to reset)
document.querySelectorAll(".sidebar ul li").forEach(li => {
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
        const stageName = li.textContent.trim();
        if (stageName === "All Stages" || searchInput.value === stageName) {
            searchInput.value = "";
        } else {
            searchInput.value = stageName;
        }
        updateScheduleSearch(false);
    });
});

// Check URL parameter ?band= from Home page
const presetBand = new URLSearchParams(window.location.search).get("band");
if (presetBand && searchInput) {
    searchInput.value = presetBand;
    updateScheduleSearch(false);
}