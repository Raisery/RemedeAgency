import '../../css/login.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SignInForm from '../../components/SignInForm/SignInForm'

/**
 * Component for display Login page
 *
 * @returns The Login page
 */
function Login() {
    return (
        <div className="page">
            <Navbar />
            <main className="main bg-dark">
                <SignInForm />
            </main>
            <Footer />
        </div>
    )
}

export default Login
