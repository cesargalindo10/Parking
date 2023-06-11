import { Table } from "react-bootstrap"

const TableRecord = ({records}) => {
  return (
    <Table>
        <thead>
            <tr>
                <th>Cliente</th>
                <th>Placa</th>
                <th>Ingreso</th>
                <th>Salida</th>
            </tr>
        </thead>
        <tbody>
            {
                records && records.length  > 0 ?
                    records.map(rec => <tr>
                        <td>{rec.cliente}</td>
                        <td>{rec.placa}</td>
                        <td>{rec.fecha_ingreso}</td>
                        <td>{rec.fecha_salida}</td>
                    </tr>)
                :
                <tr>
                    <td style={{textAlign: 'center'}} colSpan={4}>No existen registros</td>
                </tr>
            }
        </tbody>
    </Table>
  )
}
export default TableRecord