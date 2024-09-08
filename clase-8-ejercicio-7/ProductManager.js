// traigo el modulo fs
const fs = require('fs/promises')
// tenemos que importar crypto para usarlo después para el id
const crypto = require('crypto');

class ProductManager{
    products = []; 
    constructor(){
        // llamo desde el constructor al método readJSON para que lo primero que haga sea esto
        this.readJSON();
    };

    path = "data.json"; // esta es la ruta del archivo json con los productos ya precargados

    // readJSON lee el archivo data.json y guarda estos datos en el array products
    async readJSON(){
        try {
            const data = await fs.readFile(this.path, 'utf-8'); // acá lee el archivo data.json y guarda su contenido en la const "data"
            const json = JSON.parse(data); // JSON.parse convierte de string a objeto la const "data" que contiene el json del archivo data.json
            this.products = json; // guardamos en el array products el objeto "json"
            // console.log(data);
        } catch (error) {
            console.error(error)   
        }
    }

    // esta función sobreescribe el archivo data.json
    async writeJSON(){
        try {
            const data = JSON.stringify(this.products, null, 2); // null, 2 lo formatea como un JSON con los saltos de línea, etc) || stringify convierte de objeto a formato json || acá lo que se está haciendo es guardar en la const "data" la versión convertida en formato json de los datos del array "products"
            await fs.writeFile(this.path, data); // writeFile escribe un archivo. Necesita de parámetros la ruta del archivo y los datos que se quieren escribir en él
        } catch (error) {
            console.error("Ocurrió un error" ,error);
        }
    }


    // Convertí esta función en asincrónica para que funcione antes, pero ahora que lo asincrónico está puesto en el archivo ejercicio4 creo que no es más necesario 
    async addProduct(product){ // agregamos un solo producto
        try {
            const { title, description, price, image, stock } = product; 
            /* 
                CHATGPT
                esto es una manera más corta de hacer esto: 
                const title = product.title; 
                const description = product.description;
                etc...
                se está utilizando el destructuring en JavaScript para extraer los atributos title, description, price, image, y stock del objeto product. 
                En lugar de acceder a esos atributos individualmente con product.title, product.description, etc., la sintaxis de destructuring te permite 
                sacarlos en una sola línea, lo cual es más conciso.
            */

            // Esto lo agregamos la CLASE 8. Lo que hace es generar un Id randon de string y numeros
            const id = crypto.randomUUID();

            // Validar que todos los campos sean obligatorios
            if ( !title || !description || !price || !image || !stock ) {
                console.log("Error: No están todos los campos completados.");
                return;
            }
            
            // Leer productos actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();

            // Validad que no se repita ningún id
            const idValidation = this.products.find(product => product.id === id); /* .find recorre un array y devuelve el primer elemento que cumple con la condición dada. Si no encuentra ningún elemento que la cumpla devuelve undefined 
            product es el elemento que está recorriendo del array
            con prodcuto.id se entra al id del elemento recorrido
            */

            if (idValidation) { // si hay entonces va a dar un error, si no hay va a dar undefined entonces el if va a ser if (false) y no se va a ejecutar el código de error
                console.log(`Error: El producto con id ${id} ya existe`);
                return;
            }

            // creamos un nuevo objeto producto con el id como primer atributo
            const newProduct = { id, title, description, price, image, stock };

            // como está todo ok agregamos el producto al array
            this.products.push(newProduct);
            console.log(`Producto con id ${id} agregado con éxito`);

            await this.writeJSON();

        } catch (error) {
            console.error(error);
        }
        
    }
    
    // método para retornar todos los productos. Convertí esta función en asincrónica para que funcione antes, pero ahora que lo asincrónico está puesto en el archivo ejercicio4 creo que no es más necesario 
    async getProducts(){
        // Leer productos actuales del archivo JSON antes de seguir así el array no aparece vacío
        await this.readJSON();
        return this.products;
    }


    // Convertí esta función en asincrónica para que funcione antes, pero ahora que lo asincrónico está puesto en el archivo ejercicio4 creo que no es más necesario 
    // Recibe el id por parametro y busca en el array "products" 
    async getProductById(id){ // buscamos por Id un producto
        try {
            // leemos los productos actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();
            const productoSameId = this.products.find(product => product.id === id);
            // const productoSameId = await this.products.find(product => product.id === id); ANTES TENIA AWAIT PERO LO SAQUÉ PORQUE NO ES NECESARIO
            if (productoSameId){
                return productoSameId;
            } else {
                console.log("No se encontró ningún producto con el mismo id");
            }
        } catch (error) {
            console.error(error);
        }
        
        // const productoSameId = this.products.find(product => product.id === id);
        // if (productoSameId){
        //     return productoSameId;
        // } else {
        //     console.log("No se encontró ningún producto con el mismo id");
        // }
    }


    // Esto es del ejercicio 7
    async updateProductById(id, productToUpdate){
        try {
            // leemos los productos actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();

            // buscamos el índice del producto que se quiere actualizar
            const productIndex = this.products.findIndex(product => product.id === id);
                            // findIndex() busca el primer elemento que cumpla con una condición y devuelve el índice (posición) de ese elemento en el array
                            // nosotros necesitamos saber la posición del objeto en el array para después poder modificarlo
            
            // si no encontramos el producto devolvemos un mensaje de error
            if (productIndex === -1) {
                console.log(`El producto con el id ${id} no se encontró`);
                return { error: 'Producto no encontrado' };
            }

            // actualizamos los valores del producto, manteniendo el ID original
            const { title, description, price, image, stock } = productToUpdate;
            const updatedProduct = { id, title, description, price, image, stock };
            this.products[productIndex] = updatedProduct;

            // guardamos los cambios en el archivo data.json
            await this.writeJSON();

            // devolvemos el producto actualizado
            return this.products[productIndex];

        } catch (error) {
            console.error("Ocurrió un error actualizando el producto:", error);
        }
    }

    // Esto es del ejercicio 7
    async deleteProductById(id) {
        try {
            // leemos los productos actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();
    
            // buscamos el índice del producto que se quiere eliminar
            const productIndex = this.products.findIndex(product => product.id === id);
    
            // si no encontramos el producto devolvemos un mensaje de error
            if (productIndex === -1) {
                console.log(`El producto con el id ${id} no se encontró`);
                return null;
            }
    
            // si existe el producto lo eliminamos con el método splice
            this.products.splice(productIndex, 1);
    
            // guardamos los cambios en el archivo data.json
            await this.writeJSON();
    
            // devolvemos un mensaje de confirmación
            return { mensaje: 'Producto eliminado' };
    
        } catch (error) {
            console.error(error);
        }
    }

    // para probar si cambia además de borrar la carpeta de clase-9

}

module.exports = ProductManager;