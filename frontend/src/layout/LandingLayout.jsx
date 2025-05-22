import { Outlet } from 'react-router-dom'
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import CartSidebar from '../component/CartSidebar.jsx';

export default function LandingLayout() {
    return (
        <>
            <Header />
            <CartSidebar />
            <Outlet />
            <Footer />
        </>
    )
}