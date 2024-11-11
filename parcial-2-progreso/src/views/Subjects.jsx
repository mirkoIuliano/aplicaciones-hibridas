import Table from '../components/Table'

function Users() {
    /* Variables para columna *Función* de CRUD de MATERIAS */

    let subjectGetById = <p className="m-0" >Ver las materias que tiene un alumno <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno</span></p>

    let subjectPut = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea modificar</span></p>

    let subjectDelete = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea borrar</span></p>

    let subjectFilter = <div className="m-0" ><h3 className="h4 text-primary-emphasis">Filtro</h3> Filtra por materia y muestra todos los alumnos que están en esa materia <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro la materia que se desea filtrar (con mayúsculas, minúsuclas y acentos)</span></div>

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

    // Notas adicionales de Materias:
    const jsonMaterias = <p className="fw-medium"> &#123; <br /> "name": "Nombre de la materia", <br /> "studentId": "670ae395f783cfbf29096fb3" <span className="fw-semibold text-success">// Aquí iría el ID del alumno al cual se está haciendo referencia </span> <br /> &#125; </p>

    const notasMaterias = {
        nombre: "Subject",
        parametros: "name y studentId",
        json: jsonMaterias
    }

    return (

        <Table title="Rutas para usar el CRUD de Materias" rows={materias} notas={notasMaterias}/>

    );

}

export default Users;