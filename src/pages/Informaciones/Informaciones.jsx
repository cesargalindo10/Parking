import { useState } from "react";
import PublicHeader from "../../components/global/header/PublicHeader";
import { useEffect } from "react";
import { APISERVICE } from "../../services/api.service";
//import "./info.css";
import { Button } from "react-bootstrap";
import FileDownload from "react-file-download";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
export default function Informaciones() {
  const [conv, setConv] = useState([]);
  const [dates, setDates] = useState([]);
  const [convocatoria, setConvocatoria] = useState({});
  const getConv = async () => {
    let url = "informacion";
    let params = ``;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setConv(response.information);
      setDates(response.dates);
    }
  };
  const getConvocatoria = async () => {
    const url = "convocatoria/get-convocatoria";
    const { success, convocatoria } = await APISERVICE.get(url);
    if (success) {
      setConvocatoria(convocatoria);
    }
  };
  const handleDownload = () => {
    FileDownload(APIURLIMG, convocatoria.convocatoria);
  };
  useEffect(() => {
    getConv();
    getConvocatoria();
  }, []);
  return (
    <div>
      <PublicHeader />
      <div className="informacion">
        <div className="info-content">
          <div>
            <h5 className="">Horarios de Atencion</h5>
            <p className="">{conv.atencion}</p>
          </div>
          <div>
            <h5>Contacto</h5>
            <p>{conv.telefono}</p>
          </div>
        </div>
        <h5 className="">Convocatoria y Publicaciones</h5>
        <div className="convocatoria">
        <div className="pdf-container">
          {
            Object.keys(convocatoria).length > 0 && 
          <object
          data={`${APIURLIMG}${convocatoria.convocatoria}`}
          type="application/pdf"
          className="pdf-convocatoria"
          ></object>
        }
        </div>
         
          <div className="contenido">
            <p>
              {convocatoria.fecha_inicio_reserva} | {convocatoria.fecha_fin_reserva} | Departamento de Informatica
              y Sistemas
            </p>
            <Button onClick={handleDownload} variant="secondary">
              Descargar
            </Button>
          </div>
        </div>

      
      </div>
    </div>
  );
}
