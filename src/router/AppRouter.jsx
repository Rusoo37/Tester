import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContextComponent from "../context/LoginContext";
import { routes } from "./menuRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayOut from "../components/layout/LayOut";
import NotFoundContainer from "../components/pages/notFound/NotFoundContainer";
import Home from "../components/pages/home/Home";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <LoginContextComponent>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<LayOut />}>
                        {routes.map(({ id, path, Element }) => (
                            <Route key={id} path={path} element={<Element />} />
                        ))}
                    </Route>
                    <Route path="*" element={<NotFoundContainer />} />
                </Routes>
                <ToastContainer />
            </LoginContextComponent>
        </BrowserRouter>
    );
};

export default AppRouter;
