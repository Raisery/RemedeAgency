import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './pages/Edit/Edit'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import User from './pages/User/User'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Home" element={<Home />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/User" element={<User />} />
                <Route exact path="/Edit" element={<Edit />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
