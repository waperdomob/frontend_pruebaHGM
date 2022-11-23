import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { AVISO, URL_BASE } from "../config/constants"

export default function Register() {
  //const token = sessionStorage.getItem("token")
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm()

  function registrar(data) {
    // ENVIAR PETICION PARA CREAR
    axios
      .post(URL_BASE + "/usuarios", data)
      .then((res) => {
        console.log(res)
        AVISO.fire({ icon: "success", text: "Se registro el usuario" })
        navigate("/admin")
      })
      .catch((err) => {
        console.error(err)
        const { mensaje } = err.response.data
        if (mensaje) AVISO.fire({ icon: "error", text: mensaje })
      })
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>Tienda de mascotas</b>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Registrate</p>
            <form onSubmit={handleSubmit(registrar)}>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("tipo")}
                    id="vendedor"
                    defaultValue="VENDEDOR"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="vendedor">
                    Vendedor
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("tipo")}
                    id="cliente"
                    defaultValue="CLIENTE"
                  />
                  <label className="form-check-label" htmlFor="cliente">
                    Cliente
                  </label>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombres"
                  {...register("nombres", { required: true })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellidos"
                  {...register("apellidos")}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <select className="form-control" {...register("tipoDoc")}>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="RE">Registro Civil</option>
                  <option value="PA">Pasaporte</option>
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Numero de documento"
                  {...register("numeroDoc")}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email")}
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
                  {...register("password", { required: true })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Verificar contraseña"
                  {...register("password2", {
                    required: true,
                    validate: (value) => {
                      if (value !== watch("password")) {
                        setError("passwordMatch")
                      } else {
                        clearErrors()
                      }
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {errors.passwordMatch && (
                <span className="text-danger">
                  Las contraseñas no coinciden
                </span>
              )}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                      {...register("terminos")}
                    />
                    <label htmlFor="agreeTerms">
                      Acepto los terminos de uso
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrar
                  </button>
                </div>
              </div>
            </form>
            <Link to="/login" className="text-center">
              Ya tengo una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
