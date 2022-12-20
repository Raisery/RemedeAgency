import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import Router from './Router'
import { Provider } from 'react-redux'
import store from './utils/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router />
        </React.StrictMode>
    </Provider>
)
