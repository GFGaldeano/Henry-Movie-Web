
const mongoose = require("mongoose");


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true,
        minlength: [1, "El título debe tener al menos 1 carácter"],
        maxlength: [100, "El título no puede exceder los 100 caracteres"]
    },
    year: {
        type: Number,
        required: [true, "El año es obligatorio"],
        min: [1921, "El año debe ser mayor o igual a 1921"],
        max: [2025, "El año no puede ser mayor a 2025"],
        validate: {
            validator: function(value) {
                return /^\d{4}$/.test(value); // Verifica que el año tenga exactamente 4 dígitos
            },
            message: "El año debe tener exactamente 4 dígitos"
        }
    },
    director: {
        type: String,
        required: [true, "El director es obligatorio"],
        trim: true,
        minlength: [3, "El nombre del director debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre del director no puede exceder los 50 caracteres"]
    },
    duration: {
        type: String,
        required: [true, "La duración es obligatoria"],
        validate: {
            validator: function(value) {
                return /^\d+h\s?\d{1,2}min$/.test(value); // Formato "Xh Ymins" con espacio opcional
            },
            message: "La duración debe tener el formato 'Xh Ymin'"
        }
    },
    genre: {
        type: [String],
        required: [true, "El género es obligatorio"],
        validate: {
            validator: function(value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Debe haber al menos un género"
        }
    },
    rate: {
        type: Number,
        required: [true, "El rate es obligatorio"],
        min: [0, "El rate no puede ser menor a 0"],
        max: [10, "El rate no puede ser mayor a 10"],
        validate: {
            validator: function(value) {
                return /^(\d{1,2})(\.\d{1,2})?$/.test(value.toString()); // Formato X.X o X
            },
            message: "El rate debe tener el formato X.X o X"
        }
    },
    poster: {
        type: String,
        required: [true, "La URL del póster es obligatoria"],
        validate: {
            validator: function(value) {
                return /^(http|https):\/\/.*\.(jpeg|jpg|gif|png|bmp|webp|svg)$/.test(value);
            },
            message: "La URL del póster no es válida"
        }
    }
});


const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
