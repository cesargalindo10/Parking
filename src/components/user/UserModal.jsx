import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import "./styles/User.css";

export default function UserModal({ show, onHide, createUser, userUpdate, setUserUpdate, updateUser, roles, existe }) {
  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    rol: "",
  };
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
          if (value.nombre == "" || value.email == "" || value.password == "" || value.rol == "") {
            messageToastError("los campos no puden estar vacion");
          } else {
            if (existe) {
              messageToastError("Usuario con ese Correo ya existe");
            } else {
              updateUser(value);
              messageToastSuccess("Usuario creado con exito");
              setTimeout(() => {
                onHide();
              }, 1000);
            }
          }
      
      
    } else {
      if (value.nombre == "" || value.email == "" || value.password == "" || value.rol == "") {
        messageToastError("los campos no puden estar vacion");
      } else {
        if (existe) {
          messageToastError("Usuario con ese Correo ya existe");
        } else {
          createUser(value);
          messageToastSuccess("Usuario creado con exito");
          setTimeout(() => {
            onHide();
          }, 1000);
        }
      }
    }
    setUserUpdate({});
  };

  const handleCancel = () => {
    setUserUpdate({});
    onHide();
  };
  const messageToastSuccess = (sms) => {
    toast.success(sms);
  };
  const messageToastError = (sms) => {
    toast.error(sms);
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
          <div>
            <Modal.Title id="contained-modal-title-vcenter">Crear Usuario</Modal.Title>
            
          </div>
        </Modal.Header>
        <Modal.Body className="ms-3 me-3">
        <p style={{fontSize:'13px'}}>los campos con (*) son obligatorios</p>
          <Form.Group className="mb-3">
            *<Form.Label htmlFor="nombre">Nombre Completo</Form.Label>
            <Form.Control type="text" id="nombre" name="nombre" value={value.nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            *<Form.Label>Email</Form.Label>
            <Form.Control type="email" id="email" name="email" value={value.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            *<Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" name="password" value={value.password ? value.password : ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            *<Form.Label>Rol</Form.Label>
            <Form.Select id="rol" name="rol" value={value.rol} onChange={handleChange}>
              <option>{value.rol ? "" : "selecciona un rol"}</option>
              {Object.entries(roles).map(([clave, ro]) => (
                <option key={clave} value={ro.name}>
                  {ro.name=="cliente" ?'':ro.description}
                </option>
              ))}
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
        <Toaster position="top-right" />
      </Modal>
    </>
  );
}
