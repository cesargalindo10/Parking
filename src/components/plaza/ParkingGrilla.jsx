import { Form } from "react-bootstrap";
import { placeState } from "../customerMovil/home/TableParking";

const ParkingGrilla = ({ parkingInfo, places, getInfoReserve, setShowModalNewReserve, setPlace}) => {
  const handleShowInfoPlace = (place) => {};

  const handleOnClickSpace = (space) => {
    if(space.estado === placeState.ASIGNADO || space.estado === placeState.SOLICITADO){
      getInfoReserve(space.id);
    }else if(space.estado === placeState.DISPONIBLE && space.habilitado === true){
      setPlace(space)
      setShowModalNewReserve(true);
    }
  }

  return (
    <div className="">
      <div className="grilla-header"></div>
      <div
        className="parking-grilla"
        style={{ gridTemplateColumns: `repeat(${parkingInfo.nro_columnas},1fr)`,
          gridTemplateRows: `repeat(${parkingInfo.nro_filas}, 1fr)` 
        }}
      >
        {places && places.length > 0 ? (
          places.map((place) => {
            let className = "place";
            if (place.habilitado === false) className = className + " place-road";
            if (place.estado === placeState.DISPONIBLE)className = className + " place-available";
            if (place.estado === placeState.ASIGNADO)className = className + " place-disabled";
            if (place.estado === placeState.SOLICITADO)className = className + " place-request";

            return (
              <div key={place.id} className={className} onClick={() => handleOnClickSpace(place)}>
                {place.numero}
              </div>
            );
          })
        ) : (
          <p>No hay plazas</p>
        )}
      </div>
    </div>
  );
};
export default ParkingGrilla;
