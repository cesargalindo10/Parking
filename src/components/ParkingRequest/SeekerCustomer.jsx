import { useState } from "react"
import { Form } from "react-bootstrap"

const SeekerCustomer = ({searchCustomer, clearSearch}) => {
    const [customerName, setCustomerName] = useState("")
    const handleSearchCustomer = () => {
        searchCustomer(customerName);
    }
    const handleClearSearch = () => {
        clearSearch();
        setCustomerName('');
    }

  return (
    <div className="seeker-customer">
        <Form.Control placeholder="Nombre de cliente" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value) }/>
        <button className="btn-main btn-main__purple" onClick={handleSearchCustomer}>Buscar</button> 
        <button className="btn-main btn-main__red" onClick={handleClearSearch}>Limpiar</button> 
    </div>
  )
}
export default SeekerCustomer