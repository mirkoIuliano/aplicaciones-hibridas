const chalk = require('chalk');
const express = require('express'); // importa el módulo Express.
const app = express(); // crea una instancia de una aplicación Express. Esto te permite definir rutas, middlewares y otras configuraciones para tu servidor.

// ANTES HARCODEÁBAMOS EL PORT. En clase 10 aprendimos a traerlo de la varialbe de entorno
// const port = 3000; 
// Importamos el módulo .dotnv para traerlo de la variable de entorno
require('dotenv').config(); // llamamos a dotenv y después a la configuración
/* 
DATO SOBRE IMPORTAR COSAS: (min 31:30)
esto que hacemos para importar --> require('dotenv') no es la única forma para importar 
se puede también: import {dotenv} from 'dotenv'; ==> esta forma es más moderna
La forma con require es la forma más nativa

CHATGPT
La diferencia es que una es sincrónica y otra es asincrónica y para importar de la segunda manera hay que cambiar la configuración del package.json 
- Importación usando require: require('dotenv') es la forma sincrónica y tradicional de importar módulos en Node.js. Esto significa que cuando se llama a require, el código espera a que el módulo se cargue completamente antes de continuar con la ejecución de las siguientes líneas.
- Importación usando import: import { dotenv } from 'dotenv'; es la forma asíncrona y más moderna. Esta forma de importar se permite en Node.js a partir de versiones más recientes y se comporta de manera asíncrona. Para usarla, es necesario habilitar los módulos ESM en tu proyecto, cambiando la configuración del archivo package.json (agregando "type": "module").
*/
// Accedemos a la variable de entorno PORT
const port = process.env.PORT; // acá estamos diciendo que traiga del .env, a través del módulo dotenv, la variable PORT (que va a tenre el número de puerto)


// importamos ProductManager
const ProductManager = require('./ProductManager.js');

// creo un objeto ProductManager
const manager = new ProductManager();

// console.log(chalk.blue('Ahora tengo colores'));
// console.log(chalk.bgGreen('Con fondo verde'));


// para crear rutas:
function home (request, response){
    // esto es para la ruta '/'
    response.status(200).send('Home')
    console.log("El cliente ingresó a la ruta raíz")
}

// acá estamos diciendo que cuando la ruta conincida se active la función home
app.get('/', home);

/* 
ANTES HICIMOS ASÍ
app.get('/', (request, response) => {
    // esto es para la ruta '/'
    response.send('Home')
    console.log("El cliente ingresó a la ruta raíz")
})
PERO EN CLASE 7 VIMOS QUE LA FORMA CORRECTA ES YA TENER CREADA LA FUNCIÓN
*/

// creo la función products que nos lleva a la página products
async function prodcucts (request, response) {
    try {
        // esto es para la '/products'
        response.status(200).json(await manager.getProducts())
        console.log("El cliente ingresó a la ruta Products")
    } catch (error) {
        console.error(error);
    }
}

// si la ruta coincide se activa la función products
app.get('/api/products', prodcucts)

/* 
// esto es un caso hipotético para mostrar que además de texto plano se pueden enviar otras cosas:
    app.get('/json', (request, response) => {
        const objeto = {
            nombre: 'Teclado mecánico',
            precio : 7000
        }
        response.json(objeto)
    })
*/


// esto es para crear una ruta con parámetros
async function productsId(request, response) {
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
app.get('/api/products/:id', productsId);



// Método POST -> lo usamos para enviar datos
// esto lo debería hacer arriba de todo, pero lo hago acá para verlo más fácil:
app.use(express.json()); 

// esta nueva ruta sirve para AGREGAR un nuevo producto. Recibe los datos del producto en el cuerpo de la solicitud en fortmato JSON y los agrega al data.json usando el método addProduct() de ProductManager y devuelve el prodcuto agregado o un mensaje de error si la validación falla
app.post('/api/products', async (request, response) => {
    try {
    // la idea es que en la herramienta 'Postman', desde la url '127.0.0.1:3000/api/products', se envíe por POST un json. Ej: { "id" : 5, "title" : "placa de video", "description" : "3090 rtx", "price" : 550, "image" : "placa.jpg", "stock" : 2 }
    const newProduct = request.body; // con request.body obtenemos el contenido del request, osea el json entero
    console.log('Cliente en la ruta POST: /api/products');
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
    
})


// esto es parte del ejercicio 7
app.put('/api/products/:id', async (request, response) => {
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
})

// esto es parte del ejercicio 7
app.delete('/api/products/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const productToDelete = await manager.deleteProductById(id);
    
        if (productToDelete === null){
            response.status(404).json({mensaje: 'No existe ningún producto con ese id'})
        } else {
            response.status(200).json({mensaje: `El producto con id ${id} fue eliminado exitosamente`})
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({mensaje: 'Ocurrió un error inesperado al intentar borrar el producto'})
    }


})

// El servidor se inicia con la llamada a app.listen()
app.listen(port, () => {
    console.log(chalk.green(`Servidor escuchando en el puerto ${port}`))
    /* 
    app.listen(port, callback) inicia el servidor en el puerto especificado (3000 en este caso). La función de callback se ejecuta cuando el servidor está en funcionamiento, y puedes usarla para imprimir un mensaje en la consola o realizar otras acciones.
    */
})

