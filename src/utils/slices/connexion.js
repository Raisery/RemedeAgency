import { createSlice } from "@reduxjs/toolkit";
import config from '../config.json'


export function login(email, password) {
    return async (dispatch, getState) => {
        try {
            // on utilise fetch pour faire la requête
            const response = await fetch(config.urlApi+'/user/login', {
                method: 'POST',
                headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                body:JSON.stringify({
                      email: email,
                      password: password,
                  }),
                })
            const data = await response.json()
            dispatch(actions.connect(data))
        }   
        catch (error) {
            dispatch(actions.error(error))
        }     
    }
}

export function logout() {
    return async (dispatch, getState) => {
        console.log("logout")
        dispatch(actions.disconnect())
    }
}



const { actions, reducer } = createSlice({
    name: 'connexion',
    initialState: {
        token: "",
        connected: false,
        error: null
    },
    reducers: {
        connect: (draft, action) => {
            console.log(action.payload)
            //Success
            if(action.payload.status === 200) {
                draft.token = action.payload.body.token
                draft.connected = true
                draft.error = null
                localStorage.setItem("token",draft.token)
            }
            //Bad request
            else {
                draft.token = ""
                draft.connected = false
                draft.error = action.payload.message
            }
            
            
            
            return
        },
        disconnect: (draft, action) => {
            draft.token = ""
            draft.connected = false
            draft.error = null
            localStorage.removeItem("token")
            return
        },
         error: (draft, action) => {
            
            draft.token = ""
            draft.connected = false
            draft.error = action.payload
            return
        },
    }
})


export default reducer

