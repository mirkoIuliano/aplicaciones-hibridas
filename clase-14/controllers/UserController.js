/* En el controlador vamos a crear las funciones que luego van a ser llamadas en la   */

/* -------------------- El controlador importa el modelo -------------------- */
const {User} = require('../models/UserModel');




/* -------------------- Ahora vamos a hacer las funciones para un CRUD -------------------- */

// Función para traer a todos los usuarios
const getUsers = async (req, res) => {
    try {
        // find es un método de mongoose
        const users = await User.find();
        /*
        CHAT GPT 
        El método find() en Mongoose se utiliza para realizar una búsqueda en la colección de la base de datos y recuperar todos los documentos que coinciden con los criterios especificados. Cuando usas User.find() sin ningún argumento, obtienes todos los documentos de la colección users.
        */
        res.status(200).json({msg: "Se trajeron el listado de usuarios de manera correcta", usuarios:users})
    } catch (error){
        console.error(error)
        response.status(500).json( { mensaje: 'Ocurrió un error al buscar los usuarios', error: error } );
    }
}

// Función para crear usuario
const creatUser = async (req, res) => { 
    try {
    // desetrcutramos req.body y creamos un objeto con el contenido que tiene body
    const { name, email, password } = req.body; // extraemos del body el name, el email y el password
    
    /* ACÁ DEBERÍAMOS VALIDAR */
    if (!name || !email || !password){
        return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, email, password}}) // estaría bueno enviar por acá el dato que falta ???
        // Usamos "return" para asegurarnos de que la función se detenga aquí si falta algún parámetro
    }

    // creamos una instancia del modelo User
    const newUser = new User({ // como parámetro le pasamos los datos. Estos datos van a parar al constructor del modelo User 
        /* Esta es una manera de pasar el objeto: */
        // name : name,
        // email : email,
        // password : password
        /* Esta es otra manera: */
        name,
        email,
        password
        // como la clave y el valor son iguales JS lo puede entender. Es lo mismo que hacerlo name:name, email:email...
    });
    // save es un método que ya viene creado de Mongoose. Sirve para guardarun documento en la base de datos (docuemntos sería el equivalente a las fialas de uns bd sql). Básicamente save() guarda un dato en la BD
    await newUser.save();
    res.status(200).json({mensaje: 'Usuario nuevo creado exitosamente', usuario_nuevo: newUser})
} catch (error){
    console.error(error)
    response.status(500).json( { mensaje: 'Ocurrió un error al crear el usuario', error: {} } );
}
}

// creamos una función para encontrar por id
const getUserById = async (req, res) => { 
    try {
    const id  = req.params.id;
    /* el profe lo hizo así:
        const { id } = req.params; 
    pero a mi me resulta más fácil de entender de mi manera
    el profe está destructurando el req.params y sacando solo la clave id. A mi me parece más entendible y útil de mi manera  
    */
    const userById = await User.findById(id); // con este método de mongoose buscamos por id
    /* Hacemos ahora una pequeña validación pero debería pensar si hacen falta otras si lo veo necesario */
    if (userById) {
        res.status(200).json({mensaje: "Se trajo al usuario correctamente", usuario: userById})
    } else {
        res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        return
    }
    
} catch (error) {
    console.error(error)
    response.status(500).json( { mensaje: `Ocurrió un error al buscar usuario con el id ${id}`, error: {} } );
}
}

// creamos una función para borrar un usuario
const deleteUserById = async (req, res) => { 
    try {
    // primero guardo el id de la url en una variable
    const id  = req.params.id;
    // buscamos el usuario por el id
    const userById = await User.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó
    if (userById) {
        // con findByIdAndDelete busca por id y lo elimina
        await User.findByIdAndDelete(id);
        res.status(200).json({mensaje: `Se eliminó el usuario con id ${id} correctamente`, usuario_borrado: userById})
    } else {
        res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        return
    }

    
} catch (error) {
    console.error(error)
    response.status(500).json({mensaje: `Ocurrió un error al intentar eliminar el usuario con el id ${id}`});
}
}

// creamos una función para actualizar datos de un usuario
const updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name, email, password} = req.body;
        const userById = await User.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó
    /*------- DEBERÍA HACER MÁS VALIDACIONES DE QUE NO SE ENVÍEN DATOS DE MÁS, DE QUE ESTÉN TODOS, ETC -------*/
    if (userById) {
        // con findByIdAndUpdate busca por id y lo actualiza
        await User.findByIdAndUpdate(id, {name, email, password}, {new:true}); /* como parémtros PRIMERO pasamos el id que tiene que buscar, SEGUNDO el objeto de actaulización, que contiene los campos y valores que quiero actualizar en el documento que estoy buscando, y el TERCER parámetro { new: true } se utiliza para indicar que quiero que el método devuelva el documento actualizado en lugar del documento original antes de la actualización */
        res.status(200).json({mensaje: `Se actualizó el usuario con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {name, email, password} })
    } else {
        res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        return
    }
    } catch (error) {
        console.error(error)
        response.status(500).json( { mensaje: `Ocurrió un error al intentar actualizar los datos del usuario con el id ${id}` } );
    }
}

// exportamos las funciones
module.exports = {getUsers, creatUser, getUserById, deleteUserById, updateUserById}