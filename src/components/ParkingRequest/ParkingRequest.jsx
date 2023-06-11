import { useEffect, useState } from "react";
import ParkingRequestTable from "./ParkingRequestTable";
import { APISERVICE } from "../../services/api.service";
import "./parkingRequest.css";
import ModalRequest from "./ModalRequest";
import { Toaster, toast } from "react-hot-toast";
import TablePayments from "./TablePayments";
import VoucherPrint from "./VoucherPrint";
import SeekerCustomer from "./SeekerCustomer";

const ParkingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [requestsAll, setRequestsAll] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);

  const [requestToReserve, setRequestToReserve] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showRequests, setShowRequests] = useState(true);
  const [payment, setPayment] = useState({});
  const [showPrinter, setShowPrinter] = useState(false);
  const [paymentSample, setPaymentSample] = useState({});
  const [parkings, setParkings] = useState([])
  useEffect(() => {
    getParkingRequest();
    getParkings();
  }, []);

  const getParkings = async () => {
    const url = "parqueo/get-parkings";
    const { success, parkings } = await APISERVICE.get(url);
    if (success) {
      setParkings(parkings);
    } else {
    }
  }
  const getParkingRequest = async (pageNumber = 1) => {
    const url = "reserva/?";
    const params = `page=${pageNumber}`;
    const { success, requests, pageInfo } = await APISERVICE.get(url, params);
    if (success) {
      setRequests(requests);
      setRequestsAll(requests);
      setPageInfo(pageInfo);
    } else {
    }
  };

  const cancelRequest = async ($idRequest) => {
    const url = "reserva/cancel-request/?";
    const params = `idRequest=${$idRequest}`;
    const { success, message } = await APISERVICE.get(url, params);
    if (success) {
      messageToastSuccess(message);
      getParkingRequest();
    } else {
      messageToastError(message);
    }
  };

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  };
  const messageToastError = (sms) => {
    toast.error(sms);
  };

  const confirmPayment = async (pay) => {
    setPaymentSample(pay);
    const url = "pago/confirm-payment/?";
    const params = `idPayment=${pay.id}`;
    const { success, message } = await APISERVICE.get(url, params);
    if (success) {
      messageToastSuccess(message);
      if (pay.tipo_pago !== "qr") {
        setShowPrinter(true);
      }else{
        setShowRequests(true);
      }
      getParkingRequest();
    } else {
      messageToastError(message);
    }
  };
  const searchCustomer = (name) => {
    console.log(requests);
    setRequests(requestsAll.filter(request => request.cliente.nombre_completo.toLowerCase().includes(name.toLowerCase())))
  }
  const clearSearch = () => {
    getParkingRequest();
  }

  const cancelPayment = async (idPayment) => {
    const url = "pago/cancel-payment/?";
    const params = `idPayment=${idPayment}`;
    const { success, message } = await APISERVICE.get(url, params);
    if (success) {
      messageToastSuccess(message);
      getParkingRequest();
    } else {
      messageToastError(message);
    }  
  }

  return (
    <div className="parking-request">
      {showRequests ? (
        <section>
          <h3 className="btn-reserve">Reservas</h3>
          <SeekerCustomer searchCustomer={searchCustomer} clearSearch={clearSearch}/>
          <ParkingRequestTable
            requests={requests}
            pageInfo={pageInfo}
            getParkingRequest={getParkingRequest}
            setRequestToReserve={setRequestToReserve}
            setShowRequests={setShowRequests}
            cancelRequest={cancelRequest}
            parkings={parkings}
          />
        </section>
      ) : (
        <TablePayments
          requestToReserve={requestToReserve}
          setShowModal={setShowModal}
          setPayment={setPayment}
          setShowRequests={setShowRequests}
          confirmPayment={confirmPayment}
          cancelPayment={cancelPayment}
        />
      )}
      <ModalRequest onHide={setShowModal} show={showModal} payment={payment} />
      {showPrinter &&
        requestToReserve &&
        Object.keys(requestToReserve).length > 0 && (
          <VoucherPrint
            requestToReserve={requestToReserve}
            paymentSample={paymentSample}
            setShowPrinter={setShowPrinter}
            setShowRequests={setShowRequests}
          />
        )}
      <Toaster />
    </div>
  );
};
export default ParkingRequest;
