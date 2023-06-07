import { useState } from "react";
import PublicHeader from "../../components/global/header/PublicHeader";
import { useEffect } from "react";
import { APISERVICE } from "../../services/api.service";
import "./info.css";
import { Button } from "react-bootstrap";
import FileDownload from 'react-file-download';

export default function Informaciones() {
  const [conv, setConv] = useState([]);
  const [dates, setDates] = useState([]);

  const getConv = async () => {
    let url = "informacion";
    let params = ``;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setConv(response.information);
      setDates(response.dates);
      console.log(conv);
    }
  };
  const handleDownload = () => {
    const imageUrl = `http://localhost:8080/upload/`; // URL de la imagen que quieres descargar
    FileDownload(imageUrl, conv.convocatoria);
  };
  useEffect(() => {
    getConv();
  }, []);
  return (
    <div>
      <PublicHeader />
      <div  className="container">
        <h3 style={{color:"#ca3a3a"}}>Horarios de Atencion</h3>
        <h4 className="ms-5">{conv.atencion}</h4>
        <h3 className="mt-4">Convocatoria y Publicaciones</h3>
        <div className="convocatoria">
          <img className="img-conv" src={`http://localhost:8080/upload/${conv.convocatoria}`} alt="" />
          <div className="contenido">
            <p>{dates.fecha_pub_conv} | Departamento de Informatica y Sistemas</p>
            <Button onClick={handleDownload} variant="secondary" >Descargar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
