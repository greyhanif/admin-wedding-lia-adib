import React, { useEffect, useState } from "react";
// import MaterialTable, { Column } from "@material-table/core";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle, Autocomplete, Icon } from "@mui/material";

import { useRecoilValue } from "recoil";
import { contactsState, relationshipCodeState } from "../../store";
import { Button, Grid, TextField } from "@material-ui/core";

import ShareIcon from "@mui/icons-material/Share";

import moment from "moment";
import "moment/locale/id";

const TicketCRUD = () => {
  // const contacts = useRecoilValue(ticketsState);
  const dataSelectSouvenir = [
    {
      id: 1,
      code: "1",
      detail: "Satu",
    },
    {
      id: 2,
      code: "2",
      detail: "Dua",
    },
    {
      id: 3,
      code: "3",
      detail: "Tiga",
    },
  ];

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [data, setData] = useState([]);

  const contacts = useRecoilValue(contactsState);
  const [selectedContact, setSelectedContact] = useState({ id: 0, name: "" });
  // const tickets = useRecoilValue(ticketsState);
  const relationships = useRecoilValue(relationshipCodeState);

  const [relationshipCode, setRelationshipCode] = useState({});
  const [msg, setMsg] = useState("");
  // const mdTheme = createTheme();
  const [selectedNumberOfSouvenir, setSelectedNumberOfSouvenir] = useState(1);

  const formatingLink = (slug, baseUrl) => {
    let resultLink = baseUrl + slug;
    return (
      <div>
        <Button
          onClick={() =>
            navigator.clipboard
              .writeText(resultLink)
              .then(() => {
                alert(resultLink + " successfully copied");
              })
              .catch(() => {
                alert("something went wrong");
              })
          }
          variant="contained"
          size="small"
          disableElevation
        >
          COPY
        </Button>
        {resultLink}
      </div>
    );
  };
  const formatingLogo = (data) => {
    if (data === "PTMN") {
      return <img src={"https://upload.wikimedia.org/wikimedia/id/b/b8/Pertamina.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BPIX") {
      return <img src={"http://www.bhimasenapower.co.id/upload/20160309082009-header-logo-bhimasena.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "PPKX") {
      return <img src={"https://lh3.googleusercontent.com/proxy/B_glD78RG4jkLxEzQdGEK4gcXDfze1pgjOHMDZTIsIt3U1VqiY5kUdnSNpSSAPyvHoIpZYBA-83lOmRBiQPhI7WD1oLa9_2cM3OiblouhxP5z75nF0w"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BPNX") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_BPN-KemenATR_%282017%29.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BNMR") {
      return (
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Logo_of_the_Ministry_of_Public_Works_and_Housing_of_the_Republic_of_Indonesia.svg/1200px-Logo_of_the_Ministry_of_Public_Works_and_Housing_of_the_Republic_of_Indonesia.svg.png"
          }
          style={{ width: 50, borderRadius: "5%" }}
        />
      );
    } else {
      return data;
    }
  };

  // const copyLink = (slug, baseUrl) => {
  //   let resultLink = baseUrl + slug;
  //   return (
  //     resultLink
  //     <Button variant="contained" size="small" disableElevation>
  //       COPY
  //     </Button>
  //   );
  // };

  let columns = [
    { field: "id", title: "#", editable: "never" },
    { field: "relationshipCode", title: "Icon", editable: "never", render: (rowData) => formatingLogo(rowData.relationshipCode) },
    // { field: "ticketCode", title: "Nama", editable: "never" },
    { field: "ticketCode", title: "Kode Tiket", editable: "never" },
    { field: "contactId", title: "ID Kontak", editable: "never" },
    { field: "contact.name", title: "Name", editable: "never" },
    { field: "contact.organization", title: "Organisasi", editable: "never" },
    { field: "contact.city", title: "Kota", editable: "never" },
    {
      field: "linkInvitation",
      title: "Tautan Undangan",
      render: (rowData) => formatingLink(rowData.linkInvitation, "https://liaadib-weddingday.id/rsvp/to/"),
    },
    { field: "numberOfSouvenir", title: "Rencana Souvenir" },
    { field: "updatedAt", title: "Terakhir Diubah", editable: "never", render: (rowData) => moment(rowData.updatedAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow() },
  ];

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]

  useEffect(() => {
    getListTicket();
  }, []);

  const getListTicket = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`);
      const users = response.data;
      // setData(users);
      setUser(users);
    } catch (error) {
      console.log(error);
    }
  };

  // function for updating the existing row details
  const handleRowUpdate = async (newData, oldData, resolve) => {
    //validating the data inputs
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/tickets/${newData.id}`, newData);

      const updateUser = [...user];
      const index = oldData.tableData.id;
      updateUser[index] = newData;
      setUser([...updateUser]);
      resolve();
      setIserror(false);
      setErrorMessages([]);
    } catch (error) {
      setErrorMessages(["Update failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/tickets/${oldData.id}`)
      .then((response) => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = [];
    if (newData.numberOfSouvenir === "") {
      errorList.push("Try Again, You didn't enter the name field");
    }

    if (errorList.length < 1) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/tickets`, newData)
        .then((response) => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          // console.log(newData);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const mdTheme = createTheme();
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#4caf50",
  //     },
  //     secondary: {
  //       main: "#ff9100",
  //     },
  //   },
  // });

  const HandleCreateTicket = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tickets`, {
        contactId: selectedContact.id,
        relationshipCode: relationshipCode,
        numberOfSouvenir: selectedNumberOfSouvenir,
      });
      getListTicket();
    } catch (error) {
      // console.log(email);
      if (error.response) {
        setMsg(error.response.data.message);
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <h2>Daftar Tiket</h2>
      {/* {newData} */}
      <Grid
        component="form"
        sx={{
          m: 2,
          width: "40ch",
          p: 2,
        }}
        display="flex"
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={contacts}
          isOptionEqualToValue={(option) => option.id}
          getOptionLabel={(option) =>
            option.id +
            " - " +
            option.name +
            " - " +
            option.organization +
            " - " +
            option.city +
            " - " +
            (option.distributeds[0] === undefined ? "BELUM DI DISTRIBUSI" : "DONE") +
            " - " +
            (option.tickets[0] === undefined ? "TIKET BELUM DIBUAT" : "DONE")
          }
          defaultValue={contacts.id}
          onChange={(event, newValue) => {
            setSelectedContact(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="standard" label="Contacts" margin="normal" fullWidth />}
        />
        <TextField
          id="filled-select-currency-native"
          size="small"
          fullWidth
          select
          label="Select Relationship"
          onChange={(event) => setRelationshipCode(event.target.value)}
          value={relationshipCode}
          defaultValue={""}
          SelectProps={{
            native: true,
          }}
          // helperText="Pilih asal kota"
          variant="standard"
        >
          {relationships.map((relationship) => (
            <option key={relationship.id} value={relationship.code}>
              {relationship.code + " - " + relationship.detail}
            </option>
          ))}
        </TextField>
        <TextField
          id="filled-select-currency-native"
          size="small"
          fullWidth
          select
          label="Expected Number of Souvenir"
          onChange={(event) => setSelectedNumberOfSouvenir(event.target.value)}
          value={selectedNumberOfSouvenir}
          defaultValue={""}
          SelectProps={{
            native: true,
          }}
          // helperText="Pilih asal kota"
          variant="standard"
        >
          {dataSelectSouvenir.map((data) => (
            <option key={data.id} value={data.code}>
              {data.code + " - " + data.detail}
            </option>
          ))}
        </TextField>
        <Button onClick={() => HandleCreateTicket()} variant="contained" size="small" disableElevation>
          Create
        </Button>
      </Grid>
      <ThemeProvider theme={mdTheme}>
        <MaterialTable
          title="Ticket"
          tableLayout="auto"
          columns={columns}
          data={user}
          options={{
            headerStyle: { borderBottomWidth: "1px" },
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true,
            pageSizeOptions: [5, 25, 50, 100, { value: user.length, label: `ALL (${user.length})` }],
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          // onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.linkInvitation)}
        />
      </ThemeProvider>
      <div>
        {iserror && (
          <Alert severity="error">
            <AlertTitle>ERROR</AlertTitle>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>
    </div>
  );
};
export default TicketCRUD;
