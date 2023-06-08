import { useEffect, useState } from "react";
import CustomerClaim from "./claim/CustomerClaim";
import Header from "./Header";
import HomeCustomer from "./home/Home";
import Reserve from "./reserve/Reserve";
import ReserveInfo from "./reserveInfo/ReserveInfo";
import "./customerPage.css";
import { APISERVICE } from "../../services/api.service";
import { Toaster, toast } from "react-hot-toast";
import { placeState } from "./home/TableParking";
import { useSelector } from "react-redux";
export const navigationNames = {
  HOME: "home",
  RESERVAR: "reservar",
  INFORMACION: "informacion",
  SUGERENCIAS: "sugerencias",
};
/* 
const USERID = 3; */
const CustomerPage = () => {
  const [view, setView] = useState(navigationNames.HOME);
  const [information, setInformation] = useState({});
  const [tarifas, setTarifas] = useState([]);
  const [placeNumber, setPlaceNumber] = useState();
  const [infoReserve, setInfoReserve] = useState({})
  const [dates, setDates] = useState({})
  const USERID = useSelector(store => store.user.id);
  const [parkingInfo, setParkingInfo] = useState({});
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getInformation();
    getTarifas();
    getInfoReserve();
    getInfoParking();
    getPlaces();
  }, []);

  const getInfoReserve = async () => {
    const url = 'reserva/get-customer-reserve/?'
    const params = `idCustomer=${USERID}`
    const { success, infoReserve} = await APISERVICE.get(url, params);
    if(success){
      setInfoReserve(infoReserve);
    }
  }

  const getInformation = async () => {
    const url = "informacion/";
    const { success, information, dates } = await APISERVICE.get(url);
    if (success) {
      setDates(dates);
      setInformation(information);
    } else {
    }
  };

  const getTarifas = async () => {
    const url = "tarifa/get-tarifa-all";
    const { success, tarifas } = await APISERVICE.get(url);
    if (success) {
      setTarifas(tarifas);
    } else {
    }
  };

  const sendClaim = async (sms) => {
    const url = "sugerencia/create-claim/?";
    const params = `idCustomer=${USERID}`;
    const body = {
      cliente_id: USERID,
      mensaje: sms,
    };
    const { success, message } = await APISERVICE.post(body, url, params);
    if (success) {
      messageToastSuccess(message);
      setView(navigationNames.HOME)
    }
  };

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

  const reserve = async ( info ) => {
    const url = "reserva/create?";
    
    const fd = new FormData();
    const body = {
      estado: 'pendiente',
      plaza_id: placeNumber.id,
      tarifa_id: info.tiempo,
      cliente_id: USERID, //LLENAR CUANDO SE IMPLEMENTE LOGIN
      estadoPlaza: placeState.SOLICITADO,
      tipo_pago: info.pago,
      couta: info.couta, //si puso la opcion de pagar en coutas
      monthsPaid: info.meses,
      total: info.total,
      fecha_fin:  info.dateEnd,
      cantidad: info.cantidad,
    }

    fd.append("data", JSON.stringify(body));
    fd.append("img", info.comprobante)
    const { success, reserve, message} = await APISERVICE.postWithImage(fd, url);
    if(success){
      getInfoReserve();
      getPlaces();
      setView(navigationNames.HOME);
      messageToastSuccess(message)
    }else{

    }
    console.log(info)
  };

  const payFee = async (infoPayment, idReserve, isQr) => {
    const url = 'pago/pay-fee/?';
    const params = `idReserve=${idReserve}`
    const data = {
      nro_cuotas_pagadas: Number(infoPayment.nroMeses),
      reserva_id: idReserve,
      total: infoPayment.total,
      estado: infoPayment.estado,
      tipo_pago: isQr ? 'qr' : 'efectivo'
    }

    const fd = new FormData();
    fd.append('data', JSON.stringify(data));
    infoPayment.comprobante ? fd.append('img', infoPayment.comprobante) : ''
    const { success, message} = await APISERVICE.postWithImage(fd, url, params);
    if(success){
      getInfoReserve();
      messageToastSuccess(message);
    }
  }
  const getInfoParking = async () => {
    const url = "parqueo/get-info-parking";
    const { success, parking } = await APISERVICE.get(url);
    
    if (success) {
      setParkingInfo(parking);
    } else {
    }
  };
  const getPlaces = async () => {
    const url = "plaza/get-places?";
    const { success, places } = await APISERVICE.get(url);
    if (success) {
      setPlaces(places);
    } else {
    }
  };


  return (
    <>
      <Header setView={setView} />
      <div className="contenedor">
        {view === navigationNames.HOME && (
          <HomeCustomer
            information={information}
            setPlaceNumberGlobal={setPlaceNumber}
            setView={setView}
            infoReserve={infoReserve}
            parkingInfo={parkingInfo}
            places={places}
          />
        )}
        {view === navigationNames.RESERVAR && (
          <Reserve
            tarifas={tarifas}
            information={information}
            placeNumber={placeNumber}
            reserve={reserve}
            setView={setView}
            dates={dates}
          />
        )}
        {view === navigationNames.INFORMACION && 
        <ReserveInfo infoReserve={infoReserve} setView={setView} information={information} payFee={payFee}/>
        }
        {view === navigationNames.SUGERENCIAS && (
          <CustomerClaim sendClaim={sendClaim} />
        )}
      </div>
      <Toaster/>
    </>
  );
};
export default CustomerPage;
