import { useState } from "react";
import "./LogOut.css";

const LogOut = ({ logOut }) => {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const mostrarModalConfirmacion = () => {
        setMostrarConfirmacion(true);
    };

    const cerrarModalConfirmacion = () => {
        setMostrarConfirmacion(false);
    };

    const confirmarCerrarSesion = () => {
        logOut();
        cerrarModalConfirmacion();
    };

    return (
        <>
            <button
                onClick={mostrarModalConfirmacion}
                className="btn-cerrar-sesion"
            >
                Cerrar sesión
            </button>

            {mostrarConfirmacion && (
                <div className="modal-confirmacion">
                    <div className="modal-content">
                        <p>¿Estás seguro de que deseas cerrar sesión?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={confirmarCerrarSesion}
                                className="btn-confirm-yes"
                            >
                                Sí
                            </button>
                            <button
                                onClick={cerrarModalConfirmacion}
                                className="btn-confirm-no"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogOut;
