import {  useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { navigationNames } from "../CustomerPage";
import { Toaster, toast } from "react-hot-toast";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
export const payTypes = {
  EFECTIVO: "efectivo",
  QR: "qr",
};

const initialState = {
  tarifa: 0,
  tiempo: "",
  pago: "",
  comprobante: "",
  couta: false,
  meses: 1,
  cantidad: 0,
  allowFee: false,
  feeName: "",
};
let dateEnd = '';

const Reserve = ({ tarifas, information, placeNumber, reserve, setView, dates, getInfoReserve}) => {
  const [reserveInfo, setReserveInfo] = useState(initialState);

  const handleOnChange = (e) => {
    let tarifa = tarifas.find((tar) => tar.id == e.target.value);
    setReserveInfo({
      ...reserveInfo,
      [e.target.name]: e.target.value,
      feeName: tarifa.nombre,
      tarifa: tarifa.costo,
      cantidad: 1,
      allowFee: tarifa.couta ? true : false,
    });
  };

  const handleChangeRadius = (e) => {
    if (e.target.id === "qr") {
      setReserveInfo({ ...reserveInfo, pago: payTypes.QR });
    } else {
      setReserveInfo({ ...reserveInfo, pago: payTypes.EFECTIVO });
    }
  };

  const handleReserve = () => {
    let sms = isValid();
    if(sms === true){
      const dateEnd = calculateDateEnd();
      let total = 0;
      if(reserveInfo.couta){
        total = reserveInfo.meses * (reserveInfo.tarifa / 12).toFixed(0);
      }else{
        total = reserveInfo.tarifa;
      }
      reserve({ ...reserveInfo, total: total, dateEnd: dateEnd});
    }else{
      messageToastError(sms);
    }
  };
  const calculateDateEnd = () => {
    const dateCurrently = new Date();
    const day = dateCurrently.getDate(); 
    const month = dateCurrently.getMonth(); 
    const year = dateCurrently.getFullYear(); 
    const minute = dateCurrently.getMinutes();
    const hour = dateCurrently.getHours();
    const seconds = dateCurrently.getSeconds();
    let newHour = 0;
    let newDate = `${year}-${month + 1}-${day}`
    let newDay = 0;
    let newMonth = 0;
    if(reserveInfo.feeName === 'hora'){
      newHour = hour + Number(reserveInfo.cantidad);
      if(newHour > 23){
        newHour = hour + Number(reserveInfo.cantidad) - 24;
        newDate = `${year}-${month + 1}-${day+ 1}`
      }
      dateEnd =  `${newDate} ${newHour}:${minute}:${seconds}`
    }
    if(reserveInfo.feeName === 'dia'){
      newDay = day + Number(reserveInfo.cantidad - 1);
      if(newDay> 31){
        newDay = day + Number(reserveInfo.cantidad - 1) - 31;
      }
      dateEnd =  `${year}-${month+ 1}-${newDay} 22:00:00`
    }
    if(reserveInfo.feeName === 'mes'){
      newMonth = month + 1 + Number(reserveInfo.cantidad);
      if(newMonth > 12){
        newMonth = month + 1 + Number(reserveInfo.cantidad) - 12;
      }
      dateEnd =  `${year}-${newMonth}-${day} 22:00:00`
    }
    if(reserveInfo.feeName === 'año'){
      dateEnd = dates.fecha_fin_reserva;
    }
  /*   setReserveInfo({
      ...reserveInfo,
      'fechaFin': dateEnd,
    }); */
    return dateEnd;
  }
  const isValid = () => {
    if(reserveInfo.tiempo === ''){
      return 'Seleccione una tarifa'
    }
    if(reserveInfo.pago === ''){
      return 'Seleccione una metodo de pago'
    }
    if(reserveInfo.couta && (reserveInfo.meses > 11 || reserveInfo.meses < 1)){
      return 'Cantidad de meses no permitido'
    }
    if(reserveInfo.pago === payTypes.QR && reserveInfo.comprobante === ''){
      return 'Debe agregar comprobante pago'
    }
    return true;
  }

  const messageToastError = (sms) => {
    toast.error(sms);
  }
  const handleOnChangeFile = (e) => {
    setReserveInfo({ ...reserveInfo, [e.target.name]: e.target.files[0] });
  };

  const handleOnChangeCouta = (e) => {
    setReserveInfo({
      ...reserveInfo,
      [e.target.name]: e.target.checked,
    });
  };

  const handleOnChangeInput = (e) => {
    setReserveInfo({
      ...reserveInfo,
      [e.target.name]: e.target.value,
    });
  };
  /* Modificar la tarifa segun a la cantidad de tiempo */
  const handleOnChangeQuantity = (e) => {
    if(reserveInfo.tiempo !== ''){  
      let tarifa = tarifas.find((tar) => tar.id == reserveInfo.tiempo);
      setReserveInfo({
        ...reserveInfo,
        [e.target.name]: e.target.value,
        tarifa: e.target.value * tarifa.costo,
      });
    }
  };

  return (
    <section className="section">
      <h5 className="mt-3">Reservar</h5>
      <div className="reserve-header">
        <Form.Control
          type="number"
          value={reserveInfo.cantidad}
          name="cantidad"
          min={1}
          onChange={handleOnChangeQuantity}
        />

        <div>
          <label htmlFor="tiempo">Tiempo</label>
          <Form.Select
            style={{ minWidth: "200px" }}
            value={reserveInfo.tiempo}
            name="tiempo"
            onChange={handleOnChange}
          >
            <option value="">Seleccione tarifa</option>
            {tarifas &&
              tarifas.length > 0 &&
              tarifas.map((tar) => (
                <option key={tar.id} value={tar.id}>
                  {tar.nombre}-{tar.costo}Bs
                </option>
              ))}
          </Form.Select>
        </div>
        <div>
          <label htmlFor="tarifa">Tarifa</label>
          <Form.Control
            style={{ minWidth: "55px" }}
            value={reserveInfo.tarifa}
            readOnly
          />
        </div>
      </div>
      {reserveInfo.allowFee && (
        <div className="reserve-coutas">
          <div className="d-flex gap-2">
            <input
              id="coutas"
              type="checkbox"
              name="couta"
              onChange={handleOnChangeCouta}
              checked={reserveInfo.couta}
            />
            <label htmlFor="coutas">
              <span>Desea pagar en coutas?</span>
            </label>
          </div>
          {reserveInfo.couta && (
            <div className="reserve-coutas-detail">
              <p>
                Tiempo de un {reserveInfo.feeName}: coutas de Bs.{" "}
                {(reserveInfo.tarifa / 12).toFixed(1)}/mes
              </p>
              <p>Cuantos meses pagara?</p>
              <Form.Control
                type="number"
                placeholder="numero de meses (1-11)"
                name="meses"
                min={1}
                max={11}
                value={reserveInfo.meses}
                onChange={handleOnChangeInput}
              />
              <p>
                <span>
                  {" "}
                  Total:{" "}
                  {reserveInfo.meses * (reserveInfo.tarifa / 12).toFixed(0)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
      <div className="reserve-body">
        <h5>Selecione un metodo de pago.</h5>
        <div className="reserve-body__types">
          <input
            type="radio"
            name="pago"
            id="efectivo"
            onChange={handleChangeRadius}
          />
          <label htmlFor="efectivo">Pago Efectivo</label>
          <input
            type="radio"
            name="pago"
            id="qr"
            onChange={handleChangeRadius}
          />
          <label htmlFor="qr">Pago Qr</label>
        </div>
        <div className="qr-img">
          {reserveInfo.pago === payTypes.QR && (
            <>
              <img src={`${APIURLIMG}${information.qr}`} alt="foto de qr" />
              <Form.Control
                style={{ margin: "15px 0px" }}
                type="file"
                onChange={handleOnChangeFile}
                name="comprobante"
                accept="image/png, image/jpeg, image/webp"
              />
            </>
          )}
        </div>
      </div>
      <p>Numero de plaza: {placeNumber.numero}</p>
      <button className="btn-main btn-main__purple" onClick={handleReserve}>
        Reservar
      </button>{" "}
      <button
        className="btn-main btn-main__green"
        onClick={() => setView(navigationNames.HOME)}
      >
        Volver
      </button>
      <Toaster/>
    </section>
  );
};
export default Reserve;
