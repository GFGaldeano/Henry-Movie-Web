class Movie {
  constructor(data) {
    this.title = data.title;
    this.year = data.year;
    this.director = data.director;
    this.duration = data.duration;
    this.genre = data.genre.join(", ");
    this.rate = data.rate;
    this.poster = data.poster;
  }

  createCard() {
    return `
      <div class="col-md-3 mb-4 ">
        <div class="movie-card">
          <img src="${this.poster}" class="card-img-top" alt="${this.title}">
        </div>
      </div>
    `;
  }

  createLegend() {
    return `
      <p style="text-align: center;"><strong>Titulo:</strong></p>
      <p class="card-title  text-warning fw-bold font-weight-bold"> ${this.title}</p>
      <p style="text-align: justify;"><strong>Año:</strong> ${this.year}</p>
      <p style="text-align: center;"><strong>Director:</strong> ${this.director}</p>
      <p style="text-align: center;"><strong>Duración:</strong> ${this.duration}</p>
      <p style="text-align: center;"><strong>Género:</strong> ${this.genre}</p>
      <p style="text-align: center;"><strong>Calificación:</strong> ${this.rate}</p>
    `;
  }
}

module.exports = Movie;
