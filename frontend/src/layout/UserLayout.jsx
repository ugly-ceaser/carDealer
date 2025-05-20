import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { SearchProvider } from '../context/SearchContext';


export default function UserLayout() {
    return (
        <>
            <SearchProvider>
                <Header />
                <Outlet />
                <Footer />
            </SearchProvider>
        </>)
}