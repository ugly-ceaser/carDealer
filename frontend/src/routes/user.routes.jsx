import { Routes, Route } from "react-router-dom"
import UserLayout from "../layout/UserLayout.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import Profile from "../pages/user/Profile.jsx";
import DashboardPage from "../pages/user/Dashboard.jsx";

export default function UserRoutes() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}