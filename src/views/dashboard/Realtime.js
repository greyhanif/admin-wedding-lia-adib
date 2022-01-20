import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// import { mainListItems, secondaryListItems } from "./ListItems";
import Chart from "./Chart";
import Card from "./Card";
import Orders from "./Orders";
import Logs from "./Logs";
import { nameState, asState, dashboardState } from "../../store";
import { useRecoilValue } from "recoil";
import LastMessages from "./LastMessages";
import LastAttendances from "./LastAttendances";
import LastCheckOut from "./LastCheckOut";
import BarChartComp from "./BarChartComp";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Realtime(props) {
  const name = useRecoilValue(nameState);
  const as = useRecoilValue(asState);
  // const dashboard = useRecoilValue(dashboardState);
  const [clock, setClock] = useState(0);

  const [dashboard, setDashboard] = useState({
    totalContacts: "Memutakhirkan data...",
    totalTickets: "Memutakhirkan data...",
    countContactsCity: [
      {
        city: "Memutakhirkan data...",
        count: "Memutakhirkan data...",
      },
    ],
    countTicketsRelationshipCode: [
      {
        relationshipCode: "Memutakhirkan data...",
        count: "Memutakhirkan data...",
      },
    ],
    totalContactsFemale: "Memutakhirkan data...",
    totalContactsMale: "Memutakhirkan data...",
    totalMessages: "Memutakhirkan data...",
    countAttendance: "Memutakhirkan data...",
    countPeopleInRoom: [
      {
        totalPeople: "Memutakhirkan data...",
      },
    ],
    lastLogs: [
      {
        id: "Memutakhirkan data...",
        code: "Memutakhirkan data...",
        detail: "Memutakhirkan data...",
        createdAt: "Memutakhirkan data...",
        updatedAt: "Memutakhirkan data...",
      },
    ],
    lastContacts: [
      {
        id: "Memutakhirkan data...",
        name: "Memutakhirkan data...",
        gender: "Memutakhirkan data...",
        phone: "Memutakhirkan data...",
        email: "Memutakhirkan data...",
        organization: "Memutakhirkan data...",
        address: "Memutakhirkan data...",
        city: "Memutakhirkan data...",
        createdAt: "Memutakhirkan data...",
        updatedAt: "Memutakhirkan data...",
      },
    ],
    lastTickets: [
      {
        id: 19,
        ticketCode: "FAMF-0VDJ",
        contactId: "16",
        relationshipCode: "FAMF",
        linkInvitation: "http://192.168.1.5:3001/rsvp/to/Salsabila+Kusuma+Dewi",
        createdAt: "2021-12-07T13:58:36.000Z",
        updatedAt: "2021-12-07T13:58:36.000Z",
      },
    ],
    lastMessages: [
      {
        id: 189,
        contactId: 6,
        name: "Amanda Emiayosa",
        city: "Bandung",
        message: "tes123098afsdfds",
        hidden: false,
        createdAt: "2021-11-28T06:23:50.000Z",
        updatedAt: "2021-11-28T06:23:50.000Z",
      },
    ],
    lastAttendances: [
      {
        id: 2,
        contactId: "34",
        name: "Miftakhul Yusro",
        city: "Jakarta",
        ticketCode: "FAMF-1FE6",
        remark: "Keluarga dari pengan",
        checkInAt: "2021-12-08T18:48:08.000Z",
        numberOfPeople: 1,
        checkOutAt: null,
        typeOfAttendance: "invited",
        createdAt: "2021-12-08T18:48:08.000Z",
        updatedAt: "2021-12-08T18:48:08.000Z",
      },
    ],
    lastCheckOut: [
      {
        id: 1,
        contactId: "Memutakhirkan data...",
        name: "Memutakhirkan data...",
        city: "Memutakhirkan data...",
        ticketCode: "Memutakhirkan data...",
        remark: "Memutakhirkan data...",
        checkInAt: "Memutakhirkan data...",
        numberOfPeople: "Memutakhirkan data...",
        checkOutAt: "Memutakhirkan data...",
        expectedNumberOfSouvenir: "Memutakhirkan data...",
        actuallyNumberOfSouvenir: "Memutakhirkan data...",
        stateOfAttendance: "Memutakhirkan data...",
        typeOfAttendance: "Memutakhirkan data...",
        createdAt: "Memutakhirkan data...",
        updatedAt: "Memutakhirkan data...",
      },
    ],
    souvenirStock: "Memutakhirkan data...",
    totalExpectedNumberOfSouvenir: [
      {
        totalExpectedNumberOfSouvenir: "Memutakhirkan data...",
      },
    ],
  });

  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
    setClock(h + ":" + m + ":" + s);
    setTimeout(startTime, 5000);
    clearTimeout();
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  // useEffect(() => {
  //   startTime();
  // });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatData();
    }, 1000);
    return () => clearInterval(interval);
  });

  const fetchChatData = () => {
    async function fetchData() {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`);
      setDashboard(response.data);
      console.log(response.data);
    }

    fetchData().catch((error) => {
      // setError(error.response.data.message);
      console.log(error.response.data);
    });
  };

  return (
    <>
      {" "}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,

          backgroundColor: "secondary.light",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Realtime Dashboard
              </Typography>
              <Button color="inherit">Delay 5 Detik</Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Box>

        <Grid container spacing={3} padding={3}>
          {/* Recent Card */}

          {/* <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 120,
            }}
          >
            <Card title="Jam" value={clock} caption={as} />
          </Paper>
        </Grid> */}

          {/* Recent Card */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              {/* {console.log(props.dashboard.totalContacts)} */}
              <Card title="Jumlah Undangan" value={dashboard.totalContacts} caption="orang" />
            </Paper>
          </Grid>

          {/* Recent Card */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              <Card title="Jumlah Tiket" value={dashboard.totalTickets} caption="orang" />
            </Paper>
          </Grid>

          {/* Recent Card */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              <Card title="Laki-Laki" value={dashboard.totalContactsMale} caption="orang" />
            </Paper>
          </Grid>

          {/* Recent Card */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              <Card title="Perempuan" value={dashboard.totalContactsFemale} caption="orang" />
            </Paper>
          </Grid>

          {/* count Attendance */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              {/* {console.log(props.dashboard.totalContacts)} */}
              <Card title="Tamu Telah Hadir" value={dashboard.countAttendance} caption="orang" />
            </Paper>
          </Grid>

          {/* count Attendance */}
          <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              {/* {console.log(props.dashboard.totalContacts)} */}
              <Card title="Tamu di Ruangan" value={dashboard.countPeopleInRoom[0].totalPeople} caption="orang" />
            </Paper>
          </Grid>

          {/* count Souvenir */}
          {/* <Grid item xs={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
            }}
          >
            
            <Card title="Stok Souvenir" value={dashboard.souvenirStock} caption="souvenir" />
          </Paper>
        </Grid> */}

          {/* Hitung rencana souvenir yang diterbitkan */}
          {/* <Grid item xs={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
            }}
          >
            <Card title="Rencana Souvenir" value={dashboard.totalExpectedNumberOfSouvenir[0].totalExpectedNumberOfSouvenir} caption="souvenir" />
          </Paper>
        </Grid> */}

          {/* Hitung rencana souvenir yang diterbitkan */}
          {/* <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              <Card title="Rencana Souvenir" value={`${dashboard.totalExpectedNumberOfSouvenir[0].totalExpectedNumberOfSouvenir} dari ${dashboard.souvenirStock}`} caption="souvenir" />
            </Paper>
          </Grid> */}

          {/* Hitung rencana souvenir yang diterbitkan */}
          {/* <Grid item xs={6} md={4} lg={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
              }}
            >
              <Card
                title="Remark Souvenir"
                value={
                  dashboard.totalExpectedNumberOfSouvenir[0].totalExpectedNumberOfSouvenir > dashboard.souvenirStock
                    ? "Tidak Cukup"
                    : `Sisa ${dashboard.souvenirStock - dashboard.totalExpectedNumberOfSouvenir[0].totalExpectedNumberOfSouvenir}`
                }
                caption="souvenir"
              />
            </Paper>
          </Grid> */}

          {/* Chart */}
          {/* <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid> */}

          {/* Radar Chart */}
          {/* <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            <RadarChartComp countContactsCity={dashboard.countContactsCity} />
          </Paper>
        </Grid> */}

          {/* Bar Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              <BarChartComp countContactsCity={dashboard.countContactsCity} />
            </Paper>
          </Grid>

          {/* Last Attendances */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <LastAttendances lastAttendances={dashboard.lastAttendances} />
            </Paper>
          </Grid>

          {/* Last Cekout */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <LastCheckOut lastCheckOut={dashboard.lastCheckOut} />
            </Paper>
          </Grid>

          {/* Recent log */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Logs lastLogs={dashboard.lastLogs} />
            </Paper>
          </Grid>

          {/* Last Messages */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <LastMessages lastMessages={dashboard.lastMessages} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
