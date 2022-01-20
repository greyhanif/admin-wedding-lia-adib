import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Title from "./Title";

function BarChartComp(props) {
  const theme = useTheme();
  const data = props.countContactsCity;
  return (
    <React.Fragment>
      <Title>Kota</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 2,
            right: 2,
            left: 2,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend iconSize={10} />
          <Bar dataKey="count" fill="brown" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
export default BarChartComp;
