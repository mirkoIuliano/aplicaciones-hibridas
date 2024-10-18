const express = require ('express');
const router = express.Router();

const {getTasks, createTask, getTasksByUserId, deleteTaskById, updateTaskById} = require('../controllers/TaskController');

// retorna todas las tareas
router.get('/', getTasks);

// buscar tareas por id de usuario
router.get('/:id', getTasksByUserId);

// crea una tarea
router.post('/', createTask);

// eliminar una tarea por id
router.delete('/:id', deleteTaskById);

// actualizar una tarea por id
router.put('/:id', updateTaskById);

// exportamos el router
module.exports = router;

