import Card from "../components/Card";
import Button from "../components/Button";
import ProductsContainer from "../components/ProductsContainer";

import { useState, useEffect } from "react";

const Home = () => {

    let [recargar, setRecargar] = useState(false);
    let [productos, setProductos] = useState([]);

    {/* este select lo agregó al final de la clase 25 pero sin decir nada pero yo lo copié */}
    const [categorias, setCategorias] = useState([])

    useEffect( () => {
        
        {/* este select lo agregó al final de la clase 25 pero sin decir nada pero yo lo copié */}
        const getCategorias = async () => {
            const resp  = await fetch('https://dummyjson.com/products/category-list')
            const data = await resp.json()
            console.log(data)
            setCategorias(data)
        }

        const getProducts = async() => {
            const resp = await fetch('http://dummyjson.com/products')
            const data = await resp.json()
            const products = data.products.map( product => { // hicimos el .map para poder asignarle un nombre a cada uno de los datos recibidos. En nuestro parcial esto no va a hacer falta porque la api la hacemos nosotros y le ponemos el nombre que queremos a las variables
                return { 
                    id: product.id, 
                    nombre:product.name, 
                    foto: product.thumbnail , 
                    precio:product.price
                } 
            })
            console.log(products)
            setProductos(products) // con esto hago que la variable productos tenga ahora todo los productos que trajimos de la api
        } 
        getProducts()
        getCategorias()
    }, [recargar]);  // cuando cambie el estado de 'recargar' se ejecuta le función useEffect
    /* 
    EXPLICACIÓN DE useEffect 
    useEffect( () => {}, []) recibe una función tipo callback y después un array que sería una lista de dependencias
    yo quiero que se ejecute 'x' función cuando cambia 'x' referencia, es decir, cuando cambie un estado
    si no ponemos nada en el array se ejecuta solo la primera vez que se renderiza el componente
    */

    // esta función es la que va a funcionar con el onClick del button Recargar
    const iniciarRecarga = () => {
        setRecargar(!recargar) // acá lo que estamos haciendo es poner el valor que tenía antes. Esto lo que hace es cambiarle de estado. Esto sirve porque el useEffect se activa cada vez que 'recargar' cacmbia de estado 
    }

    /* 
    EXPLICACIÓN DE useState 
    let estado = useState(false); // Retorna un array que dentro tiene: [ valor del estado, función]
    let logueado = estado[0]; // En 'logueado' estaríamos guardando el valor del estado
    let setLogueado = estado [1]; // En 'setLogueado' estaríamos guardando la función
    */
    // En vez de hacerlo como mostré antes lo desestructurizamos
    let [logueado, setLogueado] = useState(false);

    let mensaje = logueado == true ? "Bienvenido" : "Iniciar sesión";
    let nombre = "mirko";
    // const productos = [
    //     { id: 1, nombre: "Mate", precio: 2000 },
    //     { id: 2, nombre: "Galletitas", precio: 740 },
    //     { id: 3, nombre: "Bizcochitos", precio: 900 },
    // ];
    let titulo = <h2>App Hibrid</h2>;

    const Login = () => {
        alert("Iniciaste Sesión");
        // modificamos el estado de 'logueado' con la función setLogueado
        setLogueado(true);
    };

    const Logout = () => {
        alert("Cerraste Sesión");
        // modificamos el estado de 'logueado' con la función setLogueado
        setLogueado(false);
    };
    
    return (
        <>
            <h2>Inicio</h2>

            {titulo}
            <h3>{mensaje}</h3>
            <Button text="Hola" color="red"></Button>
            <p>{nombre.toUpperCase()} </p>

            <button type="button" onClick={Login}>
                Iniciar Sesión
            </button>
            <button type="button" onClick={Logout}>
                Cerrar Sesión
            </button>

            <button onClick = {iniciarRecarga}>
                Recargar
            </button>

            <hr />

            {/* EJEMPLO DE USO DE OPERADOR TERNARIO Y RENDERIZADO CONDICIONAL */}
            {/* SI EN LAS RESPUESTAS VAMOS A PONER ETIQUETAS HTML TENEMOS QUE ENCERRAR EL OPERADOR TERNARIO DENTRO DE UN DIV O DENTRO DE UN <> </> */}
            {logueado == true ? (
                <div className="row">
                    
                    {/* este select lo agregó al final de la clase pero sin decir nada pero yo lo copié */}
                    <select>
                        {
                            categorias.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))
                        }
                        <option value="">Categoría</option>
                    </select>

                    <ProductsContainer>
                        {/* EJEMPLO DE RENDERIZADO DE LISTA */}
                        <div className="row">
                            {" "}
                            {/* Este div no es necesario, pero lo ponemos para que queden los producot suno al lado del otro */}
                            {productos.map((producto) => {
                                // return <li> {producto.nombre}  | $ {producto.precio} </li>
                                return (
                                    <Card
                                        key={producto.id}
                                        producto={producto.nombre}
                                        precio={producto.precio}
                                        id={producto.id}
                                        foto={producto.foto}
                                    />
                                );
                            })}
                            {/* algo importante sobre el map() es que después del => podemos poner llaves {} o paréntesis ()
                    La diferencia es que si usamos llaves {} vamos a necesitar poner el return
                    Y si usamos paréntesis el return no lo necesitamos. Ejemplo con paréntesis:
                    productos.map(producto => (
                        <Card key={producto.id} producto={producto.nombre} precio={producto.precio} />
                        ))
                    */}
                        </div>
                    </ProductsContainer>
                </div>
            ) : (
                <h4>
                    Iniciar sesión{" "}
                    <a href="#" onClick={Login}>
                        Login
                    </a>
                </h4>
            )}
        </>
    );
};

export default Home;
