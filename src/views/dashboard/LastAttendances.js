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

const formatingVIP = (data) => {
  if (data === true) {
    //emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/star_2b50.png
    return <img style={{ width: 20 }} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/star_2b50.png" />;
  } else {
    return "-";
  }
};

export default function LastAttendances(props) {
  // console.log(props.contacts);
  return (
    <React.Fragment>
      <Title>Last Check In</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>IN</TableCell>
            <TableCell>CIA</TableCell>
            <TableCell>T. Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>NOP</TableCell>
            <TableCell>Counter</TableCell>
            <TableCell>VIP</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(props.lastAttendances)} */}
          {props.lastAttendances.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>
                <img style={{ width: 20 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/480px-Eo_circle_green_arrow-up.svg.png" />
              </TableCell>
              <TableCell>{moment(attendance.checkInAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow()}</TableCell>
              <TableCell>{attendance.ticketCode}</TableCell>
              <TableCell>{attendance.name}</TableCell>
              <TableCell>{attendance.city}</TableCell>
              <TableCell>{attendance.numberOfPeople} Pax</TableCell>
              <TableCell>{attendance.checkInCounter}</TableCell>
              <TableCell>{formatingVIP(attendance.isVIP)}</TableCell>
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
