import { forwardRef, useEffect, useState } from "react"
import { Table } from "react-bootstrap"

const RerportDetail = forwardRef((props, ref ) => {
  const [detailReserve, setDetailReserve] = useState([])
  useEffect(() => {
    if(Object.keys(props.requests).length > 0){
      setDetailReserve(props.requests.filter(req => req.pagos.filter(pay => pay.estado)))    
      console.log(detailReserve)
    }
  },[]) 

  const calculateTotal = ( pagos ) => {
    return pagos.reduce( (ac, value) => value.estado ? ac + Number(value.total): ac, 0);
  }
  return (
    <Table ref={ref}>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Telefono</th>
          <th>Parqueo</th>
          <th>Plaza</th>
          <th>Tarifa</th>
          <th>Couta</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
        {
          detailReserve && Object.keys(detailReserve).length > 0 ?
          
            detailReserve.map( request => {
            const parking = props.parkings.find(par => par.id === request.plaza.parqueo_id)
            return <tr key={request.id}>  
              <td>{request.cliente.nombre_completo}</td>
              <td>{request.cliente.telefono}</td>
              <td>{parking.nombre}</td>
              <td>{request.plaza.numero}</td>
              <td>{request.tarifa.nombre}</td>
              <td>{request.couta ? 'si': 'no'}</td>
              <td>Bs. {calculateTotal(request.pagos)}</td>
            </tr>
            }
          )
          :
          <tr>
            <td colSpan={7}>No existen reportes</td>
          </tr>
        }
      </tbody>
    </Table>
  );
})
export default RerportDetail