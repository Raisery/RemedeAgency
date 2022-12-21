import connexionReducer from './slices/connexion'
import userReducer from './slices/user'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    connexion : connexionReducer,
    user : userReducer
  },
})