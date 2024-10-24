import React from "react";
import './App.css'

/* 
Se puede hacer la función así:
function Card = () => {
    // codigo
}
*/
/* pero la manera mas moderna y la que se usa es esta: */
function Card (props) {
    return (
        <div className="card">
            <h3>{props.producto}</h3>
            <hr />
            <p>${props.precio + 100}</p>
        </div>
    )
}

export default Card