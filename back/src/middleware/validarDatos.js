
const validarDatos = async (req, res, next) => {
    try {
        const { title, year, director, duration, genre, rate, poster } = req.body;

        const directorRegex = /[A-Za-z]+(?:\s[A-Za-z]+)*/;
        const timePattern = /\d+h\s?\d{1,2}min/i;
        const validRate = /(10(\.0{0,1})?|[0-9](\.\d{1,2})?)/;
        const imageUrlPattern = /(http|https):\/\/.*\.(jpeg|jpg|gif|png|bmp|webp|svg)$/;

        if (!title || !year || !director || !duration || !genre || !rate || !poster) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: "El título es inválido" });
        }

       if (isNaN(year) || year < 1921 || year > 2025 || year.toString().length !== 4) {
        // if (isNaN(year) || year < 1921 || year > 2025) {
            return res.status(400).json({ error: "El año debe ser un número de 4 dígitos entre 1921 y 2025" });
        }

        if (!directorRegex.test(director)) {
            return res.status(400).json({ error: "El director debe completarse correctamente" });
        }

        if (!Array.isArray(genre) || genre.length === 0) {
            return res.status(400).json({ error: "El género debe ser un array no vacío" });
        }

        if (!timePattern.test(duration)) {
            return res.status(400).json({ error: "La duración debe tener el formato 'Xh Ymins'" });
        }

        if (!validRate.test(rate)) {
            return res.status(400).json({ error: "El rate debe tener el formato X.X o X" });
        }

        if (!imageUrlPattern.test(poster)) {
            return res.status(400).json({ error: "La URL de la imagen es inválida" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Surgió un error con la base de datos" });
    }
};

module.exports = validarDatos;
