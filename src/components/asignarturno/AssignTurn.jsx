import { useState, useEffect } from "react";
import { APISERVICE } from "../../services/api.service";
import AssignTurnTable from "./AssignTurnTable";
import AssignTurnModal from "./AssignTurnModal";
import './styles/AssignTurn.css'
import { Toaster, toast } from "react-hot-toast";
import TableTurnos from "./TableTurnos";

export default function AssignTurn() {
  const [users, setUsers] = useState([]);
  const [turnUpdate, setTurnUpdate] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [pageInfo, setPageInfo] = useState(1);
  const [turn, setTurn] = useState([])
  const [turnos,setTurnos] = useState([])
  const [turnoToUpdate, setTurnoToUpdate] = useState({})

  const getUsers = async (page = 1) => {
    let url = "turno-usuario/get-user";
    let params = '';
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setUsers(response);
    }
  };
  const createTurn = async (user) => {
    let url = "turno/create-turn";
    const {success, message} = await APISERVICE.post(user, url);
    if (success) {
      messageToastSuccess(message)
      getUsers();
      getTurno();
    }else{
      messageToastError(message);
    }
  };
  const updateTurn = async (turn) => {
    let url = `turno/update?`;
    let params = `id=${turn.id}`;
    const {success, message} = await APISERVICE.post(turn, url, params);
    if (success) {
      getTurnos()
      getUsers();
      messageToastSuccess(message)
    }else{
      messageToastError(message)
    }
  };
  const getTurno = async () => {
    let url = "turno-usuario/get-turn";
    let params = '';
    const response = await APISERVICE.get(url, params);
    if (response.status === 200) {
      setTurn(response);
    }
  };
  const assignTurn=async(user_id,turn_id)=>{
    let url = `turno-usuario/assign-turn?user_id=${user_id}&turn_id=${turn_id}`;
    let params = '';
    const response = await APISERVICE.get(url, params);
    getUsers();
    messageToastSuccess('Asignado correctamente')
  }

const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

const messageToastError = (sms) => {
    toast.error(sms);
  }

const getTurnos = async () => {
  const url = 'turno/get-turnos';
  const {success, turnos} = await APISERVICE.get(url);
  if ( success) {}
    setTurnos(turnos)
  }

const deleteTurno = async (id) => {
  const url = 'turno/delete-turno/?';
  const params = `id=${id}`
  const {success, message} = await APISERVICE.get(url, params);
  if ( success) {}
    getTurnos();
    getUsers();
    messageToastSuccess(message)
  }
  

  useEffect(() => {
    getUsers();
    getTurno();
    getTurnos()
  }, []);

  return (
    <div className="container-user">
      <h3 className="color-main mt-4 mb-4">Asignar Turno</h3>
      <button className="btn-main btn-main__purple mb-3" onClick={()=>setModalShow(true)}>Nuevo Turno</button>
      <TableTurnos turnos={turnos} setTurnoToUpdate={setTurnoToUpdate} setModalShow={setModalShow} deleteTurno={deleteTurno}/>
      <AssignTurnTable
        users={users}
        turn={turn}
        assignTurn={assignTurn}
        pageInfo={pageInfo}
        getUsers={getUsers}
      />
      <AssignTurnModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createTurn={createTurn}
        turnUpdate={turnUpdate}
        setTurnUpdate={setTurnUpdate}
        updateTurn={updateTurn}
        turnoToUpdate={turnoToUpdate}
        setTurnoToUpdate={setTurnoToUpdate}
      />
      <Toaster position="top-right"/>
    </div>
  );
}
