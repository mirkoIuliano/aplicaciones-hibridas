// Este archivo importa el modelo, realiza las validaciones y ejecuta los métodos del modelo

// Importamos el modelo ProdctManager usarlo después en las funciones
const ProductManager = require('../models/ProductManager');
// creo un objeto ProductManager
const manager = new ProductManager();


// Todas las funciones van a ser asincrónica
async function getProducts (request, response) {
    try {
        // esto es para la '/products'
        response.status(200).json(await manager.getProducts())
        console.log("El cliente ingresó a la ruta Products")
    } catch (error) {
        console.error(error);
    }
}

async function getProductById (request, response) {
    try {
        // con los ':' definimos los parámetros
        // console.log(request) ESTE CONSOLE.LOG ME SIRVE PARA VER QUE DENTRO DEL OBJETO REQUEST ESTÁ 'params' QUE ES DONDE ESTÁN LOS ID
        const id = request.params.id;
        const productoId = await manager.getProductById(id);
        if (!productoId){
            return response.status(404).send('Prodcto no encontrado');
            // con el .status() definimos el estado de la respuesta. 404 significa 'Not found' y es por eso que lo uso acá
        }
        response.status(200).json(productoId);
        console.log(`El cliente ingresó a la ruta Products con el id ${id}`);
    } catch (error) {
        console.error(error);
        response.status(500).json( { mensaje: 'Ocurrió un error al obtener el producto' } );
    }
}


/* 
app.use(express.json());
en index.js (de carpeta raiz) usabamos esto, pero chatgpt me dice que no lo tengo que usar en products-router pero que sí lo tengo que seguir manteniendo en index.js donde llamemos con app a la ruta (algo así) -> https://chatgpt.com/share/66e75a54-acdc-800b-b9e6-62bf42a2d82e BUSCAR: "En tu archivo de rutas, cuando cambias de app a router, necesitas asegurarte de que tu middleware express.json() se aplique en el archivo principal donde montas las rutas, no dentro del archivo products-router.js"
*/
async function addProduct (request, response) {
    try {
        // la idea es que en la herramienta 'Postman', desde la url '127.0.0.1:3000/api/products', se envíe por POST un json. Ej: { "id" : 5, "title" : "placa de video", "description" : "3090 rtx", "price" : 550, "image" : "placa.jpg", "stock" : 2 }
        const newProduct = request.body; // con request.body obtenemos el contenido del request, osea el json entero
        console.log('Cliente en la ruta POST: /products');
        console.log(newProduct); // acá hacemos un console.log del contenido del pedido
        // IMPORTANTE: lo que el cliente nos está enviando es un json. Express por sí solo no puede procesar un json, no lo recibe. Para eso hacemos el app.use(express.json()). Sin esto el body va a aparecer como undefined 
    
    
        // ahora valido de que el json tenga todos los atributos correspondeintes antes de guardarlo en data.json
        
        // primero valido que todos los campos estén presentes y que no estén vacíos
        const { title, description, price, image, stock } = newProduct;
        if ( !title || !description || !price || !image || !stock) {
            return response.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            // uso return así termina la ejecución. Si no lo pongo va a seguir y va a agregar el producto igual
        }
    
        // después valido que el precio y stock 
        if (isNaN(price)) {
            return response.status(400).json({ mensaje: 'El precio debe ser un número válido' });
        } else if (isNaN(stock)) {
            return response.status(400).json({ mensaje: 'El stock debe ser un número válido' });
        }
        
        // si está todo correcto entonces se agrega el prodcuto
        await manager.addProduct(newProduct);
        response.status(200).json({mensaje : 'Prodcuto nuevo agregado'}) // esto es el mensaje que se le va a enviar al cliente y que se imprime en la página (es como el response.send de antes). En este caso nos sirve para avisar que se guardó el json que mandó
        
        } catch (error) {
            console.error(error);
            response.status(500).json({mensaje: 'Ocurrió un error al intentar agregar el producto'});
    }
}

async function updateProduct (request, response) {
    try {
        const id = request.params.id; // primero creamos la const id que va a contener el id que se recibe por url como parametro
        const productToUpdate = request.body; // en esta const productToUpdate guardamos el cuerpo de la petición que recibimos (en este caso debería ser la propiedad con la llave (key) y el valor nuevo que se le quiere asignar)

        // primero valido que todos los campos estén presentes y que no estén vacíos
        const { title, description, price, image, stock } = productToUpdate; // otra vez, esto se llama descontructuring y extrae estos atributos de productToUpdate
        if ( !title || !description || !price || !image || !stock) {
            return response.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            // uso return así termina la ejecución. Si no lo pongo va a seguir y va a agregar el producto igual
        } else {
            console.log("bien");
        }

        // después valido que el precio y stock 
        if (isNaN(price)) {
            return response.status(400).json({ mensaje: 'El precio debe ser un número válido' });
        } else if (isNaN(stock)) {
            return response.status(400).json({ mensaje: 'El stock debe ser un número válido' });
        } else {
            console.log("bien el precio y stock");
        }

        // valido por las dudas de que, en el caso de que se esté añadiendo un id en el objeto, éste coincida con el id de la url. Esto lo hago porque el id no debería poder ser modificado
        if (productToUpdate.id && productToUpdate.id !== id) { // la validación es: si tiene un "id" en el objeto y además ese "id" no coincide con el de la url, entonces tira error
            return response.status(400).json({ mensaje: 'El ID no se puede modificar' });
        }

        // llamo al método de ProductManager para que se actualice el producto
        const updatedProduct = await manager.updateProductById(id, productToUpdate); // enviamos el id que vino de la url y el prodcto a modificar

        if (!updatedProduct) {
            return response.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        response.status(200).json({ mensaje: 'Producto actualizado' });

    } catch (error) {
        console.error(error);
        response.status(500).json({ mensaje: 'Ocurrió un error inesperado al intentar actualizar el producto' });
    }
}

async function deleteProduct (request, response) {
    try {
        const id = request.params.id;

        const productToDelete = await manager.deleteProductById(id);
    
        if (productToDelete === null){
            response.status(404).json({mensaje: 'No existe ningún producto con ese id así que no se pudo eliminar nada'})
        } else {
            response.status(200).json({mensaje: `El producto con id ${id} fue eliminado exitosamente`})
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({mensaje: 'Ocurrió un error inesperado al intentar borrar el producto'})
    }
}


// exportamos las funciones para que se puedan usar en products-router
module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct }