import connexionReducer from './slices/connexion'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    connexion : connexionReducer
  },
})