import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login";
import { Treino } from "./Page/Treino";
import { TreinoProvaider } from "./contexts/TrinoContext";

export function Router() {
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("@gymcityauth.token");
    return token ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/treino"
        element={
          <TreinoProvaider>
            <Treino />
          </TreinoProvaider>
        }
      />
    </Routes>
  );
}
