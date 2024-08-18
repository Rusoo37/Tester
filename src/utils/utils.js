import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyExitoso = (tarea) =>
    toast.success(tarea, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });

export const notifyErroneo = (tarea) =>
    toast.error(tarea, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });
