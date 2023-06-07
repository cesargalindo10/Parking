import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APISERVICE } from "../../services/api.service";
import { useDispatch } from "react-redux";
import { createUser, resetUser } from "../../redux/state/user";
import { useEffect } from "react";
import "./styles/Login.css"
import PublicHeader from "../../components/global/header/PublicHeader";
export default function Login() {
    const initialValues = {
        nombre_completo: "",
        ci:"",
        email: "",
        placa:"",
        password: "",
        telefono:"",
        cargo:"",
        unidad:""
      };
      const [value, setValue] = useState(initialValues);
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setValue({
          ...value,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = (event) => {
        event.preventDefault();
   
          createCustomer(value);
          navigate(`/login`);

      };

  const createCustomer = async (customer) => {
    let url = "usuario/create-client";
    const response = await APISERVICE.post(customer, url);
    if (response.status === 201) {
      console.log("Usuario agregado exitosamente!");
      dispatch(createUser(userLoged));
      
    }
  };
  useEffect(() => {

  }, []);

  return (
    <div>
      <PublicHeader/>
      <div className="signout-container">
        <div className="content-signout">
         <h3 style={{textAlign:"center"}}>Registro</h3>
         <form onSubmit={handleSubmit}>
          <div className=" mb-3 mt-2">
              <span >Nombre Completo</span>
              <input className="form-control" type="text" id="nombre_completo" name="nombre_completo" value={value.nombre_completo} onChange={handleChange} required/>
            </div>
            <div className=" mb-3">
              <span>CI</span>
              <input className="form-control" type="number" id="ci" name="ci" value={value.ci} onChange={handleChange} required/>
            </div>
            <div className="  mb-3">
              <span>Email</span>
              <input className="form-control" type="email" id="email" name="email" value={value.email} onChange={handleChange} required/>
            </div>
            <div className="  mb-3">
              <span>Placa</span>
              <input className="form-control" type="text" id="placa" name="placa" value={value.placa} onChange={handleChange} required/>
            </div>
            <div className=" mb-3">
              <span>Telefono</span>
              <input className="form-control"type="number" id="telefono" name="telefono" value={value.telefono} onChange={handleChange} required/>
            </div>
            <div className=" mb-3">
              <span>Cargo</span>
              <input className="form-control"type="text" id="cargo" name="cargo" value={value.cargo} onChange={handleChange} required/>
            </div>
            <div className=" mb-3">
              <span>Unidad</span>
              <input className="form-control"type="text" id="unidad" name="unidad" value={value.unidad} onChange={handleChange} required/>
            </div>
            <div className=" mb-3">
              <span>Password</span>
              <input className="form-control"type="text" id="password" name="password" value={value.password ? value.password : ""} onChange={handleChange} required/>
            </div>

            <div style={{textAlign:"center"}} className="form-group mt-3">
              <button type="submit" className="btn btn-primary ">
                REGISTRARSE
              </button>
            </div>

            <div className="signup">
              Ya tienes cueta?
              <button className="btn-main btn-main__green" onClick={() => navigate('/login')}>Iniciar Sesion</button>
            </div>
            </form>
        </div>
       
      </div>
    </div>
  );
}
