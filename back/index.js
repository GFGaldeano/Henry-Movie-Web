const app = require("./src/server");
const conDB = require("./src/config/conDB");

conDB()
.then((res)=>{
    app.listen(3000, () => {
        console.log("Servidor escuchando en el puerto 3000");
    });
})
.catch((err) =>{
    console.log("Error al conectar la BDD");
})
