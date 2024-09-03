import "./UltimaVenta.css";

const UltimaVenta = ({ ultimaVenta }) => {
    return (
        <div className="container-ultima-venta">
            <h2>Última venta ingresada: </h2>
            {ultimaVenta ? (
                <div className="detalle-venta">
                    <p>
                        <strong>Monto:</strong> ${ultimaVenta.monto}
                    </p>
                    <p>
                        <strong>Tipo de Pago:</strong> {ultimaVenta.tipo}
                    </p>
                    <p>
                        <strong>Local:</strong> {ultimaVenta.empleado}
                    </p>
                    <p>
                        <strong>Fecha:</strong>{" "}
                        {new Date(ultimaVenta.fecha).toLocaleString()}
                    </p>
                </div>
            ) : (
                <p>No hay ventas registradas actualmente.</p>
            )}
        </div>
    );
};

export default UltimaVenta;
