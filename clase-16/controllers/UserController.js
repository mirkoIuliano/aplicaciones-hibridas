/*-------- En el controlador vamos a crear las funciones que luego van a ser llamadas en las rutas --------*/


/* -------------------- El controlador importa el modelo -------------------- */
const {User} = require('../models/UserModel');


/* -------------------- Esto es para hacer el cifrado de la contraseña y usar JSWT (json web token) -------------------- */
// primero importamos la librería bcrypt para encriptar la contraseña 
const bcrypt = require('bcrypt');
// después, para usar variables de entorno tengo que requerir el archivo '.env'. En él, está la SECRETKEY que vamos a usar
const dotenv = require('dotenv'); // con esto ya requerimos la librería y tenemos soporte para variables de entorno
// ahora abrimos la configuración
dotenv.config();
// creamos la clave privada y hacemos que sea igual a la variable de entorno SECRETKEY
const secretKey = process.env.SECRETKEY
// creamos la const salt que va a tener el número de dificultad de encriptación que queremos
const salt = 10;
// para el toquen y la atuenticación primero importamos ela libreria jsonwebtoken
const jwt = require('jsonwebtoken')




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
        res.status(200).json({mensaje: "Se trajeron el listado de usuarios de manera correcta", usuarios:users})
    } catch (error){
        console.error(error)
        res.status(500).json( { mensaje: 'Ocurrió un error al buscar los usuarios', error: error } );
    }
}

// Función para crear usuario
const createUser = async (req, res) => { 
    try {
    // desetrcutramos req.body y creamos un objeto con el contenido que tiene body
    const { name, email, password } = req.body; // extraemos del body el name, el email y el password
    
    /* ACÁ DEBERÍAMOS VALIDAR 
    por ej: que el password tenga min 8 caracteres, si queremos que tenga que ser si o si alfanumérico, etc
    */
    if (!name || !email || !password){
        return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, email, password}}) // estaría bueno enviar por acá el dato que falta ???
        // Usamos "return" para asegurarnos de que la función se detenga aquí si falta algún parámetro
    }

    // clase 15: encriptamos la contraseña usando la biblioteca bcrypt
    const passwordHash = await bcrypt.hash(password, salt) // usamos el método hash para encriptarla. Este método recibe dos parámetros: la clave que queremos encriptar y el nivel de encriptación que queremos

    // creamos una instancia del modelo User
    const newUser = new User({ // como parámetro le pasamos los datos. Estos datos van a parar al constructor del modelo User 
        /* Esta es una manera de pasar el objeto: */
        // name : name,
        // email : email,
        // password : password
        /* Esta es otra manera: */
        name,
        email,
        password : passwordHash // clase 15: acá le estamos diciendo que password queremos que sea igual a passwordHash 
        // como la clave y el valor son iguales JS lo puede entender. Es lo mismo que hacerlo name:name, email:email...
    });
    // save es un método que ya viene creado de Mongoose. Sirve para guardarun documento en la base de datos (docuemntos sería el equivalente a las fialas de uns bd sql). Básicamente save() guarda un dato en la BD
    await newUser.save();
    res.status(200).json({mensaje: 'Usuario nuevo creado exitosamente', usuario_nuevo: newUser})
} catch (error){
    console.error(error)
    res.status(500).json( { mensaje: 'Ocurrió un error al crear el usuario', error: {} } );
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
    res.status(500).json( { mensaje: `Ocurrió un error al buscar usuario con el id ${id}`, error: {} } );
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
    res.status(500).json({mensaje: `Ocurrió un error al intentar eliminar el usuario con el id ${id}`});
}
}

// creamos una función para actualizar datos de un usuario
const updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name, email, password} = req.body;
        const userById = await User.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó


        /* MIRKO, ESTO LO ESCRIBIS EL DIA 6-10 VIENDO LA CLASE 16: HACE FALTA QUE ENCRIPTE LA CONTRASEÑA DE NUEVO. ESTO QUE HICE AHORA LA HASHEA DE NUEVO SIEMPRE, PERO ESTARÍA BUENO QUE SOLO LA HASHEE SI LA CONTRASEÑA NO ES LA MISMA  */

        // primero comparo si la contraseña nueva es igual a la vieja
        const passwordValue = await bcrypt.compare(password, userById.password)
        
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

    /*------- DEBERÍA HACER MÁS VALIDACIONES DE QUE NO SE ENVÍEN DATOS DE MÁS, DE QUE ESTÉN TODOS, ETC -------*/
    
    if (userById) { // si existe el usuario con ese id entro
        if (!passwordValue){ // si la contraseña es la misma
            // hasheo la nueva password 
            const passwordHash = await bcrypt.hash(password, salt)
            // actualizo con la password nueva encriptada
            await User.findByIdAndUpdate(id, {name, email, password: passwordHash}, {new:true});
            res.status(200).json({mensaje: `Se actualizaron los datos y la contraseña del usuario con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {name, email, password: passwordHash} })
        } else {
            // con findByIdAndUpdate busca por id y lo actualiza
            await User.findByIdAndUpdate(id, {name, email, password: userById.password}, {new:true}); /* como parémtros PRIMERO pasamos el id que tiene que buscar, SEGUNDO el objeto de actaulización, que contiene los campos y valores que quiero actualizar en el documento que estoy buscando, y el TERCER parámetro { new: true } se utiliza para indicar que quiero que el método devuelva el documento actualizado en lugar del documento original antes de la actualización */
            res.status(200).json({mensaje: `Se actualizaron los datos excepto la contraseña con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {name, email, password: userById.password} })
        }
    } else {
        res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        return
    }
    } catch (error) {
        console.error(error)
        res.status(500).json( { mensaje: `Ocurrió un error al intentar actualizar los datos del usuario con el id ${id}` } );
    }
}




// creamos una función para que el usuario se loguee
const login = async (req, res) => {
    try {
        // de la petición(request) vamos a sacar el email y la password
        const {email, password} = req.body;

        // Verificamos si el email existe
        // buscamos un User que tenga el mismo email
        const user = await User.findOne({email : email}) // esto sería lo mismo que cuando usabamos SQL que hacíamos SELECT * FROM users WHERE email = 'mirko@gmail.com'
        // le estamos diciendo que busque el usuario que tenga el mismo email. Como respuesta va a dar un objeto tipo JSON con el usuario y sus datos o me devuelve un null si no encuentra
        // hacmos la validación y enviamos un mensaje en caso de que no exista un user con el mismo mail
        if(!user){
            res.status(401).json({mensaje: 'El email no es válido'})
            return
        }
        // res.status(200).json({mensaje: 'Existe el email en la base de datos'})

        // Verificamos si el password es válido
        const passwordValue = await bcrypt.compare(password, user.password) // le pedimos que compare el password recibido por el request con el password del user que tiene el mismo email 
        // hacemos la validación y enviamos un mensaje en caso de que no coincidan las contraseñas
        if(!passwordValue){
            res.status(401).json({mensaje: 'La contraseña no es valida'})
            return
        }

        // si todo va bien, generamos el token
        // en la const data vamos a poner los datos que queremos guardar en el token 
        const data = {
            userId : user._id,
            name : user.name
        }
        const token = jwt.sign(data, secretKey, {expiresIn: '12h'}) // usamos el método sign de la librería jsonwebtoken
        // enviamos la const data, la clave privada (secretKey) y el timepo de expiración del toquen (nosotros acá le decimos que queremos que el token expire en 12 horas)

        console.log(token)
        // Enviamos el token al cliente
        res.status(200).json({mensaje: 'Se ingresó con un mail y constraseña correcta', data:{jwt: token}})
        // Clase 15: dice que este token deberíamos guardarlo en el localStorage y después en cada request que haga envíe este token. También deberíamos crear un middleware para proteger. 
        // Clase 15: si quisieramos manejarnos con roles de usuario en 'data' deberíamos mandar el atributo rol también 
        

    } catch (error) {
        console.error(error)
        res.status(500).json( { mensaje: `Ocurrió un error `, data: error } );
    }
}


// exportamos las funciones
module.exports = {getUsers, createUser, getUserById, deleteUserById, updateUserById, login}



/*-------- Esto es el intento que tuve de hacer el updateUserId hasheando la contraseña --------*/
/* BORRAR ESTE
// creamos una función para actualizar datos de un usuario
const updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name, email, password} = req.body;
        const userById = await User.findById(id); // esto yo lo hice para poder hacer la validación de si existe o no el id que se buscó

        console.log(userById.password)
        console.log(password)
        
        /* MIRKO, ESTO LO ESCRIBIS EL DIA 6-10 VIENDO LA CLASE 16: HACE FALTA QUE ENCRIPTE LA CONTRASEÑA DE NUEVO */
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    /*------- DEBERÍA HACER MÁS VALIDACIONES DE QUE NO SE ENVÍEN DATOS DE MÁS, DE QUE ESTÉN TODOS, ETC -------*/
/* BORRAR ESTE
    if (userById) {
        if(password !== userById.password){
            // hasheo la nueva password HASTA ACA FUNCIONA
            const passwordHash = await bcrypt.hash(password, salt)
            // con findByIdAndUpdate busca por id y lo actualiza
            await User.findByIdAndUpdate(id, {name, email, password: passwordHash}, {new:true});
            res.status(200).json({mensaje: `Se actualizó el usuario con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {name, email, password: passwordHash} })
        } else {
            // con findByIdAndUpdate busca por id y lo actualiza
            await User.findByIdAndUpdate(id, {name, email, password}, {new:true}); /* como parémtros PRIMERO pasamos el id que tiene que buscar, SEGUNDO el objeto de actaulización, que contiene los campos y valores que quiero actualizar en el documento que estoy buscando, y el TERCER parámetro { new: true } se utiliza para indicar que quiero que el método devuelva el documento actualizado en lugar del documento original antes de la actualización */
/* BORRAR ESTE
            res.status(200).json({mensaje: `Se actualizó el usuario con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {name, email, password} })
        }
    } else {
        res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        return
    }
    } catch (error) {
        console.error(error)
        response.status(500).json( { mensaje: `Ocurrió un error al intentar actualizar los datos del usuario con el id ${id}` } );
    }
}
BORRAR ESTE    */