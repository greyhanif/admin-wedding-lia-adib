import React, { useEffect, useState } from "react";
// import MaterialTable, { Column } from "@material-table/core";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle, Icon } from "@mui/material";

import { useRecoilValue } from "recoil";
import { configurationState } from "../../store";

// regex for email validation
const validateEmail = (email) => {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
};

const ConfigurationCRUD = () => {
  const configurations = useRecoilValue(configurationState);

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [data, setData] = useState([]);

  let columns = [
    { field: "id", title: "#" },
    { field: "property", title: "Property" },
    { field: "detail", title: "Detail" },
    { field: "key", title: "Key" },
    { field: "valueInt", title: "Value Integer" },
    { field: "valueStr", title: "Value String" },
  ];

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/configuration`).then((res) => {
      const users = res.data;
      // setData(users);
      setUser(users);
      // console.log(users);
    });
    // setUser(contacts);
  }, []);

  // function for updating the existing row details
  const handleRowUpdate = async (newData, oldData, resolve) => {
    //validating the data inputs
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/configuration/${newData.id}`, newData);

      const updateUser = [...user];
      const index = oldData.tableData.id;
      updateUser[index] = newData;
      setUser([...updateUser]);
      resolve();
      setIserror(false);
      setErrorMessages([]);
    } catch (error) {
      setErrorMessages(["Update failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/configuration/${oldData.id}`)
      .then((response) => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = [];
    if (newData.property === "") {
      errorList.push("Try Again, You didn't enter the name field");
    }
    if (newData.key === "") {
      errorList.push("Try Again, You didn't enter the Username field");
    }

    if (errorList.length < 1) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/configuration`, newData)
        .then((response) => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          // console.log(newData);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const mdTheme = createTheme();
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#4caf50",
  //     },
  //     secondary: {
  //       main: "#ff9100",
  //     },
  //   },
  // });

  return (
    <div>
      <h2>Daftar Konfigurasi</h2>
      {/* {newData} */}
      <ThemeProvider theme={mdTheme}>
        <MaterialTable
          title="Configuration"
          tableLayout="auto"
          columns={columns}
          data={user}
          options={{
            headerStyle: { borderBottomWidth: "1px" },
            actionsColumnIndex: -1,
            exportButton: true,
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
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
    </div>
  );
};
export default ConfigurationCRUD;
