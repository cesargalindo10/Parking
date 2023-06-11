import { useEffect } from "react"
import { Table } from "react-bootstrap";

const Payments = ({infoReserve, getInfoReserve, information}) => {

  useEffect(() => {
    getInfoReserve()
  }, [])

  return (
    <div>
      <h5 className="mt-2">Pagos</h5>
      <Table>
        <thead>
          <th>Fecha</th>
          <th>Total</th>
          <th>Estado</th>
        </thead>
        <tbody>
          {infoReserve && infoReserve.length > 0 ?
              infoReserve.map(pay => <tr key={pay.id}>
                <td>{pay.fecha}</td>
                <td>{pay.total}</td>
                
                <td>{pay.estado_plaza }</td>
              </tr>)
            :
            <tr>
              <td style={{textAlign: 'center'}} colSpan={3}>No existen pagos.</td>
            </tr>
          }
        </tbody>
      </Table>
      <h5>Contacto </h5>
      <p>Telefono: {information.telefono}</p>
    </div>
  )
}
export default Payments