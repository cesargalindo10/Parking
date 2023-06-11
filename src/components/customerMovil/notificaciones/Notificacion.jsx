import { useEffect } from "react"
import { MdNotifications } from "react-icons/md";

const Notificacion = ({getNotificaciones, notifications}) => {
    useEffect(() => {
        getNotificaciones();
    },[])
    
    return (
    <div className="notificaciones">
        <h5 className="mt-4">Notificaciones</h5>
        {
            notifications && notifications.length > 0 ?
                notifications.map( noti => <div key={noti.id} className="notification-card">
                    <MdNotifications/>
                    <p>{noti.mensaje}</p>
                </div>)
            :
            <p> No existen notificaciones</p>
        }
    </div>
  )
}
export default Notificacion