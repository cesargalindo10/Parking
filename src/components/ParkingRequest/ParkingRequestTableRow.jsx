import { AiFillEye } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { GiConfirmed } from "react-icons/gi"
import { MdEdit } from "react-icons/md"

const ParkingRequestTableRow = ({request, setRequestToReserve, setShowRequests, cancelRequest}) => {
  
  const handleShowRequest = () => {
    setRequestToReserve(request)
    setShowRequests(false);
  }

  const handleCancelRequest = () => {
    cancelRequest(request.id);
  }

  const existsPayment = () => {
    let total = 0;
    total = request.pagos.reduce((ac, value) => {
      let accumulate = 0;
      if(!value.estado){
        accumulate = ac + 1;
      }
      return accumulate
    },0)
    console.log(total)
    return total;
  }
  return (
    <tr>
      <td> <span className="new-pay"> {existsPayment()} </span></td> 
      <td>{request.cliente.nombre_completo}</td>
      <td >{request.cliente.ci}</td>
      <td >{request.plaza.numero}</td>
      <td>{request.cliente.placa}</td>
      <td>{request.cliente.telefono}</td> 
      <td> 
       {/*  {request.estado === 'pendiente' && <button className="btn-main btn-main__purple">{request.estado}</button>} */}
        {request.estado === 'pendiente' && !request.couta && <button className="btn-main btn-main__purple">Pendiente</button>}
        {request.estado === 'pendiente' && request.couta && <button className="btn-main btn-main__purple">Pago Coutas</button>}
        {request.estado === 'cancelado' && <button className="btn-main btn-main__red">{request.estado}</button>}
        {request.estado === 'pagado' && <button className="btn-main btn-main__green">{request.estado}</button>}
      </td>
      <td>  
          <AiFillEye style={{width: '30px', height: '30px'}} color='orange 'onClick={handleShowRequest}/>
        {"  "}
          <BsFillTrashFill color="red" onClick={handleCancelRequest}/>
      </td>
    </tr>
  )
}
export default ParkingRequestTableRow