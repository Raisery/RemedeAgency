import logo from '../../assets/argentBankLogo.png'
import '../../css/navbar.css'
import { Link } from 'react-router-dom'

/**
 * Component for displaying navbar
 *
 * @returns The navbar of the page
 */
export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/Home">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/Login">
                    <i className="fa fa-user-circle"></i>
                    {' Sign In'}
                </Link>
            </div>
        </nav>
    )
}
