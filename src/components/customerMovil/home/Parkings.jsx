import { useState } from "react"

const Parkings = ({parkings, getInfoParking}) => {
  const [selected, setSelected] = useState(0)

  const handleGetParkingInfo = (parking) => {
    getInfoParking(parking.id)
    setSelected(parking.id);
  }
  return (
    <section className="parkings-header-customer">
        {
            parkings && parkings.length > 0 ?
                parkings.map(parking => <p className={parking.id == selected ? 'selected-place':'other'} key={parking.id} onClick={() => handleGetParkingInfo(parking)}>{parking.nombre}</p>) 
            :
            <p>No existen parqueos</p>
        }
    </section>
  )
}
export default Parkings