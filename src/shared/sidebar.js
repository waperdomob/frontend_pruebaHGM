import React, { useState } from "react"
import { MdOutlinePets } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import {  NavLink } from "react-router-dom"

export default function Sidebar() {

  const [itemUsuarioOpen, setItemUsuarioOpen] = useState(false)
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
 // let itemUsuarioOpen = false
  console.log(user);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <MdOutlinePets className="m-1" size={24} />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <FiUser size={24} color="white" />
          </div>
          <div className="info" style={{color:'white'}}>            
              {user.first_name}            
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu">
             <li className= "nav-item">
              <div className="nav-link active" onClick={ ()=>{
                setItemUsuarioOpen(!itemUsuarioOpen)
                console.log(itemUsuarioOpen)                
              } }>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Usuarios
                  <i className="right fas fa-angle-left" />
                </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/admin/usuario/new" className="nav-link" end>
                    <i className="far fa-circle nav-icon" />
                    <p>Crear</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/usuario/all" className="nav-link" end>
                    <i className="far fa-circle nav-icon" />
                    <p>Listar</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className={ "nav-item"+ ( itemUsuarioOpen ? " menu-open" : "") }>
              <div className="nav-link active" onClick={ ()=>{
                setItemUsuarioOpen(!itemUsuarioOpen)
                console.log(itemUsuarioOpen)
                
              } }>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Productos
                  <i className="right fas fa-angle-left" />
                </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/admin/producto/new" className="nav-link" end>
                    <i className="far fa-circle nav-icon" />
                    <p>Crear</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/productos" className="nav-link" end>
                    <i className="far fa-circle nav-icon" />
                    <p>Listar</p>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
