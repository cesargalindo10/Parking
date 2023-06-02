
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {APISERVICE} from "../../../services/api.service"
import "./styles/Login.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/state/user";
export default function Login() {
  const [user, setFormData] = useState({
    email: "",
    password: "",
  });
  
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
    const response = await APISERVICE.post(user,url, "");
    if (response.success) {
        let userLoged = {
            email: user.email,
            accessToken: response.accessToken,
            rol: Object.keys(response.rol)[0],
          };
          dispatch(createUser(userLoged));
      navigate(`/dashboard`);
    } else {
      setError(<p style={{ textAlign: "center", color: "red" }}>*Error de Usuario o Contraseña </p>);
    }
  };
  return (
    <div className="bg-img">
      <div className="content">
        <header>Bienvenidos al Sistema de Parking</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-lock"></span>
            <input
              id="email"
              type="email"
              className=""
              name="email"
              placeholder="Introdusca su correo"
              value={user.email}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{}</div>
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Introdusca su contraseña"
              className=""
              name="password"
              required
            />
            <div className="invalid-feedback">{}</div>
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox"></div>
          </div>
          <div className="pass">
            <a href="" className="text-small">
              Olvido su Contraseña?
            </a>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary ">
              INICIAR SESION
            </button>
          </div>

          <div className="signup">
            Eres nuevo?
            <a href="#">Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
  );
}
