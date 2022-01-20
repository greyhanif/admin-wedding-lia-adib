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

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

function preventDefault(event) {
  event.preventDefault();
}

export default function Logs(props) {
  return (
    <React.Fragment>
      <Title>Logs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Remarks</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(props.lastLogs)}
          {/* <p>{props.lastLogs}</p> */}
          {props.lastLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{moment(log.createdAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow()}</TableCell>
              <TableCell>{log.code}</TableCell>
              <TableCell>{log.detail}</TableCell>
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
