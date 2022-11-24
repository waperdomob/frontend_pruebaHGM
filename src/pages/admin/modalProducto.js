import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import * as ProductosServices from "../../services/productosService";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//styles
import "../../styles/modalsProfile.css";

const ModalProductos = ({ handleClose, show, ...props}) => {
  const history = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [Producto, setProducto] = useState({
    codigo: null,
    producto: null,
    descripcion: null,
    cantidad: null,
    precioCompra: null,
    precioVenta: null,
    subCategoria: null 
  });
  const [categorias, setCategorias] = useState();
  
  const getsubCategorias = async () => {
    try {
      const res = await ProductosServices.ListSubCategorias();
      const data = await res;
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    if (name === "imagen") {
      setSelectedFile(e.target.files[0]);
    } else { 
        setProducto({ ...Producto, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var imagen = selectedFile;
    const formData = new FormData();
    try {
        formData.append("codigo", Producto.codigo);
        formData.append("producto", Producto.producto);
        formData.append("descripcion", Producto.descripcion);
        formData.append("stock", Producto.cantidad);
        formData.append("precio_compra", Producto.precioCompra);
        formData.append("precio_venta", Producto.precioVenta);
        formData.append("subCategoria", Producto.subCategoria);
        formData.append("imagen", imagen);


        const res = await ProductosServices.RegisterProducto(formData);
        alert(res.message);
        history("/admin");
        window.location.reload();
    } catch (error) {
        for (const property in error.response.data) {
          alert(`${property}: ${error.response.data[property]}`);
        }      
      }
  }

  useEffect(() => {
    getsubCategorias();
  }, []);

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" >Registrar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Código: </Form.Label>
          <input
              className="form-control"
              name="codigo"
              onChange={handleInputChange}
              type="text"
              placeholder="Código del producto"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Producto: </Form.Label>
        <input
              className="form-control"
              name="producto"
              onChange={handleInputChange}
              type="text"
              placeholder="Nombre del producto"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Despripción: </Form.Label>
        <input
              className="form-control"
              name="descripcion"
              onChange={handleInputChange}
              type="text"
              placeholder="Despripción del producto"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Cantidad: </Form.Label>
        <input
              className="form-control"
              name="cantidad"
              onChange={handleInputChange}
              type="text"
              placeholder="Ingrese una cantidad"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Precio de compra: </Form.Label>
        <input
              className="form-control"
              name="precioCompra"
              onChange={handleInputChange}
              type="text"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Precio de venta: </Form.Label>
        <input
              className="form-control"
              name="precioVenta"
              onChange={handleInputChange}
              type="text"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Imagen: </Form.Label>
        <input
              className="form-control"
              id="featuredImage"
              name="imagen"
              onChange={handleInputChange}
              type="file"
              placeholder="Imagen del producto"
            />
        </Form.Group>
        <Form.Group>
        <Form.Label>Categoria: </Form.Label>
        <Form.Select
            className="form-control"
            name="subCategoria"
            autoFocus
            onChange={handleInputChange}
          >
            <option>Seleccione una categoria</option>
            {categorias && categorias.map((categoria, index) => (
              <option key={index} value={categoria.id}>
                {categoria.subcategoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
      </Form>
      </Modal.Body>
      
    </Modal>
  )
};

export default ModalProductos;