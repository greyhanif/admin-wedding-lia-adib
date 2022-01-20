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
import PassMediaPrint from "../../components/print/PassMediaPrint.jsx";
import LabelMediaPrint from "../../components/print/LabelMediaPrint";
import LableSmallMediaPrint from "../../components/print/LableSmallMediaPrint";
// import { PassMediaPrint } from "../../components/print/PassMediaPrint.jsx";

const PrintLabelSmall = () => {
  const contacts = useRecoilValue(contactsState);

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [data, setData] = useState([]);

  let columns = [
    { field: "id", title: "#" },
    { field: "tickets[0].ticketCode", title: "Ticket Code" },
    { field: "name", title: "Full Name" },
    { field: "organization", title: "Organization" },
    { field: "address", title: "Address" },
    { field: "city", title: "City" },
  ];

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/print`).then((res) => {
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
          <LableSmallMediaPrint data={data} ref={(el) => (componentRef = el)} />
        </div>
      </>
    );
  }

  const mdTheme = createTheme();
  return (
    <div>
      <h2>Print Label Small</h2>
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
          // actions={[
          //   {
          //     icon: "print",
          //     tooltip: "Print Pass",
          //     onClick: (event, rows) => {
          //       // Do save operation
          //       HandleToPrint();
          //     },
          //   },
          // ]}
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
export default PrintLabelSmall;
