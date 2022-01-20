import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, CardMedia } from "@mui/material";
import { authUserState } from "../../store";
import { useRecoilState } from "recoil";
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
        Wedding Information System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [auth, setAuthUser] = useRecoilState(authUserState);

  const navigate = useNavigate();
  // {
  //   auth && navigate("/dashboard");
  // }
  // console.log(`Bearer ${sessionStorage.getItem("token")}`);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password,
      });
      console.log(response.data.accessToken);
      // console.log(response.cookies.refreshToken);
      sessionStorage.setItem("token", response.data.accessToken);
      setAuthUser(true);
      navigate("/dashboard");
    } catch (error) {
      // console.log(email);
      if (error.response) {
        setMsg(error.response.data.message);
        console.log(error.response.data);
      }
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <ThemeProvider theme={ThemeLiaAdib}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/fife/AAWUweX18P1QPtj0SaR8tBnMfRtJXlA98DOrU9r9KQiGDTROhha1mlwtj43rtrJtiuGCjSm9ii3CpbpL8fyjwtqvYyKinQULAY8v00y-GMRfR59huQsmPLPKs4DAyamjpBC1mGNToPMGDjHiFf2A4O_StsDaPXviUF9dFWtic3s9ZLLP8GAi_tCo_ufLWufqJ77btYvtKY44IBRJnBPzQnElaanmuLoB0OOh3EaYQ5H-VV3r0-q_a0u7Wl1HN0DvpiOamJxDXNmTQx-isspbhmp8HZT3BU32GpxfagiC0cGc-dJZnfV15cjqDtgcB384tpau0XeBXA8pTKCIq47QTMZJ_jETaeK2TNQ6wBhvAhcQnx85bKD2gvFFhiyMbIpR4a6SMaGfIEG8hvqa70IdhXiG66pqHktO4q4KdgeBZiX9jebk1oH00K20Kha1G6Hy9WUoGD6m_RS6JqFf394PJ4ZTzb5wvNCybfMKpGmZCnURC2V9q6_y9Ego_AIyxjZh61I73vVFjNS62v7D-BwfZ1n779yCdCM4eHT7rdwp6XpwQUZYYdBIqwIAG5QcWjesg1nb_FzHCr0bq7c9tYdNszwTi-Zo9BKE-5fKIrrKI9XwqE0khJ6iHhiax_9Sta6uQBluEDcuSI0dOyxoFoABxNFb3mQwEHhddZonjnomTY0rd2L3eWtyEtfItpNe4EkyLJcMGS35KX_uBI1vay3F1gp1zFeq3bXKPIz4LQ=w2000-h2000-ft)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} sx={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
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
            {/* <Paper
              component="img"
              height="20"
              image="https://lh3.googleusercontent.com/fife/AAWUweWyC3RjI2QBZFXI58PRovzas8LQHgCcCrYzTmQcy-rDV1gfSHvncXGVvAg9W-nZ7GF68oXIPFCKIHG8T4YkFnVt_PtOV0LcMqHUdKh5e9gdNsdHOFtpfSj2l5b7wLnimrUmjbTj4Of9iMLwFJQ1SYT3WraGaFpcmiJz9iWVKqNKoB_YtXGis4NRZ8tvXL4DGiJk4l5mdDQ-Aday9J_9IfVdFk--ylIsykUoUlCK7m3fYIjdTC2D84o6aiPbET2XffbtlDwO-DIEzAGrMT4DY9VlLWf25Bn8q1QlNpSUYWUW5Kf-kvvXEOHXRgQRFiV_ZLhZbY76L4Rmkf2uI2PI5ZmRBR20-hBmNlMsFcch6Q8mZ3WhUr7CmiPe3t_VLKi7MVo7w6xuVvWBEnKJN2ToullnwGbcNSyciwqQ8K5SFH8Awq8KGll_LAQYn9ueRotYiE351u1VgNgwGlKIpFi5n-IOeu94IkiifKk8snmx4GDPSRixdexz4g9VjDQbLRJvq2MNc_LnIBBrbS8iPLhE5Xc25az9PK-Y1K8R2EEyk16eqZFofjJwAAsg4AG-GwZcWpfg-gyRGtABNcl1oVE_RnMslc9GwUmCV4kh6j6iTGL4mGIKKrp_3Tby4epMkA5zAQpT9GP5Iej62Vqr8WkRHMWjbFLWzMxURZnXl2cWgQgHErh3fjNzzD5P0QhNwiinzVOCsn-MRmYhLUEyNjSmy6hMHI4v3pxbpA=w346-h216-k-ft"
              alt="logo-lia-adib"
            /> */}
            <Typography component="h1" variant="h5" marginTop={2}>
              Log in
            </Typography>
            {msg && <Alert severity="warning">{msg}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
