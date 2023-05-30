import Paginator from "../global/paginador/Paginator";
import ParkingTableRow from "./ParkingTableRow";
import { Table } from "react-bootstrap";
export default function ParkingTable({ 
  parkins,
  deleteParking,
  setParkingUpdate,
  setModalShow,
  pageInfo,
  getUsers
}) {
  return (
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: '10px'}}>Nombre</th>
          <th>Plazas</th>
          <th>Plazas Disponibles</th>
          <th>Plazas Ocupadas</th>
          <th style={{textAlign: 'center', borderTopRightRadius: '10px'}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {parkins && parkins.length > 0 ? (
          parkins.map((ps) => (
            <ParkingTableRow
              key={ps.id}
              parkin={ps}
              deleteParking={deleteParking}
              setParkingUpdate={setParkingUpdate}
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
