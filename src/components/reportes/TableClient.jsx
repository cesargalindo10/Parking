import { Table } from "react-bootstrap";

export const placeState = {
  DISPONIBLE: "disponible",
  ASIGNADO: "asignado",
  SOLICITADO: "solicitado",
};

const TableClient = ({ clientInformation, realiceRegister, registro, parking }) => {
  const handleRegistre = (cliId) => {
    realiceRegister(cliId);
    
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Placa</th>
          <th>Parqueo</th>
          <th></th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {clientInformation && clientInformation.id? (
          <tr>
            <td>{clientInformation.nombre_completo}</td>
            <td>{clientInformation.placa}</td>
            <td>{parking && Object.keys(parking).length > 0 ? parking.nombre : 'No tiene reserva'}</td>
            <td><button className="btn-main"> { registro && registro.fecha_salida === null ? 'Registrar Salida':  'Registrar Entrada'}</button></td>
            <td>
                <button className="btn-main btn-main__green" onClick={() => handleRegistre(clientInformation.id)}>
                  Enviar
                </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={4}>
              No existe placa
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default TableClient;
