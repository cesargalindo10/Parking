import { Toaster, toast } from "react-hot-toast";
import { placeState } from "./TableParking";

const PlaceGrilla = ({ parkingInfo, places, getParkingSpace, infoReserve}) => {
  const handleReserve = (place) => {
    if(!infoReserve.id && place.estado === 'disponible'){
      getParkingSpace(place)
    }else{
      if(place.habilitado && place.estado === 'disponible'){
        messageError('Usted ya cuenta con una reserva')
      }
    }
  }
  const messageError = (sms) => {
    toast.error(sms)
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
            if (place.estado === placeState.SOLICITADO)className = className + " place-disabled";

            return (
              <div key={place.id} className={className} onClick={() => handleReserve(place)}>
                {place.numero}
              </div>
            );
          })
        ) : (
          <p>No hay plazas</p>
        )}
      </div>
      <Toaster/>
    </div>
  );
};
export default PlaceGrilla;
