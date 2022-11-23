import React, { useEffect, useState } from "react";

import * as Productoserver from "../../services/productosService"
import ProductosItemRow from "./productosRow";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const listProductos = async () => {
    try {
      const res = await Productoserver.ListProductos();
      setProductos(res.productos);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    listProductos();
  }, []);
  const classes = useStyles();  

  if (user) {
    return (
        <div>
            <h1 className={classes.paper}>Productos</h1><br/>
            <div className={"d-grid gap-2 col-4 mx-auto "+classes.paper }>
                <button
                className="btn btn-success btn-lg"        
                >
                Registrar Producto
                </button>
            </div>
            <br/>
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
