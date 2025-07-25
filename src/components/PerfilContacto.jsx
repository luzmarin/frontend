export const PerfilContacto = ({userData}) => {
	const {nombre, img, email, direccion, horario } = userData;
	const {calle, ciudad} = direccion;

return (
		<>
		<div className="card">
			<div className="card-datos">
				<h1 className="card-titular">Contactanos si tienes alguna duda</h1>
				<h2 className="card-h2">{nombre}</h2>
				<p className="card-p">{horario}</p>
				<p className="card-p">{email}</p>
				<p className="card-p">
					{calle}<br />
					{ciudad}<br />
				</p>
			</div>
			<picture className="card-picture">
				<img className="card-img" src={img} alt={nombre} />
			</picture>
        </div>
        </>
	) };