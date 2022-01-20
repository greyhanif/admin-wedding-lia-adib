import React, { useEffect, useState } from "react";
// import MaterialTable, { Column } from "@material-table/core";
import MaterialTable from "material-table";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle, Icon } from "@mui/material";

import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";

import moment from "moment";
import "moment/locale/id";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6b0f10",
    },
    secondary: {
      main: "#eeeeee",
    },
  },
});

// regex for email validation
const validateEmail = (email) => {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
};

const ContactCRUD = () => {
  const contacts = useRecoilValue(contactsState);

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [data, setData] = useState([]);

  const formatingLogo = (data) => {
    if (data === "Pertamina") {
      return <img src={"https://upload.wikimedia.org/wikimedia/id/b/b8/Pertamina.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "Binamarga Jateng") {
      return <img src={"https://dpubinmarcipka.jatengprov.go.id/dpu-bmck/uploads/img-profil.jpg"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "PPK Yogyakarta Solo" || data === "PPK Pemalang Batang" || data === "PPK Ciawi Sukabumi") {
      return <img src={"https://lh3.googleusercontent.com/proxy/B_glD78RG4jkLxEzQdGEK4gcXDfze1pgjOHMDZTIsIt3U1VqiY5kUdnSNpSSAPyvHoIpZYBA-83lOmRBiQPhI7WD1oLa9_2cM3OiblouhxP5z75nF0w"} style={{ width: 50, borderRadius: "5%" }} />;
    } else {
      return data;
    }
  };

  const formatDistributionLine = (data) => {
    if (data === "gojek") {
      return <img src={"https://lelogama.go-jek.com/cms_editor/2021/05/28/info-gojek-2.png"} style={{ width: 50 }} />;
    } else if (data === "pos") {
      return <img src={"https://upload.wikimedia.org/wikipedia/id/thumb/0/00/Pos-Indonesia.svg/1200px-Pos-Indonesia.svg.png"} style={{ width: 50 }} />;
    } else if (data === "jne") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png"} style={{ width: 50 }} />;
    } else if (data === "wa") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png"} style={{ width: 50 }} />;
    } else {
      return data;
    }
  };

  let columns = [
    { field: "id", title: "ID", editable: "never" },
    { field: "title", title: "Title" },
    { field: "name", title: "Full Name" },
    { field: "gender", title: "Gender" },
    { field: "phone", title: "Phone" },
    // { field: "email", title: "Email" },
    { field: "organization", title: "Logo", editable: "never", render: (rowData) => formatingLogo(rowData.organization) },
    { field: "organization", title: "Organization" },
    { field: "address", title: "Address" },
    { field: "city", title: "City" },
    { field: "imgUrl", title: "IMG URL" },
    { field: "updatedAt", title: "Diubah", editable: "never", render: (rowData) => moment(rowData.updatedAt, "YYYY-MM-DD HH:mm:ss.SSS Z").fromNow() },
    { field: "tickets[0].ticketCode", title: "Tiket", editable: "never", render: (rowData) => (rowData.tickets[0] === undefined ? "BELUM TERBIT" : rowData.tickets[0].ticketCode) },
    { field: "distributeds[0].invitationType", title: "Jenis Undangan", editable: "never", render: (rowData) => (rowData.distributeds[0] === undefined ? "BELUM" : rowData.distributeds[0].invitationType.toUpperCase()) },
    { field: "distributeds[0].distributionLine", title: "Jalur", editable: "never", render: (rowData) => (rowData.distributeds[0] === undefined ? "BELUM" : formatDistributionLine(rowData.distributeds[0].distributionLine)) },
  ];

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/contacts`).then((res) => {
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/contacts/${newData.id}`, newData);

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
      .delete(`${process.env.REACT_APP_API_URL}/contacts/${oldData.id}`)
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
    if (newData.name === "") {
      errorList.push("Try Again, You didn't enter the name field");
    }
    if (newData.phone === "") {
      errorList.push("Try Again, You didn't enter the Username field");
    }
    if (newData.city === "") {
      errorList.push("Try Again, Enter website url before submitting");
    }

    if (errorList.length < 1) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/contacts`, newData)
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

  return (
    <div>
      <h2>Daftar Kontak</h2>
      {/* {newData} */}
      <ThemeProvider theme={ThemeLiaAdib}>
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

  //   return (
  //     <MaterialTable
  //       title="Editable Preview"
  //       columns={columns}
  //       data={data}
  //       editable={{
  //         onRowAdd: (newData) =>
  //           new Promise(async (resolve, reject) => {
  //             const response = await axios.post(
  //               `${process.env.REACT_APP_API_URL}/contacts`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //                 },
  //               },
  //               newData
  //             );

  //             setData([...data, newData]);

  //             resolve();
  //           }),
  //         onRowUpdate: (newData, oldData) =>
  //           new Promise(async (resolve, reject) => {
  //             const response = await axios.put(
  //               `${process.env.REACT_APP_API_URL}/contacts`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //                 },
  //               },
  //               newData
  //             );

  //             const dataUpdate = [...data];
  //             const index = oldData.tableData.id;
  //             dataUpdate[index] = newData;
  //             setData([...dataUpdate]);

  //             resolve();
  //           }),
  //         onRowDelete: (oldData) =>
  //           new Promise(async (resolve, reject) => {
  //             const response = await axios.delete(
  //               `${process.env.REACT_APP_API_URL}/contacts`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //                 },
  //               },
  //               oldData
  //             );
  //             const dataDelete = [...data];
  //             const index = oldData.tableData.id;
  //             dataDelete.splice(index, 1);
  //             setData([...dataDelete]);

  //             resolve();
  //           }),
  //       }}
  //     />
  //   );
};
export default ContactCRUD;
