import React, { useState, useEffect } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { Cameras, Scanner } from "react-instascan";

import useSound from "use-sound";
import beepSfx from "../../assets/audio/beep.mp3";

import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogCheckIn from "../dialog/DialogCheckIn";
import axios from "axios";
import PrimarySearchAppBar from "../appBar/PrimarySearchAppBar";
import { Alert, AlertTitle } from "@mui/material";
import { ConstructionOutlined, FamilyRestroomTwoTone } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const cameras = [
  {
    value: "user",
    label: "Front Camera",
  },
  {
    value: "environment",
    label: "Rear Camera",
  },
];

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function ScannerNew() {
  const [data, setData] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [resServer, setResServer] = useState("false");
  const [camera, setCamera] = useState(localStorage.getItem("camera"));
  const [getContact, setGetContact] = useState([]);
  const [msg, setMsg] = useState("");
  const [found, setFound] = useState(false);
  const regex = /[A-Z]{4}\-[A-Z0-9]{4}/g;
  // const found = data.match(/[A-Z]{4}\-[A-Z0-9]{4}/g);
  // let contact = get
  // if (found) {
  //   setIsCode(true);
  // }

  // MODAL DIALOG
  const [openDialog, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  // END MODAL DIALOG

  useEffect(() => {
    RenderCamera();
    HandleGetContact();
    // RenderDialogCheckIn();
    // autoGet();
    // BeepButton();
    // setTimeout(setData(false), 3000);
    // console.log(found);
  }, []);

  localStorage.setItem("camera", camera);

  const BoopButton = () => {
    const [play] = useSound(beepSfx);
  };

  // console.log(localStorage.getItem("camera"));

  // const autoGet = () => {
  //   if (data === !data) {
  //     HandleGetContact();
  //   }
  // };

  const HandleGetContact = async (event) => {
    // event.preventDefault();
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/counter/${data}`).then((res) => {
        const users = res.data;
        console.log(users);
        setGetContact(users);

        // RenderDialogCheckIn();
      });
      // setTimeout(setFound(true), RenderDialogCheckIn(), 3000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  // console.log(getContact);

  const handleSearch = () => {
    HandleGetContact();
    setFound(true);
    setData(false);
    RenderDialogCheckIn();
  };

  const handleCancel = () => {
    setData(false);
    setGetContact("");
    setFound(false);
  };

  const payload = {
    ticketCode: data,
  };
  // console.log(data);
  // const HandleCheckIn = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://192.168.1.5:5000/tickets/", payload);
  //     setMsg(response.data.message);
  //     RenderDialogCheckIn();
  //   } catch (error) {
  //     if (error.response) {
  //       setMsg(error.response.data.message);
  //     }
  //   }
  // };

  const RenderGreeting = () => {
    return (
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          Selamat Datang
        </Typography>
        <Typography component="h1" variant="h4">
          Silakan scan QR Code pada kamera
        </Typography>
      </Box>
    );
  };

  const RenderCamera = () => {
    return (
      <Cameras>
        {(cameras) => (
          <div>
            <h1>Scan the code!</h1>
            <Scanner camera={cameras[0]} onScan={onScan}>
              <video style={{ width: 400, height: 400 }} />
            </Scanner>
          </div>
        )}
      </Cameras>
    );
  };

  const RenderManualDialogCheckIn = () => {
    return (
      <>
        <DialogTitle>Detail Contact</DialogTitle>
        <Divider />
        <DialogContent>
          <Divider />
          <TextField autoFocus margin="dense" id="name" label="Number Of People" type="number" fullWidth variant="standard" />
          <Button onClick={handleCancel} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
            Batal
          </Button>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}>
            CheckIn
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </>
    );
  };

  const RenderDialogCheckIn = () => {
    return (
      <>
        <DialogTitle>Detail Contact</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography gutterBottom variant="h4" component="div">
            {getContact.length != 0 && getContact.tickets[0].ticketCode}
          </Typography>
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Nama
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {getContact.length != 0 && getContact.contacts[0].name}
          </Typography>
          <Divider />
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Kota
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {getContact.length != 0 && getContact.contacts[0].city}
          </Typography>
          <Divider />
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Jenis Tamu
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {getContact.length != 0 && getContact.relationshipCode[0].code} - {getContact.length != 0 && getContact.relationshipCode[0].detail}
          </Typography>
          <Divider />
          <TextField autoFocus margin="dense" id="name" label="Number Of People" type="number" fullWidth variant="standard" />
          <Button onClick={handleCancel} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
            Batal
          </Button>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}>
            CheckIn
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <PrimarySearchAppBar /> */}
      {/* <DialogCheckIn data={data} dataContact={getContact} dialogState={openDialog} handleClose={handleClose} /> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h2">
              Check In Counter
            </Typography>
            <Typography component="h1" variant="h1">
              1
            </Typography>
          </Box>
          <Divider />
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 8,
              p: 2,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {found ? <RenderDialogCheckIn /> : <RenderGreeting />}
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h4">
              QR Code
            </Typography>
            <TextField
              sx={{ mt: 3 }}
              id="filled-select-currency-native"
              size="small"
              fullWidth
              select
              label="Select Camera"
              onChange={(event) => setCamera(event.target.value)}
              value={camera}
              // defaultValue={"a"}
              SelectProps={{
                native: true,
              }}
              // helperText="Pilih asal kota"
              variant="filled"
            >
              {cameras.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <RenderCamera />
              {/* <TextField margin="normal" required fullWidth id="email" label="Kode Tiket" name="email" autoComplete="email" autoFocus /> */}
              {/* <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" /> */}
              {/* <Button onClick={HandleGetContact} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Check In
              </Button> */}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  // setDialogOpen(true);
                  handleSearch();
                }}
                fullWidth
                variant="inherit"
                sx={{ mt: 0, mb: 2 }}
                autoFocus
              >
                Check-In
              </Button>
              <Grid container></Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
