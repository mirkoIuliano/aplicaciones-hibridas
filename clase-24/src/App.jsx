import './App.css'
import Card from './components/Card'
import Button from './components/Button';
import ProductsContainer from './components/ProductsContainer';

import { useState } from 'react';

function App() {
/* 
EXPLICACIÓN DE useState 
  let estado = useState(false); // Retorna un array que dentro tiene: [ valor del estado, función]
  let logueado = estado[0]; // En 'logueado' estaríamos guardando el valor del estado
  let setLogueado = estado [1]; // En 'setLogueado' estaríamos guardando la función
*/
// En vez de hacerlo como mostré antes lo desestructurizamos
let [logueado, setLogueado] = useState(false)

  let mensaje = logueado == true ? 'Bienvenido' : 'Iniciar sesión'
  let nombre = "mirko";
  let edad = 21;
  const productos = [
    {id: 1, nombre: 'Mate', precio: 2000 },
    {id: 2, nombre: 'Galletitas', precio: 740 },
    {id: 3, nombre: 'Bizcochitos', precio: 900 },
  ];
  let titulo = <h2>App Hibrid</h2>

  const Login = () => {
    alert ('Iniciaste Sesión')
    // modificamos el estado de 'logueado' con la función setLogueado
    setLogueado(true)
  }

  const Logout = () => {
    alert ('Cerraste Sesión')
    // modificamos el estado de 'logueado' con la función setLogueado
    setLogueado(false)
  }

  return (
    <div>
        <h1 className='verde'> Aplicaciones Híbridas</h1>

        {titulo}
        <h3>{mensaje}</h3>
        <Button text="Hola" color="red"></Button>
        <p>{nombre.toUpperCase()} </p>

        <button type='button' onClick={Login}>
          Iniciar Sesión
        </button>
        <button type='button' onClick={Logout}>
          Cerrar Sesión
        </button>

        <hr />
        
        

        {/* EJEMPLO DE USO DE OPERADOR TERNARIO Y RENDERIZADO CONDICIONAL */}
        <> {/* SI EN LAS RESPUESTAS VAMOS A PONER ETIQUETAS HTML TENEMOS QUE ENCERRAR EL OPERADOR TERNARIO DENTRO DE UN DIV O DENTRO DE UN <> </> */}
          {
            logueado == true ? (
              <div className='row'>

                <ProductsContainer>
                  {/* EJEMPLO DE RENDERIZADO DE LISTA */}
                  <div className='row'> {/* Este div no es necesario, pero lo ponemos para que queden los producot suno al lado del otro */}
                    {
                      productos.map(producto => {
                        // return <li> {producto.nombre}  | $ {producto.precio} </li>
                        return <Card key={producto.id} producto={producto.nombre} precio={producto.precio} />
                      })
                    }
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
            ) : ( <h4>Iniciar sesión <a href='#' onClick={Login}>Login</a></h4> ) 
          }
        </>
        
        


    </div>
  )

}

export default App
