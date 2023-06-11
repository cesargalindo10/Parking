import { InputGroup, Form } from "react-bootstrap";
import "./information.css";
import { useEffect, useState } from "react";
import { APISERVICE } from "../../services/api.service";
import { Toaster, toast } from "react-hot-toast";
import TableConvocatorias from "./TableConvocatorias";
import { ModalConvocatoria } from "./ModalConvocatoria";

const initialState = {
  qr: "",
  atencion: "",
  mensaje_mora: "",
  telefono: '',
};

const Information = () => {
  const [information, setInformation] = useState(initialState);
  const [convocatorias, setConvocatorias] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [imgQr, setImgQr] = useState({valid: false, img:{}});
     useEffect (() => {
        getInformation();
        getConvocatorias()
    },[])

    const getInformation =  async () =>{
        const url = 'informacion/'
        const { success, information } = await APISERVICE.get(url);
        if(success){
            setInformation({...information,... information})
            setImgQr({valid: true, img: information.qr});
        }
    }




  const handleOnChange = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    let sms = isValid();
    if (sms === true) {
      const { mensaje_mora, atencion,telefono} = information;
      const url = "informacion/update-information";
      const body = new FormData();

      const data = {  
        mensaje_mora, 
        atencion,
        telefono,
      }

      body.append("data", JSON.stringify(data));
      body.append("imgQr", imgQr.img);
      const {success, message} = await APISERVICE.postWithImage(body, url);
      if(success){
        messageToastSuccess(message);
      }else{
        messageToastError(message)
      }
    }else{
       messageToastError(sms)
    }
    console.log(information, imgQr);
  };

  const isValid = () => {
    const {fecha_inicio_reserva,atencion,mensaje_mora,telefono,  fecha_limite_reserva, fecha_pub_conv,fecha_fin_reserva, qr} = information;
    if(!imgQr.valid){
      return 'Foto Qr no debe estar en blanco' 
    }
    if(atencion === ''){
      return 'Atencion no debe estar en blanco' 
    }
    if(mensaje_mora === ''){
      return 'Mensaje de mora no debe estar en blanco' 
    }
    if(telefono === ''){
      return 'Telefono reserve no debe estar en blanco' 
    }
    return true;
  }

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

  const messageToastError = (sms) => {
    toast.error(sms);
  }

  const createConvocatoria = async (information, img) => {
      const url = "convocatoria/create-convocatoria";
      const body = new FormData();

      body.append("data", JSON.stringify(information));
      body.append("imgConvocatoria", img);
      const {success, message} = await APISERVICE.postWithImage(body, url);
      if(success){
        messageToastSuccess(message);
        setShowModal(false);
        getConvocatorias();
      }else{
        messageToastError(message)
      }
  }

  const getConvocatorias = async () => {
    const url = 'convocatoria/get-convocatorias';
    const { success, convocatorias} = await APISERVICE.get(url);
    if( success ){
      setConvocatorias(convocatorias);
    }
  }

  const handleOnChangeFile = (e) => {
    console.log(e.target.files[0])
    setImgQr({'valid': true, 'img' : e.target.files[0]});
  };

  const deleteConvocatoria = async (id) => {
    const url = 'convocatoria/delete/?';
    const params = `id=${id}`
    const { success, message, convocatorias} = await APISERVICE.delete(url, params);
    if(success){
      setConvocatorias(convocatorias)
      messageToastSuccess(message)
    }else{
      messageToastSuccess(message)
    }
  }

  return (
    <section className="information">
      <h3>Informacion</h3>
      <button className="btn-main btn-main__purple"onClick={() => setShowModal(true)}>Nueva Convocatoria</button>
      <TableConvocatorias convocatorias={convocatorias} deleteConvocatoria={deleteConvocatoria}/>
      <ModalConvocatoria show={showModal} onHide={setShowModal}  createConvocatoria={createConvocatoria}/>
      <h4 className="mt-5">Informacion global</h4>
      <div className="information__form">

      <InputGroup>
          <label className="information__form-label" htmlFor="convocatoria">
            Qr
          </label>
          <Form.Control
            type="file"
            onChange={handleOnChangeFile}
            name="imgQr"
            accept="image/png, image/jpeg, image/webp"
          />
        </InputGroup>

        <InputGroup>
          <label className="information__form-label" htmlFor="atencion">
            Horario de Atencion
          </label>
          <Form.Control
            type="text"
            id="atencion"
            name="atencion"
            value={information.atencion}
            onChange={handleOnChange}
          />
        </InputGroup>

        <InputGroup>
          <label className="information__form-label" htmlFor="mensaje_mora">
            Mensaje de Mora
          </label>
          <Form.Control
            type="text"
            id="mensaje_mora"
            value={information.mensaje_mora}
            name="mensaje_mora"
            onChange={handleOnChange}
          />
        </InputGroup>


        <InputGroup>
          <label className="information__form-label" htmlFor="telefono">
            Telefono
          </label>
          <Form.Control
            type="text"
            id="telefono"
            value={information.telefono}
            name="telefono"
            onChange={handleOnChange}
          />
        </InputGroup>
      </div>

      <button className="btn-main btn-main__purple" onClick={handleUpdate}>
        Guardar
      </button>
      <Toaster position="top-right"/>
    </section>
  );
};
export default Information;
