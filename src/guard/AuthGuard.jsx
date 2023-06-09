import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to="/customer-page" />;
const guardiaValidationFragment = <Navigate replace to="/reporte" />;
export const AuthGuar = () => {
  const user = useSelector((store) => store.user);
  return user.email ? (
    user.rol === "administrador" || user.rol === "operador" ? (
      PrivateValidationFragment
    ) : user.rol === "guardia" ? (
      guardiaValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to="/login" />
  );
};
export default AuthGuar;
