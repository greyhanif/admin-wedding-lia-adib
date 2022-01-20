import ResponsiveDrawer from "./views/dashboard/ResponsiveDrawer";
// import Router from "./router";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import { authUserState, tokenState } from "./store";
import { useRecoilValue } from "recoil";
import DashboardNew from "./views/dashboard/DashboardNew";
import Router from "./router";
import Internal from "./router/internal";
import Scanner from "./components/scanner/Scanner";

function App(props) {
  const navigate = useNavigate();
  const auth = useRecoilValue(authUserState);
  const token = sessionStorage.getItem("token");

  // {
  //   !auth === false && navigate("/login");
  // }

  // {
  //   !token === false && navigate("/login");
  // }

  return (
    <div>
      {/* <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<DashboardNew />} />
      </Routes> */}
      {/* <ResponsiveDrawer /> */}
      {/* <ResponsiveDrawer /> */}

      {!token ? <Router /> : <ResponsiveDrawer />}
      {/* <Scanner /> */}
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <Login />
//       {/* <Dashboard /> */}
//     </div>
//   );
// }

export default App;
