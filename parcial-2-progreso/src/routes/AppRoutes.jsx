import Home from '../views/Home';

import Users from '../views/Users';
import CreateUserForm from '../views/users/CreateUserForm';
import AllUsers from '../views/users/AllUsers';
import UserById from '../views/users/UserById';
import EditUserForm from '../views/users/EditUserForm';

import Students from '../views/Students';
import CreateStudentForm from '../views/students/CreateStudentForm';
import AllStudents from '../views/students/AllStudents';
import StudentById from '../views/students/StudentById';
import EditStudentForm from '../views/students/EditStudentForm';

import Subjects from '../views/Subjects';
import CreateSubjectForm from '../views/subjects/CreateSubjectForm';
import AllSubjects from '../views/subjects/AllSubjects';
import SubjectById from '../views/subjects/SubjectById';

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
                <Route path="/usuarios/detalles" element= { <AllUsers/> } />
                <Route path="/usuarios/detalles/:id" element= { <UserById/> } />
                <Route path="/usuarios/eliminar" element= { <AllUsers/> } />
                <Route path="/usuarios/editar" element= { <AllUsers/> } />
                <Route path="/usuarios/editar/:id" element= { <EditUserForm/> } />



                {/*---------- rutas de alumnos ----------*/}
                <Route path="/alumnos" element= { <Students/> } />
                <Route path="/crear-alumno" element= { <CreateStudentForm/> } />
                <Route path="/todos-los-alumnos" element= { <AllStudents/> } />
                <Route path="/alumnos/detalles" element= { <AllStudents/> } />
                <Route path="/alumnos/detalles/:id" element= { <StudentById/> } />
                <Route path="/alumnos/eliminar" element= { <AllStudents/> } />
                <Route path="/alumnos/editar" element= { <AllStudents/> } />
                <Route path="/alumnos/editar/:id" element= { <EditStudentForm/> } />
                


                {/*---------- rutas de materias ----------*/}
                <Route path="/materias" element= { <Subjects/> } />
                <Route path="/crear-materia" element= { <CreateSubjectForm/> } />
                <Route path="/todas-las-materias" element= { <AllSubjects/> } />
                <Route path="/materias/detalles" element= { <AllSubjects/> } />
                <Route path="/materias/detalles/:id" element= { <SubjectById/> } />
                <Route path="/materias/eliminar" element= { <AllSubjects/> } />
                <Route path="/materias/editar" element= { <AllSubjects/> } />

                
                <Route path="*" element= { <NotFound404/> } />
            </Routes>
        </>
    );
}

export default AppRoutes;