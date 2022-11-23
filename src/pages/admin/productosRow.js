import React, { useEffect, useState } from "react";

import ModalSalidas from "./modalOutput";
import ModalEntradas from "./modalInput";

import { ListSucursales } from "../../services/sucursalService";
//components
import { Image } from "react-bootstrap";

//MaterialUI
import Container from "@material-ui/core/Container";
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

const ProductosItemRow = ({ productos, user}) => {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [sucursales, setSucursales] = useState(false);

  const GetSucursales= async () => {
    try {
    const res = await ListSucursales();
    setSucursales(res);

    } catch (error) {
    console.log(error);
    }
  };
  useEffect(() => {
    GetSucursales();
  }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

  const classes = useStyles();  
  if (productos) {
    return (
        <Container>
            <div className="row">
                {productos && productos.map((producto) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
                        <h3 className={classes.paper}>{producto.producto}</h3>
                        <h3 className={classes.paper}>{producto.stock}</h3>
                        <div className="card card-body">
                            <Image
                                src={"http://localhost:8000" + producto.imagen}
                                className="img-fluid"
                            ></Image>
                        </div>
                        <div className="card card-footer">
                            <button 
                            className="btn btn-primary btn-lg"
                            type="submit"
                            onClick={handleShow2}
                            >
                                Agregar Entrada
                            </button>
                            <button 
                            className="btn btn-warning btn-lg"
                            type="submit"
                            onClick={handleShow}
                            >
                                Enviar a sucursal
                            </button>
                        </div>
                        <ModalSalidas
                          sucursales={sucursales}
                          user= {user}
                          producto ={producto}
                          handleClose = {handleClose}
                          show = {show}
                          >
                          </ModalSalidas>
                          <ModalEntradas
                            user= {user}
                            producto ={producto}
                            handleClose = {handleClose2}
                            show = {show2}
                          >
                          </ModalEntradas>
                    </div>
                    
                ))}
            </div>
            
        </Container>
      );
  }
  
};

export default ProductosItemRow;
