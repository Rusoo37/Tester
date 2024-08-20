import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

const Admin = ({
    logOut,
    ventas,
    handleEliminarVenta,
    ventasPorDia,
    fechaSeleccionada,
    setFechaSeleccionada,
}) => {
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [ventaAEliminar, setVentaAEliminar] = useState(null);
    const [filtroEmpleado, setFiltroEmpleado] = useState("Todos");

    const filtrarVentas = () => {
        return ventas.filter((venta) => {
            const tipoCoincide =
                filtroTipo === "Todos" || venta.tipo === filtroTipo;

            const fecha = new Date(venta.fecha.seconds * 1000);
            fecha.setHours(fecha.getHours() - 3);
            const fechaAjustada = fecha.toISOString().split("T")[0];

            // Comparación con la fecha seleccionada
            const fechaCoincide =
                !fechaSeleccionada || fechaAjustada === fechaSeleccionada;

            const empleadoCoincide =
                filtroEmpleado === "Todos" || venta.empleado === filtroEmpleado;

            return tipoCoincide && fechaCoincide && empleadoCoincide;
        });
    };

    const ventasFiltradas = filtrarVentas();

    const calcularTotalesFiltrados = () => {
        return ventasFiltradas.reduce(
            (acc, venta) => {
                acc.totalMonto += parseFloat(venta.monto);
                acc.cantidad += 1;
                return acc;
            },
            { totalMonto: 0, cantidad: 0 }
        );
    };

    const totalesFiltrados = calcularTotalesFiltrados();

    const mostrarModalConfirmacion = (ventaId) => {
        setVentaAEliminar(ventaId);
        document.getElementById("confirm-delete").style.display = "flex";
    };

    const cerrarModalConfirmacion = () => {
        setVentaAEliminar(null);
        document.getElementById("confirm-delete").style.display = "none";
    };

    const confirmarEliminar = () => {
        if (ventaAEliminar) {
            handleEliminarVenta(ventaAEliminar);
            cerrarModalConfirmacion();
        }
    };
    return (
        <div className="container-dashboard">
            <button onClick={logOut} className="btn-cerrar-sesion">
                Cerrar sesión
            </button>
            <div className="dashboard">
                <h2>Listado de Ventas</h2>

                {/* FILTROS */}

                <div className="filters">
                    <label htmlFor="filtroTipo">Tipo:</label>
                    <select
                        id="filtroTipo"
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Cuenta Dni">Cuenta DNI</option>
                        <option value="Mercado Pago">Mercado Pago</option>
                        <option value="Modo">Modo</option>
                    </select>

                    <label htmlFor="fechaEspecifica">Fecha:</label>
                    <input
                        type="date"
                        id="fechaEspecifica"
                        value={fechaSeleccionada}
                        onChange={(e) => setFechaSeleccionada(e.target.value)}
                    />

                    <label htmlFor="filtroEmpleado">Empleado:</label>
                    <select
                        id="filtroEmpleado"
                        value={filtroEmpleado}
                        onChange={(e) => setFiltroEmpleado(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Nicolás">Nicolás</option>
                        <option value="Agustín">Agustín</option>
                        <option value="Marcos">Marcos</option>
                    </select>
                </div>

                {/* Lista por día */}

                <div className="table-container" style={{ maxHeight: "25vh" }}>
                    <h3>Total por Día</h3>
                    <table className="ventas-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Total Monto</th>
                                <th>Cantidad de Ventas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasPorDia.length > 0 ? (
                                ventasPorDia.map(
                                    ({ fecha, totalMonto, cantidad }) => (
                                        <tr key={fecha}>
                                            <td>{fecha}</td>
                                            <td>$ {totalMonto}</td>
                                            <td>{cantidad}</td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        style={{ textAlign: "center" }}
                                    >
                                        No hay ventas para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Lista de filtradas */}

                <div className="table-container">
                    <h3>Ventas Filtradas</h3>
                    <p>
                        Total Monto: $ {totalesFiltrados.totalMonto.toFixed(2)}
                    </p>
                    <p>Cantidad de Ventas: {totalesFiltrados.cantidad}</p>
                    <table className="ventas-table">
                        <thead>
                            <tr>
                                <th>Monto</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Empleado</th>{" "}
                                {/* Nueva columna para el empleado */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.length > 0 ? (
                                ventasFiltradas.map((venta) => (
                                    <tr key={venta.id}>
                                        <td>{venta.monto}</td>
                                        <td>{venta.tipo}</td>
                                        <td>
                                            {new Date(
                                                venta.fecha.seconds * 1000
                                            ).toLocaleString()}
                                        </td>
                                        <td>{venta.empleado}</td>{" "}
                                        {/* Mostrar el empleado */}
                                        <td>
                                            <button
                                                onClick={() =>
                                                    mostrarModalConfirmacion(
                                                        venta.id
                                                    )
                                                }
                                                className="btn-eliminar-venta"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        style={{ textAlign: "center" }}
                                    >
                                        No hay ventas para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de confirmación */}
            <div id="confirm-delete" className="modal">
                <div className="modal-content">
                    <p>¿Estás seguro de que deseas eliminar esta venta?</p>
                    <div className="modal-buttons">
                        <button
                            onClick={confirmarEliminar}
                            id="confirm-yes"
                            className="btn-confirm-yes"
                        >
                            Sí
                        </button>
                        <button
                            onClick={cerrarModalConfirmacion}
                            id="confirm-no"
                            className="btn-confirm-no"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
