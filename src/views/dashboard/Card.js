import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Card(props) {
  return (
    <React.Fragment>
      <Title sx={{ lineHeight: 0.5, m: 0 }} component="p">
        {props.title}
      </Title>
      {/* <Typography sx={{ lineHeight: 1.5, m: 0 }} component="p">
        {props.title}
      </Typography> */}
      <Typography sx={{ lineHeight: 1.3, m: 0 }} component="p" variant="h5">
        {props.value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {props.caption}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
