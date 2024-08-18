import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { notifyErroneo, notifyExitoso } from "../../../utils/utils";
import Spinner from "../../common/spinner/Spinner";
import Admin from "./Admin";

const AdminContainer = ({ logOut }) => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ventasPorDia, setVentasPorDia] = useState([]);
    const hoy = new Date().toISOString().split("T")[0];
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);

    const fetchVentas = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "ventas"));
            const ventasData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            ventasData.sort((a, b) => {
                const fechaA = a.fecha?.seconds || 0;
                const fechaB = b.fecha?.seconds || 0;
                return fechaB - fechaA;
            });

            setVentas(ventasData);
        } catch (error) {
            console.error("Error al recuperar las ventas: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    useEffect(() => {
        const calcularTotales = () => {
            const totales = ventas.reduce((acc, venta) => {
                if (venta.fecha && venta.fecha.seconds) {
                    const fecha = new Date(venta.fecha.seconds * 1000)
                        .toISOString()
                        .split("T")[0];

                    if (fechaSeleccionada && fecha !== fechaSeleccionada) {
                        return acc;
                    }

                    if (!acc[fecha]) {
                        acc[fecha] = { totalMonto: 0, cantidad: 0 };
                    }

                    acc[fecha].totalMonto += parseFloat(venta.monto);
                    acc[fecha].cantidad += 1;
                }
                return acc;
            }, {});

            const result = Object.keys(totales).map((fecha) => ({
                fecha,
                totalMonto: totales[fecha].totalMonto.toFixed(2),
                cantidad: totales[fecha].cantidad,
            }));
            setVentasPorDia(result);
        };

        calcularTotales();
    }, [ventas, fechaSeleccionada]);

    const handleEliminarVenta = async (ventaId) => {
        try {
            await deleteDoc(doc(db, "ventas", ventaId));
            notifyExitoso("Venta eliminada con éxito");
            fetchVentas();
        } catch (e) {
            notifyErroneo("Error al eliminar la venta");
            console.error("Error eliminando la venta: ", e);
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <Admin
            logOut={logOut}
            ventas={ventas}
            handleEliminarVenta={handleEliminarVenta}
            ventasPorDia={ventasPorDia}
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada={setFechaSeleccionada}
        />
    );
};

export default AdminContainer;
