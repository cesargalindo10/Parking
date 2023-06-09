import { useEffect, useState } from "react";
import ParkingGrilla from "./ParkingGrilla";
import { APISERVICE } from "../../services/api.service";
import "./plazas.css";
import ModalPlaza from "./ModalNewReserve";
import ModalShowRequest from "./ModalShowRequest";
import ModalNewReserve from "./ModalNewReserve";
import { placeState } from "../customerMovil/home/TableParking";
import Parkings from "./Parkings";
import { Toaster, toast } from "react-hot-toast";

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
  const [parkings, setParkings] = useState([])
  useEffect(() => {
    getInfoParking();
    getParkings();
    /* getPlaces(); */
    getTarifas();
    getInformation()
    getCustomers()
  }, []);

  const getParkings = async () => {
    const url = "parqueo/get-parkings";
    const { success, parkings } = await APISERVICE.get(url);
    if (success) {
      setParkings(parkings);
    } else {
    }
  }

  const getInfoParking = async ( idParking = 0) => {
    if(idParking !== 0){
      const url = "parqueo/get-info-parking/?";
      const params = `idParking=${idParking}`;
      const { success, parking, places } = await APISERVICE.get(url, params);
      if (success) {
        setParkingInfo(parking);
        setPlaces(places)
      } else {
      }
    }
  };

  const getCustomers = async (page = 1) => {
    let url = "cliente/get-customers?";
    let params = `page=${page}`;
    const {success, customers} = await APISERVICE.get(url, params);
    if (success) {
      setCustomers(customers);
    }
  };
 /*  const getPlaces = async () => {
    const url = "plaza/get-places?";
    const { success, places } = await APISERVICE.get(url);
    if (success) {
      setPlaces(places);
    } else {
    }
  }; */

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
      getInfoParking(parkingInfo.id)
    }else{

    }
  };

  return (
    <div className="parking">
     {/*  <h5>Parqueo Nro: 1</h5> */}
     <Parkings parkings={parkings} getInfoParking={getInfoParking}/>
      <div className="d-flex parking-header">
        <p> <span className="btn-main btn-parking__purple"> Solicitud </span></p>
        <p> <span className="btn-main btn-parking__red">Asignado </span></p>
        <p> <span className="btn-main btn-parking__orange"> Camino </span></p>
        <p> <span className="btn-main btn-parking__green"> Disponible </span></p>
      </div>
      {parkingInfo && Object.keys(parkingInfo).length > 0 &&
        <ParkingGrilla
        parkingInfo={parkingInfo}
        places={places}
        getInfoReserve={getInfoReserve}
        setShowModalNewReserve={setShowModalNewReserve}
        setPlace={setPlace}
        />
      }
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
      <Toaster/>
    </div>
  );
};
export default Plazas;
