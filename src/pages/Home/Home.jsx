import FeatureItem from '../../components/FeatureItem/FeatureItem'
import Hero from '../../components/Hero/Hero'
import '../../css/home.css'
import { featuresContent } from '../../content/featuresContent'
import Footer from '../../components/Footer/Footer'

/**
 * Component for display home page
 *
 * @returns The home page
 */
function Home() {
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
        <main>
            <Hero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {features}
            </section>
            <Footer />
        </main>
    )
}

export default Home