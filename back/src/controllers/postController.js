const postController = (req, res) => { 
    res.status(200).send("Estamos enviando información de la base de datos");
};

module.exports = {
    postController,
};
