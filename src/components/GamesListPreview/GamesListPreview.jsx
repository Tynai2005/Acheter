import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  seeMore: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
const GamesListPreview = () => {
  const classes = useStyles();
  const { getGamesData, gamesData, history } = useGames();

  useEffect(() => {
    getGamesData();
  }, []);

  let counter = 0;

  return (
    <Container className={classes.container}>
      <Grid style={{ color: "white", fontFamily: "Noto Sans JP" }}>
        Best games of this summer
      </Grid>
      <Grid className={classes.seeMore}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/gameslist");
          }}
        >
          See More
        </Button>
      </Grid>
      <Grid className={classes.review}>
        {gamesData &&
          gamesData.map((game) => {
            if (counter < 5) {
              counter++;
              return <GameCard game={game} />;
            }
          })}
      </Grid>
    </Container>
  );
};

export default GamesListPreview;
