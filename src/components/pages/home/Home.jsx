import { useContext, useState } from "react";
import "./Home.css";
import { LoginContext } from "../../../context/LoginContext";
import AdminContainer from "../admin/AdminContainer";
import MenuContainer from "../menu/MenuContainer";
import LoginContainer from "../login/LoginContainer";

const Home = () => {
    const { user, signIn, logOut } = useContext(LoginContext);
    const [admin, setAdmin] = useState("admin@hotmail.com");

    if (!user) {
        return (
            <div className="container-home">
                <LoginContainer signIn={signIn} />
            </div>
        );
    }
    return (
        <div className="container-home">
            {user.email === admin ? (
                <AdminContainer logOut={logOut} />
            ) : (
                <MenuContainer logOut={logOut} user={user} />
            )}
        </div>
    );
};

export default Home;
