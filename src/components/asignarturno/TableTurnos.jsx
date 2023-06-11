import { Table } from "react-bootstrap";

const TableTurnos = ({ turnos, setModalShow,setTurnoToUpdate, deleteTurno}) => {
  
    const handleEdit = (turno) => {
        setTurnoToUpdate(turno);
        setModalShow(true);
    }
    const handleDelete = (turno) => {
        deleteTurno(turno.id)
    }
  
  
    return (
    <>
    <h5>Turnos</h5>
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Hora inicio</th>
          <th>Hora fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos && turnos.length > 0 ? (
            turnos.map((pay) => (
            <tr key={pay.id}>
              <td>{pay.nombre}</td>
             <td>{pay.hora_inicio}</td>
             <td>{pay.estado ? 'Activo' : 'Inactivo'}</td>
             <td>{pay.hora_fin}</td>
             <td> 
                <button className="btn-main btn-main__purple" onClick={() => handleEdit(pay)}>Editar</button>{' '}
                <button className="btn-main btn-main__red"    onClick={() => handleDelete(pay)}>Inabilitar</button> </td>

            </tr>   
          ))
          ) : (
              <tr>
            <td style={{ textAlign: "center" }} colSpan={3}>
              No existen turnos
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    </>
  );
};
export default TableTurnos;
