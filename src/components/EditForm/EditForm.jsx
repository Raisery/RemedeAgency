import '../../css/editForm.css'
import Loader from '../Loader/Loader'
import * as userActions from '../../utils/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { Navigate } from 'react-router-dom'
import store from '../../utils/store'
import config from '../../utils/config.json'

/**
 * Component for displaying Sign in form
 *
 * @returns a Sign in form
 */
export default function EditForm() {
    const dispatch = useDispatch()
    const token = store.getState().connexion.token
    const user = useSelector(selectUser)

    if (!user.editing) return <Navigate to="/User" />

    function handleEdit(event) {
        //add regex verif for fields (only letters)
        event.preventDefault()
        const fields = document.querySelectorAll('input')
        const firstName = fields[0].value
        const lastName = fields[1].value
        async function editProfile() {
            const response = await fetch(config.urlApi + '/user/profile', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }),
                body: JSON.stringify({
                    firstName,
                    lastName,
                }),
            })
            const data = await response.json()

            if (data.status === 200) {
                dispatch(userActions.update(data.body))
            } else {
                dispatch(userActions.rejected(data.message))
            }
        }

        editProfile()
    }

    const form = (
        <section className="edit-form-content">
            <i className="fa fa-user-circle edit-form-icon"></i>
            <h1>Edit Profile</h1>
            <form onSubmit={handleEdit}>
                <div className="input-wrapper">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" />
                </div>

                <button
                    type="submit"
                    value="Submit"
                    className="edit-form-button"
                >
                    Save
                </button>
            </form>
        </section>
    )

    if (user.status === 'void') return <Navigate to="/Login" />

    return false ? <Loader /> : form
}
