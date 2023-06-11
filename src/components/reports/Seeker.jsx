import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  fechaInicio: "",
  fechaFin: "",
};

const Seeker = ({ getReports }) => {
  const [infoSearchSales, setInfoSearchSales] = useState(initialState);

  const handleOnChange = (e) => {
    setInfoSearchSales({ ...infoSearchSales, [e.target.name]: e.target.value });
    //setInfoSeeker(infoSearchSales);
  };

  const handleSearch = () => {
    if(isValidDate()){
        getReports(infoSearchSales)
    }
  };

  const isValidDate = () => {
    if(infoSearchSales.fechaInicio === ''){
        messageToast('Fecha inicio vacia')
        return false;
    }
    if(infoSearchSales.fechaFin === ''){
        messageToast('Fecha fin vacia')
        return false;
    }else{
        if( infoSearchSales.fechaInicio > infoSearchSales.fechaFin){
            messageToast('Fecha fin incorrecta!')
            return false;
        }
    }
    return true;
  }
  const messageToast = (sms) => {
    toast.error(sms)
  }

  return (
    <div className="report-header-seekers">
      <div className="d-flex flex-column">
        <label htmlFor="">Fecha Inicio</label>
        <input
          name="fechaInicio"
          value={infoSearchSales.fechaInicio}
          type="date"
          onChange={handleOnChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="">Fecha Fin</label>
        <input
          name="fechaFin"
          value={infoSearchSales.fechaFin}
          type="date"
          onChange={handleOnChange}
        />
      </div>
  
      <div className="d-flex flex-column justify-content-end">
        <button className="btn-main btn-main__purple" on onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};
export default Seeker;