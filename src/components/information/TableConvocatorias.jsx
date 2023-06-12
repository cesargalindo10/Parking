import { Table } from "react-bootstrap"
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const TableConvocatorias = ({convocatorias, deleteConvocatoria}) => {
    const navigate = useNavigate()
    const handleShowPdf = (conv) => {
        console.log(conv.convocatoria);
        window.open(`${APIURLIMG}${conv.convocatoria}`, '_blank');
    }
    const handleDelete = (id) => {
        deleteConvocatoria(id)
    }

  return (
    <Table>
        <thead>
            <tr>
                <th>Fecha Inicio Pagos</th>
                <th>Fecha Limite Pagos</th>
                <th>Fecha Inicio Reserva</th>
                <th>Fecha Fin Reserva</th>
                <th>Imagen Conv.</th>
                <th>Acciones</th>
            </tr>
            {
                convocatorias && convocatorias.length > 0 ?
                convocatorias.map( conv => <tr>
                    <td>{conv.fecha_inicio_pago}</td>
                    <td>{conv.fecha_limite_reserva}</td>
                    <td>{conv.fecha_inicio_reserva}</td>
                    <td>{conv.fecha_fin_reserva}</td>
                    <td> <button className="btn-main btn-main__green" onClick={ () => handleShowPdf(conv)}>Ver</button></td>{" "}
                    <td style={{cursor: 'pointer'}}><BsFillTrashFill className="icon" onClick={() => handleDelete(conv.id)}/></td>
                </tr>)
                :
                <tr>
                    <td colSpan={5} style={{textAlign: 'center' }}>
                        No existen convocatorias
                    </td>
                </tr>

            }
        </thead>
    </Table>
  )
}
export default TableConvocatorias