import { useEffect, useState } from "react";
import Seeker from "./Seeker";
import TableParking from "./TableParking";
import { APISERVICE } from "../../../services/api.service";
import PlaceGrilla from "./PlaceGrilla";
import Parkings from "./Parkings";

const HomeCustomer = ({ information, setPlaceNumberGlobal, setView, infoReserve, parkingInfo, places, parkings,getInfoParking }) => {
  const [placeNumber, setPlaceNumber] = useState("");
  const [placeInformation, setPlaceInformation] = useState({});

  const getParkingSpace = async ( ) => {
    const url = "plaza/get-place?";
    const params = `placeNumber=${placeNumber}&idParking=${parkingInfo.id}`;
    const { success, placeInformation } = await APISERVICE.get(url, params);
    if (success) {
      setPlaceInformation(placeInformation);
    } else {
      setPlaceInformation([]);
    }
  };


  const searchPlaza =  <div>
  <Seeker
    placeNumber={placeNumber}
    setPlaceNumber={setPlaceNumber}
    getParkingSpace={getParkingSpace}
    setPlaceInformation={setPlaceInformation}
  />
  <TableParking
    setView={setView}
    placeInformation={placeInformation}
    setPlaceNumberGlobal={setPlaceNumberGlobal}
  />
</div>

  return (
    <section className="home">
     {/*  <h5>Parqueo</h5> */}
      <Parkings parkings={parkings} getInfoParking={getInfoParking}/>
     { parkingInfo && Object.keys(parkingInfo) &&
       <PlaceGrilla parkingInfo={parkingInfo} places={places}/>
     }

      {Object.keys(infoReserve).length === 0 && searchPlaza}
    </section>
  );
};
export default HomeCustomer;
