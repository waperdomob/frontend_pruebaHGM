import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//dependencias
import * as EntradasServices from "../../services/entradaService";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//styles
import "../../styles/modalsProfile.css";

const ModalEntrada = ({ handleClose, show, ...props}) => {
  const history = useNavigate();
  const [entrada, setEntrada] = useState({
    producto: props.producto,
    cantidad: null
  });
  console.log(props.producto);
  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;    
    setEntrada({ ...entrada, [name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
        formData.append("producto", entrada.producto.id);
        formData.append("usuario", props.user.id);
        formData.append("cantidad", entrada.cantidad);

        const res = await EntradasServices.RegisterEntrada(formData);
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
        <Modal.Title id="tituloModal" >Registre Entrada de producto</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal">
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Producto: </Form.Label>
          <input
            className="form-control"
            name="producto"
            autoFocus
            value={props.producto.producto}
            readOnly
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

export default ModalEntrada;