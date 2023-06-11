import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "./styles/Parking.css";
import { Toaster, toast } from "react-hot-toast";

export default function ParkingModal({ show, onHide, createParking, parkingUpdate, setParkingUpdate, updateParking }) {
  const initialValues = {
    nombre: "",
    nro_plazas: "",
    plazas_disponibles: "",
    plazas_ocupadas: "",
    nro_filas: "",
    nro_columnas: "",
    descripcion: "",
  };
  const [value, setValue] = useState(initialValues);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    const sms = isValid()
    if(sms === true){

      event.preventDefault();
      
      if (parkingUpdate.id) {
        updateParking(value);
      onHide();
    } else {
      createParking(value);
      onHide();
    }
    setParkingUpdate({});
    }else{
      messageToastError(sms)
    }
  };

  const isValid = () => {
    if( value.nombre === ''){
        return 'Nombre es requerido'
    }
    if( value.nro_filas === ''){
      return 'Nro filas es requerido'
    }
    if( value.nro_columnas === ''){
      return 'Nro columnas es requerido'
    }
    if( value.nro_filas < 1){
      return 'Nro filas debe ser entero'
    }
    if( value.nro_columnas < 1){
      return 'Nro columnas debe ser entero'
    }
    
    return true;
  }

  const messageToastError = (sms) => {
    toast.error(sms)
  }

  const handleCancel = () => {
    setParkingUpdate({});
    onHide();
  };
  useEffect(() => {
    if (Object.keys(parkingUpdate).length !== 0) {
      setValue(parkingUpdate);
    } else {
      setValue(initialValues);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} size="lg-sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ms-3 me-3">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre *</Form.Label>
            <Form.Control type="text" id="nombre" name="nombre" value={value.nombre} onChange={handleChange} />
          </Form.Group>
        {/*   <Form.Group className="mb-3">
            <Form.Label>Numero de Plazas</Form.Label>
            <Form.Control type="number" id="nro_plazas" name="nro_plazas" value={value.nro_plazas} onChange={handleChange} />
          </Form.Group> */}
       {/*    <Form.Group className="mb-3">
            <Form.Label>Plazas Disponibles</Form.Label>
            <Form.Control
              type="number"
              id="plazas_disponibles"
              name="plazas_disponibles"
              value={value.plazas_disponibles}
              onChange={handleChange}
            />
          </Form.Group> */}
        {/*   <Form.Group className="mb-3">
            <Form.Label>Plazas Ocupadas</Form.Label>
            <Form.Control type="number" id="plazas_ocupadas" name="plazas_ocupadas" value={value.plazas_ocupadas} onChange={handleChange} />
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Numero de Filas *</Form.Label>
            <Form.Control type="number" id="nro_filas" name="nro_filas" value={value.nro_filas} min={1} onChange={handleChange} />
            <Form.Label>Numero de Columnas *</Form.Label>
            <Form.Control type="number" id="nro_columnas" name="nro_columnas" value={value.nro_columnas} min={1} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control type="text" id="descripcion" name="descripcion" value={value.descripcion} onChange={handleChange} />
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
