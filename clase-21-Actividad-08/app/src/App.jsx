import React from 'react';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const App = () => {


  /* Variables para columna *Función* de CRUD de USUARIOS */

  let userGetById = <p className="m-0" >Ver un usuario especifico <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea buscar</span></p>

  let userPut = <p className="m-0">Para modificar un usuario existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea modificar</span></p>

  let userDelete = <p className="m-0">Para eliminar un usuario existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea borrar</span></p>

  let userLogin = <p className="m-0">Para iniciar sesión <br/><span className="fw-semibold text-body-secondary">Requiere email y password</span></p>

  const usuarios = [
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: 'Ver todos los usuarios', 
      url: 'http://127.0.0.1:3000/api/usuarios'
    },
    {
      method: 'GET', 
      methodColor: 'success', 
      function: userGetById, 
      url: 'http://127.0.0.1:3000/api/usuarios/:id' 
    },
    { 
      method: 'POST', 
      methodColor: 'warning', 
      function: 'Para crear un usuario', 
      url: 'http://127.0.0.1:3000/api/usuarios' 
    },
    { 
      method: 'PUT', 
      methodColor: 'primary', 
      function: userPut, 
      url: 'http://127.0.0.1:3000/api/usuarios/:id'
    },
    { 
      method: 'DELETE', 
      methodColor: 'danger', 
      function: userDelete, 
      url: 'http://127.0.0.1:3000/api/usuarios/:id'
    },
    { 
      method: 'POST', 
      methodColor: 'warning', 
      function: userLogin, 
      url: 'http://127.0.0.1:3000/api/usuarios/iniciar-sesion'
    },
  ];


  /* Variables para columna *Función* de CRUD de ALUMNOS */

  let studentGetById = <p className="m-0" >Ver un alumno especifico <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea buscar</span></p>

  let studentPut = <p className="m-0" >Para modificar un alumno existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea modificar</span></p>

  let studentDelete = <p className="m-0" >Para borrar un alumno existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea borrar</span></p>

  let studentGetByName = <p className="m-0" >Ver un alumno especifico mediante su nombre <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el nombre del alumno que se desea buscar, teniendo en cuenta mayúsculas y minúsculas</span></p>

  let studentFilter = <div className="m-0" ><h3 className="h4 text-primary-emphasis">Filtro</h3>Filtra por año y muestra todos los alumnos que pertenecen a ese año <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el año de cursada que se desea filtrar (de primer a sexto año)</span></div>

  const alumnos = [
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: 'Ver todos los alumnos', 
      url: 'http://127.0.0.1:3000/api/alumnos' 
    },
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: studentGetById, 
      url: 'http://127.0.0.1:3000/api/alumnos/:id' 
    },
    { 
      method: 'POST', 
      methodColor: 'warning', 
      function: 'Para crear un alumno', 
      url: 'http://127.0.0.1:3000/api/alumnos' 

    },
    { 
      method: 'PUT', 
      methodColor: 'primary', 
      function: studentPut, 
      url: 'http://127.0.0.1:3000/api/alumnos/:id' 
    },
    { 
      method: 'DELETE', 
      methodColor: 'danger', 
      function: studentDelete, 
      url: 'http://127.0.0.1:3000/api/alumnos/:id' 
    },
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: studentGetByName, 
      url: 'http://127.0.0.1:3000/api/alumnos/buscar/:name' 
    },
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: studentFilter, 
      url: 'http://127.0.0.1:3000/api/alumnos/año/:school_year' 
    },
  ];


  /* Variables para columna *Función* de CRUD de MATERIAS */

  let subjectGetById = <p className="m-0" >Ver las materias que tiene un alumno <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno</span></p>

  let subjectPut = <p className="m-0" >Para modificar una materia existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea modificar</span></p>
  
  let subjectDelete = <p className="m-0" >Para modificar una materia existente <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea borrar</span></p>

  let subjectFilter = <div className="m-0" ><h3 className="h4 text-primary-emphasis">Filtro</h3> Filtra por materia y muestra todos los alumnos que están en esa materia <br/> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro la materia que se desea filtrar (con mayúsculas, minúsuclas y acentos)</span></div>

  const materias = [
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: 'Ver todas las materias', 
      url: 'http://127.0.0.1:3000/api/materias' 
    },
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: subjectGetById, 
      url: 'http://127.0.0.1:3000/api/materias/:id' 
    },
    { 
      method: 'POST', 
      methodColor: 'warning', 
      function: 'Para crear una materia', 
      url: 'http://127.0.0.1:3000/api/materias' 
    },
    { 
      method: 'PUT', 
      methodColor: 'primary', 
      function: subjectPut, 
      url: 'http://127.0.0.1:3000/api/materias/:id' 
    },
    { 
      method: 'DELETE', 
      methodColor: 'danger', 
      function: subjectDelete, 
      url: 'http://127.0.0.1:3000/api/materias/:id' 
    },
    { 
      method: 'GET', 
      methodColor: 'success', 
      function: subjectFilter, 
      url: 'http://127.0.0.1:3000/api/materias/materia/:subject' 
    },
    
  ];

  const jsonUsuarios = <p className="fw-medium"> &#123; <br/> "name": "Nombre de usuario",  <span class="fw-semibold text-success">// Mínimo 3 caracteres</span> <br/> "email": "test@gmail.com", <span class="fw-semibold text-success">// No se puede poner un email que ya está en uso</span> <br/> "password": "contraseña" <span class="fw-semibold text-success">// Mínimo 8 caracteres</span> <br/> &#125; </p>

  const notasUsuarios = {
    nombre : "User",
    parametros : "name, email y password",
    json : jsonUsuarios
  }

  const jsonAlumnos = <p className="fw-medium"> &#123; <br/> "name": "Nombre de alumno",  <span class="fw-semibold text-success">// Mínimo 2 caracteres</span> <br/> "last_name": "Apellido de alumno", <span class="fw-semibold text-success">// Mínimo 2 caracteres </span> <br/> "school_year": 1, <span class="fw-semibold text-success">// Se escribe con número y va del 1 al 6 (primer año a sexto año) </span> <br/> "birthdate": "2000-12-31" <span class="fw-semibold text-success">// El formato es: YYYY-MM-DD</span> <br/> &#125; </p>

  const notasAlumnos = {
    nombre : "Student",
    parametros : "name, last_name, school_year y birthdate",
    json : jsonAlumnos
  }

  const jsonMaterias = <p className="fw-medium"> &#123; <br/> "name": "Nombre de la materia", <br/> "studentId": "670ae395f783cfbf29096fb3" <span class="fw-semibold text-success">// Aquí iría el ID del alumno al cual se está haciendo referencia </span> <br/> &#125; </p>

  const notasMaterias = {
    nombre : "Subject",
    parametros : "name y studentId",
    json : jsonMaterias
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col-12 p-0">
            <Table title="Rutas para usar el CRUD de Usuarios" rows={usuarios} notas={notasUsuarios} />
            <Table title="Rutas para usar el CRUD de Alumnos" rows={alumnos} notas={notasAlumnos} />
            <Table title="Rutas para usar el CRUD de Materias" rows={materias} notas={notasMaterias}/>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default App;

