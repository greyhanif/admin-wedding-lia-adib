import React, { useState, useEffect } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

import useSound from "use-sound";
import beepSfx from "../../assets/audio/beep.mp3";
import { styled } from "@mui/material/styles";
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

import DialogCheckIn from "../dialog/DialogCheckIn";
import axios from "axios";
import PrimarySearchAppBar from "../appBar/PrimarySearchAppBar";
import { Alert, AlertTitle, Autocomplete } from "@mui/material";
import { ConstructionOutlined, FamilyRestroomTwoTone } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { attendancesState } from "../../store";
import { useRecoilValue } from "recoil";
import ReactBarcode from "react-jsbarcode";

import moment from "moment";
import "moment/locale/id";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6b0f10",
    },
    secondary: {
      main: "#fcf8f1",
    },
  },
});

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

export default function ScannerCheckOut() {
  const [data, setData] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [resServer, setResServer] = useState("false");
  const [camera, setCamera] = useState(localStorage.getItem("camera"));
  const [getContact, setGetContact] = useState([]);
  const [msg, setMsg] = useState("");
  const [found, setFound] = useState(false);
  const [actuallyNumberOfSouvenirState, setActuallyNumberOfSouvenirState] = useState(1);
  const regex = /[A-Z]{4}\-[A-Z0-9]{4}/g;

  const attendances = useRecoilValue(attendancesState);
  const [selectedAttendance, setSelectedAttendance] = useState({ id: 0, name: "" });

  // const matchCode = data.match(/[A-Z]{4}\-[A-Z0-9]{4}/g);
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
    // RenderCamera();
    HandleGetContact();
    // RenderDialogCheckIn();
    autoGet();
  }, []);

  localStorage.setItem("camera", camera);
  // console.log(numberOfPeopleState);
  const autoGet = () => {
    setData(sessionStorage.getItem("result-qr"));
  };

  const HandleGetContact = async (event) => {
    // event.preventDefault();
    // const matchCode = data.match(regex);
    if (regex.test(data)) {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/attendances-code/${data}`).then((res) => {
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
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    HandleGetContact();
    setFound(true);
    setData("");
    RenderDialogCheckOut();
  };

  const handleCancel = () => {
    setData("");
    setGetContact("");
    setFound(false);
  };

  const payload = {
    actuallyNumberOfSouvenir: actuallyNumberOfSouvenirState,
    nameOfficer: sessionStorage.getItem("name"),
    asOfficer: sessionStorage.getItem("as"),
  };

  const HandleCheckOut = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/check-out/${getContact.ticketCode}`, payload);
      setMsg(response.data.message);
      // RenderDialogCheckIn(response.data.message);
      console.log(response.data);
      setMsg(response.data);
      setData("");
      setFound(false);
      setGetContact([]);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setMsg(error.response.data.message);
      }
    }
  };

  const RenderGreeting = () => {
    return (
      <Box
        sx={{
          my: 0,
          mx: 0,
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h4">
          Selamat Datang
        </Typography>
        <Typography component="h3" variant="h5">
          Silakan scan QR Code pada kamera
        </Typography>
        {msg ? (
          <Typography component="h1" variant="h6">
            {msg.name} Berhasil CHECK-OUT
          </Typography>
        ) : (
          ""
        )}
      </Box>
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
            CheckOut
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </>
    );
  };

  const RenderDialogCheckOut = () => {
    const Img = styled("img")({
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    if (!getContact) {
      return (
        <>
          <DialogTitle>Not Found</DialogTitle>
          <Divider />
          <DialogContent>
            <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Road-sign-no-entry.svg/256px-Road-sign-no-entry.svg.png" />

            <Typography gutterBottom variant="h5" component="div">
              TAMU BELUM CHECK-IN
            </Typography>

            <Button onClick={handleCancel} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
              Batal
            </Button>
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogTitle>Invitation Detail</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography gutterBottom variant="h5" component="div">
              <ReactBarcode value={!getContact.ticketCode ? "false" : getContact.ticketCode} options={{ format: "code128", height: 25, width: 2, margin: 0, fontSize: 20 }} renderer="svg" />
            </Typography>
            <Divider />
            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Nama
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && getContact.name}
            </Typography>
            <Divider />
            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Number of People
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && getContact.numberOfPeople} Orang
            </Typography>
            <Divider />
            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Expected Number of Souvenir
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && getContact.expectedNumberOfSouvenir} Souvenir
            </Typography>

            <Divider />
            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Kota
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && getContact.city}
            </Typography>
            <Divider />
            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Jenis Tamu
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && getContact.remark}
            </Typography>
            <Divider />

            <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
              Durasi Kunjungan
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {getContact && `${moment(getContact.checkInAt, "YYYY-MM-DD HH:mm:ss.SSS Z").format("LTS")} (${moment(getContact.checkInAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow()})`}
            </Typography>
            <TextField
              autoFocus
              value={actuallyNumberOfSouvenirState}
              onChange={(e) => setActuallyNumberOfSouvenirState(e.target.value)}
              margin="dense"
              id="name"
              label="Actually Number Of Souvenir"
              type="number"
              fullWidth
              variant="standard"
            />
            <Button onClick={handleCancel} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
              Batal
            </Button>
            <Button onClick={HandleCheckOut} fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}>
              CheckOut
            </Button>
          </DialogContent>
          <DialogActions></DialogActions>
        </>
      );
    }
  };

  return (
    <ThemeProvider theme={ThemeLiaAdib}>
      {/* <PrimarySearchAppBar /> */}
      {/* <DialogCheckIn data={data} dataContact={getContact} dialogState={openDialog} handleClose={handleClose} /> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h3">
              Check Out
            </Typography>
            <Typography component="h1" variant="h4">
              {sessionStorage.getItem("as")}
            </Typography>
            <Typography component="h3" variant="h6">
              {sessionStorage.getItem("name")}
            </Typography>
          </Box>
          <Divider />
          <Box
            component={Paper}
            sx={{
              my: 2,
              mx: 2,
              p: 0,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {found ? <RenderDialogCheckOut /> : <RenderGreeting />}
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
            {/* <TextField
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
            </TextField> */}
            <Box component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}>
              {/* <RenderCamera /> */}

              {/* <TextField value={data} onSubmit={(event) => setData(event.target.value)} margin="normal" required fullWidth label="Kode Tiket" autoFocus /> */}
              <TextField value={data} onChange={(event) => setData(event.target.value)} margin="normal" required fullWidth label="Kode Tiket" autoFocus />

              {/* <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" /> */}
              {/* <Button onClick={HandleGetContact} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Check In
              </Button> */}
              {/* <Button
                onClick={(event) => {
                  event.preventDefault();
                  // setDialogOpen(true);
                  handleSearch();
                }}
                fullWidth
                variant="inherit"
                sx={{ mt: 0, mb: 2 }}
                autoFocus
              >
                Check-In
              </Button> */}
              <Grid container></Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={attendances}
              isOptionEqualToValue={(option) => option.id}
              getOptionLabel={(option) => option.id + " - " + option.name + " - " + option.ticketCode + " - " + option.city + " - " + (option.stateOfAttendance === "check-out" ? "CHECK-OUT" : "CHECK-IN")}
              defaultValue={attendances.id}
              onChange={(event, newValue) => {
                // setData(newValue);
                if (newValue === null) {
                  return 0;
                } else if (newValue.stateOfAttendance === "check-out") {
                  // console.log(newValue.tickets[0]);
                  setData("SUDAH CHECK-OUT");
                } else {
                  // console.log(newValue.tickets[0]);
                  setData(newValue.ticketCode);
                }
                // setData(newValue === null ? "" : newValue.tickets[0].length === "0" ? "TIKET BELUM DIBUAT" : newValue.tickets[0].ticketCode);
                // console.log(newValue === null ? "" : newValue.tickets[0].length === "0" ? "TIKET BELUM DIBUAT" : newValue.tickets[0].ticketCode);
              }}
              renderInput={(params) => <TextField {...params} variant="standard" label="Contacts Search" margin="normal" fullWidth />}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
