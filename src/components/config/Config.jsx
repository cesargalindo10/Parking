import { useEffect, useState } from "react";
import GridParking from "./GridParking";
import { APISERVICE } from "../../services/api.service";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { resetConfig } from "../../redux/state/config";
import { useNavigate } from "react-router-dom";
//import "./styles/Config.css";

export default function Config() {
  const [modalShow, setModalShow] = useState(false);
  const [plazaUpdate, setPlazaUpdate] = useState({});
  const [parkins, setParkins] = useState([]);
  const [pageInfo, setPageInfo] = useState(1);
  const [plazas, setPlazas] = useState([]);

  const idParking = useSelector((state) => state.config);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getParkins = async (page = 1) => {
    let url = "parqueo/?";
    let params = `page=${page}`;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setParkins(response.pageInfo.parkins[0]);
      setPageInfo(response.pageInfo);
      console.log(response);
    }
  };
  const getPlazas = async () => {
    let url = "plaza/get-plaza?";
    let params = `idParking=${idParking.id}`;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setPlazas(response.plazas);
      console.log(response);
    }
  };
  const createPlaza = async (plaza) => {
    let url = "plaza/create-plaza";
    const response = await APISERVICE.post(plaza, url);
    if (response.status === 201) {
      console.log("Usuario agregado exitosamente!");
    }
    getPlazas();
  };
  const updatePlaza = async (plaza) => {
    let url = `plaza/update?`;
    let params = `id=${plaza.id}`;
    const response = await APISERVICE.post(plaza, url, params);
    if (response.status === 200) {
    }
    getPlazas();
  };
const handleTerminar=()=>{
    dispatch(resetConfig())
    navigate('/parqueo')
}
  console.log(plazaUpdate);
  useEffect(() => {
    getParkins();
    getPlazas();
  }, []);

  return (
    <div className="container-config">
      <div className="d-flex justify-content-between">
        <h2 className="color-main mt-2 mb-4">Configuracion Parqueo</h2>
        <button className="mt-4 btn-main btn-main__purple mb-3" onClick={handleTerminar} >Terminar</button>
      </div>

      <GridParking plazas={plazas} parkins={parkins} setModalShow={setModalShow} setPlazaUpdate={setPlazaUpdate} />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createPlaza={createPlaza}
        plazaUpdate={plazaUpdate}
        setPlazaUpdate={setPlazaUpdate}
        updatePlaza={updatePlaza}
      />
    </div>
  );
}
