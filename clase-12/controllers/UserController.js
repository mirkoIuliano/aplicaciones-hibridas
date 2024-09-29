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
const creatUser = async (req, res) => { try {

    // desetrcutramos req.body y creamos un objeto con el contenido que tiene body
    const { name, email, password } = req.body; // extraemos del body el name, el email y el password
    
    /* ACÁ DEBERÍAMOS VALIDAR */
    
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
    res.status(200).json({msg: 'Usuario nuevo creado exitosamente', usuario_nuevo: newUser})
} catch (error){
    console.error(error)
    response.status(500).json( { mensaje: 'Ocurrió un error al crear el usuario', error: error } );
}
}

// exportamos las funciones
module.exports = {getUsers, creatUser}