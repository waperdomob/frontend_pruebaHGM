import React from "react";

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
  image: {
    width: 250,
    height: 250,
    objectFit: "cover",
  },
}));

const ProductosItemRow = ({ productos}) => {

  const classes = useStyles();  
  if (productos) {
    return (
        <Container>
            <div className="row">
                {productos && productos.map((producto) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
                      <div className="card card-body">
                        <h3 className={classes.paper}>{producto.producto}</h3>
                        <h3 className={classes.paper}>{producto.stock}</h3>
                        <div className="card card-body">
                            <Image
                                src={"http://localhost:8000" + producto.imagen}
                                className={"img-fluid "+classes.image}
                            ></Image>
                        </div>
                      </div>
                    </div>                    
                ))}
            </div>
            
        </Container>
      );
  }
  
};

export default ProductosItemRow;
