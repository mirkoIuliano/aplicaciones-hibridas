import './App.css'


import { Routes, Route, NavLink, Link } from 'react-router-dom'; // con esto ya tengo todo el sistema de rutas y las rutas singular

// Importamos las vistas
import Home from './views/Home';
import Contact from './views/Contacts';
import Details from './views/Details';
import Login from './views/Login';
import NotFound from './views/NotFound';

function App() {


  return (
    <div>
        <h1 className='verde'> Aplicaciones Híbridas</h1>
        <hr />

        <Link to="login" >Login</Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="detalles">Detalles</NavLink>
            </li>
            <li>
              <NavLink to="contacto">Contacto</NavLink>
            </li>
            <li>
              <NavLink to="iniciar-sesion">Login</NavLink>
            </li>
          </ul>
        </nav>
        {/* Este es el área donde se van a mostrar los componentes */}
        <Routes>
          <Route path="/" element= { <Home/> } />
          <Route path="/contacto" element= { <Contact/> } />
          <Route path="/detalles/:id" element= { <Details/> } />
          <Route path="/iniciar-sesion" element= { <Login/> } />
          <Route path="*" element= { <NotFound/> } />
        </Routes>



        
        
        
        


    </div>
  )

}

export default App
