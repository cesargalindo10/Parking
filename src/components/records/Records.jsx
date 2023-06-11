import { useEffect, useState } from "react";
import TableRecords from "./TableRecords";
import { APISERVICE } from "../../services/api.service";
import Seeker from '../reports/Seeker'
import './records.css'

const Records = () => {
    const [records, setRecords] = useState([])
    useEffect(()=>{
        getRecords();
      },[])

  
    const getRecords = async (body) => {
        const url = 'registro/get-records-by-date';
        const { success, records} = await APISERVICE.post(body, url) ;
        if(success){
        }
        setRecords(records)
       }
  return (
    <div className="records">
        <h3>Reportes de Ingreso/salidaa</h3>
        <Seeker getReports={getRecords} />
        <TableRecords records={records}/>
    </div>
  )
}
export default Records