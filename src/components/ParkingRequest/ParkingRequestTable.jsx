import { Table } from "react-bootstrap"
import ParkingRequestTableRow from "./ParkingRequestTableRow"

const ParkingRequestTable = ({requests, pageInfo, getParkingRequest,  setShowRequests, setRequestToReserve, cancelRequest}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Carnet</th>
          <th>Placa</th>
          <th>Plaza</th>
          <th>Telefono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          requests && requests.length > 0 ? 
            requests.map( req =>  <ParkingRequestTableRow key={req.id} request={req} setRequestToReserve={setRequestToReserve} setShowRequests={setShowRequests} cancelRequest={cancelRequest}/>)
          :
          <tr>
            <td style={{textAlign:'center'}} colSpan={4}>No existen reservas</td>
          </tr>
        }
      </tbody>
    </Table>
  )
}
export default ParkingRequestTable