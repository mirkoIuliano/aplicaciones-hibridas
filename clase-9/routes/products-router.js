// En clase 9 este archivo lo creó para que veamos cómo sería el Principio de Responabilidad Única aplicado en las rutas


const express = require('express');
const router = express.Router();

// Defino las rutas

// Defino la ruta para obtener todos los productos 
router.get('/', (req, res) => {
    console.log('GET Products')
})

// Defino la ruta para obtener productos por id 
router.get('/:id', (req, res) => {
    console.log('GET Products by ID')
})

// Defino la ruta para crear productos 
router.post('/', (req, res) => {
    console.log('POST Products')
})

// Defino la ruta para actualizar productos 
router.put('/:id', (req, res) => {
    console.log('PUT Products')
})

// Defino la ruta para eliminar productos 
router.delete('/:id', (req, res) => {
    console.log('DELETE Products')
})


module.exports = router;