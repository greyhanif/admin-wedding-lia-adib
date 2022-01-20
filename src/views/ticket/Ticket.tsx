import React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";
import { contactsState, ticketsState, relationshipCodeState } from "../../store";
import { Autocomplete, Button, Container, CssBaseline, Divider, Grid, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import axios from "axios";
// import { typography } from "@mui/system";

function Ticket() {
  const contacts = useRecoilValue(contactsState);
  const tickets = useRecoilValue(ticketsState);
  const relationships = useRecoilValue(relationshipCodeState);
  const [selectedContact, setSelectedContact] = useState({ id: 0, name: "" });
  const [relationshipCode, setRelationshipCode] = useState({});
  const [msg, setMsg] = useState("");
  const mdTheme = createTheme();
  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];
  console.log(selectedContact.id + " - " + selectedContact.name + " - " + relationshipCode);

  // useEffect(() => {

  // }, []);

  const HandleCreateTicket = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tickets`, {
        contactId: selectedContact.id,
        relationshipCode: relationshipCode,
      });
    } catch (error: any) {
      // console.log(email);
      if (error.response) {
        setMsg(error.response.data.message);
        console.log(error.response.data);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 10 },
    { field: "ticketCode", headerName: "Ticket Code", width: 150 },
    { field: "contactId", headerName: "Contact ID", width: 100 },
    { field: "relationshipCode", headerName: "Relationship Code", width: 150 },
    { field: "linkInvitation", headerName: "Link Invitation", width: 400 },
    { field: "numberOfSouvenir", headerName: "Initial of Souvenir", width: 150 },
    { field: "createdAt", headerName: "Issued", width: 250 },
  ];

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {/* <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> */}
      <Typography component="h1" variant="h5" align="left" sx={{ mt: 2, mb: 2 }}>
        Create Ticket
      </Typography>
      <Grid
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "60ch" },
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
          getOptionLabel={(option) => option.id + " - " + option.name + " - " + option.organization + " - " + option.city}
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
          {relationships.map((relationship: any) => (
            <option key={relationship.id} value={relationship.code}>
              {relationship.code + " - " + relationship.detail}
            </option>
          ))}
        </TextField>
        <Button onClick={() => HandleCreateTicket()} variant="contained" size="small" disableElevation>
          Create
        </Button>
      </Grid>
      <Grid>
        <Divider />
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
          Tickets
        </Typography>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid sortingOrder={["asc", "desc", null]} rows={tickets} columns={columns} />
        </div>
      </Grid>
      {/* <Copyright sx={{ pt: 4 }} /> */}
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default Ticket;
