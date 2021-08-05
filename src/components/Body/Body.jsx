import { Container, Grid } from "@material-ui/core";
import React from "react";

const Body = () => {
  return (
    <Container>
      <Grid>
        <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
          Best games of this summer
        </h4>
      </Grid>
    </Container>
  );
};

export default Body;
