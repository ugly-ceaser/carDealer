import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { SearchProvider } from '../context/SearchContext';
import { CartProvider } from '../context/CartContext';
import CartSidebar from '../component/CartSidebar';


export default function UserLayout() {
    return (
        <>
            <CartProvider>
                <SearchProvider>
                    <Header />
                    <CartSidebar />
                    <Outlet />
                    <Footer />
                </SearchProvider>
            </CartProvider>
        </>
    )
}