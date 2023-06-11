import { useState, useEffect } from "react";
import CustomerTable from "./CustomerTable";
import { APISERVICE } from "../../services/api.service";
//import "../customer/styles/Customer.css";
import CustomerModal from "./CustomerModal";
import { Toaster, toast } from "react-hot-toast";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [pageInfo, setPageInfo] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [customerUpdate, setCustomerUpdate] = useState({});

  const getCustomers = async (page = 1) => {
    let url = "usuario/get-clients?";
    let params = `page=${page}`;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setCustomers(response.pageInfo.customers);
      setPageInfo(response.pageInfo);
      console.log(response);
    }
  };
  const createCustomer = async (customer) => {
    let url = "usuario/create-client";
    const response = await APISERVICE.post(customer, url);
    if (response.status === 201) {
      console.log("Usuario agregado exitosamente!");
      messageToastSuccess(response.message)
    }else{
      messageToastError(response.message)
    }
    getCustomers();
  };

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

const messageToastError = (sms) => {
    toast.error(sms);
  }
  const updateCustomer = async (user) => {
    let url = `usuario/update-customer?`;
    let params = `id=${user.id}`;
    const response = await APISERVICE.post(user, url, params);
    if (response.status === 200) {
      messageToastSuccess(response.message)
    }else{
      messageToastError(response.message)
    }
    getCustomers();
  };
  const blockCustomer = async (id) => {
    let url = `usuario/disable-client?`;
    let params = `id=${id}`;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      console.log("Cliente Actualizado");
    }
    getCustomers();
  };

  console.log(customers);
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="container-customer">
      <h3 className="color-main mt-4 mb-4">Clientes</h3>
      <button className="btn-main btn-main__purple mb-3" onClick={()=>setModalShow(true)}>Nuevo</button>
      <CustomerTable 
        customers={customers}
        blockCustomer={blockCustomer}
        pageInfo={pageInfo}
        getCustomers={getCustomers}
        setCustomerUpdate={setCustomerUpdate}
        setModalShow={setModalShow}
          />
      <CustomerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createCustomer={createCustomer}
        customerUpdate={customerUpdate}
        setCustomerUpdate={setCustomerUpdate}
        updateCustomer={updateCustomer}
      />
      <Toaster/>
    </div>
  );
}
