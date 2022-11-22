import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../../shared/header"

import { AVISO, URL_BASE } from "../../config/constants"
import { Link } from "react-router-dom"

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [refresh, setRefresh] = useState(false)
  
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    axios
      .get(URL_BASE + "/usuario/all", {
        headers: { Authorization: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setUsuarios(res.data)
      })
      .catch((err) => {
        console.err(err)
      })

    return () => {}
  }, [refresh])

  function borrarCliente(event) {
    // 1 OBTENER EL ID (EL BOTON DEBE TENER EL CORRRESPONDIENTE ID)
    const { id } = event.target

    // 2 ENVIAR PETICION DELETE
    axios.delete(
      URL_BASE + "/usuario",
      { headers: { Authorization: token }, data: { numeroDoc: id } }
    )
    .then(()=>{
      setRefresh( !refresh )
      AVISO.fire({icon: "warning", title: "Se borro el usuario"})
    })
    .catch(()=>{
      AVISO.fire({icon: "error", title: "Error al borrar el usuario"})
    })
  }

  return (
    <>
      <Header titulo="Lista de usuarios" />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  Encuentra la lista de todos los usuarios de la tienda de
                  Mascotas
                </h3>
              </div>
              <div className="card-body">
                <div
                  id="example2_wrapper"
                  className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12 col-md-6" />
                    <div className="col-sm-12 col-md-6" />
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        id="tablaUsuarios"
                        className="table table-bordered table-hover dataTable dtr-inline">
                        <thead>
                          <tr>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Nombres
                            </th>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Apellidos
                            </th>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Tipo Documento
                            </th>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Numero documento
                            </th>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Tipo
                            </th>
                            <th tabIndex={0} rowSpan={1} colSpan={1}>
                              Opciones
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {usuarios.map((usuario) => {
                            return (
                              <tr key={usuario._id}>
                                <td>{usuario.nombres}</td>
                                <td>{usuario.apellidos}</td>
                                <td>{usuario.tipoDoc}</td>
                                <td>{usuario.numeroDoc}</td>
                                <td>{usuario.tipo}</td>
                                <td>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic example">
                                    <Link
                                      to={"/admin/usuario/" + usuario._id}
                                      type="button"
                                      className="btn btn-info">
                                      Modificar
                                    </Link>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={borrarCliente}
                                      id={usuario.numeroDoc}>
                                      Borrar
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

