import { createContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import { notifyErroneo, notifyExitoso } from "../utils/utils.js";

export const LoginContext = createContext();

const LoginContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Función para iniciar sesión
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            setUser(user);
            notifyExitoso("Has iniciado sesión");
        } catch (error) {
            notifyErroneo("Error al iniciar sesión");
            console.error("Error signing in:", error.message);
        }
    };

    // Función para cerrar sesión
    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            notifyExitoso("Se ha cerrado sesión");
        } catch (error) {
            notifyErroneo("Error al cerrar sesión");
            console.error("Error signing out:", error.message);
        }
    };

    const data = {
        user,
        signIn,
        logOut,
    };

    return (
        <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
    );
};

export default LoginContextComponent;
