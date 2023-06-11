import React, { useState } from "react";
import { APISERVICE } from "../../services/api.service";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import RolTable from "./RolTable";

const permisos = [
  "dashboard",
  "parqueo",
  "informacion",
  "usuarios",
  "solicitud",
  "tarifas",
  "reclamos",
  "plazas",
  "customers",
  "asignar",
  "reportes",
  "mora",
  "roles",
];

export default function Roles() {
  const [selectedPermisos, setSelectedPermisos] = useState([]);
  const [nombreRol, setNombreRol] = useState("");
  const [roles, setRoles] = useState([]);

  const handleCheckboxChange = (permiso) => {
    if (selectedPermisos.includes(permiso)) {
      setSelectedPermisos(selectedPermisos.filter((p) => p !== permiso));
    } else {
      setSelectedPermisos([...selectedPermisos, permiso]);
    }
  };
  const handleChange = (e) => {
    setNombreRol(e.target.value);
  };
  const handleCreateRol = ()=>{
    if(nombreRol){
        crearRol();
        setSelectedPermisos([])
        
    }else{
      messageToastError("EL campo no debe estar vacio")
    }

  }
  const crearRol = async () => {
    const url = "usuario/create-rol?";
    const params = `nombre=${nombreRol}`;
    const response = await APISERVICE.post(selectedPermisos, url, params);
    if (response.success) {
      console.log(response.status)
      messageToastSuccess("Rol creado con exito");
      setNombreRol('')
      getRoles();
    }else{
      messageToastError("EL rol ya existe")
    }
  };
  const getRoles = async () => {
    const url = "usuario/get-roles";
    const params = ``;
    const response = await APISERVICE.get(url, params);
    if (response) {
      setRoles(response.roles);
    }
  };
  const deleteRol = async(nombre)=>{
    const url = "usuario/delete-rol?";
    const params = `nombre=${nombre}`
    const response = await APISERVICE.delete(url,params);
    if(response.success){
      
        messageToastSuccess("Rol Elimado con exito");
        getRoles();
        
    }else{
      messageToastError("Rol no a sido eliminado")
    }
  }
  const messageToastSuccess = (sms) => {
    toast.success(sms);
  };
  const messageToastError = (sms) => {
    toast.error(sms);
  };

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div className=" d-flex container mt-4">
      <div className="container">
        <h2>Selecciona los permisos:</h2>
        {permisos.map((permiso) => (
          <div key={permiso}>
            <input
              className="form-check-input"
              type="checkbox"
              id={permiso}
              checked={selectedPermisos.includes(permiso)}
              onChange={() => handleCheckboxChange(permiso)}
            />
            <label className="ms-3" htmlFor={permiso}>
              {permiso}
            </label>
          </div>
        ))}
        <h4>Nombre del nuevo rol:</h4>
        <div className="d-flex">
          <div>
          <input className="form-control" type="text" value={nombreRol} onChange={handleChange}/>      
          </div>
          <button style={{height:'35px'}} onClick={() => handleCreateRol()}  className=" ms-3 btn-main btn-main__purple ">
            Crear Rol
          </button>
        </div>
      </div>
      <div className="container">
        <RolTable 
            roles={roles}
            deleteRol={deleteRol}
        
        />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
