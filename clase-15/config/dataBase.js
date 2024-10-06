/*------- ESTO ES PARA CONECTARNOS A LA BD -------*/
// importamos mongoose
const mongoose = require('mongoose');

// para usar variables de entorno tengo que requerir el archivo '.env'
const dotenv = require('dotenv'); // con esto ya requerimos la librería y tenemos soporte para variables de entorno

// le decimos que queremos trabajar con dotenv 
dotenv.config();


// nos conectamos a la base de datos
mongoose.connect(process.env.URI_BD) // usamos la variable de entorno URI_BD, que es la cadena de conexión a la base de datos
// recibe como parámetros la cadena de conexión de la base de datos, que conseguimos de MongoDB Compass al crear una nueva conexión

const db = mongoose.connection;

db.on('error', () => { console.error('Error') });
// 'on' es como el eventListener  

// en caso de que se conecte correctamente va a decir esto
db.once('open', () => {
    console.log('Conexión correcta');
})

// exportamos la conexión a la base de datos
module.exports= db;