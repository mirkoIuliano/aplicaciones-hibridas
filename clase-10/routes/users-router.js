// En clase 9 este archivo lo creó para que veamos cómo sería el Principio de Responabilidad Única aplicado en las rutas. Aquí vamos a definir las rutas y asociarlas con una función del controlador

const express = require('express');
const router = express.Router();

// clase 10 importamos el controlador de productos (sus funciones)
const { getUsers, getUserById, addUser, updateUser, deleteUser } = require('../controllers/user.controller');



// Defino la ruta para obtener todos los productos y la asocio con la función getUsers del controlador
router.get('/', getUsers)



// Defino la ruta para obtener productos por id y la asocio con la función getUserById del controlador
router.get('/:id', getUserById)



// Defino la ruta para crear productos y la asocio con la función addUser del controlador
router.post('/', addUser)



// Defino la ruta para actualizar productos y la asocio con la función updateUser del controlador
router.put('/:id', updateUser)



// Defino la ruta para eliminar productos y la asocio con la función deleteUser del controlador
router.delete('/:id', deleteUser)



module.exports = router;