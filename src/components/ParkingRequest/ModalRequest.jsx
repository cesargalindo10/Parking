import { Modal } from "react-bootstrap";
const APIULRIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const ModalRequest = ({ show, payment, onHide }) => {

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Informacion de Reserva</h5>
      </Modal.Header>
      <Modal.Body className="modal-body">
         <div style={{width: '300px', margin: '0 auto'}}>
          <img className="w-100" src={`${APIULRIMG}${payment.comprobante}`} alt="" />
         </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-main btn-main__red"
          onClick={() => onHide(false)}
        >
          Volver
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalRequest;
