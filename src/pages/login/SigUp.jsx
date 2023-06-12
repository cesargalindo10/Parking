import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APISERVICE } from "../../services/api.service";
import { useDispatch } from "react-redux";
import { createUser, resetUser } from "../../redux/state/user";
import { useEffect } from "react";
import PublicHeader from "../../components/global/header/PublicHeader";
import { AiFillEye } from "react-icons/ai";
import { Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
export default function Login() {
  const initialValues = {
    nombre_completo: "",
    ci: "",
    email: "",
    placa: "",
    password: "",
    telefono: "",
    cargo: "",
    unidad: "",
  };
  const [value, setValue] = useState(initialValues);
  const [showPassowrd, setShowPassowrd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    let sms = isValid();
    if (sms === true) {
      event.preventDefault();

      createCustomer(value);
      navigate(`/login`);
    }else{
      messageToastError(sms)
    }
  };
  const messageToastError = (sms) => {
    toast.error(sms);
  }
  const createCustomer = async (customer) => {
    let url = "usuario/create-client";
    const response = await APISERVICE.post(customer, url);
    if (response.status === 201) {
      console.log("Usuario agregado exitosamente!");
      dispatch(createUser(userLoged));
    }
  };
  const isValid = () => {
    if (value.nombre_completo === "") {
      return "Nombre es requerido";
    }
    if (value.ci === "") {
      return "Ci es requerido";
    }
    if (value.email === "") {
      return "Email es requerido";
    }
    if (value.placa === "") {
      return "Placa es requerido";
    }

    if (value.telefono === "") {
      return "Telefono es requerido";
    }
    if (value.cargo === "") {
      return "Cargo es requerido";
    }
    if (value.unidad === "") {
      return "Unidad es requerido";
    }
    if (value.password === "") {
      return "Password es requerido";
    }
    return true;
  };
  const handletoLogin = () => {
    navigate("/login");
  };
  useEffect(() => {}, []);

  return (
    <div>
      <PublicHeader />
      <div className="signout-container">
        <div className="content-signout">
          <h5 className="text-center">Registro</h5>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">*Nombre Completo</Form.Label>
            <Form.Control type="text" id="nombre_completo" name="nombre_completo" value={value.nombre_completo} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*CI</Form.Label>
            <Form.Control type="number" id="ci" name="ci" value={value.ci} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*Email</Form.Label>
            <Form.Control type="email" id="email" name="email" value={value.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*Placa</Form.Label>
            <Form.Control type="text" id="placa" name="placa" value={value.placa} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*Telefono</Form.Label>
            <Form.Control type="number" id="telefono" name="telefono" value={value.telefono} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*Cargo </Form.Label>
            <Form.Control type="text" id="cargo" name="cargo" value={value.cargo} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>*Unidad </Form.Label>
            <Form.Control type="text" id="unidad" name="unidad" value={value.unidad} onChange={handleChange} />
          </Form.Group>
          <Form.Group style={{ position: "relative" }} className="mb-3">
            <Form.Label>*Password </Form.Label>
            <Form.Control
              type={showPassowrd ? "text" : "password"}
              id="password"
              name="password"
              value={value.password ? value.password : ""}
              onChange={handleChange}
            />
            <div className="icon-eye-customer" onClick={() => setShowPassowrd(!showPassowrd)}>
              <AiFillEye />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-evenly">
            <div style={{ textAlign: "center" }} className="form-group mt-3">
              <button onClick={handleSubmit} className="btn btn-primary ">
                REGISTRARSE
              </button>
            </div>
          </Form.Group>

          <div className="signup">
            Ya tienes cueta?
            <button className="btn-green" onClick={() => handletoLogin()}>
              Iniciar Sesion
            </button>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
