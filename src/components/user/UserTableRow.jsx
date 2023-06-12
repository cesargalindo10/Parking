import {FiEdit} from "react-icons/fi"
import {BsFillTrashFill} from "react-icons/bs"
export default function UserTableRow({   
    user,
    deleteUser,
    setUserUpdate,
    setModalShow,
  }) {
  const handleEditUser = () => {
    setUserUpdate(user);
    setModalShow(true);

    
  };
  const handleDeleteCustomer = () => {
    console.log(user.id)
    deleteUser(user.id)
  };

  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.email}</td>
      <td>{user.rol}</td>
      <td className="col-2" style={{ textAlign: "center" }}>
        <button className="btn-user" onClick={() => handleEditUser()}><FiEdit className="icon" /></button>
        <button className="btn-user" onClick={() => handleDeleteCustomer()}><BsFillTrashFill className="icon ms-4"/></button>
      </td>
    </tr>
  );
}
