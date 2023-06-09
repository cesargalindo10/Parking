import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global/global.css";
import AuthGuar from "./guard/AuthGuard";
import CustomerPage from "./components/customerMovil/CustomerPage";
import Header from "./components/customerMovil/Header";
import PublicHeader from "./components/global/header/PublicHeader";
import Inicio from "./pages/inicio/Inicio";
import Informaciones from "./pages/Informaciones/Informaciones";
import SigUp from "./pages/login/SigUp"
import Private from "./pages/private/Private"
import Login from "./pages/login/Login";
import Reportes from "./components/reportes/Reportes";
function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route exact path="/" element={<Inicio/>} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuar />}>
            <Route path="/*" element={<Private />} />
          </Route>
          <Route path="/customer-page" element={<CustomerPage />} />
          <Route path="/informaciones"  element={<Informaciones/>}/>
          <Route path="/registro" element={<SigUp/>}/>
          <Route path="/reporte" element={<Reportes/>}/>
        </Routes>
       
    </BrowserRouter>
  );
}

export default App;
