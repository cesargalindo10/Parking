import Paginator from "../global/paginador/Paginator";
import AssignTurnTableRow from "./AssignTurnTableRow";
import { Table } from "react-bootstrap";
export default function AssignTurnTable({ 
  users,
  turn,
  assignTurn,
  pageInfo,
  getUsers
}) {
  return (
    <>
    <h5>Asignacion</h5>
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: '10px'}}>Nombre</th>
          <th>Rol</th>
          <th>Turnos Asignado</th>
          <th>Turnos</th>
          <th style={{textAlign: 'center', borderTopRightRadius: '10px'}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((us) => (
            <AssignTurnTableRow
            key={us.id}
            usuario={us}
            turn={turn}
            assignTurn={assignTurn}
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
    </>
  );
}
