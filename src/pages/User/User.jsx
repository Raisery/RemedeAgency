import '../../css/user.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Account from '../../components/Account/Account'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnexion, selectUser } from '../../utils/selectors'
import { useEffect } from 'react'
import * as userActions from '../../utils/slices/user'

/**
 * Component for display User page
 *
 * @returns The User page
 */
function User() {
    const dispatch = useDispatch()
    const connexion = useSelector(selectConnexion)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (connexion.status === 'resolved') {
            dispatch(userActions.fetchOrUpdateProfile(connexion.token))
        }
    }, [dispatch, connexion])

    return (
        <div className="page">
            <Navbar user={user.firstName} />
            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        {user.firstName + ' ' + user.lastName}!
                    </h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Account
                    title="Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank Savings (x6712)"
                    amount="$10,928.42"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank Credit Card (x8349)"
                    amount="$184.30"
                    description="Current Balance"
                />
            </main>
            <Footer />
        </div>
    )
}

export default User
