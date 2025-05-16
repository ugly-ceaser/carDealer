import { Outlet } from 'react-router-dom'
import UserHeader from '../component/user/Header'

export default function UserLayout() {
    return (
        <>
            <UserHeader />
            <Outlet />
        </>)
}