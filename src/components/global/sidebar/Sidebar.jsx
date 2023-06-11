import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { FaBars, FaMoneyBillAlt,FaParking } from "react-icons/fa";
import { MdDashboard, MdInsertInvitation } from "react-icons/md";
import { HiUsers,HiOutlineDocumentReport } from "react-icons/hi";
import { AiFillCustomerService,AiFillControl,AiTwotoneNotification } from "react-icons/ai";
import { BsInfoSquareFill,BsExclamationCircleFill } from "react-icons/bs";
import { GiDiscussion} from "react-icons/gi"
import {TbParking} from "react-icons/tb"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//import "./styles/Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const permission = useSelector(state=>state.user)
  const no=<MdDashboard/>
  const icons = {
    parqueo: <TbParking />,
    informacion: <BsInfoSquareFill />,
    usuarios: <HiUsers />,
    solicitud: <MdInsertInvitation />,
    tarifas: <FaMoneyBillAlt />,
    reclamos: <BsExclamationCircleFill />,
    plazas: <FaParking />,
    customers: <AiFillCustomerService />,
    asignar: <GiDiscussion />,
    reportes: <HiOutlineDocumentReport />,
    mora: <AiTwotoneNotification />,
    roles:<AiFillControl/>,
    records: <HiOutlineDocumentReport/>
  }
  
  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img style={{ height: "40px" }} src={logo} />
          </h1>
          <div className="container-bars">
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars ">
            <FaBars style={{ color: "#000000", }} onClick={toggle} />
          </div>
          </div>

        </div>
        {Object.entries(permission.permission).map(([clave, item]) =>(
          <NavLink to={item.name} key={clave} className="link" activeclassname="active">
            <div className="icon">{icons[item.name]}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
              {item.description}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
