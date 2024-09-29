const express = require ('express');
const router = express.Router();

const {getUsers, creatUser} = require('../controllers/UserController');

// retorna todos los usuarios
router.get('/', getUsers);

// crea un usuario
router.post('/', creatUser);

// exportamos el router
module.exports = router;

