import { Table } from "react-bootstrap"
import ParkingRequestTableRow from "./ParkingRequestTableRow"

const ParkingRequestTable = ({requests, pageInfo, getParkingRequest,  setShowRequests, setRequestToReserve, cancelRequest, parkings}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Carnet</th>
          <th>Parqueo</th>
          <th>Nro Plaza</th>
          <th>Placa</th>
          <th>Telefono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          requests && requests.length > 0 ? 
            requests.map( req =>  <ParkingRequestTableRow key={req.id} request={req} setRequestToReserve={setRequestToReserve} setShowRequests={setShowRequests} cancelRequest={cancelRequest} 
             parkings={parkings}/>)
          :
          <tr>
            <td style={{textAlign:'center'}} colSpan={8}>No existen reservas</td>
          </tr>
        }
      </tbody>
    </Table>
  )
}
export default ParkingRequestTable