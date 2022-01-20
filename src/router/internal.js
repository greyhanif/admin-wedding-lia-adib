import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Scanner from "../../src/components/scanner/Scanner";

function Internal(props) {
  return (
    <Routes>
      <Route path="/check-in" element={<Scanner />} />
    </Routes>
  );
}

export default Internal;
