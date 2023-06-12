import { useEffect, useState } from "react";
import { InputGroup, Modal, Form } from "react-bootstrap"
import { Toaster, toast } from "react-hot-toast";

const initialState = {
    nombre: '',
    costo: '',
    estado: '',
}

const PayModal = ({ show, onHide, createPay, updatePay, productToEdit, setProductToEdit}) =>  {
    const [ infoPay, setInfoPay ] = useState(initialState);

    useEffect(() => {
        if(productToEdit && Object.keys(productToEdit).length > 0){
            setInfoPay(productToEdit);
        }
    },[show])

    const handleAcept = () => {
        let res = isValid();
        if(res === true){
            if(infoPay.id){
                updatePay(infoPay);
                onHide(false);
            }else{
                createPay(infoPay)
                onHide(false);
                setInfoPay(initialState);
            }
        }else{
            messageToastError(res);
        }
    }
    
    const isValid = () => {
        if(infoPay.nombre === ''){
            return 'Nombre no debe estar en blanco.'
        }
        if(infoPay.costo === ''){
            return 'Costo no debe estar en blanco.'
        }
        if(infoPay.estado === ''){
            return 'Debe elegir un estado.'
        }
        return true;
    }

    const handleOnChange = (e) => {
        setInfoPay({...infoPay, [e.target.name]: e.target.value});
    }
    
    const handleCancel = () => {    
        setInfoPay(initialState);
        setProductToEdit({});
        onHide(false);
    }
    const messageToastSuccess = (sms) => {
        toast.success(sms);
      }
    
      const messageToastError = (sms) => {
        toast.error(sms);
      }
    

    return <Modal show={show} centered>
        <Modal.Header>
            {
                <h4>{infoPay.id?"Editar":"Crear nueva"} tarifa</h4>
            }
        </Modal.Header>
        <Modal.Body className="mb-3">
            <InputGroup className="mb-3">
                <InputGroup.Text>Nombre</InputGroup.Text>
                <Form.Control
                    type='text'
                    placeholder='Nombre'
                    value={infoPay.nombre}
                    name='nombre'
                    onChange={handleOnChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Precio</InputGroup.Text>
                <Form.Control
                    type='text'
                    placeholder='Precio'
                    value={infoPay.costo}
                    name="costo"
                    onChange={handleOnChange}
                />
            </InputGroup>

            <InputGroup>
                <Form.Select value={infoPay.estado} name='estado' onChange={handleOnChange}>
                    <option selected value=''>Seleccione un estado</option>
                    <option value="1">Activo</option>
                    <option value="0">inactivo</option>
                </Form.Select>
            </InputGroup>


        </Modal.Body>
        <Modal.Footer>
            <button className="btn-main btn-main__red" onClick={handleCancel}>Cancelar</button>
            <button className="btn-main btn-main__purple" onClick={handleAcept}>Aceptar</button>
        </Modal.Footer>
        <Toaster position="top-right"/>
    </Modal>
}

export default PayModal;
