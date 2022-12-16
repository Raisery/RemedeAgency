import '../../css/notFound.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

/**
 * Component for display NotFound page
 *
 * @returns The NotFound page
 */
function NotFound() {
    return (
        <div className="page">
            <Navbar />
            <main className="main bg-dark">ERROR 404</main>
            <Footer />
        </div>
    )
}

export default NotFound
