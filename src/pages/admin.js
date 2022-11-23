import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../shared/navbar"
import Sidebar from "../shared/sidebar"

import ProductosList from "./admin/productos"

export default function Admin() {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <ProductosList/>
        <Outlet />
        
      </div>
    </div>
  )
}
