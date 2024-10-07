// En clase 9 este archivo lo creó para que veamos cómo sería el Principio de Responabilidad Única aplicado en las rutas

const express = require('express');
const router = express.Router();

// Defino las rutas

// Defino la ruta para obtener todos los usuarios 
router.get('/', (req, res) => {
    console.log('GET Users')
})

// Defino la ruta para obtener usuario por id 
router.get('/:id', (req, res) => {
    console.log('GET Users by ID')
})

// Defino la ruta para crear usuario 
router.post('/', (req, res) => {
    console.log('POST Users')
})

// Defino la ruta para actualizar usuario 
router.put('/:id', (req, res) => {
    console.log('PUT Users')
})

// Defino la ruta para eliminar usuario 
router.delete('/:id', (req, res) => {
    console.log('DELETE Users')
})


module.exports = router;