// primero importamos Mongoose
const mongoose = require('mongoose');

// de este objeto Mongoose sacamos el Schema. El Schema es como un template en que vamos a crear nuestra BD
const Schema = mongoose.Schema;


// creamos el Esquema
const mySchema = new Schema({
// acá vamos a empezar a definir los datos que vamos a guardar en mi esquema
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // unique lo qie hace es validar en la BD que no existe ninguna clave es única
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
const User = mongoose.model('User', mySchema);
            /* mongoose.model('User', mySchema);
            el 'User' es el nombre que le vamos a dar al modelo
            va a recibir como parámetro mySchema ---> el mySchema sería como la estructura de collection (collection sería la tabla en la BD SQL). Sería como cuando definimos los nombres de las columnas y los valores que reciben cada una 
            */ 

// exportamos el modelo
module.exports = {User};