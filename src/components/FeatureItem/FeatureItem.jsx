import '../../css/featureItem.css'

/**
 * Component for displaying feature item
 *
 * @param {Object} image - Object with image src and alt formatted like : {src: img, alt:'alt text'}
 * @param {string} title - Title of the feature
 * @param {string} description - Description of the feature
 *
 * @returns a feature item
 */
export default function FeatureItem({ image, title, description }) {
    return (
        <div className="feature-item">
            <img src={image.src} alt={image.alt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}
