import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card';
import User from './User';


async function getUsers () {
  const endPoint = 'http://127.0.0.1:3000/api/usuarios'
  const resp = await fetch(endPoint)
  const users = await resp.json()
  console.log(users)
}

function App() {
let nombre = "mirko";
let edad = 21;
const curso = ['HTML', 'JS', 'React'];
let titulo = <h2>Esto es un título h2</h2>
// se puede guardar etiquetas html dentro de una vairable gracias a JSX
const userData = {
  name: 'Juan',
  email: 'juan@gmail.com'
}

getUsers()

return (
    <>
    <div>
      <h1 className='verde'> Aplicaciones Híbridas Clase 20 </h1>
      <User name={userData.name} email={userData.email} />
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
    </>
  )
}

export default App
