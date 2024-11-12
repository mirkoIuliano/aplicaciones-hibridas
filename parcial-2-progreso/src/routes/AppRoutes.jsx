import Home from '../views/Home';

import Users from '../views/Users';
import CreateUserForm from '../views/users/CreateUserForm';
import AllUsers from '../views/users/AllUsers';

import Students from '../views/Students';
import CreateStudentForm from '../views/students/CreateStudentForm';
import AllStudents from '../views/students/AllStudents';

import Subjects from '../views/Subjects';
import CreateSubjectForm from '../views/subjects/CreateSubjectForm';
import AllSubjects from '../views/subjects/AllSubjects';

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
                <Route path="/crear-usuario" element= { <CreateUserForm/> } />
                <Route path="/todos-los-usuarios" element= { <AllUsers/> } />


                {/*---------- rutas de alumnos ----------*/}
                <Route path="/alumnos" element= { <Students/> } />
                <Route path="/crear-alumno" element= { <CreateStudentForm/> } />
                <Route path="/todos-los-alumnos" element= { <AllStudents/> } />


                {/*---------- rutas de materias ----------*/}
                <Route path="/materias" element= { <Subjects/> } />
                <Route path="/crear-materia" element= { <CreateSubjectForm/> } />
                <Route path="/todas-las-materias" element= { <AllSubjects/> } />

                
                <Route path="*" element= { <NotFound404/> } />
            </Routes>
        </>
    );
}

export default AppRoutes;