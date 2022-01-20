import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Andon from "./Andon";
import Contact from "../contact/Contact";

import Scanner from "../../components/scanner/Scanner";
import { useRecoilState, useRecoilValue } from "recoil";
import { asState, authUserState, dashboardState, expireState, nameState, tokenState } from "../../store";
import axios from "axios";

import Ticket from "../ticket/Ticket";
import { Container, Grid } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import ContactCRUD from "../contact/ContactCRUD";
import RelationshipCRUD from "../relationship/RelationshipCRUD";
import PrintPass from "../print/PrintPass";
import PrintLabel from "../print/PrintLabel";
import PrintLabelSmall from "../print/PrintLabelSmall";
import ConfigurationCRUD from "../configuration/ConfigurationCRUD";
import TicketCRUD from "../ticket/TicketCRUD";
import ScannerCheckOut from "../../components/scanner/ScannerCheckOut";
// import ScannerNew from "../../components/scanner/ScannerNew";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import DistributedCRUD from "../distributed/DistributedCRUD";
import ScannerDistributed from "../../components/scanner/ScannerDistributed";
import PrintAttendance from "../print/PrintAttendance";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6d5128",
    },
    secondary: {
      main: "#bdbdbd",
    },
  },
});

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   const auth = useRecoilValue(authUserState);
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

  const [auth, setAuthUser] = useRecoilState(authUserState);

  const Logout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/logout`);
      sessionStorage.removeItem("token");
      navigate("/login");
      setAuthUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography
        sx={{
          m: 0,
          p: 2,
        }}
        // variant="overline"
        display="content"
        // gutterBottom
      >
        {sessionStorage.getItem("name")} as {sessionStorage.getItem("as")}
      </Typography>
      <Divider />
      <Typography
        sx={{
          p: 2,
        }}
        variant="overline"
        display="content"
        gutterBottom
      >
        Tabel
      </Typography>
      <Divider />
      <List>
        {["Andon", "Contact", "Ticket", "Relationship", "Distributed"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/" + text.toLowerCase()}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        sx={{
          p: 2,
        }}
        variant="overline"
        display="content"
        gutterBottom
      >
        Counter
      </Typography>
      <Divider />
      <List>
        {["Check-In", "Check-Out", "Scan Distributed"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/" + text.toLowerCase().replace(/\s+/g, "-")}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        sx={{
          p: 2,
        }}
        variant="overline"
        display="content"
        gutterBottom
      >
        Print
      </Typography>
      <Divider />
      <List>
        {["Print Ticket", "Print Label Shipping", "Print Label Small", "Print Attendance"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/" + text.toLowerCase().replace(/\s+/g, "-")}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        sx={{
          p: 2,
        }}
        variant="overline"
        display="content"
        gutterBottom
      >
        Configuration
      </Typography>
      <Divider />
      <List>
        {["Configuration"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/" + text.toLowerCase().replace(/\s+/g, "-")}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div"> */}
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Wedding Information System
          </Typography>
          <IconButton onClick={Logout} color="inherit">
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            backgroundColor: "secondary.light",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "secondary.light",
        }}
      >
        <Toolbar />
        <Container maxWidth sx={{ mt: 2, mb: 2 }}>
          {/* <Grid container spacing={3}> */}
          <Routes>
            <Route exact path="/andon" element={<Andon />} />
            <Route exact path="/contact" element={<ContactCRUD />} />
            <Route exact path="/ticket" element={<TicketCRUD />} />
            <Route exact path="/check-in" element={<Scanner />} />
            <Route exact path="/check-out" element={<ScannerCheckOut />} />
            <Route exact path="/relationship" element={<RelationshipCRUD />} />
            <Route exact path="/print-ticket" element={<PrintPass />} />
            <Route exact path="/print-label-shipping" element={<PrintLabel />} />
            <Route exact path="/print-label-small" element={<PrintLabelSmall />} />
            <Route exact path="/configuration" element={<ConfigurationCRUD />} />
            <Route exact path="/distributed" element={<DistributedCRUD />} />
            <Route exact path="/scan-distributed" element={<ScannerDistributed />} />
            <Route exact path="/print-attendance" element={<PrintAttendance />} />
          </Routes>
          {/* </Grid> */}
        </Container>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
