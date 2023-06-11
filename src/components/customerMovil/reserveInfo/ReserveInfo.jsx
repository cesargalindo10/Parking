import { Form } from "react-bootstrap";
import { navigationNames } from "../CustomerPage";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const stateReserve = {
  CANCELADO: "cancelado",
  PENDIENTE: "pendiente",
  PAGADO: "pagado",
};
const initialState = {
  nroMeses: 0,
  total: 0,
  comprobante: "",
  estado: false,
  tipoPago: ''
};

const ReserveInfo = ({ infoReserve, setView, information, payFee, getInfoReserve }) => {
  const [showCompletePayment, setShowCompletePayment] = useState(false);
  const [infoPayment, setInfoPayment] = useState(initialState);
  const [showQr, setShowQr] = useState('');

  useEffect(() => {
    getInfoReserve()
  },[])

  const notExistReserve = (
    <>
      <h5 className="mt-3">Informacion de reserva de Parqueo</h5>
      <p>No existe ninguna reserva aun!</p>
      <button
        className="btn-main btn-main__purple"
        onClick={() => setView(navigationNames.HOME)}
      >
        Reservar
      </button>
    </>
  );

  const calculateBalance = () => {
    const totalPaid = infoReserve.pagos.reduce((ac, val) => val.estado ?  ac + val.total: ac, 0);
    const balance = infoReserve.tarifa.costo - totalPaid;
    return balance < 0 ? 0 : balance;
  };

  const calculateNroCoutas = () => {
    const nroCoutasPagadas = infoReserve.pagos.reduce(
      (ac, val) => val.estado ?  ac + val.nro_cuotas_pagadas: ac,
      0
    );
    return nroCoutasPagadas;
  };

  const handleOnChangeFile = (e) => {
    setInfoPayment({ ...infoPayment, [e.target.name]: e.target.files[0] });
  };

  const handleSendPayment = () => {
    let sms = isValid();
    if(sms === true){
      payFee(infoPayment, infoReserve.id, showQr)
      setView(navigationNames.HOME)
    }else{
      messageToastError(sms);
    }
  }
  const isValid = () => {
    if(infoPayment.nroMeses > 11 || infoPayment.nroMeses < 1 ){
      return 'Numero de meses incorrecto.'
    }
    if(showQr === ''){
      return 'Elija un metodo de pago.'
    }
    if(showQr && infoPayment.comprobante === ''){
      return 'Debe agregar comprobante pago'
    }
    return true;
  }
  const messageToastError = (sms) => {
    toast.error(sms);
  }

  const handleOnChange = (e) => {
    let total = ((infoReserve.tarifa.costo/12) * e.target.value).toFixed(0); 
    setInfoPayment({...infoPayment, [e.target.name]: e.target.value, 'total': total })
  }
  return (
    <div>
      {infoReserve && Object.keys(infoReserve).length > 0 ? (
        <div className="mb-3">
          <div
            className={
              infoReserve.estado === stateReserve.PAGADO
                ? "state-reserve approved"
                : "state-reserve cancel"
            }
          >
            {
              infoReserve.estado === 'pendiente' && infoReserve.couta ?
              <p>Estado de Reserva: <span> PAGO COUTA </span></p>
              :
              <p>Estado de Reserva: <span> {infoReserve.estado} </span></p>
            }
          </div>
          <div className="info-reserve">
            <h5>Informacion de reserva de parqueo</h5>
            <label htmlFor="">Numero de plaza</label>
            <Form.Control
              value={infoReserve.plaza.numero}
              placeholder="Numero de parqueo asignado"
              readOnly
            />
            <label htmlFor="">Fecha De Inicio</label>
            <Form.Control
              placeholder="Fecha de inicio:"
              value={infoReserve.fecha_inicio}
              readOnly
            />
            <label htmlFor="">Fecha de Finalizacion</label>
            <Form.Control
              placeholder="Fecha de Finalizacion:"
              value={infoReserve.fecha_fin}
              readOnly
            />
            <label htmlFor="">Tarifa Elegida</label>
            <Form.Control
              placeholder="Fecha de Finalizacion:"
              value={infoReserve.tarifa.nombre}
              readOnly
            />
            <label htmlFor="">Precio</label>
            <Form.Control
              placeholder="Precio"
              value={infoReserve.tarifa.costo * infoReserve.cantidad}
              readOnly
            />
          </div>
          {/* Solo para coutas */}
          {infoReserve.couta && infoReserve.estado !== stateReserve.PAGADO? (
            <div className="info-reserve__pay">
              <h5>Informacion del pago.</h5>
              <p>Coutas Pagadas: {calculateNroCoutas()}</p>
              <p>Coutas Pendientes: {12 - calculateNroCoutas()}</p>
              <p>Saldo: {calculateBalance()} </p>
              <div className="d-flex gap-2 align-items-center">
                <input
                  style={{margin: '15px 0px'}}
                  type="checkbox"
                  checked={showCompletePayment}
                  name="showCompletePayment"
                  onChange={(e) => setShowCompletePayment(e.target.checked)}
                />
                <label htmlFor="">Desea completar el pago?</label>
              </div>
              {showCompletePayment && (
                <div className="payment-fee">
                  <label htmlFor="">Escriba el nro de meses que pagara</label>
                  <Form.Control type="number" name="nroMeses" value={infoPayment.nroMeses} onChange={handleOnChange} min={1}  max={11}/>
                  <label htmlFor="">Total</label>
                  <Form.Control type="text" name="total" value={infoPayment.total} readOnly />

                  <h5>Seleccione un tipo de pago</h5>
                  <div className="reserve-body__types">
                    <input
                      type="radio"
                      name="tipoPago"
                      onClick={() => setShowQr(false)}
                    />
                    <label htmlFor="">Efectivo</label>
                    <input
                      type="radio"
                      name="tipoPago"
                      onClick={() => setShowQr(true)}
                    />
                    <label htmlFor="">Qr</label>
                  </div>

                  {showQr && (
                    <>
                      <img
                        src={`${APIURLIMG}${information.qr}`}
                        alt="foto de qr"
                      />
                      <Form.Control
                        style={{ margin: "15px 0px" }}
                        type="file"
                        onChange={handleOnChangeFile}
                        name="comprobante"
                      />
                    </>
                  )}
                  <button className="btn-main btn-main__purple" onClick={handleSendPayment}>Enviar</button>
                </div>
              )}

              {}
            </div>
          ) : (
            <div>
              <p>Pago completado con exito!</p>
            </div>
          )}
        </div>
      ) : (
        <>{notExistReserve}</>
      )}
      <Toaster/>
    </div>
  );
};
export default ReserveInfo;
