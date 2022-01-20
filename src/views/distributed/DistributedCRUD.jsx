import React, { useEffect, useState } from "react";
// import MaterialTable, { Column } from "@material-table/core";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle, Autocomplete, Icon, Input } from "@mui/material";

import { useRecoilValue } from "recoil";
import { contactsState, relationshipCodeState } from "../../store";
import { Button, Grid, TextField } from "@material-ui/core";

import ShareIcon from "@mui/icons-material/Share";

import moment from "moment";
import "moment/locale/id";

const DistributedCRUD = () => {
  // const contacts = useRecoilValue(ticketsState);
  const dataSelectInvitationType = [
    {
      id: 1,
      code: "fisik",
      detail: "Undangan Fisik",
    },
    {
      id: 2,
      code: "online",
      detail: "Undangan Elektronik",
    },
  ];

  const dataSelectDistributionLine = [
    {
      id: 1,
      code: "gojek",
      detail: "Gojek",
    },
    {
      id: 2,
      code: "pos",
      detail: "Pos Indonesia",
    },
    {
      id: 3,
      code: "JNE",
      detail: "Jalur Nugraha Ekakurir",
    },
    {
      id: 4,
      code: "wa",
      detail: "WhatsApp",
    },
    {
      id: 5,
      code: "other",
      detail: "Lainnya",
    },
  ];

  const dataSelectRemarks = [
    {
      id: 1,
      code: "done",
      detail: "Selesai",
    },
  ];

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [data, setData] = useState([]);

  const [getContact, setGetContact] = useState([]);
  const contacts = useRecoilValue(contactsState);
  const [selectedContact, setSelectedContact] = useState({ id: 0, name: "" });

  const [msg, setMsg] = useState("");

  const [selectedInvitationType, setSelectedInvitationType] = useState("fisik");
  const [selectedDistributionLine, setSelectedDistributionLine] = useState("gojek");
  const [selectedRemarks, setSelectedRemarks] = useState("done");

  const formatingDate = (data) => {
    moment(data, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow();
    return data;
  };

  const formatingLogo = (data) => {
    if (data === "Pertamina") {
      return <img src={"https://upload.wikimedia.org/wikimedia/id/b/b8/Pertamina.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "Binamarga Jateng") {
      return <img src={"https://dpubinmarcipka.jatengprov.go.id/dpu-bmck/uploads/img-profil.jpg"} style={{ width: 50, borderRadius: "5%" }} />;
    } else {
      return data;
    }
  };

  const formatDistributionLine = (data) => {
    if (data === "gojek") {
      return <img src={"https://lelogama.go-jek.com/cms_editor/2021/05/28/info-gojek-2.png"} style={{ width: 50 }} />;
    } else if (data === "pos") {
      return <img src={"https://upload.wikimedia.org/wikipedia/id/thumb/0/00/Pos-Indonesia.svg/1200px-Pos-Indonesia.svg.png"} style={{ width: 50 }} />;
    } else if (data === "jne") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png"} style={{ width: 50 }} />;
    } else if (data === "wa") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png"} style={{ width: 50 }} />;
    } else {
      return data;
    }
  };

  let columns = [
    { field: "id", title: "#", editable: "never" },

    { field: "ticketCode", title: "Kode Tiket", editable: "never" },
    { field: "contactId", title: "ID Kontak", editable: "never" },
    { field: "contact.name", title: "Nama", editable: "never" },
    { field: "contact.organization", title: "Organization", editable: "never", render: (rowData) => (rowData.contact.organization ? formatingLogo(rowData.contact.organization) : rowData.contact.organization) },
    { field: "contact.city", title: "Kota", editable: "never" },
    { field: "invitationType", title: "Jenis Undangan", render: (rowData) => (rowData.invitationType ? rowData.invitationType.toUpperCase() : "BELUM DIKETAHUI") },
    { field: "distributionLine", title: "Jalur", render: (rowData) => (rowData.distributionLine ? formatDistributionLine(rowData.distributionLine) : "BELUM DIKETAHUI") },
    { field: "remarks", title: "Komentar", render: (rowData) => (rowData.remarks ? rowData.remarks.toUpperCase() : "BELUM DIKETAHUI") },
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/distributed`);
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/distributed/${newData.id}`, newData);

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
      .delete(`${process.env.REACT_APP_API_URL}/distributed/${oldData.id}`)
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
    if (newData.ticketCode === "") {
      errorList.push("Try Again, You didn't enter the name field");
    }

    if (errorList.length < 1) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/distributed`, newData)
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
  // console.log(data);
  const regex = /[A-Z]{4}\-[A-Z0-9]{4}/g;
  const HandleGetContact = async (inputCode) => {
    console.log(inputCode);
    if (regex.test(inputCode)) {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/counter/${inputCode}`).then((res) => {
          const users = res.data;
          console.log(users);
          setGetContact(users);
        });
        await axios.post(`${process.env.REACT_APP_API_URL}/distributed`, {
          contactId: getContact.contacts[0].id,
          ticketCode: getContact.tickets[0].ticketCode,
          invitationType: selectedInvitationType,
          distributionLine: selectedDistributionLine,
          remarks: selectedRemarks,
        });
        setGetContact("");
        getListTicket();
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    }
  };
  console.log(selectedRemarks);
  const HandleCreateTicket = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/distributed`, {
        contactId: selectedContact.id,
        ticketCode: selectedContact.tickets[0].ticketCode,
        invitationType: selectedInvitationType,
        distributionLine: selectedDistributionLine,
        remarks: selectedRemarks,
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

  const Input = () => {
    const [value, setValue] = useState("");

    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            HandleGetContact(value);
          }
        }}
      />
    );
  };

  return (
    <div>
      <h2>Daftar Distribusi</h2>
      {/* {newData} */}

      <Input />

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
        onSubmit={(event) => event.preventDefault() + HandleCreateTicket()}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={contacts}
          isOptionEqualToValue={(option) => option.id}
          getOptionLabel={(option) => option.id + " - " + option.name + " - " + option.organization + " - " + option.city + " - " + (option.tickets[0] === undefined ? "TIKET BELUM DIBUAT" : option.tickets[0].ticketCode)}
          defaultValue={contacts.id}
          onChange={(event, newValue) => {
            event.preventDefault();
            setSelectedContact(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="standard" label="Contacts" margin="normal" fullWidth />}
        />

        <TextField
          id="filled-select-currency-native"
          size="small"
          fullWidth
          select
          label="Invitation Type"
          onChange={(event) => setSelectedInvitationType(event.target.value)}
          value={selectedInvitationType}
          defaultValue={"fisik"}
          SelectProps={{
            native: true,
          }}
          // helperText="Pilih asal kota"
          variant="standard"
        >
          {dataSelectInvitationType.map((data) => (
            <option key={data.id} value={data.code}>
              {data.code.toUpperCase() + " - " + data.detail}
            </option>
          ))}
        </TextField>

        <TextField
          id="filled-select-currency-native"
          size="small"
          fullWidth
          select
          label="Distribution Line"
          onChange={(event) => setSelectedDistributionLine(event.target.value)}
          value={selectedDistributionLine}
          defaultValue={"gojek"}
          SelectProps={{
            native: true,
          }}
          // helperText="Pilih asal kota"
          variant="standard"
        >
          {dataSelectDistributionLine.map((data) => (
            <option key={data.id} value={data.code}>
              {data.code.toUpperCase() + " - " + data.detail}
            </option>
          ))}
        </TextField>
        <TextField
          id="filled-select-currency-native"
          size="small"
          fullWidth
          select
          label="Remarks"
          onChange={(event) => setSelectedRemarks(event.target.value)}
          value={selectedRemarks}
          defaultValue={"done"}
          SelectProps={{
            native: true,
          }}
          // helperText="Pilih asal kota"
          variant="standard"
        >
          {dataSelectRemarks.map((data) => (
            <option key={data.id} value={data.code}>
              {data.code.toUpperCase() + " - " + data.detail}
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
export default DistributedCRUD;
