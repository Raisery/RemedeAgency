import '../../css/sign-in-form.css'
import Loader from '../Loader/Loader'
import * as connexionActions from '../../utils/slices/connexion'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnexion } from '../../utils/selectors'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import store from '../../utils/store'

/**
 * Component for displaying Sign in form
 *
 * @returns a Sign in form
 */
export default function SignInForm() {
    const dispatch = useDispatch()
    const actualConnexion = store.getState().connexion

    useEffect(() => {
        if (
            actualConnexion.status === 'void' &&
            localStorage.getItem('remember')
        ) {
            dispatch(
                connexionActions.recoverSession({
                    token: localStorage.getItem('token'),
                    remember: localStorage.getItem('remember'),
                })
            )
        }
    }, [dispatch, actualConnexion])

    function handleLogin(event) {
        event.preventDefault()
        const fields = document.querySelectorAll('input')
        dispatch(
            connexionActions.fetchOrUpdateToken(
                fields[0].value,
                fields[1].value,
                fields[2].checked
            )
        )
    }

    const connexion = useSelector(selectConnexion)

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

    const formError = (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <p className="bad-field-alert">Invalid username or password</p>
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

    if (connexion.status === 'resolved') return <Navigate to="/User" />

    if (connexion.status === 'rejected') return formError

    return connexion.status === 'fetching' ? <Loader /> : form
}
