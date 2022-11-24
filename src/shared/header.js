import React from 'react'
import { Link } from 'react-router-dom'

export default function Header( {titulo} ) {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  if (!user) {
    return (
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{ titulo }</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/" >Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/login" >Login</Link>
                </li>
                <li className="breadcrumb-item active">{ titulo }</li>
               
              </ol>
            </div>
          </div>
        </div>
      </section>
    )
  }
  else{
    return (
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{ titulo }</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/admin" >Admin</Link>
                </li> 
                <li className="breadcrumb-item">
                  <Link to="/logout" >Logout</Link>
                </li>
                <li className="breadcrumb-item active">{ titulo }</li>
               
              </ol>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
