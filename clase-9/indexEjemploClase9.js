const express = require('express');
const port = 3000; 

// importamos las rutas
const routerAPI = require('./routes');
    /* 
    esto es lo mismo que poner así:
    const routerAPI = require('./routes/index');
    express cuando importamos la carpeta con varios archivos y no específicamos, automáticamente importa el index
    */

const app = express();

// Middleware de JSON
app.use(express.json());
// esto lo vamos a ver la siguiente clase

// Ruta Raiz -> Voy a colocar algo de HTML luego
app.get('/', (req, res) => {
    res.status(200).send('<h1> API REST </h1>');
})


// Todo lo que no sea /home (user, control, categorías, orden) va a caer acá:
// Ahora llamamos a las rutas:
routerAPI(app);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})