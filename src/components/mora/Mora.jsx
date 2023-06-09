import { Table } from "react-bootstrap";
import './mora.css'
import { APISERVICE } from "../../services/api.service";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { Toaster, toast } from "react-hot-toast";

const Mora = () => {
  useEffect(() => {
    getDebtorCustomers();
    getInformation();
  }, []);

  const [customers, setCustomers] = useState([]);
  const [information, setInformation] = useState([]);
  const getDebtorCustomers = async () => {
    const url = "reserva/get-debtor-customers";
    const { success, customers } = await APISERVICE.get(url);
    if (success) {
      setCustomers(customers);
    }
  };

  const getInformation = async () => {
    const url = "informacion/";
    const { success, information } = await APISERVICE.get(url);
    if (success) {
      setInformation(information);
    }
  };

  const sendEmail = () => {
    if (customers.length > 0) {
      emailjs.init("ncicVJ_tlK0p3qysn");

      for (let i = 0; i < customers.length; i++) {
        const element = customers[i];
        emailjs
          .send("service_nc9zurz", "template_sbjywzq", {
            email: element.email,
            from_name: "SfotwareincorporateSrl",
            cliente: element.nombre_completo,
            message: information.mensaje_mora,
          })
          .then((response) => {
            console.log("Correo enviado correctamente", response);
          })
          .catch((error) => {
            console.error("Error al enviar el correo", error);
          });
      }
      messageToast('Correos enviados con exito.')
    }
  };
  const messageToast = (sms) => {
    toast.success(sms);
  }

  return (
    <div className="mora">
      <h5>Clientes con mora</h5>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.cliente.nombre_completo}</td>
                <td>{customer.cliente.telefono}</td>
                <td>{customer.cliente.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No existen deudores
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <button className="btn-main btn-main__purple" onClick={sendEmail}>
        Send Mail
      </button>
      <Toaster/>
    </div>
  );
};
export default Mora;
