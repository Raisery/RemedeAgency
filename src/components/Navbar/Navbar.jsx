import logo from '../../assets/argentBankLogo.png'
import '../../css/navbar.css'
import { Link } from 'react-router-dom'
import * as connexionAction from '../../utils/slices/connexion'
import { useDispatch } from 'react-redux'

/**
 * Component for displaying navbar
 * @param {string} user - The first name of the user connected
 *
 * @returns The navbar of the page
 */
export default function Navbar({ user = null }) {
    const dispatch = useDispatch()
    function handleCloseSession(event) {
        dispatch(connexionAction.closeSession())
    }
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
                <Link className="main-nav-item" to="/Login">
                    <i className="fa fa-user-circle"></i>
                    {' ' + user}
                </Link>
                <Link
                    onClick={handleCloseSession}
                    className="main-nav-item"
                    to="/Login"
                >
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
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
