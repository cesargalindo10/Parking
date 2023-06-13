import { useEffect, useState } from "react";
import { InputGroup, Modal, Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  fecha_inicio_pago: "",
  fecha_limite_reserva: "",
  fecha_inicio_reserva: "",
  fecha_fin_reserva: "",
};

const date = new Date();
const month =
  date.getMonth() + 1 > 9
    ? date.getMonth() + 1
    : "0" + (date.getMonth() + 1);
const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
const dateCurrently = `${date.getFullYear()}-${month}-${day}`;

export const ModalConvocatoria = ({ show, onHide, createConvocatoria, convocatorias}) => {
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
   
    
    /* if(convocatorias.length > 0 && dateCurrently < convocatorias[0].fecha_fin_reserva){
      return "Ya existe una convocatoria";
    }

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
    } */
   
    let newDate = getDataPlusSevenDays(fecha_inicio_pago);
    console.log(newDate)
    if (
      newDate < dateCurrently ||
      newDate > fecha_limite_reserva ||
      newDate > fecha_inicio_reserva ||
      newDate > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
     newDate = getDataPlusSevenDays(fecha_limite_reserva);
    if (
      newDate < dateCurrently ||
      newDate < fecha_inicio_pago ||
      newDate > fecha_inicio_reserva ||
      newDate > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
     newDate = getDataPlusSevenDays(fecha_inicio_reserva);
    if (
      newDate < dateCurrently ||
      newDate < fecha_inicio_pago ||
      newDate < fecha_limite_reserva ||
      newDate > fecha_fin_reserva
    ) {
      return "Revise las fechas";
    }
     newDate = getDataPlusSevenDays(fecha_fin_reserva);
    if (
      newDate < dateCurrently ||
      newDate < fecha_inicio_pago ||
      newDate < fecha_limite_reserva ||
      newDate < fecha_inicio_reserva
    ) {
      return "Revise las fechas";
    }
    return true;
  };

  const getDataPlusSevenDays = (dateToModified) => {
     
    let dayFilter = dateToModified.slice(8,10)
    let monthFilter = dateToModified.slice(5,7);
    let yearFilter = date.getFullYear();
    
    if(Number(dayFilter) + 6 > 30){
      dayFilter = Number( dayFilter) + 6 - 30;      
      dayFilter = dayFilter < 10 ? '0' + dayFilter : dayFilter

      if(Number(monthFilter) + 1 > 12){
        monthFilter = '01';  
        yearFilter = date.getFullYear() + 1;
      }else{
        monthFilter = Number(monthFilter) + 1;
      monthFilter = monthFilter < 10 ? '0' + monthFilter : monthFilter

      }
      
    }else{
      dayFilter = Number(dayFilter) + 6;
      dayFilter = dayFilter < 10 ? '0' + dayFilter : dayFilter
    }


    return `${yearFilter}-${monthFilter}-${dayFilter}`;
  }

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Reserva</h5>
      </Modal.Header>
      <Modal.Body>
        {
          convocatorias.length > 0 && dateCurrently < convocatorias[0].fecha_fin_reserva &&  <p style={{color: 'red', textAlign: 'center'}}>*Ya existe una convocatoria.</p>
        }
          <InputGroup>
            <label className="information__form-label" htmlFor="convocatoria">
              Convocatoria *
            </label>
            <Form.Control
              type="file"
              onChange={handleOnChangeFile}
              name="imgConvocatoria"
              accept=".pdf"
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
