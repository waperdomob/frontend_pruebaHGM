import React from "react"

//COMPONENTES
import Home from "./pages/home"
import Login from "./pages/login"
import Admin from "./pages/admin"
import UpdateUsuario from "./pages/admin/update-usuario"
import NotFound from "./pages/notfound"
import PrivateRoute from "./shared/private-route"

// CONSTANTES
import { URL_BASE } from "./config/constants"

import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "./shared/loading"

import { Routes, Route } from "react-router-dom"
import Usuarios from "./pages/admin/usuarios"
import Register from "./pages/register"
import jwtDecode from "jwt-decode"

export default function RoutesApp() {
  const token = sessionStorage.getItem("token")
  const [appData, setAppData] = useState({ isAuth: false, isLoading: true, payload: null })

  useEffect(() => {
    if (token)
    axios
      .get(URL_BASE + "/auth/validar", { headers: { Authorization: token } })
      .then((res) => {
        setAppData((prev) => ({ ...prev, isAuth: true, payload: jwtDecode(token) }))

      })
      .catch((err) => {
        setAppData((prev) => ({ ...prev, isAuth: false }))
      })
      .finally(() => {
        setAppData((prev) => ({ ...prev, isLoading: false }))
      })
    else
      setAppData({isAuth: false, isLoading: false })

    return () => {}
  }, [appData.isAuth])

  if (appData.isLoading) {
    return <Loading />
  } else {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuth={appData.isAuth}>
              <Admin />
            </PrivateRoute>
          }>
          <Route path="usuario/:id" element={<UpdateUsuario />} />
          <Route path="usuario/all" element={<Usuarios />} />
        </Route>
        <Route path="/login" element={<Login setAppData={setAppData} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }
}

