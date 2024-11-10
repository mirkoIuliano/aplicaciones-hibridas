import './App.css'


import { Routes, Route, NavLink, Link } from 'react-router-dom'; // con esto ya tengo todo el sistema de rutas y las rutas singular

// Importamos las vistas
import Home from './views/Home';
import Contact from './views/Contacts';
import Details from './views/Details';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Registro from './views/Registro';

function App() {


  return (
    <div>
        <h1 className='verde'> Aplicaciones Híbridas</h1>
        <hr />

        {/* <Link to="/iniciar-sesion" >Login</Link> */}
        {/* Esta es otra firna de crear links. La diferencia con NavLink es que Link no deja poner atributos como active y esas cosas */}
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => `enlaveNav ${isActive ? "activo" : ""}`}>Inicio</NavLink>
              {/* 
              ----- Explicación de isActive ----- 
              La función recibe un objeto isActive, que indica si el enlace está activo, y devuelve la clase "activo" solo si isActive es true.
              */}
            </li>
            {/* <li>
              <NavLink to="detalles" className={({ isActive }) => (isActive ? "activo" : "")}>Detalles</NavLink>
            </li> */}
            <li>
              <NavLink to="contacto" className={({ isActive }) => `enlaveNav ${isActive ? "activo" : ""}`}>Contacto</NavLink>
            </li>
            <li>
              <NavLink to="iniciar-sesion" className={({ isActive }) => `enlaveNav ${isActive ? "activo" : ""}`}>Login</NavLink>
            </li>
            <li>
              <NavLink to="registro" className={({ isActive }) => `enlaveNav ${isActive ? "activo" : ""}`}>Registro</NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Este es el área donde se van a mostrar los componentes */}

        {/* Acá estamos definiendo las rutas */}
        <Routes>
          <Route path="/" element= { <Home/> } />
          <Route path="/contacto" element= { <Contact/> } />
          <Route path="/detalles/:id" element= { <Details/> } />
          <Route path="/iniciar-sesion" element= { <Login/> } />
          <Route path="*" element= { <NotFound/> } />
          <Route path="/registro" element= { <Registro/> } />
        </Routes>



        
        
        
        


    </div>
  )

}

export default App
