import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6b0f10",
    },
    secondary: {
      main: "#fcf8f1",
    },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [name, setName] = useState("");
  const [as, setAs] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, [msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.6:5000/register", {
        name: name,
        as: as,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={ThemeLiaAdib}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img
            src={
              "https://lh3.googleusercontent.com/fife/AAWUweWyC3RjI2QBZFXI58PRovzas8LQHgCcCrYzTmQcy-rDV1gfSHvncXGVvAg9W-nZ7GF68oXIPFCKIHG8T4YkFnVt_PtOV0LcMqHUdKh5e9gdNsdHOFtpfSj2l5b7wLnimrUmjbTj4Of9iMLwFJQ1SYT3WraGaFpcmiJz9iWVKqNKoB_YtXGis4NRZ8tvXL4DGiJk4l5mdDQ-Aday9J_9IfVdFk--ylIsykUoUlCK7m3fYIjdTC2D84o6aiPbET2XffbtlDwO-DIEzAGrMT4DY9VlLWf25Bn8q1QlNpSUYWUW5Kf-kvvXEOHXRgQRFiV_ZLhZbY76L4Rmkf2uI2PI5ZmRBR20-hBmNlMsFcch6Q8mZ3WhUr7CmiPe3t_VLKi7MVo7w6xuVvWBEnKJN2ToullnwGbcNSyciwqQ8K5SFH8Awq8KGll_LAQYn9ueRotYiE351u1VgNgwGlKIpFi5n-IOeu94IkiifKk8snmx4GDPSRixdexz4g9VjDQbLRJvq2MNc_LnIBBrbS8iPLhE5Xc25az9PK-Y1K8R2EEyk16eqZFofjJwAAsg4AG-GwZcWpfg-gyRGtABNcl1oVE_RnMslc9GwUmCV4kh6j6iTGL4mGIKKrp_3Tby4epMkA5zAQpT9GP5Iej62Vqr8WkRHMWjbFLWzMxURZnXl2cWgQgHErh3fjNzzD5P0QhNwiinzVOCsn-MRmYhLUEyNjSmy6hMHI4v3pxbpA=w346-h216-k-ft"
            }
            alt={"logo-lia-adib-wedding"}
            width={"70px"}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {msg && <Alert severity="warning">{msg}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" name="name" required fullWidth id="Name" label="Name" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField value={as} onChange={(e) => setAs(e.target.value)} autoComplete="as" name="as" required fullWidth id="As" label="As" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <TextField value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required fullWidth name="password" label="Confirm Password" type="password" id="confPassword" autoComplete="new-password" />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
              </Grid> */}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
