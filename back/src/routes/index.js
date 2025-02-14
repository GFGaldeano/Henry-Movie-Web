const { Router } = require("express");
const moviesController = require("../controllers/moviesController");
const validarDatos = require('../middleware/validarDatos');
const Movie = require("../models/Movie");


const router = Router();

router.get("/movies", moviesController.getMovies);

router.post("/movies", validarDatos ,moviesController.createMovie);

module.exports = router;