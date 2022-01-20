import React, { useEffect, useState, useRef } from "react";
// import MaterialTable, { Column } from "@material-table/core";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle, Button, Icon } from "@mui/material";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";

import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
// import { ComponentToPrint } from "./ComponentToPrint";
import AttendancePrint from "../../components/print/AttendancePrint";
// import { PassMediaPrint } from "../../components/print/PassMediaPrint.jsx";

import moment from "moment";
import "moment/locale/id";

const PrintAttendance = () => {
  const contacts = useRecoilValue(contactsState);

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [data, setData] = useState([]);

  const formatingDate = (data) => {
    if (data === "null") {
      return "BELUM CHECK-OUT";
    } else {
      return moment(data).format("LTS");
    }
  };

  let columns = [
    { field: "contactId", title: "CID" },
    { field: "ticketCode", title: "T. Code" },
    { field: "name", title: "Full Name" },
    { field: "remark", title: "Remark" },
    { field: "city", title: "City" },
    { field: "checkInAt", title: "Check-In At", render: (rowData) => moment(rowData.checkInAt).format("LTS") },
    { field: "numberOfPeople", title: "NOP" },
    { field: "checkOutAt", title: "Check-Out At", render: (rowData) => (rowData.checkOutAt === null ? "BELUM CHECK-OUT" : moment(rowData.checkOutAt).format("LTS")) },
    { field: "typeOfAttendance", title: "TOA" },
  ];

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/attendances`).then((res) => {
      const users = res.data;
      // setData(users);
      setUser(users);
      // console.log(users);
    });
    // setUser(contacts);
  }, []);

  const HandleToPrint = () => {
    const ComponentRef = useRef();
    // const HandlePrint = useReactToPrint({
    //   content: () => ComponentRef.current,
    // });
  };

  const handleSelection = async (rows) => {
    setData(rows);
  };

  function PrintComponent() {
    let componentRef = useRef();
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
          <ReactToPrint trigger={() => <Button>Print this out!</Button>} content={() => componentRef} />

          {/* component to be printed */}
          <AttendancePrint data={data} ref={(el) => (componentRef = el)} />
        </div>
      </>
    );
  }

  const mdTheme = createTheme();
  return (
    <div>
      <h2>Print Attendance</h2>
      {/* {newData} */}
      <ThemeProvider theme={mdTheme}>
        <MaterialTable
          title="Contact"
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
          onSelectionChange={(rows) => handleSelection(rows)}
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
      {/* <ReactToPrint trigger={() => <button>Print this out!</button>} content={() => ComponentRef.current} /> */}
      <PrintComponent />
    </div>
  );
};
export default PrintAttendance;
