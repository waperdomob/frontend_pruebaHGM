import React from "react"
import axios from "axios"
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom"
import { URL_BASE } from "../config/constants"

export default function Login({setAppData}) {
  const navigate = useNavigate()

  function submitForm(event) {
    event.preventDefault()

    const { email, password } = event.target

    axios
      .post(URL_BASE + "/login/", {
        username: email.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("token");
        setAppData(prev => ({ ...prev, isAuth: true }) )
        navigate("/admin")
      })
      .catch((err) => {
        console.log(err)
        alert("Credenciales invalidas")
      })
  }

  return (
    <div className="login-page" style={{ minHeight: "465.652px" }}>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>FERRETERIA HGM</b>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Inicia sesión</p>
            <form onSubmit={submitForm}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  name="email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Recuerdame</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <a href="forgot-password.html">Olvidé mi contraseña</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">
                Registrar un nuevo usuario
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
