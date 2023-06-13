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

const { PUBLIC_URL } = import.meta.env

const AppRoutes = () => {
    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<InitProvider />}>

                    <Route path="/" element={<Tracker />} />
                    <Route path="*" element={<Navigate to="/" />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes