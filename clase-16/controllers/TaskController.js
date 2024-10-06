/*-------- En el controlador vamos a crear las funciones que luego van a ser llamadas en las rutas --------*/


/* -------------------- El controlador importa el modelo -------------------- */
const {Task} = require('../models/TaskModel');


// exportamos las funciones
module.exports = {getUsers, creatUser, getUserById, deleteUserById, updateUserById, login}