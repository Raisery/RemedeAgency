import '../../css/sign-in-form.css'
import { useState } from 'react'
import Loader from '../Loader/Loader'
import { Navigate } from 'react-router-dom'
import { login } from '../../utils/slices/connexion'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnexion } from '../../utils/selectors'

/**
 * Component for displaying Sign in form
 *
 * @returns a Sign in form
 */
export default function SignInForm() {
    const [connexion, setConnexion] = useState(false)
    const dispatch = useDispatch()

    const { token, error } = useSelector(selectConnexion)
    function handleLogin(event) {
        event.preventDefault()
        setConnexion(true)
        const fields = document.querySelectorAll('input')
        dispatch(login(fields[0].value, fields[1].value))
    }
    console.log('token: ' + token)
    console.log('error: ' + error)
    if (token !== '' && error == null) return <Navigate to="/User" />

    const form = (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>

                <button type="submit" value="Submit" className="sign-in-button">
                    Sign In
                </button>
            </form>
        </section>
    )

    return connexion ? <Loader /> : form
}
