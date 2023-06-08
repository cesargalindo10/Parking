import { Modal } from "react-bootstrap";
const APIULRIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const ModalShowRequest = ({ show, infoReserve, onHide }) => {

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Informacion de Reserva</h5>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <h5>Informacion del cliente</h5>
        <p>Nombre: {infoReserve.nombre_completo}</p>
        <p>Placa: {infoReserve.placa}</p>
        <p>Ci:{infoReserve.ci}</p>
        <p>Telefono:{infoReserve.telefono}</p>
        <p>Cargo:{infoReserve.cargo}</p>
        <p>Unidad:{infoReserve.unidad}</p>

        <h5>Informacion de la reserva</h5>
        <p>Nro de plaza:{infoReserve.numero}</p>
        <p>Tiempo:{infoReserve.nombre}</p>
        <div className="modal-img">
          {infoReserve.comprobante && (
            <>
              <p>Comprobante</p>
              <img
                src={`${APIULRIMG}${infoReserve.comprobante}`}
                alt="imagen comprobante"
              />
            </>
          )}
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
export default ModalShowRequest;
