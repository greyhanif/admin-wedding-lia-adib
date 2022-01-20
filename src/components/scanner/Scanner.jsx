import React, { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import DialogCheckIn from "../../components/dialog/DialogCheckIn";
import axios from "axios";

import { Autocomplete } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";
import ReactBarcode from "react-jsbarcode";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./scanner.css";

import moment from "moment";
import "moment/locale/id";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6d5128",
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

export default function Scanner() {
  const [data, setData] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [resServer, setResServer] = useState("false");
  const [camera, setCamera] = useState(localStorage.getItem("camera"));
  const [getContact, setGetContact] = useState([]);
  const [msg, setMsg] = useState("");
  const [found, setFound] = useState(false);
  const [numberOfPeopleState, setNumberOfPeopleState] = useState(1);

  const contacts = useRecoilValue(contactsState);
  const [selectedContact, setSelectedContact] = useState({ id: 0, name: "" });

  const regex = /[A-Z]{4}\-[A-Z0-9]{4}/g;

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
  }, []);

  const HandleGetContact = async (event) => {
    // event.preventDefault();
    // const matchCode = data.match(regex);
    if (regex.test(data)) {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/counter/${data}`).then((res) => {
          const users = res.data;
          console.log(users);
          setGetContact(users);

          // RenderDialogCheckIn();
        });
        // console.log(getContact);
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
    RenderDialogCheckIn();
  };

  const handleCancel = () => {
    setData("");
    setGetContact("");
    setFound(false);
  };

  const payload = {
    contactId: getContact.length != 0 && getContact.contacts[0].id,
    name: getContact.length != 0 && getContact.contacts[0].name,
    city: getContact.length != 0 && getContact.contacts[0].city,
    ticketCode: getContact.length != 0 && getContact.tickets[0].ticketCode,
    numberOfPeople: numberOfPeopleState,
    remark: getContact.length != 0 && getContact.relationshipCode[0].detail,
    typeOfAttendance: "undangan",
    isVIP: getContact.length != 0 && getContact.tickets[0].isVIP === true ? true : false,
    expectedNumberOfSouvenir: getContact.length != 0 && getContact.tickets[0].numberOfSouvenir,
    nameOfficer: sessionStorage.getItem("name"),
    asOfficer: sessionStorage.getItem("as"),
  };

  const HandleCheckIn = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/check-in`, payload);
      setMsg(response.data.message);
      // RenderDialogCheckIn(response.data.message);
      console.log(response.data);
      setMsg(response.data);
      setData("");
      setGetContact("");
      setFound(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const RenderGreeting = () => {
    const Img = styled("img")({
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    return (
      <Box
        sx={{
          // my: 4,
          // mx: 4,
          p: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          square: "false",
          backgroundImage:
            "url(https://lh3.googleusercontent.com/fife/AAWUweVzILbASc1AJuvtEEAUviz5CFcSTifhKZuXN53f1CbilWlxWgfg2YQfhZNLEdw4niAzZzB3f00tndCgJHEQ322MCqa10dYF82T-y37pYrC9ETovOe8Abw-4-xUPNRSkGNraFXfrweRqM5eRqdE1-oFemL6MPkpr4gGH0TtA0QUZ8UtCTocyH0R0IwYOgX1R1LvY9xGQYfve6UKRQfsHjnRp4EaXqH1EaOGnGy8574plavTq5ZNJjuiuXwAi8ufQFvG5Rl4Yo5hTVPZczTNBWtFIjWi9k2CwgOpGve8oSr1bqyXANCjRCEWMdQDo9FUrY4whWpnehUmFvm4GOLSvEin0pyuSbRbGlbFYXmlqSbT_MUB2pn5E89fR-4aaJgRQnR3DRB1n2UY9LWOxoCIf0zCi_e-N7ZZzmhlZbz1sTmTmmFxVQSPUw0Mxd297kvsTDcrJa-tLz66QPnOHuiBockFQHMxcJc0F8AkSBdXSoa5EQoHAioy1VdNCIU1UXDXLUpA8SXmfLt7Pp352u23PMDLieKBB6XqUxg_1kVSc22zKArAfRqioMr8khnkB14SpzrGiPbq61M1e6ttn9QpCB7lpHddun2kzdpxv81kKF4JURMCzg9M3LjH96z9i7NbHnj-YM38bcKXjSl0K6d2O6IjJEwwmPWOfKN1r4kp4nl8beu4oSCxlXXEk3cldGLrowEd5dSHW9zkFj942_exhkZq4oFS_rLdOSg=w1280-h975-ft)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <Typography component="h2" variant="h2">
          Selamat Datang
        </Typography>
        <Typography component="h3" variant="h5">
          di Resepsi Pernikahan Lia & Adib
        </Typography> */}
        {/* <h2 className="scanner-greeting">Selamat Datang di Resepsi</h2> */}

        {msg ? (
          <Typography m={4} align="center" component="h1" variant="h4">
            <Img
              alt="access-granted"
              src="https://lh3.googleusercontent.com/fife/AAWUweUkl3ct1drC5mF5aSyzoEqukKZsVRWypeEk428mOLgERHpn9TjgdcSBz5Taf8MOD59Z6KNxHMBuOK49n5qq0sdv_gZ_kTxIdP-mO0EcomllWUHbCWsAXY-j_26Q_qFOYv8UFtTzg5BtymWZUgC7w-m87j6YuVqnbPo9ssGMv3VP8LATWRvomCca_qCfScUQ-UPe9cTbJjtmNvCZEKgzPqyduN7t8ZdUIDlrkGhcbarEsY7a8Ja4ifqKXR9pNUrUfKE4LbaOe1AwcXgUDnf5ZnpnSR9cqt0nvUy7Zsxvmeik5alX_zc3sRAJaoTPcVo-arK1xg3E3sVzehYC_krsy6f_T16Li6JglK0WcKf3IJWfhXtgsEa9DqtBvQjtgN4wW8hEh2Vp0GLxLuq2599KD9q77IlxnEyy08kEIWc_CFKMyt7EVuLGpqbs2WRk5Uh1zzvRA0FbahZQ4ku8vhRaipfT2-HMu6ooCpFiiIio_dtmEQkke-kEUzcCJ-IekESK60UHID4b2DfgnbhOh4pbGISG_v_j1vGWAqTXmIU_c5oj0S2clZf8j_z0APclvCkki8S01wl19n8ndpv8D5OI9tcwxIkHdj77ILbiNBL1iYo7OO_NJYtKwdIh7z_VbfZaGrbmuUfn4SKpkVa1LVMVkdlxr78sUFF4HmfT4qx3VAnrUYx6hKKFTCUegOqasE6xWpMl20NpIoTnwLzhBWmjMkAZctTETUqWjw=w346-h216-k-ft"
            />
            <h2 className="scanner-greeting-remarks">CHECK-IN BERHASIL</h2>

            <h2 className="scanner-greeting-name">{msg.name}</h2>
            {/* <h2 className="scanner-greeting-name">{msg.city}</h2> */}
            <h4 className="scanner-greeting-time">Jam {moment(msg.checkInAt).format("LTS")}</h4>
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
            CheckIn
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </>
    );
  };

  const RenderDialogCheckIn = () => {
    const formatingLogo = (data) => {
      if (data === "PTMN") {
        return <img alt="Pertamina" src={"https://upload.wikimedia.org/wikimedia/id/b/b8/Pertamina.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BPIX") {
        return <img alt="BPI" src={"http://www.bhimasenapower.co.id/upload/20160309082009-header-logo-bhimasena.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BPNX") {
        return <img alt="BPN" src={"https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_BPN-KemenATR_%282017%29.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BNMR") {
        return <img alt="Bina Marga" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Coat_of_arms_of_Central_Java.svg/1200px-Coat_of_arms_of_Central_Java.svg.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BPTC") {
        return <img alt="Bina Marga" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Coat_of_arms_of_Central_Java.svg/1200px-Coat_of_arms_of_Central_Java.svg.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BPTC") {
        return <img alt="Bina Marga" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Coat_of_arms_of_Central_Java.svg/1200px-Coat_of_arms_of_Central_Java.svg.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "BPTJ") {
        return <img alt="Pemalang Batang Toll Road" src={"https://assets.karirpad.com/uploads/employer/logo/2021-05/c1239b7c7723da2abe819901e133e8b4.jpg"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "LPPU") {
        return <img src={"https://upload.wikimedia.org/wikimedia/id/8/88/Logo_UNDIP.jpg"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "PPKX") {
        return <img src={"https://pfr.pl/dam/jcr:97936b4a-90e8-4585-90b7-e91ca572ecf1/PPK_logo.2021-08-27-12-54-15.jpg"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "PUPR") {
        return <img src={"https://1.bp.blogspot.com/-w6EYK9eOjPI/YGfwp8XKTTI/AAAAAAAAINo/H9j-XeMQhrA_YUa3XeNlg9JIj6VGKhbNQCLcBGAsYHQ/s1221/LOGO-PUPR.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else if (data === "WSKT") {
        return <img src={"https://upload.wikimedia.org/wikipedia/id/thumb/7/73/Waskita_Karya.svg/1200px-Waskita_Karya.svg.png"} style={{ width: 128, borderRadius: "5%" }} />;
      } else {
        return data;
      }
    };

    const formatingImgProfile = (url, gender) => {
      if (url) {
        return <img alt="Pertamina" src={url} style={{ width: 200, borderRadius: "5%" }} />;
      } else if (gender === "M") {
        return (
          <Img
            alt="complex"
            src="https://lh3.googleusercontent.com/fife/AAWUweXHfMHfa_NgArJktpboFWO-oNe1a1eCezuGvfW9ffu9nxHxgzmerI5ORDqCQb-grP9Z8w0PBi9VrW9HEF7LPNDqOMbgL5G5tF6OfE834fb1a-MOSiNnsENLsoPd0kLC2oAAnZLWfJi-trSXDedQxHTs3WuRsmTNoZZlAAhF-2AFsdygS8WUT646FndYDOGPoSUnCOPlUlriycyn6ZHeulxFRrPjC4OKRy2HNbBwLVAcveYmu7f4uj42tCLAviP2ItRKpYi-vFZ2CLoP7ev1eanBctMMaA7bXROXR34aNZo0J86auqKRgKV7MS3eszb0J8Q3yyyeGG2pUQAPTa5MvJwZYSUrUFkDFw7EJbooZgVj0gVHzz6KGg4WtIMlm4A_H5yUrQjG3RyKeEYL_RVWT4aZkdS0056szFKUuToEXbe6ecl5odxqZ5MIo-kL9njdGHeeGBy8DT1wz0ciO-8QCmUi1gxcTp5qUXEvxNIgPzMgaI0zw3kkn0L-KSMFJFiQzeAGRK116wxfJk9MBJ7PuV36C5YUi2pAwqIEmUbNhFbHpsVZ0VZodEvQw2SL-cnzclKVQVjPUPcghng2DtbeZ--RPNXuVJmG-WcP69UhiYuNq9UubdKBzk32oaxUUMv8FAPmt_yfSJ9Rth6v151RRh0qJRI5b6KGVdHF7SPmNKmmbJobALCz83OeC5bONYcnjfnJeh3uV2YuNPG5tAWImB-AoGVJw7EodQ=w512-h512-k-ft"
          />
        );
      } else if (gender === "F") {
        return (
          <Img
            alt="complex"
            src="https://lh3.googleusercontent.com/fife/AAWUweV0uu7888_faNVQXnsyzRPYnDXz6LCAj9mwEycrH0xtkOiyl05HA78YM84cGsWyEJFPjvYA1r53_8pNJCBZgO7wT5aFGcr84iq1tyNnlAIcLbwvOC3nscob5EVOMo3gIzP3La6r_1rhTxoZpCrWUmlbn1FP37o7IBZbGeBCeDCPQSLZ2pBUtx76pPIr9OQL1d3HnSXkNPF9GYVZGwaNqoTJzhniH-X5cCV23QPqVnj9HltGVrwEDOqVPzzbA0mae4O-vQZXM1X7Qa44zwJxVC-bYhMZDA8BkeXrjno2BhtAyFafU1IiTB_kne11Jm39AFyfiDTgw-v6C3683HUisoXgxzDqlRljNrjuGBLaCZsFR3Uok4x_QQ9Zfp_nVVQRy2DKvAXEDHS4BF6US9EFofa8-5y3wkhXMQKPOMw5xRqbn4rxLQMbb-vVP2VSY4cMC78sysvGGjJl_Y_ZA64x9DJUAjyFI6ltMr4I3Xeh3Lh8zif-zlweOFfm9sgtHAi6hZD6-RRyiPNj38LNymC4hyB9aW0jjMIh_M_V1qHmOWKDhlt1url9cK93xEOXWpyhJSnl5lj5yjxjlm3TvkujlhY7CjTVUhkzY_A4yp-kFbymnCCLjEityT-7EH9YZ4W3xwmUKc7boESyUIkBIaPAwNmpTw1FOECwLIVozR2i9mwh43ArNOyvl_EnFXP5vvrY0zKFNA0xi0b3gLqcEJKvxL-x59RCSY-OoQ=w512-h512-k-ft"
          />
        );
      } else {
        return data;
      }
    };

    const Img = styled("img")({
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));
    if (getContact === "") {
      return (
        <>
          <DialogTitle>Loading</DialogTitle>
          <Divider />
          <DialogContent>
            {/* <Img alt="access-ungranted" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Road-sign-no-entry.svg/256px-Road-sign-no-entry.svg.png" /> */}
            <Img alt="access-ungranted" src="https://d15omoko64skxi.cloudfront.net/wp-content/uploads/2017/07/avatar-black.gif" />
            {/* <Typography gutterBottom variant="h5" component="div">
              TIKET TIDAK BERLAKU
            </Typography> */}

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
          <DialogContent xl={{ p: 1, margin: "auto", flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Stack spacing={3}>
                  <Item>
                    {formatingImgProfile(getContact.length != 0 && getContact.contacts[0].imgUrl, getContact.length != 0 && getContact.contacts[0].gender)}
                    {/* <ButtonBase sx={{ width: 256, height: 256 }}> */}
                    {/* {getContact.length != 0 && getContact.contacts[0].gender === "M" ? (
                      <Img alt="complex" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoXi1AARkIeBNOjpZ6kQjJVCmguvDq-N8VMGDCTSFrvaPkRWSZRlF_M8YoF1v4ha81JkM&usqp=CAU" />
                    ) : (
                      <Img alt="complex" src="https://www.pngfind.com/pngs/m/227-2276293_woman-profile-icon-icono-de-policia-png-transparent.png" />
                    )} */}
                    {/* </ButtonBase> */}
                  </Item>
                  <Item>
                    {/* <Typography gutterBottom variant="h5" component="h3">
                      {getContact.length != 0 && getContact.tickets[0].ticketCode}
                    </Typography> */}

                    {formatingLogo(getContact.length != 0 && getContact.tickets[0].relationshipCode)}
                  </Item>
                  <Item>
                    {getContact.length != 0 && getContact.tickets[0].isVIP === true ? (
                      <Img
                        alt="VIP"
                        src="https://lh3.googleusercontent.com/fife/AAWUweVgSQLmUJj4CiBpfoaI7cqNANzvNkNpEdBz1K49hrz6br-YW4WT2OP2YDJqVXYO5c7MrXqiU81YXMOoToaCzA9XdjQ23-hZrlNpEhXoRAu0K1P_S4yPW9vmGOzzSyeEBbHC_kpQ37kzvgXIMMEXQT2w6MrDOBfvnduGuN7tuifuxnEXGR-cTVKSIeMbjtkoXOfp2ZCf03OZXgzmoQ3NqRV43u0C_jYok4pd0zoRpN2ACgokGC1IIKsEeluhh0Va2vvgBKPZytE7T57b7FhsBcr2Sb8BOE4bx4wdKzRzbQjxcj0cVptDTeTYlIeuoTao4pWYRq2B4bsy2PN1cY1Bfz6tluZm7wjM8EDABg2TEMhzPzpvv_FP-bpu16wFHd-w6Vwu3xa8pDFOwT9NoMwmBpjCwJlf65iWbg-BEecWutLz4OeCrh_0Vzhx0JfIaX68nNAN3lL0d89bNM4EO6h14ySuaK9wcA7HUZtDybS06YuxKJKhO_zYEprEGg3EC35TMWUJ9KzJD39to6aYPw_X9JgFXIkMfPnB2PAR-1HFc15LWeAUPgXhLBaONcUNCRsCZ3vDE-o3SDXmdQLVu9yb8uyCYHp4ndjvYkTE9x2Wvp0Ah8iNko9bZmz_NZKa194uI3EmzbJ4FAWuEFZV5nxYv-2cz9aNULC0tPy1Y8jde2d6QW923BpU2K4NCl_4kk72psw_8Lfd0yDjZP6CjB80pkhDczx7TorYzA=w1280-h975-ft"
                      />
                    ) : (
                      <Typography gutterBottom variant="h5" component="div"></Typography>
                    )}
                  </Item>
                </Stack>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h5" component="div">
                  {/* #{getContact.length != 0 && getContact.tickets[0].ticketCode}{" "} */}
                  <ReactBarcode value={getContact.length != 0 && getContact.tickets[0].ticketCode} options={{ format: "code128", height: 25, width: 2, margin: 0, fontSize: 20 }} renderer="svg" />
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  Nama
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 ? getContact.contacts[0].title : "" + "-"} {getContact.length != 0 && getContact.contacts[0].name}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  Phone
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 && getContact.contacts[0].phone ? getContact.contacts[0].phone : "-"}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  ENOS
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 && getContact.tickets[0].numberOfSouvenir} Souvenir
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  Organization
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 && getContact.contacts[0].organization}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  Alamat & Kota
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 && getContact.contacts[0].address} - {getContact.length != 0 && getContact.contacts[0].city}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
                  Jenis Tamu
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {getContact.length != 0 && getContact.relationshipCode[0].code} - {getContact.length != 0 && getContact.relationshipCode[0].detail}
                </Typography>
                <Divider />
                <TextField autoFocus value={numberOfPeopleState} onChange={(e) => setNumberOfPeopleState(e.target.value)} margin="dense" id="name" label="Number Of People" type="number" fullWidth variant="standard" />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleCancel} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
              Batal
            </Button>
            <Button onClick={HandleCheckIn} fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}>
              CheckIn
            </Button>
          </DialogActions>
        </>
      );
    }
  };

  return (
    <ThemeProvider theme={ThemeLiaAdib}>
      {/* <PrimarySearchAppBar /> */}
      {/* <DialogCheckIn data={data} dataContact={getContact} dialogState={openDialog} handleClose={handleClose} /> */}
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={3}
          sx={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/fife/AAWUweVRfw_c3l0WQL9wzGNFzVsGh-O6kUKmdpc-UA7IPVFqtFv5H0ziWDmHZvVQI9znxEgrq5gkuHV9-sQ0wC5m78wQL8MpI5NL3NdEFCdMr1bCPJz2LTmEis0_pNBj9nQGDpkNzotMf1b35aJvpe-ByJHfBckLGsTkbNMYAfIDjOgjda4DPyhkh89glprWzsmVmMaqX_hn6AKRBxm9Df7cxk_3J_VpFbPuoztJcAbLr4NABN-fq_A43Kux8WcvnEaw71lTZuVRRCvlXvmQ2CT5LfjVGO9R9CEXEvIJ6P2skfV6_gDElPyMqpwJMHrArhxJa0rbtt1CNwiGWLUoqI1KuOnVNLYjE21AoelYJoeaFSHS06cbv3awTqKc1Xm0E7i4IC1ZyJN6XP2w3gGj6Qt2F0kh6kBIpZbj3JyBvhsm4pP0f_KyMzfAeMYvdh-fuD0PD0eyFnaMcPT3BxsBBWA-3nxMQNIYUyumzyeihPx3i6gwv5z1qOYRYBv4rqGb_1mxAK9tsZOGmakcw14pt0KVKyCCTpK94QmCOyREDRceBs-8kKHUbDDZiKQnLHlGg_7op_N-X64M90KQ9Bimuvbf2-MbiQmtHRcia-O_qwAqSa1dhODLEJ3PjRd_LZuVjMpxjHkyfitcPGTm9h7NhHo-Jrj0zRdNcxSK7yz_vWqEz2YFGXtigYRHnpoznYMiIuuwrZCG0F4-FiwRQ7EY3pXaGXoaiHFhYBPZUw=w1000-h1000-k-ft)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          // component={Paper}
          elevation={3}
          square
        >
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              backgroundImage:
                "url(https://lh3.googleusercontent.com/fife/AAWUweWM2DTDRW5htGdHyHkrqVQgUAG8fJX_UmQPd1H4TTd7VMpCoavL6oAnXWeJfHxCBVDxAndufapuj_LJ39K2Ez5VF0asu7nFxr6l1hDDpRcVaF8ukFGe5v23TiQ7RjpIVAB5otjofM0aKaqe3PT9FfQ2m0KbMLBKM-NiD4w02H8nR-L40IZHPOkUlkLI6x5NjGTWhXMMNEfMNnW7Se7uUzpnk8sDkx6ngXXdC7kk6AQrS0u9fVNfLfp1Xl9CzvuUb9mhKsQckAwhxoYf59YBPRyPsxEFD1jHCIxltHXB4bUoTW6iJY0ZDM7HOZ4PHwfNLznCMVb8ZjHu8cAemcJBHf2UH3WJnTQ3R6wxPG7bT0LZL8etSiX9Vy5D83-ZifRmuN91twESMcIvu3fO-7xMxig3oy2ksoTVaZdr6Xm2Z2JDIZO_ZihYXXAZ7f6YeiL7sHPaGVAUVADJnWIdo8EPjOZvGAoF_wqCmr1AHlezG4tsbInW0UFHbxoaFn1MVfN347i27PqQXr5gFAkWGxFiX822ZflSggwo3Xm9bvCWAaWFYe4QUgTaK2MfFIBfPkTC0BC2nYC-Vj8LVOoLZmM4IIERPtqpZeGhb0rKBvcSyMBiCKySXyskBi7701MmyFpnyDezKTnl-Wls0kROMq3G4AOAfmEa5y8pePpzwOhCTWYT9ZSYy9aQGDOfwBY997txHamIZrGoKd8cI5OKFaZmE7SRuQyQ7rCFIg=w1131-h975-ft)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <Typography component="h1" variant="h3">
              Check In
            </Typography> */}
            {/* <h1 className="scanner-title">COUNTER</h1> */}
            <h1 className="scanner-title-as">
              {sessionStorage
                .getItem("as")
                .toUpperCase()
                .replace(/[\. ,:-]+/g, " ")}
            </h1>
            {/* <h1 className="scanner-title-as">1</h1> */}
            <h1 className="scanner-title-name">{sessionStorage.getItem("name")}</h1>
            {/* <Typography component="h1" variant="h4">
              {sessionStorage.getItem("as")}
            </Typography>
            <Typography component="h3" variant="h6">
              {sessionStorage.getItem("name")}
            </Typography> */}
          </Box>
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 1,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
              square: "false",
            }}
          >
            <Img
              alt="access-ungranted"
              src="https://lh3.googleusercontent.com/fife/AAWUweUy2g6m2IzNo_9sLQ2vWME9So5is5M3Grwym7370MQVPSBsSzBY9IDXuDkQACXb8WpLBF2jNq-ap5h3eevzurvegpqFSXoJvhPlrnHSkoRTj2BHSf85TsBbwlQwDQDjjLNebKs9nSdgoedQvaAS9Vl-F0Gc1FeHWoCl3mCWkRxOorC4I5wLV5DF4QTQKB3BjJaof9ujIkl8yz26nbgasIxzxBGBga4qQrhg7wtsM2ovNA6BeJSf9fGHfbfoAd1SyPMMyvCklxsBr366d_liZYgcgWd5rizsO6EFL_03d2Yh7_k0uzPtRPwmVcqFPZOV0oGxQ74GmAFKOMMOtLbq1oAlX5m3JqsUW-hybRuDDab8l6U-uG6ig6iL0ZL244h-KK0rD30CzZshzMkI1znR8MM5Htaq6vOgyzf1V2CpSIWDzVz9fMT9HlEQ7Cc0-LVjwgLdfwWyscR9xRDXKvBet7AkxGYbCR39n1uTlXzykHkyu1hDIIiJHplDLwv_K5RkViV2XJ-1XKL0UxM6YQs9T_RYXgRJ2pWmVkqMyeune8gDV5OfJIeYC73Rqc-C2xmL8vwDWo-VqA5zdNV30c86crUU3tcKN-EcUR6PIx6Y13nz4EAaFuEzkwBbT5CT0-s9cWrA5OpNOaj38Hw08vp4tqZQxHjOnRHenYXqg7B_VAImC2mcII7nXnjdTU5ug804gxaegmNYEB-zHyjwDMDWI4xU0JU8l-v2Vg=w1080-h1080-ft"
            />
          </Box>
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 2,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundImage:
                "url(https://lh3.googleusercontent.com/fife/AAWUweWM2DTDRW5htGdHyHkrqVQgUAG8fJX_UmQPd1H4TTd7VMpCoavL6oAnXWeJfHxCBVDxAndufapuj_LJ39K2Ez5VF0asu7nFxr6l1hDDpRcVaF8ukFGe5v23TiQ7RjpIVAB5otjofM0aKaqe3PT9FfQ2m0KbMLBKM-NiD4w02H8nR-L40IZHPOkUlkLI6x5NjGTWhXMMNEfMNnW7Se7uUzpnk8sDkx6ngXXdC7kk6AQrS0u9fVNfLfp1Xl9CzvuUb9mhKsQckAwhxoYf59YBPRyPsxEFD1jHCIxltHXB4bUoTW6iJY0ZDM7HOZ4PHwfNLznCMVb8ZjHu8cAemcJBHf2UH3WJnTQ3R6wxPG7bT0LZL8etSiX9Vy5D83-ZifRmuN91twESMcIvu3fO-7xMxig3oy2ksoTVaZdr6Xm2Z2JDIZO_ZihYXXAZ7f6YeiL7sHPaGVAUVADJnWIdo8EPjOZvGAoF_wqCmr1AHlezG4tsbInW0UFHbxoaFn1MVfN347i27PqQXr5gFAkWGxFiX822ZflSggwo3Xm9bvCWAaWFYe4QUgTaK2MfFIBfPkTC0BC2nYC-Vj8LVOoLZmM4IIERPtqpZeGhb0rKBvcSyMBiCKySXyskBi7701MmyFpnyDezKTnl-Wls0kROMq3G4AOAfmEa5y8pePpzwOhCTWYT9ZSYy9aQGDOfwBY997txHamIZrGoKd8cI5OKFaZmE7SRuQyQ7rCFIg=w1131-h975-ft)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <Typography component="h6" variant="h6">
              Selamat Datang
            </Typography> */}
            <h1 className="scanner-credit">Grand Rama Shinta Ballroom Patra Semarang</h1>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/fife/AAWUweVtf7IdN_0RK8BG-V9HUwm_v3pTmkGA8jaGhDgEoLbR0CCfllWeRm0x4jJtXiB2YzmnMeCgpDeeZPs96mfE4zlmax9VPdQ0NKMmf3SlPJ30ebwKKV9Dydmy7KJ6fxiAGbtvA2GTfL1rJvtb-eHCxx06yFCf24p1suEGp8OuoFavlzHEvDBj-b2jerJN7YwCgDAFX1e_fqzSaO1gFSsaRZW327FUgKPYW0a7QofO8HqgsCqlhRGKh6bXKBsTt_TP28m_auVKnt9kXsyYL84cKCxzwNSizGY4LR2LI8x0s5pJgDufT3G3ncOvvkCIG_iTSZq7XHObkvvo8ksMjh6BX5TebOteNwzs6AKrjUl9XEOFKPI0TiwL5Mu1qOAX7uWyr-Fkanv_7dlMOb5xwRoOLGdDZuIEoMCV8qOh8TYfzHrAz2IpK_Ct8h31FaaccLW5InNhZ9oLfFrEXWO69WyExacIcfD96taUfm5kip_WPIRnqcfDBcXTc7yTPikYQZgSbj39IEeKk0ii0Cn1Xkwpxy7G5ybkLyxusfo1bxlg-gyyjyKdyY6Ecc181hCIFuU2YinethAvFP3Vwh7cIkLMquMIb-dO3kvVe0pVQ9s_8IkFi9iOYTSad0q1TkCjT0R8KtEgcbUZoPXiMb_3fLuos3Zn0VkhiwP1LtUm52TAokRO5vT_5tIV9CMKAToZasJvVAfRwgK78xkh3HxghOyfa1GrY0QIwgfYJA=w2000-h4320-ft)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          component={Paper}
          elevation={0}
          square
        >
          <Box
            sx={{
              my: 4,
              // mx: 4,
              p: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              square: "false",
              backgroundImage:
                "url(https://lh3.googleusercontent.com/fife/AAWUweVtf7IdN_0RK8BG-V9HUwm_v3pTmkGA8jaGhDgEoLbR0CCfllWeRm0x4jJtXiB2YzmnMeCgpDeeZPs96mfE4zlmax9VPdQ0NKMmf3SlPJ30ebwKKV9Dydmy7KJ6fxiAGbtvA2GTfL1rJvtb-eHCxx06yFCf24p1suEGp8OuoFavlzHEvDBj-b2jerJN7YwCgDAFX1e_fqzSaO1gFSsaRZW327FUgKPYW0a7QofO8HqgsCqlhRGKh6bXKBsTt_TP28m_auVKnt9kXsyYL84cKCxzwNSizGY4LR2LI8x0s5pJgDufT3G3ncOvvkCIG_iTSZq7XHObkvvo8ksMjh6BX5TebOteNwzs6AKrjUl9XEOFKPI0TiwL5Mu1qOAX7uWyr-Fkanv_7dlMOb5xwRoOLGdDZuIEoMCV8qOh8TYfzHrAz2IpK_Ct8h31FaaccLW5InNhZ9oLfFrEXWO69WyExacIcfD96taUfm5kip_WPIRnqcfDBcXTc7yTPikYQZgSbj39IEeKk0ii0Cn1Xkwpxy7G5ybkLyxusfo1bxlg-gyyjyKdyY6Ecc181hCIFuU2YinethAvFP3Vwh7cIkLMquMIb-dO3kvVe0pVQ9s_8IkFi9iOYTSad0q1TkCjT0R8KtEgcbUZoPXiMb_3fLuos3Zn0VkhiwP1LtUm52TAokRO5vT_5tIV9CMKAToZasJvVAfRwgK78xkh3HxghOyfa1GrY0QIwgfYJA=w2000-h4320-ft)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <h2 className="scanner-greeting">SELAMAT DATANG DI RESEPSI</h2>
            <h2 className="scanner-bride-name">Pernikahan Lia & Adib</h2>
            <h2 className="scanner-greeting-place">GRAND RAMA SHINTA BALLROOM PATRA SEMARANG</h2> */}
            <Img
              alt="access-ungranted"
              src="https://lh3.googleusercontent.com/fife/AAWUweVqh57yj0mqJx5D4sgkL4gdgOszuRxUOReMbPwCqWnyjib7L8fPo69ameGqCj_wXlRC324Jp8CNppYFaKkZdi5QUSkd8ZDWMsOcPpqDylby5ha9ATLB0q1CEKgiZRKuoiVzZEwWwyDEuAj5DmstmkcBjlYAkkqrCGjaQAFIZtEj9etJj0z_r8EQOvIclWC0iUOsR-5SXYKtajzFrO1qLlmryHEd2lQyIVR3xgAdhuDlRTYBqE9yyqJURlzrQYrZ4LO-m-5TtiVA-8YjMWoYPF6AZnn87thUGgDwERUn0Yr0yqCjvHkbyD2zujB-x5jtiOGV-Wly06QCgcrtLjsLHKcoWavP4O1s8JauGM80LKgFJGonOWaUVrjUzkNpvFkCg48H3qPshX8U-ejH5OJ36G5_qDUDRfRiA8GsnkfmjuD1FHid6yqTYuQLK3Fzd86LqHKUuARHZRt5sOMhqFRQxA7IyeU4FpmSw03NAmhIoEy1z3Lpbe8ct7BeSTnTTmw7nPyhogCflnIaPNu-DlyJwnx70Z2nmdy3ryzMTDpw8rRUXShiiG0IBvJLuGjxITZt500KpSGs4nEHrSvj0ZDdTYDPml90NohzW3u3b8OkDZAGRfV6UZJcpV6Wu08Nyrm8Y4jxLwp1yUij13vc4INBGG-eFBh8bcCtkuXhTWjz9pBXKcZldG7hfSMmPElcSslR8ZjwqVZ3PB5YrFAHFwTISztbsnHBubygOg=w1020-h975-ft"
            />
          </Box>
          {/* <Divider /> */}
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 0,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {found ? <RenderDialogCheckIn /> : <RenderGreeting />}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={3}
          sx={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/fife/AAWUweVRfw_c3l0WQL9wzGNFzVsGh-O6kUKmdpc-UA7IPVFqtFv5H0ziWDmHZvVQI9znxEgrq5gkuHV9-sQ0wC5m78wQL8MpI5NL3NdEFCdMr1bCPJz2LTmEis0_pNBj9nQGDpkNzotMf1b35aJvpe-ByJHfBckLGsTkbNMYAfIDjOgjda4DPyhkh89glprWzsmVmMaqX_hn6AKRBxm9Df7cxk_3J_VpFbPuoztJcAbLr4NABN-fq_A43Kux8WcvnEaw71lTZuVRRCvlXvmQ2CT5LfjVGO9R9CEXEvIJ6P2skfV6_gDElPyMqpwJMHrArhxJa0rbtt1CNwiGWLUoqI1KuOnVNLYjE21AoelYJoeaFSHS06cbv3awTqKc1Xm0E7i4IC1ZyJN6XP2w3gGj6Qt2F0kh6kBIpZbj3JyBvhsm4pP0f_KyMzfAeMYvdh-fuD0PD0eyFnaMcPT3BxsBBWA-3nxMQNIYUyumzyeihPx3i6gwv5z1qOYRYBv4rqGb_1mxAK9tsZOGmakcw14pt0KVKyCCTpK94QmCOyREDRceBs-8kKHUbDDZiKQnLHlGg_7op_N-X64M90KQ9Bimuvbf2-MbiQmtHRcia-O_qwAqSa1dhODLEJ3PjRd_LZuVjMpxjHkyfitcPGTm9h7NhHo-Jrj0zRdNcxSK7yz_vWqEz2YFGXtigYRHnpoznYMiIuuwrZCG0F4-FiwRQ7EY3pXaGXoaiHFhYBPZUw=w1000-h1000-k-ft)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          component={Paper}
          elevation={0}
          square
        >
          {/* <Box
            sx={{
              my: 8,
              mx: 4,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          > */}
          {/* <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 0,
              
              flexDirection: "column",
              alignItems: "center",
              square: "false",
            }}
          >
            <Img
              alt="access-ungranted"
              src="https://lh3.googleusercontent.com/fife/AAWUweUAhSEgDhX8x9pLO_4c0syPEvmWVzTi8vOQKr_dZZ-gUfxb_mKCdtmVK__9LlFjhmDuu6wPxiD9e2FAKiAQZP1rsW8vcAZNjyMNVX_KT5mwdR5L5Gj8xGXpF0dKawfZgc8gez90cq4M74tgMCt3qJY2nM3NgcoO135gVeeCno3Vl_4JwwsEp4QDX2SFMIss8IUHOuLnFkOMbRMS2SqA4u5GJadPO6aRXLq5-Fz1RarvgLwtrzfK_pBfK6gE0htZUyu5F0Tf0p7AfEK78oZQ6Ffrnq-pqK-BhpVB-9DyatC-z3te5kdDV6POf4rLg_quVMyusBi5IZ-O7ciLnKjF5T879bS1jJCYfhsQRIH5dCqBERSOCpIHB9BCJhJHVF6gTEoyPRNIxz4bUWE9CdDlNl-_qBR-Ggf_XxMlcTBlXp9_xvzO9K_bkHdbYfvSAEJiT7RwQ8TsdZZZULVZpdbvaF27FLQzh65LaG-iQp66fTEpM1z0OkHwhjL-efeN5H8qFRK8q8qaurAVheGHI8h9kkl5Ps02yndyCmaqyiJgFn5DMzxkK9fNFBGX_rmtYGVzEBpgl9t4XIhH7gA2rayCyfmGp-tQWmKDVKxqTqaED6XDw-siDza7PvWxInBY6Poq0FPNe97MsxqyjpTBkWIj12Af1GvLlb5WgoZbqLfvWni8lT8LGfv9c1v1lHNTfjMWpYHl3zHRsn54DG__XP0ZkmgDINlYGGbAqQ=w1007-h942-ft"
            />
          </Box> */}

          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 3,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Img
              alt="access-ungranted"
              src="https://lh3.googleusercontent.com/fife/AAWUweV5SJWcqQTz4H-h1LL4UQWxG6uppakA7Mm6Fz5Y8fG_X_TpomHyKiv5cVjDdPOkFQOfhto4_S6ewvbwJm-wSzuBNv1VQYykTEuex0_OaYh3nKF7zlj1dQaYH1CSuunfXBYK5auwhJuBqzEx5jY7w05kkhz02HOm8MMOFgS75nG_C49EvUUUhmkXDWQtToMH5bj9Za5IXEP6AoA98G7wtMes8Qpvhnq48pbBoATOOKGpLaxQqYXTmADWKX2imJyEbONZ7mlKZjTGNO_h5pXXXosG1J4qbNi4RtmPcgBAt78nsKPRzEypYR7iBvv9xEY4Rpq10xgbTGOfzgW5mDbG_kBsC6MYz4Nigi-yesRIVxcO2PJkQUWwNIaxi7zBWcI_S6IKYK9VsloEU9VAxFbKUQ39R9CXzr6uGh8F_ixqdh9D54kf2G4sYetf09GQD-VX55B79WX_MbrmLGNZpEHJlOZ4SW31pqBPq12zRS_EGbPerNWLKcWSndQSzSfVzqLM0EX8fCCtqEdnSoy99RbYEkNijVaiWOvPvEAgiIIvRUdgmtue0oeLk6a4Bpcd9KGHxq8-Ftlocil6Wn2xHR54g-Lf8_JFT2Qm-ur6e27GQX0ug43qFsNru91Y7BioQiALdazaB-Y0feiYvalMCeYUD0pZb5l4CXPngjA5406vti2A2q7sFANXdqNl7jedzIOt-WDAxoMvYxzDoHAns6MBDXNYePeBWZ56sQ=w1020-h975-ft"
            />
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

              <Grid container></Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={contacts}
              isOptionEqualToValue={(option) => option.id}
              getOptionLabel={(option) => option.id + " - " + option.name + " - " + option.organization + " - " + option.city + " - " + (option.tickets[0] === undefined ? "TIKET BELUM DIBUAT" : option.tickets[0].ticketCode)}
              defaultValue={contacts.id}
              onChange={(event, newValue) => {
                // setData(newValue);
                if (newValue === null) {
                  return 0;
                } else if (newValue.tickets[0] === undefined) {
                  console.log(newValue.tickets[0]);
                  setData("TIKET BELUM DIBUAT");
                } else {
                  console.log(newValue.tickets[0]);
                  setData(newValue.tickets[0].ticketCode);
                }
                // setData(newValue === null ? "" : newValue.tickets[0].length === "0" ? "TIKET BELUM DIBUAT" : newValue.tickets[0].ticketCode);
                // console.log(newValue === null ? "" : newValue.tickets[0].length === "0" ? "TIKET BELUM DIBUAT" : newValue.tickets[0].ticketCode);
              }}
              renderInput={(params) => <TextField {...params} variant="standard" label="Contacts Search" margin="normal" fullWidth />}
            />
          </Box>
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 1,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
              square: "false",
            }}
          >
            <Img
              alt="access-ungranted"
              src="https://lh3.googleusercontent.com/fife/AAWUweXbG-RqUifSypQVEkGrXWpsXGZv_utWqacOB8M736tMFVvA7-XnTvhf10MqU7VvRQsmY8veU-nEmcXiLK1HhuVKIFCWLa9uI3URzFGqRacL8jIkktMn8NwWWbluogot12JVEpJKTR-EnsCJAb3t1yozQdSIfXtcPmv_FsHDgQoz8Tn-cE649OeVJ44qlOBhV1aOcdsHJ7nhwN2EULnn1AzmiFq7g-OQKVTVD09QsiPRC09RkYlbWRvbRwyZpD-TKVf43qlqT14f7Ju7UXzsJBGnRGmai9BvArK-6tVwpPANgDEK9o6BhcXXa6oB1rqB9-xaUnFmwYbjIzf70ZaEiPSfYs33dW_5dJT-mR7nSZOJ37AJa1E6lkYlsXE5C33YStv35NyCWc_uWGMo4880TtCi6lE8dwyF35v2wbXgKQCI9cFnbbX0Wa7zPKstI-t5Ak2zBuPj2nRRQgY4zDHue3j3wNiVuNUDfDdy9_T__Gv2tvLdULRyPQZvCJzc7IDkWejnU7MK2nEAl0niPUrCC7iV-OnQDcla-4TzYcxcncMy1YfBD80obj9PmMBgfY7WNinZo_UL9dMDXtYc49MUKk9s60TjnGGqCRPNMveCy5mfXyVj8R7qCnDkqfPzp3X_VlQqA0VMYiuvkMbau8OiSbMHUq7VlItDKpcjkyshwtXcgobO5C4keV3xmM1PWAVOj-5Mccq8PdLav_4zem8VsmqrAoIklimNpA=w1080-h1080-k-ft"
            />
          </Box>
          <Box
            component={Paper}
            sx={{
              my: 4,
              mx: 4,
              p: 2,
              // display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundImage:
                "url(https://lh3.googleusercontent.com/fife/AAWUweWM2DTDRW5htGdHyHkrqVQgUAG8fJX_UmQPd1H4TTd7VMpCoavL6oAnXWeJfHxCBVDxAndufapuj_LJ39K2Ez5VF0asu7nFxr6l1hDDpRcVaF8ukFGe5v23TiQ7RjpIVAB5otjofM0aKaqe3PT9FfQ2m0KbMLBKM-NiD4w02H8nR-L40IZHPOkUlkLI6x5NjGTWhXMMNEfMNnW7Se7uUzpnk8sDkx6ngXXdC7kk6AQrS0u9fVNfLfp1Xl9CzvuUb9mhKsQckAwhxoYf59YBPRyPsxEFD1jHCIxltHXB4bUoTW6iJY0ZDM7HOZ4PHwfNLznCMVb8ZjHu8cAemcJBHf2UH3WJnTQ3R6wxPG7bT0LZL8etSiX9Vy5D83-ZifRmuN91twESMcIvu3fO-7xMxig3oy2ksoTVaZdr6Xm2Z2JDIZO_ZihYXXAZ7f6YeiL7sHPaGVAUVADJnWIdo8EPjOZvGAoF_wqCmr1AHlezG4tsbInW0UFHbxoaFn1MVfN347i27PqQXr5gFAkWGxFiX822ZflSggwo3Xm9bvCWAaWFYe4QUgTaK2MfFIBfPkTC0BC2nYC-Vj8LVOoLZmM4IIERPtqpZeGhb0rKBvcSyMBiCKySXyskBi7701MmyFpnyDezKTnl-Wls0kROMq3G4AOAfmEa5y8pePpzwOhCTWYT9ZSYy9aQGDOfwBY997txHamIZrGoKd8cI5OKFaZmE7SRuQyQ7rCFIg=w1131-h975-ft)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <Typography component="h6" variant="h6">
              Selamat Datang
            </Typography> */}
            <h1 className="scanner-credit">Wedding Invitation System 2022</h1>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
