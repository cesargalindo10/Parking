import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function ParkingTableRow({ parkin, deleteParking, setParkingUpdate, setModalShow }) {
  const navigate = useNavigate()

  const handleEditUser = () => {
    setParkingUpdate(parkin);
    setModalShow(true);
  };
  const handleDeleteCustomer = () => {
    console.log(parkin.id);
    deleteParking(parkin.id);
  };
const handleConfig = () =>{
  return navigate('/config')
}
  return (
    <tr>
      <td>{parkin.nombre}</td>
      <td>{parkin.nro_plazas}</td>
      <td>{parkin.plazas_disponibles}</td>
      <td>{parkin.plazas_ocupadas}</td>
      <td className="col-2" style={{ textAlign: "center" }}>
        <button className="btn-user" onClick={() => handleEditUser()}>
          <FiEdit className="icon" />
        </button>
        <button className="btn-user" onClick={() => handleDeleteCustomer()}>
          <BsFillTrashFill className="icon ms-3" />
        </button>
        <button className="btn-user" onClick={()=>handleConfig()}>
          <AiFillSetting className="icon ms-3" />
        </button>
      </td>
    </tr>
  );
}
