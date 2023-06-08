import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/Header.css"
import { useNavigate } from 'react-router-dom';

const PublicHeader = ({children}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate()

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    navigate("/login")
  };

  return (
    <header  className="header" >
      <nav className="navbar navbar-expand-lg navbar-light " style={{ height: '10vh' }}>
        <div className="container">
          <Link to="/" style={{color:"#fff"}} className="navbar-brand">SISTEMA DE ADMINISTRACION DE PARQUEO</Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={ `collapse navbar-collapse${isNavOpen ? ' show' : ''}`}
          >
            <ul className="navbar-nav ml-auto text-center">
              <li className="nav-item">
                <Link to="/" style={{color:"#fff"}}  className="nav-link" onClick={toggleNav}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:"#fff"}}  to="/informaciones" className="nav-link" onClick={toggleNav}>Informaciones </Link>
              </li>
              <li className="nav-item">
                <Link style={{color:"#fff"}}  to="/contacto" className="nav-link" onClick={toggleNav}>Contacto</Link>
              </li>
              <li className="nav-item">
                <button  href="/login" className={isNavOpen ? "btn btn-primary":"inicio-sesion btn btn-primary"} onClick={toggleNav}>Iniciar Sesion</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </header>
  );
};

export default PublicHeader;
