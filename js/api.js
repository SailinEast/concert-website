const musicSearchBtn = document.getElementById("music-search-button");
const musicSearchInput = document.getElementById("music-search-input");
const musicResults = document.getElementById("music-results");
const musicApiStatus = document.getElementById("music-api-status");

async function searchMusic() {
    const query = musicSearchInput.value.trim();
    musicResults.innerHTML = "";

    if (!query) {
        musicApiStatus.textContent = "Please enter a band or song name.";
        musicApiStatus.className = "api-status is-error";
        return;
    }

    musicApiStatus.textContent = "Loading music results...";
    musicApiStatus.className = "api-status is-loading";

    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=6`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            musicApiStatus.textContent = "No tracks found. Try another band!";
            musicApiStatus.className = "api-status is-error";
            return;
        }

        data.results.forEach(track => {
            musicResults.innerHTML += `
                <article class="music-result-card">
                    <img src="${track.artworkUrl100}" alt="${track.trackName}">
                    <div class="music-result-details">
                        <h3>${track.trackName}</h3>
                        <p>${track.artistName}</p>
                        <p class="music-album-name">${track.collectionName || "Single"}</p>
                        <a href="${track.trackViewUrl}" target="_blank">View in Apple Music</a>
                    </div>
                </article>
            `;
        });

        musicApiStatus.textContent = `Found ${data.results.length} results for "${query}".`;
        musicApiStatus.className = "api-status is-success";
    } catch (error) {
        musicApiStatus.textContent = "Failed to load music data. Check your connection.";
        musicApiStatus.className = "api-status is-error";
    }
}

if (musicSearchBtn && musicSearchInput) {
    musicSearchBtn.addEventListener("click", searchMusic);
    musicSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") searchMusic();
    });
}