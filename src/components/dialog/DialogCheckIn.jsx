import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Typography } from "@mui/material";
import axios from "axios";

function DialogCheckIn(props) {
  const [getContact, setGetContact] = useState([]);
  const [msg, setMsg] = useState("");
  // let contacts = getContact;
  let data = props.data;

  useEffect(() => {
    HandleGetContact();
  }, [props]);

  const HandleGetContact = async (event) => {
    // event.preventDefault();
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/counter/${data}`).then((res) => {
        const users = res.data;
        setGetContact(users);
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.dialogState} onClose={props.handleClose} fullWidth={true}>
        <DialogTitle>Detail Contact</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography gutterBottom variant="h4" component="div">
            {data && data}
          </Typography>
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Nama
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {getContact && getContact.name}
          </Typography>
          <Divider />
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Kota
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {getContact && getContact.city}
          </Typography>
          <Divider />
          <Typography sx={{ mt: 1, mb: 0 }} variant="body1" color="text.secondary">
            Jenis Tamu
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Keluarga dari pengantin perempuan
          </Typography>
          <Divider />
          <TextField autoFocus margin="dense" id="name" label="Number Of People" type="number" fullWidth variant="standard" />
          <Button onClick={props.handleClose} fullWidth variant="outlined" sx={{ mt: 3, mb: 0 }}>
            Batal
          </Button>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}>
            CheckIn
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogCheckIn;
