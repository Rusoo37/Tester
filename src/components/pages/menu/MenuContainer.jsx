import { useState } from "react";
import { notifyErroneo, notifyExitoso } from "../../../utils/utils";
import Menu from "./Menu";
import { db } from "../../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const MenuContainer = ({ logOut, user }) => {
    const [monto, setMonto] = useState("");
    const [tipo, setTipo] = useState("Efectivo");
    const [empleado, setEmpleado] = useState("");
    const empleados = ["Nicolás", "Agustín", "Marcos"];
    const [ventaAConfirmar, setVentaAConfirmar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!monto || monto <= 0) {
            notifyErroneo("El monto debe ser mayor a 0.");
            return;
        }
        if (!tipo) {
            notifyErroneo("Debe seleccionar un tipo de pago.");
            return;
        }
        if (!empleado) {
            notifyErroneo("Debe ingresar el nombre del empleado.");
            return;
        }

        setVentaAConfirmar({ monto, tipo, empleado });
        document.getElementById("confirm-save").style.display = "flex";
    };

    const confirmarGuardar = async () => {
        setIsSubmitting(true);
        if (ventaAConfirmar) {
            try {
                await addDoc(collection(db, "ventas"), {
                    monto: ventaAConfirmar.monto,
                    tipo: ventaAConfirmar.tipo,
                    empleado: ventaAConfirmar.empleado,
                    fecha: new Date(),
                });
                notifyExitoso("Venta guardada con éxito");
                setMonto("");
                setEmpleado("");
            } catch (e) {
                notifyErroneo("Error al guardar la venta");
                console.error("Error guardando la venta: ", e);
            } finally {
                cerrarModalConfirmacion();
                setIsSubmitting(false);
            }
        }
    };

    const cerrarModalConfirmacion = () => {
        setVentaAConfirmar(null);
        document.getElementById("confirm-save").style.display = "none";
        setIsSubmitting(false);
    };
    return (
        <Menu
            monto={monto}
            setMonto={setMonto}
            tipo={tipo}
            setTipo={setTipo}
            empleado={empleado}
            setEmpleado={setEmpleado}
            empleados={empleados}
            handleSubmit={handleSubmit}
            logOut={logOut}
            confirmarGuardar={confirmarGuardar}
            cerrarModalConfirmacion={cerrarModalConfirmacion}
            isSubmitting={isSubmitting}
        />
    );
};

export default MenuContainer;
