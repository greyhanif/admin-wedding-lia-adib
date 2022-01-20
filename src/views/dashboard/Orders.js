import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  // console.log(props.contacts);
  return (
    <React.Fragment>
      <Title>Recent Contact</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(props.lastContacts)}
          {props.lastContacts &&
            props.lastContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.organization}</TableCell>
                <TableCell>{contact.city}</TableCell>
                <TableCell>{contact.phone}</TableCell>
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
