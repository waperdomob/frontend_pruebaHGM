import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../shared/navbar"
import Sidebar from "../shared/sidebar"

export default function Admin() {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  )
}
