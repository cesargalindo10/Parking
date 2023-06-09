import { useEffect } from "react";

const Buscar = ({ placaNumber, setPlacaNumber, getClient, setClientInformation }) => {


  const handleInputChange = (e) => {
    setPlacaNumber(e.target.value);
  };
  const handleClear = () => {
    setClientInformation([]);
    setPlacaNumber('');
  };
  useEffect(()=>{
},[])
  return (
    <div className="seeker">
      <input type="text" placeholder="numero de placa"  value={placaNumber} onChange={handleInputChange} />
      <button className="btn-main btn-main__purple" onClick={() => getClient()}>
        Buscar
      </button>
      <button className="btn-main btn-main__red" onClick={handleClear}>
        Limpiar
      </button>
    </div>
  );
};
export default Buscar;
