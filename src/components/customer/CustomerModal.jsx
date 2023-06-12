import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "./styles/Customer.css";
import { Toaster, toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai"
export default function CustomerModal({ show, onHide, createCustomer, customerUpdate, setCustomerUpdate, updateCustomer }) {
  const initialValues = {
    nombre_completo: "",
    ci:"",
    email: "",
    placa:"",
    password: "",
    telefono:"",
    cargo:"",
    unidad:""
  };
  console.log(customerUpdate.id);
  const [value, setValue] = useState(initialValues);
  const [showPassowrd, setShowPassowrd] = useState(false)
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    let sms = isValid();
    if( sms === true){
      event.preventDefault();

      if (customerUpdate.id) {
        updateCustomer(value);
        onHide();
      } else {
        createCustomer(value);
        onHide();
      }
      setCustomerUpdate({});
    }else{
      messageToastError(sms)
    }
  };

const messageToastError = (sms) => {
    toast.error(sms);
  }

  const isValid  = () => {  
    if(value.nombre_completo === ''){
      return 'Nombre es requerido'
    }
    if(value.ci === ''){
      return 'Ci es requerido'
    }
    if(value.email === ''){
      return 'Email es requerido'
    }
    if(value.placa === ''){
      return 'Placa es requerido'
    }
   
    if(value.telefono === ''){
      return 'Telefono es requerido'
    }
    if(value.cargo === ''){
      return 'Cargo es requerido'
    }
    if(value.unidad === ''){
      return 'Unidad es requerido'
    }
    if(value.password === ''){
      return 'Password es requerido'
    }
    return true;
  }
  const handleCancel = () => {
    setCustomerUpdate({});
    onHide();
  };
  useEffect(() => {
    if (Object.keys(customerUpdate).length !== 0) {
      setValue(customerUpdate);
    } else {
      setValue(initialValues);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} size="lg-sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{customerUpdate.id?"Editar":"Crear"} Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ms-3 me-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nombre">Nombre Completo *</Form.Label>
              <Form.Control type="text" id="nombre_completo" name="nombre_completo" value={value.nombre_completo} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CI *</Form.Label>
              <Form.Control type="number" id="ci" name="ci" value={value.ci} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" id="email" name="email" value={value.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Placa *</Form.Label>
              <Form.Control type="text" id="placa" name="placa" value={value.placa} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefono *</Form.Label>
              <Form.Control type="number" id="telefono" name="telefono" value={value.telefono} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cargo *</Form.Label>
              <Form.Control type="text" id="cargo" name="cargo" value={value.cargo} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unidad *</Form.Label>
              <Form.Control type="text" id="unidad" name="unidad" value={value.unidad} onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{position: 'relative'}} className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control type={showPassowrd ? 'text': 'password'} id="password" name="password" value={value.password ? value.password : ""} onChange={handleChange} />
              <div className="icon-eye-customer" onClick={() => setShowPassowrd(!showPassowrd)}>
                <AiFillEye/>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-evenly">
              <button className="btn-global bg-color-red  tc-white" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn-main btn-main__purple" onClick={handleSubmit}>
                Confirmar
              </button>
            </Form.Group>
        </Modal.Body>
        <Toaster/>
      </Modal>
    </>
  );
}
