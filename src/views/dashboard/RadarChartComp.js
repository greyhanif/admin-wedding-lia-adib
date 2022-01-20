import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Title from "./Title";

function RadarChartComp(props) {
  const theme = useTheme();
  const data = props.countContactsCity;
  return (
    <React.Fragment>
      <Title>Kota</Title>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="city" />
          <PolarRadiusAxis angle={30} />
          <Radar name="City" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
        </RadarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
export default RadarChartComp;
