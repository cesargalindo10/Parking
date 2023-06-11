import {FiEdit} from "react-icons/fi"
import {BsFillTrashFill} from "react-icons/bs"
export default function RolTableRow({   
    rol,
    deleteRol,
    }) {
  const handleEditUser = () => {
    //setUserUpdate(user);
    //setModalShow(true);
    
  };
  const handleDeleteCustomer = () => {
    console.log(rol.name)
    deleteRol(rol.name)
  };
  return (
    <tr>
      <td>{rol.description}</td>
      <td>{rol.type}</td>
      <td className="col-2" style={{ textAlign: "center" }}>
        <button className="btn-user" onClick={() => handleDeleteCustomer()}><BsFillTrashFill className="icon ms-4"/></button>
      </td>
    </tr>
  );
}
