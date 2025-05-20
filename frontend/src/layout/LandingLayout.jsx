import { Outlet } from 'react-router-dom'
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import { SearchProvider } from '../context/SearchContext.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import CartSidebar from '../component/CartSidebar.jsx';

export default function LandingLayout() {
    return (
        <>
            <SearchProvider>
                <CartProvider>
                    <Header />
                    <CartSidebar />
                    <Outlet />
                    <Footer />
                </CartProvider>
            </SearchProvider>
        </>
    )
}