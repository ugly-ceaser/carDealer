import { Outlet } from 'react-router-dom'
import UserHeader from '../component/user/Header'
import { useState } from 'react';
import { SearchProvider } from '../context/SearchContext';


export default function UserLayout() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <>
            <SearchProvider>
                <UserHeader />
                <Outlet />
            </SearchProvider>
        </>)
}