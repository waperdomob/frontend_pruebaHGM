import React, { useEffect, useState } from "react";

import * as Productoserver from "../../services/productosService"
import { ListSucursales } from "../../services/sucursalService";

import ProductosItemRow from "./productosRow";
import ModalProductos from "./modalProducto";
import ModalSalidas from "./modalOutput";
import ModalEntradas from "./modalInput";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    alignItems: "center",
  },
}));

const ProductosList = () => {

  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [sucursales, setSucursales] = useState(false);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  console.log(user);
  const listProductos = async () => {
    try {
      const res = await Productoserver.ListProductos();
      setProductos(res.productos);
    } catch (error) {
      console.log("Error");
    }
  };

  const GetSucursales= async () => {
    try {
    const res = await ListSucursales();
    setSucursales(res);

    } catch (error) {
    console.log(error);
    }
  };
  useEffect(() => {
    listProductos();
    GetSucursales();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

    
  const classes = useStyles();
  if (user) {
    return (
        <div>
            <h1 className={classes.paper}>Productos</h1><br/>
            {(user.role ===1 || user.role ===2 ) && 
            <div className={"d-grid gap-2 col-4 mx-auto "+classes.paper }>
                <button
                className="btn btn-success btn-lg"
                type="submit"
                onClick={handleShow}
                >
                Registrar Producto
                </button>
            </div>
            }
            <br/>
            <div className={"d-grid gap-2 col-8 ml-auto "+classes.paper2 }>
            {(user.role ===1 || user.role ===2 ) &&
                <button 
                className="btn btn-primary btn-lg"
                type="submit"
                onClick={handleShow2}
                >
                    Agregar Entrada
                </button>
              }
              {(user.role ===1 || user.role ===3 ) &&
                <button 
                className="btn btn-warning btn-lg"
                type="submit"
                onClick={handleShow3}
                >
                    Enviar a sucursal
                </button>
              }
            </div>
            <ModalProductos
              handleClose = {handleClose}
              show = {show}
            >
            </ModalProductos>
            <ModalSalidas
              sucursales={sucursales}
              user= {user}
              productos ={productos}
              handleClose = {handleClose3}
              show = {show3}
            >
            </ModalSalidas>
            <ModalEntradas
              user= {user}
              productos ={productos}
              handleClose = {handleClose2}
              show = {show2}
            >
            </ModalEntradas>
            <ProductosItemRow
                productos={productos}
                user = {user}
            >
            </ProductosItemRow>
        </div>
    )
  }
  else{
    return (
        <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
      );
  }
};

export default ProductosList;
