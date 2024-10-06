/*------ El model creo que es justamente eso, un modelo de cómo va a ser la estructura de la collection. Qué datos va a recibir, qué nombre les pone y qué validaciones les va a hacer ------*/

// primero importamos Mongoose
const mongoose = require('mongoose');

// de este objeto Mongoose sacamos el Schema. El Schema es como un template en que vamos a crear nuestra BD
const Schema = mongoose.Schema;


// creamos el Esquema
const userSchema = new Schema({
// acá vamos a empezar a definir los datos que vamos a guardar en mi esquema
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // unique lo que hace es validar en la BD que no existe ninguna clave igual
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now // acá obtenemos la fecha y hora actual
    }
});

// haciendo esto anterior recién creamos el esquema
// para crear el objeto realmente hacemos esto:
const User = mongoose.model('User', userSchema);
            /* mongoose.model('User', userSchema);
            el 'User' es el nombre que le vamos a dar al modelo
            va a recibir como parámetro userSchema ---> el userSchema sería como la estructura de la collection (collection sería la tabla en la BD SQL). Sería como cuando definimos los nombres de las columnas y los valores que reciben cada una 
            */ 

// exportamos el modelo
module.exports = {User};