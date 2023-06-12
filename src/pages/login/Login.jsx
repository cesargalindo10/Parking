import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APISERVICE } from "../../services/api.service";
import { useDispatch } from "react-redux";
import { createUser, resetUser } from "../../redux/state/user";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [user, setFormData] = useState({
    email: "",
    password: "",
  });
const [error,setError]=useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = "usuario/login/";
    const response = await APISERVICE.post(user, url, "");
    if (response.success) {
      let userLoged = {
        email: user.email,
        accessToken: response.accessToken,
        rol: Object.keys(response.rol)[0],
        permission:response.permission,
        id: response.id,
        nombre:response.nombre
      };
      dispatch(createUser(userLoged));
      navigate(`/parqueo`);
    } else {
      messageToastError(response.message)
      setError(<p style={{ textAlign: "center", color: "red" }}>*Error de Usuario o Contraseña </p>);
    }
  };
const handletoRegister=()=>{
  navigate('/registro')
}
const messageToastError = (sms) => {
  toast.error(sms);
}
  useEffect(() => {
    dispatch(resetUser());
  }, []);

  return (
    <div>
      <div  className="login-container">
        <div className="content-login">
          <h3 className="title">Bienvenidos al Sistema de Parking</h3>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3">

              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                placeholder="Introdusca su correo"
                value={user.email}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">{}</div>
            </div>
            <div className=" mb-3">
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Introdusca su contraseña"
                className="form-control"
                name="password"
                required
              />
            </div>
            <div style={{textAlign:"center"}} className="form-group mt-3">
              <button  type="submit" className="btn btn-primary ">
                INICIAR SESION
              </button>
            </div>
          </form>
          <div className="signup">
              Eres nuevo?
              <button className="btn-green" onClick={()=>handletoRegister()}>Crear cuenta</button>
            </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
