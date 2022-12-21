import FeatureItem from '../../components/FeatureItem/FeatureItem'
import Hero from '../../components/Hero/Hero'
import '../../css/home.css'
import { featuresContent } from '../../content/featuresContent'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnexion, selectUser } from '../../utils/selectors'
import * as userActions from '../../utils/slices/user'
import * as connexionActions from '../../utils/slices/connexion'
import store from '../../utils/store'

/**
 * Component for display home page
 *
 * @returns The home page
 */
function Home() {
    const dispatch = useDispatch()
    const connexion = useSelector(selectConnexion)
    const token = localStorage.getItem('token')

    if (!token) {
        localStorage.clear()
    }

    if (token && connexion.status === 'void') {
        console.log('set connexion with old token')
        dispatch(connexionActions.recoverSession(token))
        console.log('done')
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
