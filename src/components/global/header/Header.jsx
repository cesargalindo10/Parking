import { useSelector } from 'react-redux';
import './styles/Header.css'
import {FiLogOut} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
export default function Header({children}) {
 const user = useSelector(state => state.user)
 const navigate = useNavigate()
 const logOut=()=>{
    navigate("/login")
 }

  return (
    <div>
      <div className="container-header">
        <h5 className='tc-white pe-4'>hola, {user.nombre}</h5>
        <button onClick={()=>logOut()} className=' btn-logout tc-white pe-4'><FiLogOut/></button>
      </div>
      {children}
    </div>
  );
}
