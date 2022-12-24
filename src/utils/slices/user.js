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
            if(data.status === 200) {
                dispatch(actions.resolved(data))
                localStorage.setItem('firstName', data.body.firstName)
            }
            else dispatch(actions.rejected(data.message))
            
        } 
        catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export function edit(active) {
    return async (dispatch, getState) => {
        dispatch(actions.setEdit(active))
    }
}

export function closeSession() {
    return async (dispatch, getState) => {
        dispatch(actions.reset())
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
        editing: false,
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
        },
        setEdit: (draft, action) => {
            draft.editing = action.payload
            return
        },
        reset: (draft) => {
            draft.email = ''
            draft.firstName = ''
            draft.lastName = ''
            draft.createdAt = ''
            draft.updatedAt = ''
            draft.id = ''
            draft.editing = false
            draft.status = 'void'
            return
        },
        update: (draft, action) => {
            draft.email = action.payload.email
            draft.firstName = action.payload.firstName
            draft.lastName = action.payload.lastName
            draft.createdAt = action.payload.createdAt
            draft.updatedAt = action.payload.updatedAt
            draft.id = action.payload.id
            draft.editing = false
            draft.status = 'resolved'
            return
        }
    }
})

export const {fetching, resolved, rejected, update, setEdit} = actions

export default reducer

