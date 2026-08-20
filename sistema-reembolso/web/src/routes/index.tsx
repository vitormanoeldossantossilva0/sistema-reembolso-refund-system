import { useAuth } from "../hooks/useAuth";

import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { EmployeeRoutes } from "./employeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loading";


export function Routes() {
  const {session, isLoading} = useAuth()



  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }


  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
