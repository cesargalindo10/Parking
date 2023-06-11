import { useEffect, useState } from "react";
import { InputGroup, Modal, Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  fecha_inicio_pago: "",
  fecha_limite_reserva: "",
  fecha_inicio_reserva: "",
  fecha_fin_reserva: "",
};

export const ModalConvocatoria = ({ show, onHide, createConvocatoria }) => {
  const [information, setInformation] = useState(initialState);
  const [imgConvocatoria, setImgConvocatoria] = useState({valid: false, img:{}});
  useEffect(() => {
    setInformation(initialState);
  }, []);

  const handleOnChange = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  const handleOnChangeFile = (e) => {
    setImgConvocatoria({'valid': true, 'img' : e.target.files[0]});
  };

  const handleConfirm = () => {
    let sms = isValid();
    if (sms === true) {
      createConvocatoria(information, imgConvocatoria.img);
      setInformation({valid: false, img:{}});
      setImgConvocatoria()
    } else {
      messageToastError(sms);
    }
  };

  const messageToastError = (sms) => {
    toast.error(sms);
  };

  const isValid = () => {
    const {
      fecha_inicio_reserva,
      fecha_limite_reserva,
      fecha_inicio_pago,
      fecha_fin_reserva,
      qr,
    } = information;
    const date = new Date();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const dateCurrently = `${date.getFullYear()}-${month}-${day}`;
    if (!imgConvocatoria.valid) {
      return "Convocatoria no debe estar en blanco";
    }
    if (fecha_inicio_pago === "") {
      return "Fecha Inicio de pagos no debe estar en blanco";
    }
    if (fecha_limite_reserva === "") {
      return "Fecha limite pago no debe estar en blanco";
    }
    if (fecha_inicio_reserva === "") {
      return "Fecha inicio reserve no debe estar en blanco";
    }
    if (fecha_fin_reserva === "") {
      return "Fecha fin reserve no debe estar en blanco";
    }
   
   

    if (
      fecha_inicio_pago < dateCurrently ||
      fecha_inicio_pago > fecha_limite_reserva ||
      fecha_inicio_pago > fecha_inicio_reserva ||
      fecha_inicio_pago > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
    if (
      fecha_limite_reserva < dateCurrently ||
      fecha_limite_reserva < fecha_inicio_pago ||
      fecha_limite_reserva > fecha_inicio_reserva ||
      fecha_limite_reserva > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
    if (
      fecha_inicio_reserva < dateCurrently ||
      fecha_inicio_reserva < fecha_inicio_pago ||
      fecha_inicio_reserva < fecha_limite_reserva ||
      fecha_inicio_reserva > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
    if (
      fecha_fin_reserva < dateCurrently ||
      fecha_fin_reserva < fecha_inicio_pago ||
      fecha_fin_reserva < fecha_limite_reserva ||
      fecha_fin_reserva < fecha_inicio_reserva
    ) {
      return "Revise las fechas";
    }
    return true;
  };

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Reserva</h5>
      </Modal.Header>
      <Modal.Body>
          <InputGroup>
            <label className="information__form-label" htmlFor="convocatoria">
              Convocatoria *
            </label>
            <Form.Control
              type="file"
              onChange={handleOnChangeFile}
              name="imgConvocatoria"
            />
          </InputGroup>

        <InputGroup>
          <label
            className="information__form-label"
            htmlFor="fecha_inicio_pago"
          >
            Fecha Inicio de Pagos *
          </label>
          <Form.Control
            type="date"
            id="fecha_inicio_pago"
            value={information.fecha_inicio_pago}
            onChange={handleOnChange}
            name="fecha_inicio_pago"
          />
        </InputGroup>

        <InputGroup>
          <label
            className="information__form-label"
            htmlFor="fecha_limite_reserva"
          >
            Fecha Limite de Pago *
          </label>
          <Form.Control
            type="date"
            id="fecha_limite_reserva"
            value={information.fecha_limite_reserva}
            onChange={handleOnChange}
            name="fecha_limite_reserva"
          />
        </InputGroup>

        <InputGroup>
          <label
            className="information__form-label"
            htmlFor="fecha_inicio_reserva"
          >
            Fecha Inicio Reserva *
          </label>
          <Form.Control
            type="date"
            id="fecha_inicio_reserva"
            value={information.fecha_inicio_reserva}
            onChange={handleOnChange}
            name="fecha_inicio_reserva"
          />
        </InputGroup>

        <InputGroup>
          <label
            className="information__form-label"
            htmlFor="fecha_fin_reserva"
          >
            Fecha Fin Reserva *
          </label>
          <Form.Control
            type="date"
            id="fecha_fin_reserva"
            value={information.fecha_fin_reserva}
            onChange={handleOnChange}
            name="fecha_fin_reserva"
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn-main btn-main__red"
          onClick={() => onHide(false)}
        >
          Cancelar
        </button>
        <button className="btn-main btn-main__green" onClick={handleConfirm}>
          Enviar
        </button>
      </Modal.Footer>
      <Toaster position="top-right" />
    </Modal>
  );
};