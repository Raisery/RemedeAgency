import '../../css/editForm.css'
import Loader from '../Loader/Loader'
import * as userActions from '../../utils/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { Navigate } from 'react-router-dom'
import store from '../../utils/store'
import config from '../../utils/config.json'
import { useState } from 'react'

function testEditFields(firstName, lastName, setErrors) {
    const errors = []
    const regex = new RegExp(
        "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$"
    )

    if (firstName === '') {
        errors.push('FIRSTNAME_EMPTY')
    } else {
        if (!regex.test(firstName)) {
            errors.push('FIRSTNAME_INVALID')
        }
    }
    if (lastName === '') {
        errors.push('LASTNAME_EMPTY')
    } else {
        if (!regex.test(lastName)) {
            errors.push('LASTNAME_INVALID')
        }
    }

    return errors
}

async function editProfile(dispatch, token, firstName, lastName) {
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

/**
 * Component for displaying Sign in form
 *
 * @returns a Sign in form
 */
export default function EditForm() {
    const dispatch = useDispatch()
    const token = store.getState().connexion.token
    const user = useSelector(selectUser)
    const [errors, setErrors] = useState([])

    //return if user is not connected
    if (user.status === 'void') return <Navigate to="/Login" />

    if (!user.editing) return <Navigate to="/User" />

    function handleEdit(event) {
        event.preventDefault()
        const fields = document.querySelectorAll('input')
        const firstName = fields[0].value
        const lastName = fields[1].value
        const testResult = testEditFields(firstName, lastName, setErrors)

        console.log(testResult)
        if (testResult.length !== 0) return setErrors(testResult)
        editProfile(dispatch, token, firstName, lastName)
    }

    function handleBack(event) {
        dispatch(userActions.setEdit(false))
    }

    const form = (
        <section className="edit-form-content">
            <i className="fa fa-user-circle edit-form-icon"></i>
            <h1>Edit Profile</h1>
            <div className="back-button" onClick={handleBack}>
                <i className="fas fa-arrow-left"></i> Back
            </div>
            <form onSubmit={handleEdit}>
                <div className="input-wrapper">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" />
                    {errors.includes('FIRSTNAME_EMPTY') ? (
                        <p className="field-error">
                            The first name cant be empty
                        </p>
                    ) : (
                        ''
                    )}
                    {errors.includes('FIRSTNAME_INVALID') ? (
                        <p className="field-error">This is not a first name</p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" />
                    {errors.includes('LASTNAME_EMPTY') ? (
                        <p className="field-error">
                            The last name cannot be empty
                        </p>
                    ) : (
                        ''
                    )}
                    {errors.includes('LASTNAME_INVALID') ? (
                        <p className="field-error">This is not a last name</p>
                    ) : (
                        ''
                    )}
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

    return false ? <Loader /> : form
}
