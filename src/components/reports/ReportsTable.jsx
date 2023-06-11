import { forwardRef } from "react"
import { Table } from "react-bootstrap"

export const ReportsTable = forwardRef((props, ref) => {
  return (
    <Table ref={ref}>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            {
                props.payments && props.payments.length > 0 ? 
                props.payments.map( pay => <tr key={pay.id}><td>{pay.fecha}</td> <td>Bs. {pay.total}</td> </tr>):
                <tr>
                    <td style={{textAlign: 'center'}} colSpan={2}>No existen registros</td>
                </tr>
            }
        </tbody>
    </Table>
  );
})