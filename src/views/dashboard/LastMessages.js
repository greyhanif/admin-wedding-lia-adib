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

export default function LastMessages(props) {
  // console.log(props.contacts);
  return (
    <React.Fragment>
      <Title>Last Messages</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Message</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(props.lastContacts)}
          {props.lastMessages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{moment(message.createdAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow()}</TableCell>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.city}</TableCell>
              <TableCell>{message.message}</TableCell>
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
