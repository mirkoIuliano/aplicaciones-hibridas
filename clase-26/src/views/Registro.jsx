// este archivo sirve para hacer el fomrulario
// yo lo voy a hacer para el registro de usuarios, pero tendría que tener uno para estudiantes y otro para materias

import { useState } from "react"

const Registro = () => {

    // Defino los estados
    const [ formData, setFormData ] = useState({name:'', email: '', password:''})

    // creamos esta función para que no se recargue la pagina cada vez que enviamos el fomrulario 
    const handleChange = (e) => {
        const {name, value} = e.target // el name este no es de 'nombre', es del ATRIBUTO name
        // console.log(name, value)
        setFormData({...formData, [name]:value}) 
        // esto lo que dice es que quiero que tenga todo lo anterior (...formData) y algo más --> lo que esté en []
    }
    
    // creamos esta función para que no se recargue la pagina cada vez que enviamos el fomrulario 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log("se envio el formulario")
            console.log(formData)

            /*---------- Conectamos a nuestra API ----------*/
            const endPoint = 'http://127.0.0.1:3000/api/usuarios'
            
            const config = {
                headers: { // en el encabezado tenemos que indicarle qué tipo de datos vamos a enviar
                    // acá queremos indicarle al servidor que le estamos enviando un archivo de tipo JSON
                    'Content-type' : 'application/json',
                    // acé en el header también habría que enviar la autorización (el JsonWebToken)
                },
                method: 'POST',
                body: JSON.stringify(formData) // hay que convertirlo a String proque los servidores no reciben JSON

            }
            const response = await fetch(endPoint, config)

            if (!response.ok) // si no me está contestando nada entra al if
            {
                console.error(response)                
            }

            const data = await response.json()
            
            // si está todo bien debería sacar la info por consola
            console.log(data)

            // esto es para que cuando se envíe el fomrulario se resetee el form
            setFormData({
                name: '',
                email: '',
                password: '',
            })

        } catch (error) {
            console.log(error)
            alert('Error del Servidor')
        }
        
    }

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={ handleSubmit } className="card p-4">
                <div className="divForm">
                    <label htmlFor="">Nombre</label>
                    <input className="" type="text" name="name" onChange={handleChange} value={formData.name}/>
                    {/* con value={} vinculamos el input al formData */}
                    {/* esto no funciona como en Vue que si cambiamos uno cambia el otro. Si ponemos arriba en el useStatte sí va a estar impactando en el value={} del input, pero para que el value={} del input afecte al useState necesitamos agregalre un evento
                    React no tiene doble data binding */}
                </div>
                <div className="divForm">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" onChange={handleChange} value={formData.email} />   
                </div>

                <div className="divForm">
                    <label htmlFor="">Conrtaseña</label>
                    <input type="password" name="password" onChange={handleChange} value={formData.password} />
                </div>


                <button type="submit">Registrarme</button>
            </form>
        </div>
    )
}

export default Registro