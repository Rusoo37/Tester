import { useState } from "react";
import Login from "./Login";

const LoginContainer = ({ signIn }) => {
    const [phoneNumber, setPhoneNumber] = useState("2262486975");
    const [message, setMessage] = useState(
        "Hola, me olvide la contraseña del sistema"
    );

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    return <Login signIn={signIn} whatsappUrl={whatsappUrl} />;
};

export default LoginContainer;
