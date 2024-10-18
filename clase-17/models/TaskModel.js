/*------ El model creo que es justamente eso, un modelo de cómo va a ser la estructura de la collection. Qué datos va a recibir, qué nombre les pone y qué validaciones les va a hacer ------*/

// primero importamos Mongoose
const mongoose = require('mongoose');

// de este objeto Mongoose sacamos el Schema. El Schema es como un template en que vamos a crear nuestra BD
const Schema = mongoose.Schema;


// creamos el Esquema
const taskSchema = new Schema({
// acá vamos a empezar a definir los datos que vamos a guardar en mi esquema
    description: {
        type: String,
        required: true
    },
    completed: {
        type : Boolean,
        default : false // por default cuando creamos la tarea va a ser falso
    },
    created_at: {
        type: Date,
        default: Date.now // acá obtenemos la fecha y hora actual
    },
    // vamos a poner la referencia al usuario que creó esta trea
    user: {
        type: Schema.Types.ObjectId, // Clase 16: el id nosotros lo vemos como un string pero en realidad es un objeto. Este dato nos va a servir para después 
        ref: 'User' // así hacemos la referencia a la collection User
    }
});

// haciendo esto anterior recién creamos el esquema
// para crear el objeto realmente hacemos esto:
const Task = mongoose.model('Task', taskSchema);
            /* mongoose.model('Task', taskSchema);
            el 'Task' es el nombre que le vamos a dar al modelo
            va a recibir como parámetro taskSchema ---> el taskSchema sería como la estructura de la collection (collection sería la tabla en la BD SQL). Sería como cuando definimos los nombres de las columnas y los valores que reciben cada una 
            */ 

// exportamos el modelo
module.exports = {Task};