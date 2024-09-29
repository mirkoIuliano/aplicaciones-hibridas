const express = require ('express');
const router = express.Router();

const {getUsers, creatUser, getUserById, deleteUserById, updateUserById} = require('../controllers/UserController');

// retorna todos los usuarios
router.get('/', getUsers);

// buscar usuario por id
router.get('/:id', getUserById);

// crea un usuario
router.post('/', creatUser);

// eliminar un usuario por id
router.delete('/:id', deleteUserById);

// actualizar un usuario por id
router.put('/:id', updateUserById);

// exportamos el router
module.exports = router;

