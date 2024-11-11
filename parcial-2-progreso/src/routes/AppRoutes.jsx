import Home from '../views/Home';
import Users from '../views/Users';
import Students from '../views/Students';
import Subjects from '../views/Subjects';
import NotFound404 from '../views/NotFound404';

import { Routes, Route } from 'react-router-dom'; // con esto ya tengo todo el sistema de rutas y las rutas singular

function AppRoutes() {
    return (
        <>
            {/* Acá estamos definiendo las rutas */}
            <Routes>
                <Route path="/" element= { <Home/> } />
                <Route path="/usuarios" element= { <Users/> } />
                <Route path="/alumnos" element= { <Students/> } />
                <Route path="/materias" element= { <Subjects/> } />
                <Route path="*" element= { <NotFound404/> } />
            </Routes>
        </>
    );
}

export default AppRoutes;