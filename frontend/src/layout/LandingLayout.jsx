import { Outlet } from 'react-router-dom'
import LandingHeader from "../component/landing/Header.jsx";
import LandingFooter from "../component/landing/Footer.jsx";
import { SearchProvider } from '../context/SearchContext.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import CartSidebar from '../component/CartSidebar.jsx';

export default function LandingLayout() {
    return (
        <>
            <SearchProvider>
                <CartProvider>
                    <LandingHeader />
                    <CartSidebar />
                    <Outlet />
                    <LandingFooter />
                </CartProvider>
            </SearchProvider>
        </>
    )
}