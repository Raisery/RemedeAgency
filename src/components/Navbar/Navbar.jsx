import logo from '../../assets/argentBankLogo.png'
import '../../css/navbar.css'
import { Link } from 'react-router-dom'

/**
 * Component for displaying navbar
 * @param {string} user - The first name of the user connected
 *
 * @returns The navbar of the page
 */
export default function Navbar({ user = null }) {
    var menu = (
        <div>
            <Link className="main-nav-item" to="/Login">
                <i className="fa fa-user-circle"></i>
                {' Sign In'}
            </Link>
        </div>
    )

    if (user) {
        menu = (
            <div>
                <a className="main-nav-item" href="./user.html">
                    <i className="fa fa-user-circle"></i>
                    {' ' + user}
                </a>
                <a className="main-nav-item" href="./index.html">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </a>
            </div>
        )
    }

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
            {menu}
        </nav>
    )
}
