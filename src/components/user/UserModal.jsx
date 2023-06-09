import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "./styles/User.css";

export default function UserModal({ show, onHide, createUser, userUpdate, setUserUpdate, updateUser }) {
  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    rol: "",
  };
  console.log(userUpdate.id);
  const [value, setValue] = useState(initialValues);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userUpdate.id) {
      updateUser(value);
      onHide();
    } else {
      createUser(value);
      onHide();
    }
    setUserUpdate({});
  };

  const handleCancel = () => {
    setUserUpdate({});
    onHide();
  };
  useEffect(() => {
    if (Object.keys(userUpdate).length !== 0) {
      setValue(userUpdate);
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
              <Form.Label htmlFor="nombre">Nombre Completo</Form.Label>
              <Form.Control type="text" id="nombre" name="nombre" value={value.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" id="email" name="email" value={value.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" id="password" name="password" value={value.password ? value.password : ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select id="rol" name="rol" value={value.rol} onChange={handleChange}>
                <option>{value.rol}</option>
                <option value="administrador">Administrador</option>
                <option value="operador">Operador</option>
                <option value="guardia">Guardia</option>
              </Form.Select>
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
      </Modal>
    </>
  );
}
