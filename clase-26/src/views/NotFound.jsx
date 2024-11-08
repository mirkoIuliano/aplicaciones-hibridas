import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h2>404 Not Found</h2>
            <Link to="/">Volver al Inicio</Link>
        </>
    )
}

export default NotFound;