import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "./styles/AssignTurn.css";
import { Toaster, toast } from "react-hot-toast";

export default function AssignTurnModal({ show, onHide, createTurn, turnUpdate, setTurnUpdate, updateTurn, turnoToUpdate, setTurnoToUpdate}) {
  const initialValues = {
    nombre: "",
    hora_inicio: "",
    hora_fin: "",
    estado: ''
  };
  const [value, setValue] = useState(initialValues);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    let sms = isValid()
    if( sms === true){
      event.preventDefault();

      if (turnoToUpdate.id) {
        let estado;
        if(value.estado === 'activo') estado = 1; 
        if(value.estado === 'inactivo') estado = 0; 
        updateTurn({...value, 'estado': estado});
        onHide();
      } else {
        createTurn(value);
        onHide();
      }
      setTurnoToUpdate({});
    }else{
      messageToastError(sms);
    }
  };
  const isValid = () => {
    if(value.nombre === ''){
      return 'Nombre es requerido'
    }
    if(value.hora_inicio === ''){
      return 'Hora inicio es requerido'
    }
    if(value.hora_fin === ''){
      return 'Hora fin requerido'
    }

    return true;
  }
  const messageToastError = (sms) => {
    toast.error(sms);
  }

  const handleCancel = () => {
    setTurnoToUpdate({});
    onHide();
  };
  useEffect(() => {
    if (turnoToUpdate && Object.keys(turnoToUpdate).length !== 0) {
      setValue({...value,...turnoToUpdate});
    } else {
      setValue(initialValues);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} size="lg-sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Crear Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ms-3 me-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nombre">Nombre *</Form.Label>
              <Form.Control type="text" id="nombre" name="nombre" value={value.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora Inicio *</Form.Label>
              <Form.Control type="time" id="hora_inicio" name="hora_inicio" value={value.hora_inicio} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora Fin *</Form.Label>
              <Form.Control type="time" id="hora_fin" name="hora_fin" value={value.hora_fin} onChange={handleChange} />
            </Form.Group>
          {
            turnoToUpdate.id && <Form.Select value={value.estado} name="estado" onChange={handleChange}>
                <option value="">Selecciones una opcion</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </Form.Select>
          }


            <Form.Group className="mb-3 d-flex justify-content-evenly">
              <button className="btn-global bg-color-red  tc-white" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn-main btn-main__purple" onClick={handleSubmit}>
                Confirmar
              </button>
            </Form.Group>
        </Modal.Body>
        <Toaster position="top-right"/>
      </Modal>
    </>
  );
}
