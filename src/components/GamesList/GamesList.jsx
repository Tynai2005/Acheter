import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";

import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  grids: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  addGame: {
    textDecoration: "none",
    color: "white",
  },
}));
const GamesList = () => {
  const { getGamesData, gamesData } = useGames();
  const { logged } = useAuth();
  const classes = useStyles();
  useEffect(() => {
    getGamesData();
  }, []);

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <Container className={classes.container}>
      <Grid
        className={classes.grids}
        style={{ justifyContent: "space-between", margin: "20px 0" }}
      >
        <Link to="/">
          <HomeIcon />
        </Link>
        {logged && logged.isAdmin ? (
          <Link to="/addgame" className={classes.addGame}>
            <Button variant="contained" color="primary">
              Add Game
            </Button>
          </Link>
        ) : null}
      </Grid>
      <Grid className={classes.grids}>
        {gamesData &&
          gamesData.map((game) => {
            return <GameCard game={game} />;
          })}
      </Grid>
    </Container>
  );
};

export default GamesList;
