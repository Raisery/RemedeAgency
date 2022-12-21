import { createSlice } from '@reduxjs/toolkit';
import config from '../config.json'
import { selectConnexion } from '../selectors';


export function fetchOrUpdateToken(username, password, remember) {
    return async (dispatch, getState) => {
        const status = selectConnexion(getState()).status
        if (status === 'pending' || status === 'updating') {
            return
        }
        dispatch(actions.fetching())
        try {
            const response = await fetch(config.urlApi+'/user/login', {
                method: 'POST',
                headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                body:JSON.stringify({
                      email: username,
                      password: password,
                  }),
            })
            const data = await response.json()
            dispatch(actions.resolved(data))
            if(remember) {
                localStorage.setItem('token',data.body.token)
            }
        } 
        catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export function closeSession() {
    return async (dispatch, getState) => {
        dispatch(actions.reset())
        localStorage.clear()
    }
}

export function recoverSession(token) {
    return async (dispatch, getState) => {
        dispatch(actions.set(token))
    }
}


const { actions, reducer } = createSlice({
    name: 'connexion',
    initialState: {
        token: '',
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
                draft.token = action.payload.body.token
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
        reset: (draft) => {
            draft.token = ''
            draft.status = 'void'
            draft.error = null
        },
        set: (draft, action) => {
            if(draft.status === 'void') {
                draft.token = action.payload
                draft.status = 'resolved'
                draft.error = null
            }
        }        
    }
})

export const {fetching, resolved, rejected} = actions

export default reducer