import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createConfig } from "../../redux/state/config";
export default function ParkingTableRow({ parkin, deleteParking, setParkingUpdate, setModalShow }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditUser = () => {
    setParkingUpdate(parkin);
    setModalShow(true);
  };
  const handleDeleteCustomer = () => {
    console.log(parkin.id);
    deleteParking(parkin.id);
  };
  const handleConfig = () => {
    let parkingConf = {
      nombre:parkin.nombre,
      id: parkin.id
    };
    dispatch(createConfig(parkingConf));
    return navigate("/config");
  };

  const calculatePlacesEnables = () => {
    let res;
    if(parkin){
      res = parkin.plazas.reduce( (ac, val) =>  val.habilitado ? ac + 1: ac, 0);
    }
    return res;
  }
  return (
    <tr>
      <td>{parkin.nombre}</td>
      <td>{parkin.nro_filas * parkin.nro_columnas}</td> 
      <td>{calculatePlacesEnables()}</td> 
      <td>{parkin.descripcion}</td>
      <td className="col-2" style={{  whiteSpace: 'nowrap' }}>
        <button className="btn-user" onClick={() => handleEditUser()}>
          <FiEdit className="icon" />
        </button>
        <button className="btn-user" onClick={() => handleDeleteCustomer()}>
          <BsFillTrashFill className="icon ms-3" />
        </button>
        <button className="btn-user" onClick={() => handleConfig()}>
          <AiFillSetting className="icon ms-3" />
        </button>
      </td>
    </tr>
  );
}
