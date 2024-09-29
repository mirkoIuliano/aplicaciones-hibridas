// En clase 9 este archivo lo creó para que veamos cómo sería el Principio de Responabilidad Única aplicado en las rutas. Aquí vamos a definir las rutas y asociarlas con una función del controlador

const express = require('express');
const router = express.Router();

// clase 10 importamos el controlador de productos (sus funciones)
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');



// Defino la ruta para obtener todos los productos y la asocio con la función getProducts del controlador
router.get('/', getProducts)



// Defino la ruta para obtener productos por id y la asocio con la función getProductById del controlador
router.get('/:id', getProductById)



// Defino la ruta para crear productos y la asocio con la función addProduct del controlador
router.post('/', addProduct)



// Defino la ruta para actualizar productos y la asocio con la función updateProduct del controlador
router.put('/:id', updateProduct)



// Defino la ruta para eliminar productos y la asocio con la función deleteProduct del controlador
router.delete('/:id', deleteProduct)



module.exports = router;