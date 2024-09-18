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
routerAPI(app); // esta función se va a encarga de registrar y organizar las rutas de tu aplicación
    /* 
    CHAT GPT
    1. routes/index.js: Este archivo probablemente contiene la función routerAPI, la cual se encarga de agregar todas las rutas que tienes definidas en otros archivos (como products-router.js y users-router.js).
    2. routerAPI(app): Cuando llamas a esta función, le estás pasando la instancia de tu aplicación de Express (app), y esta función va a registrar las rutas para que tu servidor pueda manejar las solicitudes a las URLs correspondientes.

    ¿Qué hace routerAPI(app)?
    1. Recibe la aplicación de Express: app es la instancia de tu aplicación de Express, la cual maneja todas las rutas, middleware y lógica del servidor.
    2. Define las rutas: Dentro de la función routerAPI, asocias diferentes rutas (como /products y /users) con sus respectivos manejadores (productsRouter y usersRouter). Esto significa que cuando tu aplicación recibe una solicitud a /products, será manejada por las funciones que estén definidas en products-router.js, y lo mismo para /users.
    3. Registro de rutas: Al ejecutar routerAPI(app), las rutas se "registran" en la aplicación, lo que permite que el servidor responda a las solicitudes que coinciden con esas rutas.

    En resumen, routerAPI(app) es una forma organizada de separar y cargar todas las rutas de tu aplicación en un solo lugar (en este caso, el archivo routes/index.js).

    https://chatgpt.com/share/3bb3742b-fd83-4200-a28d-9b9406079120 -> buscar 'No enteindo muy bien el routerAPI(app)' para ver esta respuesta más extensa
    -> buscnado 'no entiendo bien qué es una instancia de Express ni qué hace Express' voy a ver una respuesta sobre qué hacer express y debajo de esta respuesta la diferencia entre usar app.get para crear rutas y router.get para crear rutas 

    */

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})