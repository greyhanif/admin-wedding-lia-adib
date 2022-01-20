import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { mainListItems, secondaryListItems } from "./ListItems";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

import Andon from "./Andon";

import axios from "axios";
// import axiosJWT from "../../utils/axiosJWT";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import PrimarySearchAppBar from "../../components/appBar/PrimarySearchAppBar";
// import ResponsiveDrawer from "../../components/drawer/DrawerNew";
// import ClippedDrawer from "../../components/drawer/DrawerNew";

import { useRecoilState, useRecoilValue } from "recoil";
import { nameState, tokenState, asState, expireState, authUserState, dashboardState } from "../../store";

const drawerWidth = 240;

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const auth = useRecoilValue(authUserState);
  const navigate = useNavigate();

  const [name, setName] = useRecoilState(nameState);
  const [token, setToken] = useRecoilState(tokenState);
  const [as, setAs] = useRecoilState(asState);
  const [expire, setExpire] = useRecoilState(expireState);
  const dashboard = useRecoilValue(dashboardState);

  useEffect(() => {
    // refreshToken();
    // getDashboard();
    // getLogs();
  }, []);

  const decoded = jwt_decode(sessionStorage.getItem("token"));
  setName(decoded.name);
  sessionStorage.setItem("name", decoded.name);
  setAs(decoded.as);
  sessionStorage.setItem("as", decoded.as);
  setExpire(decoded.exp);
  sessionStorage.setItem("expire", decoded.exp);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Andon dashboard={dashboard} />
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
