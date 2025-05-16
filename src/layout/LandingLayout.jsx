import {Outlet} from 'react-router-dom'
import LandingHeader from "../component/landing/Header.jsx";
import LandingFooter from "../component/landing/Footer.jsx";

export default function LandingLayout () {
    return  (
        <>
            <LandingHeader />
            <Outlet/>
            <LandingFooter />
        </>
    )
}