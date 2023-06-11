import './reports.css'
import Seeker from './Seeker'
import { ReportsTable } from './ReportsTable'
import {APISERVICE} from '../../services/api.service'
import React, { useEffect, useState } from 'react'
import { ReportList } from './ReportList'
import RerportDetail from './RerportDetail'
import {useReactToPrint} from 'react-to-print'
export const reportst = {
  TOTAL: 'total',
  DETALLE: 'detalle'
}
const Reports = () => {

    const [paymentsByDay, setPaymentsByDay] = useState([]);
    const [reportList, setReportList] = useState(reportst.TOTAL)
    const [requests, setRequests] = useState([])
    const [parkings, setParkings] = useState([])

    const componentRef = React.useRef()

    useEffect(() => {
      getParkingRequest();
      getParkings();
    },[])

    const getParkingRequest = async (pageNumber = 1) => {
      const url = "reserva/?";
      const params = `page=${pageNumber}`;
      const { success, requests, pageInfo } = await APISERVICE.get(url, params);
      if (success) {
        setRequests(requests);
      } else {
      }
    };

    const getParkings = async () => {
      const url = "parqueo/get-parkings";
      const { success, parkings } = await APISERVICE.get(url);
      if (success) {
        setParkings(parkings);
      } else {
      }
    }
    const getReports = async (body) => {
        const url = 'pago/get-payments-by-day/'
        const { success, payments } = await APISERVICE.post(body, url);
        if(success){
            setPaymentsByDay(payments);
        }
    }
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    })
  return (
    <div className='reports'>
        <h3>Reportes</h3>
        <ReportList setReportList={setReportList}/>
        {reportList === reportst.TOTAL &&
          <>
           <Seeker getReports={getReports}/>
           <ReportsTable payments={paymentsByDay} ref={componentRef}/>
          </>
         }

        {reportList  === reportst.DETALLE && <RerportDetail ref={componentRef} requests={requests} parkings={parkings}/>}
         <button className='btn-main btn-main__purple' onClick={handlePrint}>Imprimir</button>
    </div>
  )
}
export default Reports