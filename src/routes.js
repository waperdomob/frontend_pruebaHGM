import React from "react"

//COMPONENTES
import Home from "./pages/home"
import Login from "./pages/login"
import Logout from "./pages/logout"
import Header from "./shared/header"
import Register from "./pages/register"

import { StyledEngineProvider } from '@mui/material/styles';
import {BrowserRouter, Routes, Route } from "react-router-dom"


export default function RoutesApp() {
  
    return (
      <BrowserRouter>  
        <StyledEngineProvider injectFirst>
          <Header />
        </StyledEngineProvider>
        <div className=" mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/*<Route exact path="/Peliculas" element={<AppPeliculas />} />
            <Route exact path="/Series" element={<AppSeries />} />
            <Route path="/VideoForm" element={<VideoForm />} />
            <Route path="/updateVideo/:id" element={<VideoForm />} />
            <Route path="/seeVideo/:id" element={<VideoDetail />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <br></br>
        </div>
      </BrowserRouter>
    )
}

