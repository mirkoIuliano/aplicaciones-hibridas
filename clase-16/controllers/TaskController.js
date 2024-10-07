/*-------- En el controlador vamos a crear las funciones que luego van a ser llamadas en las rutas --------*/


/* -------------------- El controlador importa el modelo (en este caso importamos Task y User porque vamos a usar los dos) -------------------- */
const {Task} = require('../models/TaskModel');
const { User } = require('../models/UserModel');


/* -------------------- Ahora vamos a hacer las funciones para un CRUD -------------------- */

// Función para traer todas los tareas
const getTasks = async (req, res) => {
    try {
        // find es un método de mongoose
        const tasks = await Task.find().populate('user'); 
                                    // el populate sirve para que en el atributo user aparezcan todos los datos del usuario (el id, el nombre, el password, etc)
        /*
        CHAT GPT 
        El método find() en Mongoose se utiliza para realizar una búsqueda en la colección de la base de datos y recuperar todos los documentos que coinciden con los criterios especificados. Cuando usas User.find() sin ningún argumento, obtienes todos los documentos de la colección users.
        */
        res.status(200).json({mensaje: "Se trajo el listado de tareas de manera correcta", tareas:tasks})
    } catch (error){
        console.error(error)
        response.status(500).json( { mensaje: 'Ocurrió un error al buscar los tareas', error: error } );
    }
}

// Función para crear tarea
const createTask = async (req, res) => { 
    try {
    // desetrcutramos req.body y creamos un objeto con el contenido que tiene body
    const { description, userId } = req.body; // extraemos del body la descripción y el userId
    
    /* ACÁ DEBERÍAMOS VALIDAR */
    if (!description || !userId){
        return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {description, userId}}) // estaría bueno enviar por acá el dato que falta ???
        // Usamos "return" para asegurarnos de que la función se detenga aquí si falta algún parámetro
    }

    // buscamos un Usuario que tenga el mismo id y traemos sus datos y los guardamos en la const 'user'
    const user = await User.findById(userId)

    /*-------- DEBERÍA HACER MÁS VALIDACIONES. SE ME OCURRE QUE PUEDA VALIDAR SI EXISTE O NO EXISTE EL USUARIO QUE QUIERE ESCRIBIR ESTA NUEVA TAREA --------*/

    // creamos una instancia del modelo Task
    const newTask = new Task({ // como parámetro le pasamos los datos. Estos datos van a parar al constructor del modelo Task 
        description,
        user: user._id, // al atributo user que está en el modelo Task le vamos a pasar el id del user que encontramos antes que tiene el mismo id
    });
    // save es un método que ya viene creado de Mongoose. Sirve para guardarun documento en la base de datos (docuemntos sería el equivalente a las fialas de uns bd sql). Básicamente save() guarda un dato en la BD
    await newTask.save();
    res.status(200).json({mensaje: 'Tarea nueva creada exitosamente', tarea_nueva: newTask})
} catch (error){
    console.error(error)
    response.status(500).json( { mensaje: 'Ocurrió un error al crear la tarea' } );
}
}



// creamos una función para encontrar por id
const getTasksByUserId = async (req, res) => { 
    try {
    const id  = req.params.id;
    /* el profe lo hizo así:
        const { id } = req.params; 
    pero a mi me resulta más fácil de entender de mi manera
    el profe está destructurando el req.params y sacando solo la clave id. A mi me parece más entendible y útil de mi manera  
    */
    const tasks = await Task.find({ user: id }).populate('user'); 
                                // busca todas las tareas donde el campo user (que hace referencia al user._id) coincida con el valor de id que obtienes de la URL

    /* Hacemos ahora una pequeña validación pero debería pensar si hacen falta otras si lo veo necesario */
    // si se encuentran tareas, las devolvemos en la respuesta
    if (tasks.length > 0) {
        res.status(200).json({ mensaje: "Se encontraron las tareas correctamente", tasks: tasks });
    } else {
        // si no hay tareas para ese usuario, respondemos con un 404
        res.status(404).json({ mensaje: `No se encontraron tareas para el usuario con el id ${id}` });
        return
    }

    
    
} catch (error) {
    console.error(error)
    response.status(500).json( { mensaje: `Ocurrió un error al buscar usuario con el id ${id}`, error: {} } );
}
}

// creamos una función para borrar una tarea
const deleteTaskById = async (req, res) => { 
    try {
    // primero guardo el id de la url en una variable
    const id  = req.params.id;
    // buscamos la tarea por el id
    const taskById = await Task.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó
    if (taskById) {
        // con findByIdAndDelete busca por id y lo elimina
        await Task.findByIdAndDelete(id);
        res.status(200).json({mensaje: `Se eliminó la tarea con id ${id} correctamente`, tarea_borrada: taskById})
    } else {
        res.status(404).json({mensaje: `No se encontró la tarea con el id ${id}`})
        return
    }

    
} catch (error) {
    console.error(error)
    response.status(500).json({mensaje: `Ocurrió un error al intentar eliminar la tarea con el id ${id}`});
}
}

// creamos una función para actualizar datos de una tarea
const updateTaskById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { description, completed} = req.body;
        const taskById = await Task.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó
    /*------- DEBERÍA HACER MÁS VALIDACIONES DE QUE NO SE ENVÍEN DATOS DE MÁS, DE QUE ESTÉN TODOS, ETC -------*/
    if (taskById) {
        // con findByIdAndUpdate busca por id y lo actualiza
        await Task.findByIdAndUpdate(id, {description, completed}, {new:true}); /* como parémtros PRIMERO pasamos el id que tiene que buscar, SEGUNDO el objeto de actaulización, que contiene los campos y valores que quiero actualizar en el documento que estoy buscando, y el TERCER parámetro { new: true } se utiliza para indicar que quiero que el método devuelva el documento actualizado en lugar del documento original antes de la actualización */
        res.status(200).json({mensaje: `Se actualizó la tarea con id ${id} correctamente`, datos_viejos_de_la_tarea: taskById, datos_actualizados: {description, completed} })
    } else {
        res.status(404).json({mensaje: `No se encontró la tarea con el id ${id}`})
        return
    }
    } catch (error) {
        console.error(error)
        response.status(500).json( { mensaje: `Ocurrió un error al intentar actualizar los datos de la tarea con el id ${id}` } );
    }
}



// exportamos las funciones
module.exports = {getTasks, createTask, getTasksByUserId, deleteTaskById, updateTaskById}