import React from "react";
import { Modal } from "react-bootstrap";
const ModalConfirm = ({ show, onHide, deleteSomething, message }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          <h3>Advertencia</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-main btn-main__red" onClick={() => onHide(false)}>
          Cancelar
        </button>
        <button className="btn-main btn-main__purple" onClick={() => deleteSomething()}>
          Aceptar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;