import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import Profile from "../pages/user/Profile.jsx";
import DashboardPage from "../pages/user/Dashboard.jsx";
import CatalogDetail from "../pages/user/Catalog-Detail.jsx";
import Catalog from "../pages/user/Catalog.jsx";
import AuthGuard from "../component/AuthGuard.jsx";

export default function UserRoutes() {
    return (
        <Routes>
            <Route element={<AuthGuard>
                <UserLayout />
            </AuthGuard>}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:id" element={<CatalogDetail />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}