import React from "react";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";
import { Container, CssBaseline, Divider, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function Contact() {
  const contacts = useRecoilValue(contactsState);
  const mdTheme = createTheme();
  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 10 },
    { field: "name", headerName: "Full Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "organization", headerName: "Organization", width: 200 },
    { field: "address", headerName: "Address", width: 400 },
    { field: "city", headerName: "City", width: 200 },
    { field: "createdAt", headerName: "Issued", width: 250 },
  ];
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {/* <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> */}
      <Grid container>
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
          Contacts
        </Typography>
        {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack> */}
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={contacts}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </Grid>
      {/* <Copyright sx={{ pt: 4 }} /> */}
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default Contact;
