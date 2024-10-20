const usersRouter = require ('./users-router');
const tasksRouter = require ('./tasks-router');

function routerAPI(app){
    // Verifica que `app` se pase correctamente aquí
    if (!app || typeof app.use !== 'function') {
        throw new TypeError('La aplicación Express (app) no está definida correctamente.');
    }

    // Acá vamos definiendo los endPoints
    // definimos los endPoints
    app.use('/api/users', usersRouter);
    // lo que está ocurriendo acá es lo siguiente: cada vez que entre a la ruta users todas las solicitudes las va a estar administrando esta función
    // es como hacer un redireccionamiento
    // cada vez que hacemos un /users/LO-QUE-SEA entra acá y va a invocar a la función userRouter



    /* 
    CHAT GPT SOBRE ENDPOINTS
        En el contexto de APIs (Interfaces de Programación de Aplicaciones), un endpoint es una dirección o URL específica en un servidor donde se puede acceder a un recurso o servicio. Los endpoints permiten a los clientes (como navegadores web, aplicaciones móviles, etc.) interactuar con el servidor a través de solicitudes HTTP (como GET, POST, PUT, DELETE).

        Por ejemplo, si tienes una API que gestiona productos, algunos endpoints típicos podrían ser:
        GET /products: para obtener la lista de productos.
        POST /products: para agregar un nuevo producto.
        PUT /products/:id: para actualizar un producto existente.
        DELETE /products/:id: para eliminar un producto.
        En tu código, al definir los endpoints en routerAPI, estarías indicando qué rutas maneja tu aplicación y qué lógica se ejecuta cuando un cliente hace una solicitud a esas rutas.


        https://chatgpt.com/share/3bb3742b-fd83-4200-a28d-9b9406079120 -> buscar 'Qué significa endPoints'
    */

    // definimos en endPoint para tareas 
    app.use('/api/tasks', tasksRouter)
}

// exportamos la función routerAPI
module.exports = routerAPI;