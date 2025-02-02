const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;

  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;

    let transformValue = window.getComputedStyle(movieLists[i]).transform;
    let currentTranslateX = 0;

    if (transformValue !== "none") {
      let matrixValues = transformValue.match(/-?\d+(\.\d+)?/g);
      if (matrixValues) {
        currentTranslateX = parseFloat(matrixValues[4]); // Extract X translation
      }
    }

    // Calculate the maximum scrollable items
    const maxItemsToScroll = itemNumber - ratio;

    if (clickCounter <= maxItemsToScroll) {
      movieLists[i].style.transform = `translateX(${currentTranslateX - 300}px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0; // Reset the counter
    }
  });
});


// TOGGLE
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

// MOOD BOT LOGIC
const moodBotButton = document.getElementById("moodBotButton");
const moodBotPanel = document.getElementById("moodBotPanel");
const recommendations = document.getElementById("recommendations");

if (moodBotButton && moodBotPanel && recommendations) {
  // Mood-based movie recommendations
  const moodMovies = {
    happy: ["When The Stars Gossip", "The Bad Guys", "Ginny and Georgia"],
    sad: ["Torn", "The Subject", "BabyGirl"],
    excited: ["Vixen", "Valarie's Revenge", "Dark Island"],
    relaxed: ["Kota Factory Season 3", "Baipan Bihari Deva", "Ved"]
  };

  // Toggle bot panel
  moodBotButton.addEventListener("click", () => {
    moodBotPanel.classList.toggle("active");
  });

  // Handle mood selection
  document.querySelectorAll(".mood-option").forEach((option) => {
    option.addEventListener("click", () => {
      const mood = option.getAttribute("data-mood");
      const movies = moodMovies[mood];
      recommendations.innerHTML = `
        <h4>Recommended Movies:</h4>
        <ul>
          ${movies.map((movie) => `<li>${movie}</li>`).join("")}
        </ul>
      `;
    });
  });
}
