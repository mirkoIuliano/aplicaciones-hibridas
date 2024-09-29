//  ESTE INDEX ES EL QUE SE ACOMODA A LOS CAMBIOS QUE HICE EN products-router.js
// este nuevo index deja de tener las rutas que antes tenía y se encarga solamente de requerir las cosas y llamar a los diferentes archivos
const express = require('express'); // importa el módulo Express.
const app = express(); // crea una instancia de una aplicación Express. Esto te permite definir rutas, middlewares y otras configuraciones para tu servidor.

require('dotenv').config();
// accedemos a la variable de entorno
const port = process.env.PORT; 
/* 
Antes hacíamos así el port: 
const port = 3000; 
Pero ahora lo hacemos con varaibles de entorno (osea que vienen de el archivo .env)
*/

// importamos las rutas
const routerAPI = require('./routes');
/* 
esto es lo mismo que poner así:
const routerAPI = require('./routes/index');
express cuando importamos la carpeta con varios archivos y no específicamos, automáticamente importa el index
*/


// importamos mongoose
const mongoose = require('mongoose');

// nos conectamos a la base de datos
mongoose.connect('mongodb://localhost:27017/app')
// recibe como parámetros la cadena de conexión de la base de datos, que conseguimos de MongoDB Compass al crear una nueva conexión
// el '/app' lo agregamos nosotros

const db = mongoose.connection;

db.on('error', () => { console.error('Error') });
// 'on' es como el eventListener  

// en caso de que se conecte correctamente va a decir esto
db.once('open', () => {
    console.log('Conexión correcta');
})


// Middleware para parsear JSON
app.use(express.json()); /* esto las clases anteriores (puedo verlo en clase-9 o en clase-8-ejercicio-7) lo usábamos en la ruta post (para crear un nuevo objeto). Esto es necesario de tenerlo porque sino express no recibe los datos como un JSON
Como lo estamos poniendo en el index.js de la carpeta raíz se va a aplicar a todos los archivos
Sin esto, por ejemplo, en el archivo products-router no funcionaría el post
CLASE 11 21:00 -> es un middleware, osea que cada request que llegue de la app, él va la va a estar procesandolo. Este en específico se encarga de procesar los JSON, de hacer el parseJSON 
*/

// acá estamos usando el middleware next
app.use( async (req, res, next) => {
    console.log('Soy el middleware'); // Esto sirve como ejemplo para ver que cada vez que haya una petición va a estar este console.log porque el middleware está presente en TODAS las peticiones
    // si queremos hacer validaciones las podemos hacer aquí de esta forma
    // const body = req.body; // de esta manera obtengo el contenido del request para poder después hacer las validaciones que quiera  
    // console.log(body);
    next();
})

// Ruta Raiz -> Acá voy a colocar algo de HTML luego
app.get('/', (req, res) => {
    res.status(200).send('Home');
    console.log("API REST");
});

/* CLASE 11: importamos el modelo userModedls ---> creo que en clase 12 esto lo borra del index.js y lo importa en un controlador nuevo que va a hacer */
const {User}  = require('./models/UserModel');

/* CLASE 11: hacemos la ruta post para guardar un unevo usuario ---> creo que en clase 12 esto lo borra del index.js y crea la función en un controlador nuevo que va a ahacer*/
app.post('/users', async (req, res) =>{
    console.log('POST users')
    const body = req.body
    /*--- ACÁ DEBERÍA HABER TODA UNA VALIDACIÓN DE DATOS ---*/
    const user = {
        name : body.name,
        email : body.email,
        password : body.password,
    }

    // creo una instancia del modelo User
    const myUser = new User(user) // le paso al constructor los datos (osea la const user que estamos enviándole)

    // con el método save lo guardamos en bd
    await myUser.save()
    
    // esto el profe no lo agregó, pero lo agrego yo porque sino queda pensando en el 'postman' se queda esperando una respuesta
    res.status(200).json({mensaje : 'Usuario nuevo agregado'})

})

// Todo lo que no sea /home (user, control, categorías, orden) va a caer acá:
// Ahora llamamos a las rutas:
routerAPI(app);  // esta función se va a encarga de registrar y organizar las rutas de tu aplicación
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
    -> buscnado 'no entiendo bien qué es una instancia de Express ni qué hace Express' voy a ver una respuesta sobre qué hace express y debajo de esta respuesta la diferencia entre usar app.get para crear rutas y router.get para crear rutas 

    */








// El servidor se inicia con la llamada a app.listen()
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    /* 
    app.listen(port, callback) inicia el servidor en el puerto especificado (3000 en este caso). La función de callback se ejecuta cuando el servidor está en funcionamiento, y puedes usarla para imprimir un mensaje en la consola o realizar otras acciones.
    */
})


