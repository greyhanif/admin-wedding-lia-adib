import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import moment from "moment";
import "moment/locale/id";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export default function LastCheckOut(props) {
  // console.log(props.contacts);
  return (
    <React.Fragment>
      <Title>Last Check Out</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>OUT</TableCell>
            <TableCell>COA</TableCell>
            <TableCell>T. Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>NOP</TableCell>
            <TableCell>TOA</TableCell>
            <TableCell>RS</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(props.lastCheckOut)}
          {props.lastCheckOut.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>
                <img style={{ width: 20 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/768px-Eo_circle_red_arrow-down.svg.png" />
              </TableCell>
              <TableCell>{moment(attendance.checkOutAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow()}</TableCell>
              <TableCell>{attendance.ticketCode}</TableCell>
              <TableCell>{attendance.name}</TableCell>
              <TableCell>{attendance.city}</TableCell>
              <TableCell>{attendance.numberOfPeople} Pax</TableCell>
              <TableCell>{attendance.typeOfAttendance}</TableCell>
              <TableCell>
                E: {attendance.expectedNumberOfSouvenir} A: {attendance.actuallyNumberOfSouvenir} {attendance.remarksSouvenir}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
