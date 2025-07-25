import { useState } from "react";


export const FormRegistro = () => {


    //CREAR UN ÚNICO OBJETO CON SU ESTADO   
    const[formdata, setFormData] = useState({
        nombre:"",
        email:"",
        contraseña:"",
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        const{nombre, email, contraseña} = formdata;

        // validamos datos del usuario
        //Buscamos los errores...
        if(nombre.trim() === "" && email.trim() === "" && contraseña.trim() === ""){
            alert("Todos los datos son obligatorios");
            return;
        }
    }

    const handleChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }) )
    }
    return (
    <>
        <h3 className="form-h3">registrate</h3>

        <form className="form" onSubmit={handleSubmit}>
            <input className="form-input" type="text"
                placeholder="nombre"
                value={formdata.nombre}
                name="nombre"
                onChange={(handleChange)} 
            />

            <input className="form-input" type="email"
                placeholder="direccion"
                value={formdata.email}
                name="email"
                onChange={(handleChange)} />

            <input className="form-input" type="contraseña"
                placeholder="contraseña"
                value={formdata.contraseña}
                name="contraseña"
                onChange={(handleChange)} />
            <button className="form-button">
                <input className="form-boton" type="submit" value={formdata.enviar}></input>
            </button>
        </form>
        

    </>
);
    
    
}