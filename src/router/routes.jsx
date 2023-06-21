/**
 * * High level router.
 *
 */

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { InitProvider } from "../providers/layout"

// import auth module
// import privateRoutes
// import 404 page


import Tracker from "../pages/Tracker"
import ContainerEdit from "../pages/Tracker/ContainerEdit"
import ContainerDetails from "../pages/Tracker/ContainerDetails"
import Calendar from "../pages/Calendar"

import Login from "../pages/Auth/login";
import Dashboard from '../pages/Dashboard'
import Users from "../pages/Users";
import UserDetails from "../pages/Users/UserDetails"
import { useAuth } from "../providers";

const { PUBLIC_URL } = import.meta.env

const AppRoutes = () => {


    const { currentUser } = useAuth()
    console.log("currentUser", currentUser)
    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<InitProvider />}>
                    {currentUser && <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<UserDetails />} />

                        <Route path="/containers" element={<Tracker />} />
                        <Route path="/containers/edit/:id" element={<ContainerEdit />} />
                        <Route path="/containers/details/:id" element={<ContainerDetails />} />

                        <Route path="/calendar" element={<Calendar />} />


                        <Route path="*" element={<Navigate to="/" />} />
                    </>}
                    {!currentUser && <>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>}
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes