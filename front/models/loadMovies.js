const axios = require('axios');
const Movie = require('./Movie');

const loadMovies = async (movieContainer, addHoverEffect) => {
  try {
    const response = await axios.get("http://localhost:3000/movies");
    const moviesData = response.data;

    
    if (!Array.isArray(moviesData) || moviesData.length === 0) {
      throw new Error("Datos de películas inválidos o vacíos");
    }

    const movieCardsHTML = moviesData
      .map((movieData) => {
        const movie = new Movie(movieData);
        return movie.createCard();
      })
      .join("");

    movieContainer.innerHTML += movieCardsHTML;

    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach((card, index) => {
      const movie = new Movie(moviesData[index]);
      addHoverEffect(card, movie);
    });
  } catch (error) {
    console.error("Error al cargar las películas:", error.message || "hubo un problema con la URL");
  }
};

module.exports = loadMovies;
