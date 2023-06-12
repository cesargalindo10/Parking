import Paginator from "../global/paginador/Paginator";
import UserTableRow from "./UserTableRow";
import { Table } from "react-bootstrap";
export default function UserTable({ 
  users,
  deleteUser,
  setUserUpdate,
  setModalShow,
  pageInfo,
  getUsers,

}) {
  return (
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: '10px'}}>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th style={{textAlign: 'center', borderTopRightRadius: '10px'}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((us) => (
            <UserTableRow
              key={us.id}
              user={us}
              deleteUser={deleteUser}
              setUserUpdate={setUserUpdate}
              setModalShow={setModalShow}
              />
          ))
        ) : (
          <tr>
            <td colSpan={5}>No existen resultados!</td>
          </tr>
        )}
          <tr>
              <td colSpan={5}>
                <Paginator pageInfo={pageInfo} getData={getUsers} />
              </td>
          </tr>
      </tbody>
    </Table>
  );
}
