import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'

function Users() {
    /* Variables para columna *Función* de CRUD de MATERIAS */

    let subjectGetById = <p className="m-0" >Ver las materias que tiene un alumno <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno</span></p>

    let subjectPut = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea modificar</span></p>

    let subjectDelete = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea borrar</span></p>

    let subjectFilter = <div className="m-0" ><h3 className="h4 text-primary-emphasis">Filtro</h3> Filtra por materia y muestra todos los alumnos que están en esa materia <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro la materia que se desea filtrar (con mayúsculas, minúsuclas y acentos)</span></div>


    /*---------- Funciones para el button ----------*/
    // inicialización de useNavigate
    const navigate = useNavigate();

    // función para llevar a crear materia
    const AllSubjects = function () {
        navigate('/todas-las-materias')
    }

    // función para llevar a crear materia
    const CreateSubject = function () {
        navigate('/crear-materia')
    }

    const materias = [
        {
            method: 'GET',
            methodColor: 'success',
            function: 'Ver todas las materias',
            url: 'http://127.0.0.1:3000/api/materias',
            button: {
                color: 'success',
                fn: AllSubjects,
                text: 'Ver'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: subjectGetById,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'success',
                fn: AllSubjects,
                text: 'Ver'
            }
        },
        {
            method: 'POST',
            methodColor: 'warning',
            function: 'Para crear una materia',
            url: 'http://127.0.0.1:3000/api/materias',
            button: {
                color: 'warning',
                fn: CreateSubject,
                text: 'Crear'
            }
        },
        {
            method: 'PUT',
            methodColor: 'primary',
            function: subjectPut,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'primary',
                fn: CreateSubject,
                text: 'Actualizar'
            }
        },
        {
            method: 'DELETE',
            methodColor: 'danger',
            function: subjectDelete,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'danger',
                fn: CreateSubject,
                text: 'Eliminar'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: subjectFilter,
            url: 'http://127.0.0.1:3000/api/materias/materia/:subject',
            button: {
                color: 'success',
                fn: CreateSubject,
                text: 'Filtrar'
            }
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