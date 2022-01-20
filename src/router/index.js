import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Scanner from "../components/scanner/Scanner.jsx";
// import Scanner from "../components/scanner/Scanner.jsx";
import Dashboard from "../views/dashboard/Dashboard.js";
import DashboardNew from "../views/dashboard/DashboardNew.jsx";
import Realtime from "../views/dashboard/Realtime.js";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

function Router(props) {
  return (
    // <BrowserRouter>

    <Routes>
      {/* <DashboardNew /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/realtime" element={<Realtime />} />
      <Route path="/scanner" element={<Scanner />} />
    </Routes>
    // </BrowserRouter>
  );
}

export default Router;
