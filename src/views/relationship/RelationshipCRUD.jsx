import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
// import MaterialTable, { Column } from "@material-table/core";
// import "./App.css";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

const RelationshipCRUD = () => {
  // const contacts = useRecoilValue(contactsState);

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const formatingLogo = (data) => {
    if (data === "PTMN") {
      return <img src={"https://upload.wikimedia.org/wikimedia/id/b/b8/Pertamina.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BPIX") {
      return <img src={"http://www.bhimasenapower.co.id/upload/20160309082009-header-logo-bhimasena.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BPNX") {
      return <img src={"https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_BPN-KemenATR_%282017%29.png"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "BNMR") {
      return (
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Logo_of_the_Ministry_of_Public_Works_and_Housing_of_the_Republic_of_Indonesia.svg/1200px-Logo_of_the_Ministry_of_Public_Works_and_Housing_of_the_Republic_of_Indonesia.svg.png"
          }
          style={{ width: 50, borderRadius: "5%" }}
        />
      );
    } else if (data === "PBTR") {
      return <img src={"https://assets.karirpad.com/uploads/employer/logo/2021-05/c1239b7c7723da2abe819901e133e8b4.jpg"} style={{ width: 50, borderRadius: "5%" }} />;
    } else if (data === "PPKX") {
      return <img src={"https://lh3.googleusercontent.com/proxy/B_glD78RG4jkLxEzQdGEK4gcXDfze1pgjOHMDZTIsIt3U1VqiY5kUdnSNpSSAPyvHoIpZYBA-83lOmRBiQPhI7WD1oLa9_2cM3OiblouhxP5z75nF0w"} style={{ width: 50, borderRadius: "5%" }} />;
    } else {
      return data;
    }
  };

  let columns = [
    { field: "id", title: "#" },
    { field: "code", title: "Icon", editable: "never", render: (rowData) => formatingLogo(rowData.code) },
    { field: "code", title: "Code" },
    { field: "detail", title: "Detail" },
  ];

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/relationship`).then((res) => {
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/relationship/${newData.id}`, newData);

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
      .delete(`${process.env.REACT_APP_API_URL}/relationship/${oldData.id}`)
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
    if (newData.code === "") {
      errorList.push("Try Again, You didn't enter the Code field");
    }
    if (newData.detail === "") {
      errorList.push("Try Again, You didn't enter the Detail field");
    }

    if (errorList.length < 1) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/relationship`, newData)
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
    <div className="app">
      <h2>Material Table Example Using JSONPlaceholder API</h2>
      {/* {newData} */}

      <MaterialTable
        title="Contact"
        columns={columns}
        data={user}
        options={{
          headerStyle: { borderBottomWidth: "1px" },
          actionsColumnIndex: -1,
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

export default RelationshipCRUD;
