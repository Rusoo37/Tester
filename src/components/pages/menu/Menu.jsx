import "./Menu.css";
import logo from "./../../../../assets/logo.webp";

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
    isSubmitting,
}) => {
    return (
        <div className="container-menu">
            <button onClick={logOut} className="btn-cerrar-sesion">
                Cerrar sesión
            </button>
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : "Añadir venta"}{" "}
                </button>
            </form>

            {/* Modal de confirmación */}
            <div id="confirm-save" className="modal">
                <div className="modal-content">
                    <p>¿Estás seguro de que deseas guardar esta venta?</p>
                    <div className="modal-buttons">
                        <button
                            onClick={confirmarGuardar}
                            id="confirm-yes"
                            className="btn-confirm-yes"
                            disabled={isSubmitting}
                        >
                            Sí
                        </button>
                        <button
                            onClick={cerrarModalConfirmacion}
                            id="confirm-no"
                            className="btn-confirm-no"
                            disabled={isSubmitting}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
