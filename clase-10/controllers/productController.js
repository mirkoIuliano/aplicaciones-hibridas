// Este archvivo va a: Importar el modelo, realizar las validaciones y ejecutar los métodos del modelo

const {ProductManager} = require('../models/ProductManager');

const getProducts = async (req, res) => {
    const products = new ProductManager();
    const data = await products.getProducts;
    console.table(data);
    res.status(200).send(data);
}