import { useEffect, useState } from "react";
import ParkingGrilla from "./ParkingGrilla";
import { APISERVICE } from "../../services/api.service";
import "./plazas.css";
import ModalPlaza from "./ModalNewReserve";
import ModalShowRequest from "./ModalShowRequest";
import ModalNewReserve from "./ModalNewReserve";
import { placeState } from "../customerMovil/home/TableParking";

const Plazas = () => {
  const [parkingInfo, setParkingInfo] = useState({});
  const [places, setPlaces] = useState([]);
  const [showModalReserve, setShowModalReserve] = useState(false);
  const [infoReserve, setInfoReserve] = useState({});
  const [tarifas, setTarifas] = useState([]);
  const [showModalNewReserve, setShowModalNewReserve] = useState(false);
  const [information, setInformation] = useState({})
  const [customers, setCustomers] = useState()
  const [dates, setDates] = useState({})
  const [place, setPlace] = useState({})
  useEffect(() => {
    getInfoParking();
    getPlaces();
    getTarifas();
    getInformation()
    getCustomers()
  }, []);

  const getInfoParking = async () => {
    const url = "parqueo/get-info-parking";
    const { success, parking } = await APISERVICE.get(url);
    
    if (success) {
      setParkingInfo(parking);
    } else {
    }
  };

  const getCustomers = async (page = 1) => {
    let url = "cliente/?";
    let params = `page=${page}`;
    const {success, pageInfo} = await APISERVICE.get(url, params);
    if (success) {
      setCustomers(pageInfo.customers);
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

  const getInfoReserve = async (idPlaza) => {
    const url = "reserva/get-info-reserve-by-plaza/?";
    const params = `idPlaza=${idPlaza}`;
    const { success, infoReserve } = await APISERVICE.get(url, params);
    if (success) {
      setInfoReserve(infoReserve);
    }
    console.log(infoReserve);
    setShowModalReserve(true);
  };

  const getTarifas = async () => {
    const url = "tarifa/get-tarifa-all";
    const { success, tarifas } = await APISERVICE.get(url);
    if (success) {
      setTarifas(tarifas);
    } else {
    }
  };

  const getInformation = async () => {
    const url = "informacion/";
    const { success, dates, information } = await APISERVICE.get(url);
    if (success) {
      setInformation(information);
      setDates(dates)
    } else {
    }
  };
  const reserve = async ( info ) => {
    const url = "reserva/create?";
    
    const fd = new FormData();
    const body = {
      estado: 'pendiente',
      plaza_id: place.id,
      tarifa_id: info.tiempo,
      cliente_id: info.idCustomer, //LLENAR CUANDO SE IMPLEMENTE LOGIN
      estadoPlaza: placeState.SOLICITADO,
      tipo_pago: info.pago,
      couta: info.couta, //si puso la opcion de pagar en coutas
      monthsPaid: info.meses,
      total: info.total,
      fecha_fin:  info.fechaFin,
      cantidad: info.cantidad
    }
    fd.append("data", JSON.stringify(body));
    fd.append("img", info.comprobante)
    const { success, reserve } = await APISERVICE.postWithImage(fd, url);
    if(success){
      setShowModalNewReserve(false);
      getPlaces();
    }else{

    }
  };

  return (
    <div className="parking">
      <h5>Parqueo Nro: 1</h5>
      <div className="d-flex">
        <p>Purpura: Reserva</p>
        <p>Rojo: Asignado</p>
        <p>Naranfa: camino</p>
      </div>
      <ParkingGrilla
        parkingInfo={parkingInfo}
        places={places}
        getInfoReserve={getInfoReserve}
        setShowModalNewReserve={setShowModalNewReserve}
        setPlace={setPlace}
      />
      <ModalShowRequest
        show={showModalReserve}
        onHide={setShowModalReserve}
        infoReserve={infoReserve}
      />
      <ModalNewReserve
        show={showModalNewReserve}
        onHide={setShowModalNewReserve}
        tarifas={tarifas}
        information={information}
        customers={customers}
        dates={dates}
        reserve={reserve}
      />
    </div>
  );
};
export default Plazas;
