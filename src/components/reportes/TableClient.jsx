import { Table } from "react-bootstrap";

export const placeState = {
  DISPONIBLE: "disponible",
  ASIGNADO: "asignado",
  SOLICITADO: "solicitado",
};

const TableClient = ({ clientInformation, realiceRegister, registro }) => {
  const handleRegistre = (cliId) => {
    realiceRegister(cliId);
    
  };
  console.log(clientInformation);
  console.log(registro);
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Placa</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {clientInformation && clientInformation.id? (
          <tr>
            <td>{clientInformation.nombre_completo}</td>
            <td>{clientInformation.placa}</td>
            <td>
              {registro && registro.id? (
                registro.fecha_ingreso ? (
                  <button className="btn-main btn-main__red" onClick={() => handleRegistre(clientInformation.id)}>Registrar Salida</button>
                ) : (
                  <button className="btn-main btn-main__green" onClick={() => handleRegistre(clientInformation.id)}>
                    Registrar ingreso
                  </button>
                )
              ) : (
                <button className="btn-main btn-main__green" onClick={() => handleRegistre(clientInformation.id)}>
                  Registrar ingreso
                </button>
              )}
            </td>
          </tr>
        ) : (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={3}>
              No existe placa
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default TableClient;
