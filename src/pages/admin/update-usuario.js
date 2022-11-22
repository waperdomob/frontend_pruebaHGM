import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../../shared/header"
import { useForm } from "react-hook-form"
import { AVISO, URL_BASE } from "../../config/constants"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateUsuario() {
  const navigate = useNavigate()
  const params = useParams()
  const token = sessionStorage.getItem("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [usuario, setUsuario] = useState({
    tipoDoc: "",
    numeroDoc: "",
    fechaConexion: new Date(),
    email: "",
    password: "",
    edad: 0,
    tipo: "",
    nombres: "",
    apellidos: "",
  })

  useEffect(() => {
    if (params.id !== "new") {
      axios
        .get(URL_BASE + "/usuario", {
          headers: { Authorization: token },
          params: { id: params.id },
        })
        .then((res) => {
          console.log(res)
          setUsuario(res.data)
          reset(res.data)
        })
        .catch((err) => {
          console.error(err)
          const { mensaje } = err.response.data
          if (mensaje) AVISO.fire({ icon: "error", text: mensaje })
        })
    }

    return () => {}
  }, [params.id, reset, token])

  // FUNCION DEL BOTON DEL FORMULARIO
  function submit(data) {
    if (params.id === "new") {
      // ENVIAR PETICION PARA CREAR
      axios
        .post(URL_BASE + "/usuario", data, {
          headers: { Authorization: token },
        })
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
    } else {
      // ENVIAR PETICION PARA MODIFICAR
      axios
        .put(URL_BASE + "/usuario", data, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res)
          AVISO.fire({ icon: "success", text: "Se modificó el usuario" })
          navigate("/admin")
        })
        .catch((err) => {
          console.error(err)
          const { mensaje } = err.response.data
          if (mensaje) AVISO.fire({ icon: "error", text: mensaje })
        })
    }
  }

  return (
    <div>
      <Header titulo="Crear o modificar un usuario" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Usuario</h3>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="nombres">Nombres</label>
                      <input
                        type="text"
                        className={
                          "form-control" + (errors.nombres ? " is-invalid" : "")
                        }
                        id="nombres"
                        {...register("nombres", { required: true })}
                        placeholder="Ejemplo: Jhon"
                        defaultValue={
                          params.id === "new" ? "" : usuario.nombres
                        }
                      />
                      {errors.nombres && (
                        <span className="text-danger">
                          El campo nombre es obligatorio
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="apellidos">Apellidos</label>
                      <input
                        type="text"
                        className={
                          "form-control" +
                          (errors.apellidos ? " is-invalid" : "")
                        }
                        id="apellidos"
                        {...register("apellidos", { required: true })}
                        placeholder="Ejemplo: Doe"
                        defaultValue={
                          params.id === "new" ? "" : usuario.apellidos
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Tipo de documento</label>
                      <select
                        defaultValue={
                          params.id === "new" ? "" : usuario?.tipoDoc
                        }
                        className={
                          "form-control" + (errors.tipoDoc ? " is-invalid" : "")
                        }
                        {...register("tipoDoc", { required: true })}>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="RE">Registro Civil</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="numeroDoc">Número de Documento</label>
                      <input
                        type="number"
                        className={
                          "form-control" +
                          (errors.numeroDoc ? " is-invalid" : "")
                        }
                        id="numeroDoc"
                        {...register("numeroDoc", { required: true })}
                        defaultValue={
                          params.id === "new" ? "" : usuario?.numeroDoc
                        }
                        placeholder="Digita tu número de identificación"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="edad">Edad</label>
                      <input
                        type="number"
                        className="form-control"
                        id="edad"
                        {...register("edad")}
                        defaultValue={params.id === "new" ? "" : usuario?.edad}
                        placeholder="Ingresa la edad en años"
                      />
                    </div>

                    <div className="form-group">
                      <label>Tipo de usuario</label>
                      <select
                        defaultValue={params.id === "new" ? "" : usuario?.tipo}
                        className={
                          "form-control" + (errors.tipo ? " is-invalid" : "")
                        }
                        {...register("tipo", { required: true })}>
                        <option value="CLIENTE">Cliente</option>
                        <option value="VENDEDOR">Vendedor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Correo electronico</label>
                      <input
                        defaultValue={params.id === "new" ? "" : usuario?.email}
                        type="email"
                        className={
                          "form-control" + (errors.email ? " is-invalid" : "")
                        }
                        id="email"
                        {...register("email", { required: true })}
                        placeholder="Ingresa el email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        placeholder="Ingresa la contraseña"
                        id="password"
                        className={
                          "form-control" +
                          (errors.password ? " is-invalid" : "")
                        }
                        {...register("password", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Crear o Modificar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

