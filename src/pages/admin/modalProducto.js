import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import * as SalidasServices from "../../services/salidasService";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//styles
import "../../styles/modalsProfile.css";

const ModalSalidas = ({sucursales, handleClose, show, ...props}) => {
  const history = useNavigate();
  const [salida, setSalida] = useState({
    sucursal: null,
    producto: null,
    cantidad: null
  });
  
  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;    
        setSalida({ ...salida, [name]: e.target.value });
    
  };
  const handleSelectCategory = (e) => {
    let target = e.target;
    let name = target.name;
    //here
    let value = Array.from(target.selectedOptions, (option) => option.value);
        setSalida({ ...salida, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
        formData.append("producto", salida.producto);
        formData.append("sucursal", salida.sucursal);
        formData.append("usuario", props.user.id);
        formData.append("cantidad", salida.cantidad);

        const res = await SalidasServices.RegisterSalida(formData);
        alert(res.message);
        history("/admin");
        window.location.reload();
    } catch (error) {
        for (const property in error.response.data) {
          alert(`${property}: ${error.response.data[property]}`);
        }      
      }
  }

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" >Envie a sucursal</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Producto: </Form.Label>
          <Form.Select
            className="form-control"
            name="producto"
            autoFocus
            onChange={handleSelectCategory}
          >
            <option>Seleccione un Producto</option>
            {props.productos && props.productos.map((producto, index) => (
              <option key={index} value={producto.id}>
                {producto.producto}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
        <Form.Label>Sucursal: </Form.Label>
          <Form.Select
            className="form-control"
            name="sucursal"
            autoFocus
            onChange={handleSelectCategory}
          >
            <option>Seleccione una sucursal</option>
            {sucursales && sucursales.map((sucursal, index) => (
              <option key={index} value={sucursal.id}>
                {sucursal.sucursal}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
        <Form.Label>Cantidad: </Form.Label>
        <input
              className="form-control"
              name="cantidad"
              onChange={handleInputChange}
              type="text"
              placeholder="Ingrese una cantidad"
              maxLength="150"
            />
        </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
      </Form>
      </Modal.Body>
      
    </Modal>
  )
};

export default ModalSalidas;