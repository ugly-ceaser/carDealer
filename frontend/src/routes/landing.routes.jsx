import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/landing/Home.jsx";
import LandingLayout from "../layout/LandingLayout.jsx";
import RegistrationForm from "../pages/landing/Register.jsx";
import CatalogDetail from "../pages/landing/Catalog-Detail.jsx";
import Catalog from "../pages/landing/Catalog.jsx";

export default function LandingRoutes() {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route index element={<HomePage />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:id" element={<CatalogDetail />} />
                <Route path="register" element={<RegistrationForm />} />
            </Route>
        </Routes>
    )
}