import { useState, useEffect } from "react";

export const Catalogo = () => {
    const [travel, setTravel] = useState([]);
    const [filterTravel, setFilterTravel] = useState([]);
    const [filter, setFilter] = useState('all')

    //Guarda la selección de los viajes
    const [selectTravel, setSelectTravel] = useState(null);

    //Guarda los viajes favoritos
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favorites')) || [] );

    //Función abrir/cerrar
    const abrirModal = (travel) => setSelectTravel(travel);
    const cerrarModal = () => setSelectTravel(null);

    useEffect ( () =>{
        const fetchTravel = async ()=>{
            try{
                const response = await fetch('./datos.json');
                const data = await response.json();
                setTravel(data);            //Guardar todas los viajes
                setFilterTravel(data);      //Guarda todas los viajes filtrados
            } catch (error) {
                console.error('Error fetching travel:' , error);
            }
        };
        fetchTravel();
    }, []);

    useEffect(() => {
        let filtered = travel;

        switch (filter) {
            case 'travel':
                filtered = travel.filter(item => !item.isTravel);
                break;
            case 'favourites':
                filtered = travel.filter(item => favourites.includes(item.id));
                break;
            case 'discounted':
                filtered = travel.filter(item => item.isPromo);
                break;
            default:
                filtered = travel;
        }
        setFilterTravel(filtered);
    }, [filter, travel, favourites]);

        const toggleFavourite = (travelId) => {
            const newFavourites = favourites.includes(travelId)
                ? favourites.filter(id => id !== travelId)
                : [...favourites, travelId];

            setFavourites(newFavourites);
            localStorage.setItem('favourites', JSON.stringify(newFavourites));      //Cada vez que se pincha en el icono, se activa o desactiva el set de favoritos.
        };

    return ( 
        <>
        <div className="cabecera">
            <h1 className="cabecera-titular">Grecia</h1>
            <h2 className="cabecera-fechas"> Ida 06/03/2026</h2>
            <h3 className="cabecera-fechaVuelta"> Vuelta 16/03/2026</h3>
            <picture>
                <img src="./src/assets/greciaCabecera.jpg" alt="Grecia" loading="lazy"/>
            </picture>
        </div>
        
        <div>
            <div className="catalogo">
                <h1 className="catalogo-h1"></h1>
                <div className="catalogo-div">
                    <button
                        onClick = {() => setFilter('travel')}
                        className={`botones ${
                            filter === 'travel' ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200'
                        }`}
                        >
                        Viajes
                    </button>
                    <button
                        onClick = {() => setFilter('favourites')}
                        className={`botones ${
                            filter === 'favourites' ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200'
                        }`}
                        >
                        Favoritos
                    </button>
                    <button
                        onClick = {() => setFilter('discounted')}
                        className={`botones ${
                            filter === 'discounted' ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200'
                        }`}
                        >
                        Ofertas
                    </button>
                </div>
            </div>
            
            <div className="catalogo-viajes">
                {filterTravel.map(travel => (
                    <div key={travel.id} className="catalogo-viajes-filter">
                        <img
                            src={travel.imagen}
                            alt={travel.nombre}
                            className="catalogo-viajes-img"
                        />
                        <div className="catalogo-viajes-div">
                            <div className="catalogo-viajes-favoritos">
                                <h2 className="catalogo-viajes-h2">{travel.viaje}</h2>
                                <button
                                    onClick={()=>toggleFavourite(travel.id)}
                                    className="catalogo-viajes-toggleFavourite"
                                >
                                    {favourites.includes(travel.id) ? '♥️' : '💔'}
                                </button>
                            </div>
                            <p className="catalogo-viajes-p">{travel.descripción}</p>
                            <button 
                                onClick={()=>abrirModal(travel)}
                                className="catalogo-viajes-abrir">Ver
                            </button>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
        
        {/* Selección de la información de cada viaje pinchando en el boton de abrir y cerrar*/}
        {selectTravel && (
            <div className="modalTravel" onClick={cerrarModal}>
                <div className="modalTravel-div" onClick={(e) => e.stopPropagation()}> {/* stopPropagation: Evita la propragación adicional del evento */}
                    <h2 className="modalTravel-h2">{selectTravel.viaje}</h2>
                    <img className="modalTravel-img" src={selectTravel.imagen} alt={selectTravel.nombre} />
                    <button className="modalTravel-cerrar" onClick={cerrarModal}>X</button>
                    <p className="modalTravel-p">{selectTravel.descripción}</p>
                    <p className="modalTravel-datos">Precio {selectTravel.precio}</p>
                    <p className="modalTravel-datos">Fecha Ida {selectTravel.fechaIda}</p>
                    <p className="modalTravel-datos">Fecha Vuelta {selectTravel.fechaVuelta}</p>
                    <p className="modalTravel-datos">Que incluye {selectTravel.incluye}</p>
                    {/* Boton para reservar el viaje que se quiera */}
                    <button className="modalTravel-boton"
                        onClick={() => alert(`La reserva a ${selectTravel.viaje} se ha realizado correctamente`)}>
                        Reservar
                    </button>
                </div>
            </div>
        )}
        </>
     );
};