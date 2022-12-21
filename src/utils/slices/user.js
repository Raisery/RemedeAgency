import { createSlice } from '@reduxjs/toolkit';
import config from '../config.json'
import { selectUser } from '../selectors';


export function fetchOrUpdateProfile(token) {
    return async (dispatch, getState ) => {
        const status = selectUser(getState()).status
        if (status === 'pending' || status === 'updating') {
            return
        }
        dispatch(actions.fetching())
        try {
            const response = await fetch(config.urlApi+'/user/profile', {
                method: 'POST',
                headers: new Headers({
                        'Content-Type': 'application/json',
                        Authorization : 'Bearer '+token

                    }),
                })
            const data = await response.json()
            dispatch(actions.resolved(data))
            localStorage.setItem('firstName', data.body.firstName)
        } 
        catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}


const { actions, reducer } = createSlice({
    name: 'user',
    initialState: {
        email: '',
        firstName: '',
        lastName: '',
        createdAt:'',
        updatedAt:'',
        id:'',
        error: null,
        status:'void'
    },
    reducers: {
        fetching: (draft) => {
            if (draft.status === 'void') {
                draft.status = 'pending'
                return
            }
            if (draft.status === 'rejected') {
                draft.error = null
                draft.status = 'pending'
                return
            }
            if (draft.status === 'resolved') {
                draft.status = 'updating'
                return
            }
            return
        },
        resolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.email = action.payload.body.email
                draft.firstName = action.payload.body.firstName
                draft.lastName = action.payload.body.lastName
                draft.createdAt = action.payload.body.createdAt
                draft.updatedAt = action.payload.body.updatedAt
                draft.id = action.payload.body.id
                draft.status = 'resolved'
                return
            }
            return
        },
        rejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected'
                draft.error = action.payload
                return
            }
            return
        }
    }
})

export const {fetching, resolved, rejected} = actions

export default reducer

