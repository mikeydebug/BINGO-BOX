document.getElementById("search-btn").addEventListener("click", searchMovies);

async function searchMovies() {
    let query = document.getElementById("search-input").value;
    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    let apiKey = "YOUR_OMDB_API_KEY"; // Replace with your OMDB API key
    let url = `https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let movieContainer = document.getElementById("movie-container");
        movieContainer.innerHTML = "";

        if (data.Response === "True") {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200x300?text=No+Image"}" alt="Movie Poster">
                <h3>${data.Title} (${data.Year})</h3>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
            `;

            movieContainer.appendChild(movieCard);
        } else {
            movieContainer.innerHTML = `<p>No results found!</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}
