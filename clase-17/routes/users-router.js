const express = require ('express');
const router = express.Router();

const {getUsers, createUser, getUserById, deleteUserById, updateUserById, login} = require('../controllers/UserController');

// retorna todos los usuarios
router.get('/', getUsers);

// buscar usuario por id
router.get('/:id', getUserById);

// crea un usuario
router.post('/', createUser);

// loguearse
router.post('/login', login);

// eliminar un usuario por id
router.delete('/:id', deleteUserById);

// actualizar un usuario por id
router.put('/:id', updateUserById);

// exportamos el router
module.exports = router;

