import React from "react"

//COMPONENTES
import NotFound from "./pages/notfound"
import Home from "./pages/home"
import Login from "./pages/login"
import Logout from "./pages/logout"
import Header from "./shared/header"
import Register from "./pages/register"
import Loading from "./shared/loading"
import Usuarios from "./pages/admin/usuarios"
import PrivateRoute from "./shared/private-route"
import Admin from "./pages/admin"

import { useEffect, useState } from "react"


import { StyledEngineProvider } from '@mui/material/styles';
import {BrowserRouter, Routes, Route } from "react-router-dom"


export default function RoutesApp() {
  const token = localStorage.getItem("token");
  const [appData, setAppData] = useState({ isAuth: false, isLoading: true })

  useEffect(() => {
    if (token)   
        setAppData((prev) => ({ ...prev, isAuth: true, isLoading: false }))      
    else
      setAppData({isAuth: false, isLoading: false })

    return () => {}
  }, [appData.isAuth, token])

  if (appData.isLoading) {
    return <Loading />
  } else {
    return (
      <BrowserRouter>  
        <StyledEngineProvider injectFirst>
          <Header />
        </StyledEngineProvider>
        <div className=" mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute isAuth={appData.isAuth}>
                  <Admin />
                </PrivateRoute>
              }>
              <Route path="usuarios/" element={<Usuarios />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAppData={setAppData} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <br></br>
        </div>
      </BrowserRouter>
    )
  }
}

