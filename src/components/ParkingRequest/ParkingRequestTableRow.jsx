import { AiFillEye } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { GiConfirmed } from "react-icons/gi"
import { MdEdit } from "react-icons/md"
import ModalConfirm from "./ModalConfirm"
import { useEffect, useState } from "react"

const ParkingRequestTableRow = ({request, setRequestToReserve, setShowRequests, cancelRequest, parkings}) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [parking, setParking] = useState({})
  useEffect(() => {
    if(parkings && Object.keys(parkings).length > 0){
      setParking(parkings.find(par => par.id === request.plaza.parqueo_id))
    }
  },[parkings])

  const handleShowRequest = () => {
    setRequestToReserve(request)
    setShowRequests(false);
  }

  const handleCancelRequest = () => {
    cancelRequest(request.id);
    setShowModalConfirm(false);
  }

  const existsPayment = () => {
    let total = 0;
    total = request.pagos.reduce((ac, value) => value.estado_plaza === 'pendiente' ? ac + 1: ac ,0)
    return total;
  }
  return (
    <tr>
      <td> <span className="new-pay"> {existsPayment()} </span></td> 
      <td>{request.cliente.nombre_completo}</td>
      <td >{request.cliente.ci}</td>
      <td >{parking ?.nombre}</td>
      <td >{request.plaza.numero}</td>
      <td>{request.cliente.placa}</td>
      <td>{request.cliente.telefono}</td> 
      <td> 
       {/*  {request.estado === 'pendiente' && <button className="btn-main btn-main__purple">{request.estado}</button>} */}
        {request.estado === 'pendiente' && !request.couta && <button style={{cursor: 'auto'}} className="btn-main">Pendiente</button>}
        {request.estado === 'pendiente' && request.couta && <button style={{cursor: 'auto'}} className="btn-main">Pago Coutas</button>}
        {request.estado === 'cancelado' && <button style={{cursor: 'auto'}} className="btn-main">{request.estado}</button>}
        {request.estado === 'pagado' && <button style={{cursor: 'auto'}} className="btn-main ">{request.estado}</button>}
      </td>
      <td className="d-flex gap-2">   
          {/* <AiFillEye style={{width: '30px', height: '30px'}} color='orange 'onClick={handleShowRequest}/> */}
          <button className="btn-main btn-main__green" onClick={handleShowRequest}>Ver Pagos</button>
        {"  "}
        <div style={{cursor: 'pointer'}}>
          <BsFillTrashFill color="red" onClick={() => setShowModalConfirm(true)}/>
        </div>
      </td>
      <ModalConfirm show={showModalConfirm} onHide={setShowModalConfirm} deleteSomething={handleCancelRequest} message='Esta seguro de eliminar esta reserva?'/>
    </tr>
  )
}
export default ParkingRequestTableRow