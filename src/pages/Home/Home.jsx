import FeatureItem from '../../components/FeatureItem/FeatureItem'
import Hero from '../../components/Hero/Hero'
import '../../css/home.css'
import { featuresContent } from '../../content/featuresContent'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnexion } from '../../utils/selectors'
import * as connexionActions from '../../utils/slices/connexion'

/**
 * Component for display home page
 *
 * @returns The home page
 */
function Home() {
    const dispatch = useDispatch()
    const connexion = useSelector(selectConnexion)
    const token = localStorage.getItem('token')
    const remember = localStorage.getItem('remember') ? true : false

    if (!remember && connexion.status === 'void') {
        localStorage.clear()
    }

    if (remember && connexion.status === 'void') {
        dispatch(connexionActions.recoverSession({ token, remember }))
    }

    const features = featuresContent.map((feature, index) => {
        return (
            <FeatureItem
                key={index + 'feature'}
                image={feature.image}
                title={feature.title}
                description={feature.desc}
            />
        )
    })

    return (
        <div className="page">
            <Navbar user={localStorage.getItem('firstName')} />
            <main>
                <Hero />
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    {features}
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Home
