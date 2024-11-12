import { useState, useEffect } from "react";

function AllUsers () {

    const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
    const [loading, setLoading] = useState(true); // Estado para mostrar indicador de carga

    // Función para obtener todos los usuarios de la API
    const fetchUsers = async () => {
        try {
            const endPoint = 'http://127.0.0.1:3000/api/usuarios';
            const response = await fetch(endPoint);
            
            if (!response.ok) {
                console.error("Error al obtener usuarios:", response);
                return;
            }

            const data = await response.json();
            setUsers(data.usuarios); // Guardamos los datos en el estado `users`
            setLoading(false); // Cambiamos el estado de carga a `false`

            // esto es para ver la diferencia entre data y data.usuarios. Básicamente hago esto porque cuando hago el fetch me trae un objeto con dos cosas: un objeto mensaje y un objeto usuarios con un Array que dentro tiene objetos, que son los usuarios con sus datos   
            // console.log(data) // data sería el objeto entero con mensaje y usuarios
            // console.log(data.usuarios) // acá estaría entrando específicamente al objeto usuarios de data 

        } catch (error) {
            console.error("Error del servidor:", error);
            alert('Error al obtener usuarios');
        }
    };

    // Ejecutamos la función `fetchUsers` cuando el componente se monta
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            
            {loading ? (
                <p>Cargando usuarios...</p> // Indicador de carga
            ) : (
                <ul>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li key={user._id}>
                                <strong>Nombre:</strong> {user.name} <br />
                                <strong>Email:</strong> {user.email}
                            </li>
                        ))
                    ) : (
                        <p>No hay usuarios disponibles.</p>
                    )}
                </ul>
            )}
        </div>
    );

}

export default AllUsers