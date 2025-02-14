const loadMovies = require('../models/loadMovies');
const addHoverEffect = require('../models/addHoverEffect');
const updateYear = require('../models/updateYear');
const validateForm = require('../models/validateForm');

const movieContainer = document.getElementById("movie-container");

loadMovies(movieContainer, addHoverEffect);

validateForm();

document.addEventListener("DOMContentLoaded", updateYear);










