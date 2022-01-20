import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import "moment/locale/id";

import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const ThemeLiaAdib = createTheme({
  palette: {
    primary: {
      main: "#6d5128",
    },
    secondary: {
      main: "#eeeeee",
    },
  },
});
// axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense
        fallback={
          <Typography component="h2" variant="h6" color="inherit" gutterBottom>
            Loading...
          </Typography>
        }
      >
        <BrowserRouter>
          <ThemeProvider theme={ThemeLiaAdib}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
