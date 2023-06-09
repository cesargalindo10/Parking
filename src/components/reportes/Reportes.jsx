import { useState,useEffect } from "react";
import Header from "../global/header/Header";
import Buscar from "./Buscar";
import "./ReportesStyle.css";
import TableClient from "./TableClient";
import { APISERVICE } from "../../services/api.service";
import { useSelector } from "react-redux";
export default function Reportes() {
  const [placaNumber, setPlacaNumber] = useState('');
  const [clientInformation, setClientInformation] = useState({});
  const [registro, setRegistro] = useState({});

  const getClient = async () => {
    const url = "registro/get-client?";
    const params = `placa=${placaNumber}`;
    const { success, client, register } = await APISERVICE.get(url, params);
    if (success) {
      console.log(register)
      setClientInformation(client);
      setRegistro(register)
    } else {
      setClientInformation([]);
    }
  };
  const user = useSelector(store=>store.user);

  const realiceRegister = async (cliId) => {
    const url = "registro/create";
    const params = ``;
    let body={}
    if(!registro.fecha_ingreso && !registro.fecha_salida){
       body = {
        usuario_id:user.id,
        fecha_ingreso:registro.fecha_ingreso?'':new Date,
        fecha_salida:'',
        cliente_id: clientInformation.id,
      };

    }else{
      body = {
        usuario_id:3,
        fecha_ingreso:registro.fecha_ingreso?'':new Date,
        fecha_salida:registro.fecha_salida?'':new Date,
        cliente_id: clientInformation.id,
      };
    }
console.log(body)
    const { success, message } = await APISERVICE.post(body, url, params);
    if (success) {
      setClientInformation([]);
      setRegistro([]);
      setPlacaNumber('')
    }
  };

useEffect(()=>{
},[,])
  return (
    <div >
      <Header />
      <div className="container">
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
      />
      </div>

    </div>
  );
}
