
const movieService = require("../services/movieService");
const catchAsync = require("../utils/catchAsync");


const getMovies= async (req,res) => {
        const movies = await movieService.getMovies();
        res.status(200).json(movies);
    };
const createMovie = async (req,res)=>{
        const {title,year,director,duration,genre,rate,poster} = req.body;
        const newMovie = await movieService.createMovie({title,year,director,duration,genre,rate,poster});
        res.status(201).json(newMovie);
    };

module.exports = {
 getMovies: catchAsync(getMovies),
 createMovie: catchAsync(createMovie),
};


