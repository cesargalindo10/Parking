import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { APISERVICE } from "../../services/api.service";
import UserModal from "./UserModal";
import './styles/User.css'

export default function User() {
  const [users, setUsers] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [pageInfo, setPageInfo] = useState(1);
  const [roles, setRoles] = useState([]);
  const [existe, setExiste] = useState(false)


  const getUsers = async (page = 1) => {
    let url = "usuario/?";
    let params = `page=${page}`;
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setUsers(response.pageInfo.users);
      setPageInfo(response.pageInfo)
    }
  };
  const createUser = async (user) => {
    let url = "usuario/create-user";
    const {success} = await APISERVICE.post(user, url);
    if (success) {
      console.log("Usuario agregado exitosamente!");
      setExiste(false)
    }else{
      setExiste(true)
    }
    getUsers();
  };
  const updateUser = async (body) => {
    const url = "usuario/update-user/?";
    const params = `idUser=${body.id}`
    const { success } = await APISERVICE.post(body, url, params);
    if (success) {
      console.log("Usuario Actualizado");
    }else{
      setExiste(true)
    }
    
    getUsers();
  };
  const deleteUser = async (id) => {
    let url = "usuario/delete?";
    let params = `idUser=${id}`;
    const response = await APISERVICE.delete(url, params);
    if (response.status === 200) {
      getUsers();
      console.log("Usuario eliminado con exito!");
    }

  };
  const getRoles= async()=>{
    const url = "usuario/get-roles";
    const params = ``;
    const response = await APISERVICE.get(url, params);
    if (response) {
      setRoles(response.roles);
    }
  }

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  return (
    <div className="container-user">
      <h3 className="color-main mt-4 mb-4">Usuarios</h3>
      <button className="btn-main btn-main__purple mb-3" onClick={()=>setModalShow(true)}>Nuevo</button>
      <UserTable
        users={users}
        deleteUser={deleteUser}
        setUserUpdate={setUserUpdate}
        setModalShow={setModalShow}
        pageInfo={pageInfo}
        getUsers={getUsers}
      
      />
      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createUser={createUser}
        userUpdate={userUpdate}
        setUserUpdate={setUserUpdate}
        updateUser={updateUser}
        roles = {roles}
        existe = {existe}
       
        
      />
    </div>
  );
}
