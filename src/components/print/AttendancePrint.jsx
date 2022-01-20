import React, { useEffect, useState } from "react";
import "./attendancePrint.css";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";

import moment from "moment";
import "moment/locale/id";

import { styled, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const StyledTableCell = styled(TableCell)(({ ThemeLiaAdib, theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class AttendancePrint extends React.Component {
  //   const contacts = useRecoilValue(contactsState);

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  render() {
    console.log(this.props.data.length);
    return (
      <div>
        <style>@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300;500;700&display=swap');</style>{" "}
        <body class="body-attendance">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">CID</StyledTableCell>
                  <StyledTableCell align="center">T. Code</StyledTableCell>
                  <StyledTableCell align="center">Nama Legkap</StyledTableCell>
                  <StyledTableCell align="center">Kota</StyledTableCell>
                  <StyledTableCell align="center">Instansi</StyledTableCell>
                  <StyledTableCell align="center">Waktu Cek-In</StyledTableCell>
                  <StyledTableCell align="center">Waktu Cek-Out</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.contactId}</StyledTableCell>
                    <StyledTableCell align="center">{row.ticketCode}</StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">{row.remark}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row.checkInAt).format("LTS")}</StyledTableCell>
                    <StyledTableCell align="center">{row.checkOutAt === null ? "BELUM CHECK-OUT" : moment(row.checkInOut).format("LTS")}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div id="grid">
            {this.props.data.length === 0 ? (
              <p className="code">Memutakhirkan data . . . </p>
            ) : (
              this.props.data.map((data) => (
                
                
              ))
            )}
          </div> */}
          {/* <footer>
            <code class="code ml-2 mt-2">---------------- AUTO GENERATE PASS CARD - WEDDING INVITATION SYSTEM 2021 ----------------</code>
          </footer> */}
        </body>
      </div>
    );
  }
}
export default AttendancePrint;
