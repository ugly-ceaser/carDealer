import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import CartSidebar from '../component/CartSidebar';


export default function UserLayout() {
    return (
        <>
            <Header />
            <CartSidebar />
            <Outlet />
            <Footer />
        </>
    )
}