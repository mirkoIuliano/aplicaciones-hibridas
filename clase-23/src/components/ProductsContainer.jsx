import React from "react";
import { useState } from "react";
import Button from "./Button";

const ProductsContainer = (props) => {
    
    const [count, setCount] = useState(0)

    function sumarProductos(){
        setCount(count + 1)
    }

    function restarProductos(){
        setCount(count - 1)
    }

    return (
        <div className="bg-blue">
            <h2>Lista de productos</h2>
            <hr />
            <div className="row">
                
                {props.children}
            </div>
            <p> Carrito {count} </p>
            <Button text="Sumar" fn={sumarProductos} />
            <Button text="Restar" color="red" fn={restarProductos}/>
        </div>
    )
}

export default ProductsContainer