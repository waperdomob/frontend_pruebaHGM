import React from "react"

export default function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
            <i className="fas fa-bars" />
        </li>
        
        <li className="nav-item">
          <a href="/admin/productos" className="nav-link">
            Productos
          </a>
        </li>
      </ul>
    </nav>
  )
}

