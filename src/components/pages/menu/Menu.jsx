import "./Menu.css";
import logo from "./../../../../assets/logo.webp";
import UltimaVenta from "../../common/ultimaVenta/UltimaVenta";
import { useRef } from "react";
import LogOut from "../../common/logOut/LogOut";

const Menu = ({
    monto,
    setMonto,
    tipo,
    setTipo,
    empleado,
    setEmpleado,
    empleados,
    handleSubmit,
    logOut,
    confirmarGuardar,
    cerrarModalConfirmacion,
    isLoading,
    abrirModal,
    ultimaVenta,
}) => {
    const confirmButtonRef = useRef(null);

    const handleKeyDown = (e) => {
        if (abrirModal) {
            if (e.key === "Enter") {
                confirmButtonRef.current.click();
            }
        }
    };
    return (
        <div className="container-menu" onKeyDown={handleKeyDown}>
            <LogOut logOut={logOut} />
            <form onSubmit={handleSubmit} className="form-agregar-venta">
                <div className="logo-login">
                    <img src={logo} alt="logo" />
                </div>
                <div className="input-ingreso">
                    <label>Monto: </label>
                    <input
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                </div>
                <div className="input-ingreso">
                    <label>Tipo: </label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Mercado Pago">Mercado Pago</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Cuenta Dni">Cuenta Dni</option>
                        <option value="Modo">Modo</option>
                    </select>
                </div>
                <div className="input-ingreso">
                    <label>Empleado: </label>
                    <select
                        value={empleado}
                        onChange={(e) => setEmpleado(e.target.value)}
                    >
                        <option value="">Selecciona un empleado</option>
                        {empleados.map((empleado, index) => (
                            <option key={index} value={empleado}>
                                {empleado}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Guardando..." : "Añadir venta"}{" "}
                </button>
            </form>

            {/* Modal de confirmación */}
            <div
                id="confirm-save"
                className={`modal ${abrirModal ? "modal-show" : ""}`}
            >
                <div className="modal-content">
                    <p>¿Estás seguro de que deseas guardar esta venta?</p>
                    <div className="modal-buttons">
                        <button
                            onClick={confirmarGuardar}
                            ref={confirmButtonRef}
                            id="confirm-yes"
                            className={`btn-confirm-yes ${
                                abrirModal ? "btn-animacion" : ""
                            }`}
                            disabled={isLoading}
                        >
                            Sí
                        </button>

                        <button
                            onClick={cerrarModalConfirmacion}
                            id="confirm-no"
                            className="btn-confirm-no"
                            disabled={isLoading}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
            {/* Mostrar información de la última venta */}
            <UltimaVenta ultimaVenta={ultimaVenta} />
        </div>
    );
};

export default Menu;
