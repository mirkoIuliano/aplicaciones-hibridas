// traigo el modulo fs
const fs = require('fs/promises')
// tenemos que importar crypto para usarlo después para el id
const crypto = require('crypto');

class UserManager{
    users = []; 
    constructor(){
        // llamo desde el constructor al método readJSON para que lo primero que haga sea esto
        this.readJSON();
    };

    path = "users.json"; // esta es la ruta del archivo json con los usuarios ya precargados

    // readJSON lee el archivo users.json y guarda estos datos en el array users
    async readJSON(){
        try {
            const users = await fs.readFile(this.path, 'utf-8'); // acá lee el archivo users.json y guarda su contenido en la const "users"
            const json = JSON.parse(users); // JSON.parse convierte de string a objeto la const "users" que contiene el json del archivo users.json
            this.users = json; // guardamos en el array users el objeto "json"
            // console.log(users);
        } catch (error) {
            console.error(error)   
        }
    }

    // esta función sobreescribe el archivo users.json
    async writeJSON(){
        try {
            const users = JSON.stringify(this.users, null, 2); // null, 2 lo formatea como un JSON con los saltos de línea, etc) || stringify convierte de objeto a formato json || acá lo que se está haciendo es guardar en la const "users" la versión convertida en formato json de los datos del array "users"
            await fs.writeFile(this.path, users); // writeFile escribe un archivo. Necesita de parámetros la ruta del archivo y los datos que se quieren escribir en él
        } catch (error) {
            console.error("Ocurrió un error" ,error);
        }
    }



    async addUser(user){ // agregamos un solo user
        try {
            const { name, email } = user; 

            // Esto lo agregamos la CLASE 8. Lo que hace es generar un Id randon de string y numeros
            const id = crypto.randomUUID();

            // Validar que todos los campos sean obligatorios
            if ( !name || !email ) {
                console.log("Error: No están todos los campos completados.");
                return;
            }
            
            // Leer usuarios actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();

            // Validad que no se repita ningún id
            const idValidation = this.users.find(user => user.id === id); /* .find recorre un array y devuelve el primer elemento que cumple con la condición dada. Si no encuentra ningún elemento que la cumpla devuelve undefined 
            user es el elemento que está recorriendo del array
            con prodcuto.id se entra al id del elemento recorrido
            */

            if (idValidation) { // si hay entonces va a dar un error, si no hay va a dar undefined entonces el if va a ser if (false) y no se va a ejecutar el código de error
                console.log(`Error: El usuario con id ${id} ya existe`);
                return;
            }

            // creamos un nuevo objeto usuarios con el id como primer atributo
            const newUser = { id, name, email };

            // como está todo ok agregamos el usuario al array
            this.users.push(newUser);
            console.log(`Usuario con id ${id} agregado con éxito`);

            await this.writeJSON();

        } catch (error) {
            console.error(error);
        }
        
    }
    
    // método para retornar todos los usuarios. Convertí esta función en asincrónica para que funcione antes, pero ahora que lo asincrónico está puesto en el archivo ejercicio4 creo que no es más necesario 
    async getUsers(){
        // Leer usuarios actuales del archivo JSON antes de seguir así el array no aparece vacío
        await this.readJSON();
        return this.users;
    }


    // Convertí esta función en asincrónica para que funcione antes, pero ahora que lo asincrónico está puesto en el archivo ejercicio4 creo que no es más necesario 
    // Recibe el id por parametro y busca en el array "users" 
    async getUserById(id){ // buscamos por Id un usuario
        try {
            // leemos los usuarios actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();
            const userSameId = this.users.find(user => user.id === id);
            // const userSameId = await this.users.find(user => user.id === id); ANTES TENIA AWAIT PERO LO SAQUÉ PORQUE NO ES NECESARIO
            if (userSameId){
                return userSameId;
            } else {
                console.log("No se encontró ningún usuario con el mismo id");
            }
        } catch (error) {
            console.error(error);
        }
        
        // const userSameId = this.users.find(user => user.id === id);
        // if (userSameId){
        //     return userSameId;
        // } else {
        //     console.log("No se encontró ningún usuario con el mismo id");
        // }
    }


    // Esto es del ejercicio 7
    async updateUserById(id, userToUpdate){
        try {
            // leemos los usuarios actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();

            // buscamos el índice del usuario que se quiere actualizar
            const userIndex = this.users.findIndex(user => user.id === id);
                            // findIndex() busca el primer elemento que cumpla con una condición y devuelve el índice (posición) de ese elemento en el array
                            // nosotros necesitamos saber la posición del objeto en el array para después poder modificarlo
            
            // si no encontramos el usuario devolvemos un mensaje de error
            if (userIndex === -1) {
                console.log(`El usuario con el id ${id} no se encontró`);
                return { error: 'Usuario no encontrado' };
            }

            // actualizamos los valores del usuario, manteniendo el ID original
            const { name, email } = userToUpdate;
            const updatedProduct = { id, name, email };
            this.users[userIndex] = updatedProduct;

            // guardamos los cambios en el archivo data.json
            await this.writeJSON();

            // devolvemos el usuario actualizado
            return this.users[userIndex];

        } catch (error) {
            console.error("Ocurrió un error actualizando el usuario:", error);
        }
    }

    // Esto es del ejercicio 7
    async deleteUserById(id) {
        try {
            // leemos los usuarios actuales del archivo JSON antes de seguir así el array no aparece vacío
            await this.readJSON();
    
            // buscamos el índice del usuario que se quiere eliminar
            const userIndex = this.users.findIndex(user => user.id === id);
    
            // si no encontramos el usuario devolvemos un mensaje de error
            if (userIndex === -1) {
                console.log(`El usuario con el id ${id} no se encontró`);
                return null;
            }
    
            // si existe el usuario lo eliminamos con el método splice
            this.users.splice(userIndex, 1);
    
            // guardamos los cambios en el archivo data.json
            await this.writeJSON();
    
            // devolvemos un mensaje de confirmación
            return { mensaje: 'Usuario eliminado' };
    
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = UserManager;