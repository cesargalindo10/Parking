import { useEffect } from "react";
import { Table } from "react-bootstrap";

const TablePayments = ({ requestToReserve , setShowModal, setPayment, setShowRequests, confirmPayment, cancelPayment}) => {

    useEffect(() => {

    },[requestToReserve])

    const handleShowPay = (pay) => {
        setPayment(pay)
        setShowModal(true);
    }

  const handleConfirm = (pay) => {
    confirmPayment(pay);
    /* setShowRequests(true); */
  }
  const handleCancelPayment = (pay) => {
    cancelPayment(pay.id)
  }
  return (
    <>
      <h5>Informacion de pago</h5>
      <Table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>total</th>
            <th>estado</th>
            <th>tipo_pago</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {requestToReserve.pagos ? (
            requestToReserve.pagos.map((pay) => (
              <tr>
                <td>{pay.fecha}</td>
                <td>{pay.total}</td>
                <td>
                    {pay.estado_plaza}
                </td>
                <td>
                    {pay.tipo_pago === 'qr' ? 
                        <button className="btn-main btn-main__purple" onClick={() => handleShowPay(pay)}>Ver</button>
                     :
                    pay.tipo_pago }
                </td>
                <td>
                    <button className="btn-main btn-main__green" onClick={() => handleConfirm(pay)}>Confirmar</button>{" "}
                    <button className="btn-main btn-main__red" onClick={() => handleCancelPayment(pay)}>Cancelar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No existen pagos</td>
            </tr>
          )}
        </tbody>
      </Table>
      <button className="btn-main btn-main__purple" onClick={() => setShowRequests(true)}>Volver</button>
    </>
  );
};
export default TablePayments;
