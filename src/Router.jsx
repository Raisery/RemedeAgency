import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

import Home from './pages/Home/Home'

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/Home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
