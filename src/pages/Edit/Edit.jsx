import '../../css/edit.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import EditForm from '../../components/EditForm/EditForm'

/**
 * Component for display Login page
 *
 * @returns The Login page
 */
function Edit() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    return (
        <div className="page">
            <Navbar user={user.firstName} />
            <main className="main bg-dark">
                <EditForm />
            </main>
            <Footer />
        </div>
    )
}

export default Edit
