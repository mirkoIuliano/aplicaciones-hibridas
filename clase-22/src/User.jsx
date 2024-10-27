import React from "react";
import './App.css'


function User ({name, email}) {
    // console.log(props)
    // const name = props.data.userData.name;
    // const email = props.data.userData.email;
    return (
        <div className="card">
            <h3>Nombre: {name}</h3>
            <hr />
            <p>Email: {email}</p>
        </div>
    )
}

export default User