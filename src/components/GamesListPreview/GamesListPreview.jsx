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
    marginTop: "30px",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  seeMore: {
    display: "flex",
    justifyContent: "space-between",
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
      <Grid className={classes.seeMore}>
        <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
          All games
        </h4>
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
