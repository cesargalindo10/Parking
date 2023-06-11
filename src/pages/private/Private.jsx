import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Sidebar from "../../components/global/sidebar/Sidebar";
import Header from "../../components/global/header/Header";
import Dashboard from "../Dashboard";
import User from "../../components/user/User";
import Customer from "../../components/customer/Customer";
import Information from "../../components/information/Information";
import Tarifa from "../../components/pago/Tarifa"
import AssignTurn from "../../components/asignarturno/AssignTurn";
import Claim from "../../components/claim/Claim";
import ParkingRequest from "../../components/ParkingRequest/ParkingRequest";
import Parking from "../../components/Parking/Parking";
import Config from "../../components/config/Config";
import Plazas from '../../components/plaza/Plazas'
import Reports from "../../components/reports/Reports";
import Mora from "../../components/mora/Mora";
import Roles from "../../components/roles/Roles";
import Records from "../../components/records/Records";
function Private() {
  return (
    <Sidebar>
      <Header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<User />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/informacion" element={<Information />} />
          <Route path="/tarifas" element={<Tarifa />} />
          <Route path="/asignar" element={<AssignTurn />} />
          <Route path="/reclamos" element={<Claim />} />
          <Route path="/solicitud" element={<ParkingRequest />} />
          <Route path="/parqueo" element={<Parking />} />
          <Route path="/config" element={<Config />} />     
          <Route path="/plazas" element={<Plazas/>} />     
          <Route path="/reportes" element={<Reports/>} />     
          <Route path="/mora" element={<Mora/>} />     
          <Route path="/roles" element={<Roles/>}/>
          <Route path="/records" element={<Records/>} />     

        </Routes>
      </Header>
    </Sidebar>
  );
}
export default Private;
