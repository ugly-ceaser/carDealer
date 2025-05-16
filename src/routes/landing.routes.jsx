import {Routes, Route} from "react-router-dom"
import HomePage from "../pages/landing/Home.jsx";
import LandingLayout from "../layout/LandingLayout.jsx";
import RegistrationForm from "../pages/landing/Register.jsx";

export default function LandingRoutes () {
    return (
        <Routes>
            <Route element={<LandingLayout/>}>
                <Route index element={<HomePage/>} />
                <Route path="register" element={<RegistrationForm/>} />
            </Route>
        </Routes>
    )
}