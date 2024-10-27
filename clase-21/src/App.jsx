import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card';
import User from './User';
// importamos useState para poder renderizar el contenido que traemos del fetch
import { useState } from 'react';
// importamos useEffect que sirve para que se renderice la página una sola vez, en vez de 2 como lo hace react por defecto
import { useEffect } from 'react';



function App() {
  const [ users, setUsers ] = useState([]);

  useEffect( () => {
    const getUsers = async () => {
      const endPoint = 'http://127.0.0.1:3000/api/usuarios';
      const resp = await fetch(endPoint);
      const users = await resp.json();
      setUsers(users.usuarios); // la verdad todavía no enteindo esto de setUsers, useEffects, etc. Pero sobre 'users.usuarios': el 'usuarios' viene de que dentro de mi objeto users (que es la respuesta del fetch que hicimos) tengo dos propiedades: mensajes y usuarios. 'usuarios' tiene los array con los datos 
      console.log(users);
    }
    getUsers();
  }, [])

  let nombre = "mirko";
  let edad = 21;
  const curso = ['HTML', 'JS', 'React'];
  let titulo = <h2>Esto es un título h2</h2>
  // se puede guardar etiquetas html dentro de una vairable gracias a JSX
  const userData = {
    name: 'Juan',
    email: 'juan@gmail.com'
  }

  return (
    <div>
        <h1 className='verde'> Aplicaciones Híbridas</h1>
        {
          users.map( user => (
            <User 
              name={user.name} 
              email={user.email} 
            />
          ))
        }
        
        {/* así usamos el componente y pasamos propiedades */}
        <Card producto="Termo" precio={40000}/>
        {/* cuando enviamos una propiedad como un numero, objeto, booleaono, etc lo mandamos con {} y sin "" */}
        <Card producto="Mate" precio={8000}/>
        {/* se imprimen variable JS con {} */}
        <p>Mi nombre es {nombre.toUpperCase()} </p>
        {/* se pueden hacer operaciones */}
        <p> Mi edad es {edad + 2} </p>
        <p> Hoy estamos viendo {curso[2]} </p>

    </div>
  )

}

export default App
