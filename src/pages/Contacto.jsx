import { PerfilContacto } from "../components/PerfilContacto";

export const Contacto = () => {

    const userData = {
        nombre: 'Agencia Wanderful',
        email: 'agenciaWanderful@gmail.com',
        horario: 'Lunes a Sabado 10:00 a 13:00 - 17:00 a 20:00',
        img: "./src/assets/sri-lanka-playa.jpg",
        direccion: {
            calle: 'c/ del ferrocarril 25',
            ciudad: 'Alicante',
        }
    };

    return ( 
        <>
        <PerfilContacto userData={userData} />
        </>
     );
}