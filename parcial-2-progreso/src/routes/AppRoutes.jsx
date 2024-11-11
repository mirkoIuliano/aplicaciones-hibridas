import Home from '../views/Home';

import Users from '../views/Users';
import CreateUser from '../views/users/CreateUser';

import Students from '../views/Students';
import CreateStudent from '../views/students/CreateStudent';

import Subjects from '../views/Subjects';
import CreateSubject from '../views/subjects/CreateSubject';

import NotFound404 from '../views/NotFound404';

import { Routes, Route } from 'react-router-dom'; // con esto ya tengo todo el sistema de rutas y las rutas singular

function AppRoutes() {
    return (
        <>
            {/* Acá estamos definiendo las rutas */}
            <Routes>
                <Route path="/" element= { <Home/> } />
                {/*---------- rutas de usuarios ----------*/}
                <Route path="/usuarios" element= { <Users/> } />
                <Route path="/crear-usuario" element= { <CreateUser/> } />


                {/*---------- rutas de alumnos ----------*/}
                <Route path="/alumnos" element= { <Students/> } />
                <Route path="/crear-alumno" element= { <CreateStudent/> } />


                {/*---------- rutas de materias ----------*/}
                <Route path="/materias" element= { <Subjects/> } />
                <Route path="/crear-materia" element= { <CreateSubject/> } />

                
                <Route path="*" element= { <NotFound404/> } />
            </Routes>
        </>
    );
}

export default AppRoutes;