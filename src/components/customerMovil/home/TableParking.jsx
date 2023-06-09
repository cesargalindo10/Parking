import { Table } from "react-bootstrap";
import { navigationNames } from "../CustomerPage";

export const placeState = {
  DISPONIBLE: "disponible",
  ASIGNADO: "asignado",
  SOLICITADO: 'solicitado'
};



const TableParking = ({ placeInformation, setPlaceNumberGlobal, setView }) => {
  const handleReserve = (place) => {
    setPlaceNumberGlobal(place);
    setView(navigationNames.RESERVAR)
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Estado</th>
          <th>Parqueo</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {placeInformation && placeInformation.length > 0 ? (
          placeInformation.map((place) => (
            <tr key={place.id}>
              <td>{place.numero}</td>
              <td>{place.estado}</td>
              <td>{place.nombre}</td>
              <td>
                {place.estado === placeState.DISPONIBLE && place.habilitado === true ? (
                  <button className="btn-main btn-main__green" onClick={() => handleReserve(place)}>Reservar</button>
                ) : (
                  <>
                  {
                    !place.habilitado ? 
                    <button className="btn-main btn-main__red">No disp.</button>
                    :
                    <button className="btn-main btn-main__red">Resevado</button>
                  }
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={3}>
              No existe plaza
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default TableParking;
