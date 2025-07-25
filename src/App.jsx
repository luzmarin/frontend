import React from "react";
import { useState, useEffect } from 'react'

//Importar los archivos css
import './css/App.css'
import './css/Catalogo.css'
import './css/Home.css'
import './css/Layout.css'
import './css/MenuDropDown.css'
import './css/FormRegistro.css'
import './css/PerfilContacto.css'

//Importar los componentes
import { MenuDropDown } from "./components/MenuDropDown";

const menuItems =[
  {label: "home", url: "./"},
  {label: "Viajes", url: "./Catalogo"},
  {label: "Contacto", url: "./Contacto"}
]

function App() {

    const nombre= import.meta.env.VITE_NOMBRE;
    const backendURL = import.meta.env.VITE_BACKEND;

    const [usuarios, setUsuarios] = useState([]);
    const [uid, setUid] = useState(1); //userId = 1

    useEffect(() => {
      obtenerTareas();
      obtenerUsuarios();

    }, [backendURL]);

    // obtener tareas
    const obtenerTareas = async () => {
      try {
        const respuesta = await fetch(`${backendURL}/api/v1/user/1/tareas`);
        const resultado = await respuesta.json();
        
        if(resultado.status=="ok"){
          setTareas(resultado.data);
        } else {
          console.log("Tuvimos un error");
         // setError(resultado.msg);
        }

      }catch(error){
        console.log("Error al obtener datos", error)

      }
    }

    // obtener Usuarios
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch(`${backendURL}/api/v1/usuarios`);
        const resultado = await respuesta.json();
        
        if(resultado.status=="ok"){
          setUsuarios(resultado.data);
        } else {
          console.log("Tuvimos un error");
         // setError(resultado.msg);
        }

      }catch(error){
        console.log("Error al obtener datos", error)

      }
    }

  return (
    <>
     <MenuDropDown items={menuItems} />
    </>
  );
}

export default App
