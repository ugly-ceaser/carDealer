import {Link} from 'react-router-dom'

export default function LandingHeader() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Benz World</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/#login" className="nav-link" aria-current="page">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="register" className="nav-link" aria-disabled="true">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}