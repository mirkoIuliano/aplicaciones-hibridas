import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function AllSubjects() {

    const [subjects, setSubjects] = useState([]) // estado para almacenar la lista de materias
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // función para obtener todos los materias
    const fetchSubjects = async () => {
        try {

            const endPoint = 'http://127.0.0.1:3000/api/materias'

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener materias:", response)
                return;
            }

            const data = await response.json()

            setSubjects(data.materias) // guardamos los datos en el estado 'subjects'
            setLoading(false) // cambiamos el estado de carga a 'false'


            // estos siguientes 2 console.log son para ver la diferencia entre data y data.materias. Básicamente hago esto porque cuando hago el fetch me trae un objeto con dos cosas: un objeto mensaje y un objeto materias con un Array que dentro tiene objetos, que son los materias con sus datos   
            // console.log(data) // data sería el objeto entero con mensaje y materias
            console.log(data.materias) // acá estaría entrando específicamente al objeto materias de data 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert('Error al obtener materias')
        }
    };

    // ejecutamos la función 'fetchSubjects' cuando el componente se monta
    useEffect(() => {
        fetchSubjects()
    }, [])

    return (
        <div>
            <h2>Lista de todas las Materias</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando materias...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                    {subjects.length > 0 ? ( // si subjects tiene algo entonces imprime las card
                        subjects.map((subject) => (
                                <div className="card" style={{ width: "18rem", margin: "10px" }} key={subject._id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{subject.name} {subject.last_name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">ID de alumno asociado: {subject.student}</h6>
                                        <Link to={`/materia/${subject.student}`}>Detalle</Link>
                                    </div>
                                </div>
                        ))
                    ) : ( // si subjects no tiene nada aparece un mensje indicando que no existen materias todavía
                        <p>No hay materias disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );

}

export default AllSubjects;

