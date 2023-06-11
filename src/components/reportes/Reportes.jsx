import { useState,useEffect } from "react";
import Header from "../global/header/Header";
import Buscar from "./Buscar";
import "./ReportesStyle.css";
import TableClient from "./TableClient";
import { APISERVICE } from "../../services/api.service";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import TableRecord from "./TableRecord";
export default function Reportes() {
  const [placaNumber, setPlacaNumber] = useState('');
  const [clientInformation, setClientInformation] = useState({});
  const [registro, setRegistro] = useState({});
  const [records, setRecords] = useState([])
  const [parking, setParking] = useState({})
  const getClient = async () => {
    const url = "registro/get-client?";
    const params = `placa=${placaNumber}`;
    const { success, customer, record , parqueo} = await APISERVICE.get(url, params);
    if (success) {
      setClientInformation(customer);
      setRegistro(record)
      setParking(parqueo)
    } else {
      setClientInformation([]);
    }
  };
  const user = useSelector(store=>store.user);

  const realiceRegister = async (cliId) => {
    const url = "registro/create";
    const params = ``;
  
    const body = {
      usuario_id: user.id,
      cliente_id: cliId
    }
    const { success, message } = await APISERVICE.post(body, url, params);
    if (success) {
      messageToastSuccess(message);
      setClientInformation([]);
      setRegistro([]);
      setPlacaNumber('')
      getRecords();
    }else{
      messageToastError(message);
    }
  };

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

const messageToastError = (sms) => {
    toast.error(sms);
  }
  
  const getRecords = async () => {
    const url = 'registro/get-records';
    const { success, records} = await APISERVICE.get(url) ;
    if(success){
      setRecords(records)
    }
   }

useEffect(()=>{
  getRecords();
},[])
  return (
    <div >
      <Header />
      <div className="container">
      <h5 className="mt-3">Agregar registro</h5>
      <Buscar
        placaNumber={placaNumber}
        setPlacaNumber={setPlacaNumber}
        getClient = {getClient}
        setClientInformation={setClientInformation}
      />
      <TableClient 
      clientInformation={clientInformation}
      realiceRegister={realiceRegister} 
      registro={registro}
      parking={parking}
      />
      <h5 className="mt-5">Registros</h5>
      <TableRecord records={records}/>
      </div>
    <Toaster/>
    </div>
  );
}
