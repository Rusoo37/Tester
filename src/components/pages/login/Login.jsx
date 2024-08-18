import { useState } from "react";
import "./Login.css";
import { ToastContainer } from "react-toastify";
import logo from "./../../../../assets/logo.webp";
import pass from "./../../../../assets/pass.png";
import user from "./../../../../assets/user.png";

const Login = ({ signIn, whatsappUrl }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signIn(email, password);
    };
    return (
        <form className="container-login" onSubmit={handleSignIn}>
            <div className="logo-login">
                <img src={logo} alt="logo" />
            </div>
            <div className="container-input-login">
                <div className="input-login">
                    <img src={user} alt="mail" />
                    <input
                        type="text"
                        placeholder="Ingrese el mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-login">
                    <img src={pass} alt="password" />
                    <input
                        type="password"
                        placeholder="Ingrese la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="olvide-pass">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Olvidé la contraseña
                </a>
            </div>
            <div className="container-iniciar">
                <button type="submit">Ingresar</button>
            </div>
        </form>
    );
};

export default Login;
