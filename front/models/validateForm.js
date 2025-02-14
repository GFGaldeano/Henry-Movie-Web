const axios = require("axios"); 

function validateForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".needs-validation");
    const titleFeedback = document.getElementById("titleFeedback");
    const yearFeedback = document.getElementById("yearFeedback");
    const directorFeedback = document.getElementById("directorFeedback");
    const genreFeedback = document.getElementById("genreFeedback");
    const rateFeedback = document.getElementById("rateFeedback");
    const posterFeedback = document.getElementById("posterFeedback");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (
        !form.checkValidity() ||
        !validateGenres() ||
        !validatePoster() ||
        !validateTitle() ||
        !validateDirector() ||
        !validateYear() ||
        !validateRate()
      ) {
        form.classList.add("was-validated");
        return;
      }

      const formData = captureFormData();

      sendDataToBackend(formData)
        .then((response) => {
          
          if (response.status >= 200 && response.status < 300) {
            Swal.fire({
              title: "ÉXITO!",
              text: "ENHORABUENA, ACABAS DE INGRESAR UNA NUEVA PELICULA. TE FELICITO",
              color: "#13e84f",
              imageUrl: "../media/alien_dancing_1.gif",
              imageWidth: 400,
              imageHeight: 307,
              imageAlt: "Custom image",
              background: "#000",
              confirmButtonColor: "#13e84f",
            });

            form.reset();
            refreshSelect();
            form.classList.remove("was-validated");
            titleFeedback.style.display = "none";
            genreFeedback.style.display = "none";
            posterFeedback.style.display = "none";
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al enviar los datos. Por favor, intenta de nuevo.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
            form.reset();
            refreshSelect();
            form.classList.remove("was-validated");
            titleFeedback.style.display = "none";
            genreFeedback.style.display = "none";
            posterFeedback.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al conectar con el servidor.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
          form.reset();
          refreshSelect();
          form.classList.remove("was-validated");
          titleFeedback.style.display = "none";
          genreFeedback.style.display = "none";
          posterFeedback.style.display = "none";
        });

      form.classList.add("was-validated");
    });

    document.getElementById("clearForm").addEventListener("click", () => {
      form.reset();
      refreshSelect();
      form.classList.remove("was-validated");
      titleFeedback.style.display = "none";
      genreFeedback.style.display = "none";
      posterFeedback.style.display = "none";
    });

    const refreshSelect = () => {
      const selectElement = document.getElementById("year");
      const currentYear = new Date().getFullYear();
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Seleccione año estreno";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      selectElement.appendChild(defaultOption);

      for (let year = currentYear; year >= 1920; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        selectElement.appendChild(option);
      }

      selectElement.selectedIndex = 0;
    };

    const validateTitle = () => {
      const title = document.getElementById("movieTitle").value;
      const isValid = title.trim() !== "";
      titleFeedback.style.display = isValid ? "none" : "block";

      if (!isValid) {
        titleFeedback.textContent = "Ingrese título de la película";
        return false;
      } else {
        titleFeedback.textContent = "";
        return true;
      }
    };

    const validateDirector = () => {
      const director = document.getElementById("director").value;
      const isValid = director.trim() !== "";
      directorFeedback.style.display = isValid ? "none" : "block";

      if (!isValid) {
        directorFeedback.textContent =
          "Por favor, ingrese el nombre del director.";
        return false;
      } else {
        directorFeedback.textContent = "";
        return true;
      }
    };

    const validateYear = () => {
      const year = document.getElementById("year").value;
      const isValid = selectElement.selectedIndex !== 0;
      yearFeedback.style.display = isValid ? "none" : "block";
      if (!isValid) {
        yearFeedback.textContent = "Por favor, seleccione un año.";
        yearFeedback.style.display = "block";
        return false;
      } else {
        yearFeedback.textContent = "";
        return true;
      }
    };

    const validateGenres = () => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const atLeastOneChecked = Array.from(checkboxes).some(
        (checkbox) => checkbox.checked
      );
      genreFeedback.style.display = atLeastOneChecked ? "none" : "block";
      return atLeastOneChecked;
    };

    const validateRate = () => {
      const rate = document.getElementById("rating").value;
      const isValid = !isNaN(rate) && rate >= 0 && rate <= 10;
      rateFeedback.style.display = isValid ? "none" : "block";
      if (!isValid) {
        rateFeedback.textContent =
          " Por favor, ingrese un rating válido (ej: 8.5 - de 0 a 10).";
        return false;
      } else {
        rateFeedback.textContent = "";
        return true;
      }
    };

    const validatePoster = () => {
      const posterUrl = document.getElementById("poster").value;
      const validImageExtensions = /\.(jpg|jpeg|png|gif|svg|bmp)$/i;
      const isValid = validImageExtensions.test(posterUrl);
      posterFeedback.style.display = isValid ? "none" : "block";
      return isValid;
    };

    const captureFormData = () => {
      const title = document.getElementById("movieTitle").value;
      const year = parseInt(document.getElementById("year").value);
      const director = document.getElementById("director").value;
      const duration = formatDuration(
        document.getElementById("movieDuration").value
      );
      const genres = captureGenres();
      const rating = parseFloat(document.getElementById("rating").value);
      const poster = document.getElementById("poster").value;

      return {
        title,
        year,
        director,
        duration,
        genre: genres,
        rate: rating,
        poster,
      };
    };

    const formatDuration = (duration) => {
      const [hours, minutes] = duration.split(":");
      return `${parseInt(hours)}h ${parseInt(minutes)}min`;
    };

    const captureGenres = () => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      return Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    };

    const sendDataToBackend = async (data) => {
      const url = "http://localhost:3000/movies";
      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response; 
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        throw error; 
      }
    };
  });
}

module.exports = validateForm;
