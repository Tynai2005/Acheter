import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import axios from "axios";
import { GAMES_API, JSON_API_USERS } from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  //   details: {
  //     display: "flex",
  //     flexDirection: "column",
  //   },
  //   content: {
  //     flex: "1 0 auto",
  //   },
  //   cover: {
  //     width: 151,
  //   },
  //   controls: {
  //     display: "flex",
  //     alignItems: "center",
  //     paddingLeft: theme.spacing(1),
  //     paddingBottom: theme.spacing(1),
  //   },
  //   playIcon: {
  //     height: 38,
  //     width: 38,
  //   },
}));

const LibraryCard = () => {
  const [libraryGame, setLibraryGame] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let library = [];
  const getGames = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios(GAMES_API);
    data.map((game) => {
      curUser.library.map((libGame) => {
        if (game.id === libGame) {
          library.push(game);
        }
      });
    });
    setLibraryGame(library);
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <Container className={classes.container}>
      {libraryGame.map((game) => (
        <Card className={classes.root}>
          {/* <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {game.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {game.creator}
              </Typography>
            </CardContent>
          </div> */}
          <img src={game.image} alt={game.name} className="libraryCardImg" />
          {/* <CardMedia className={classes.cover} image={game.image} /> */}
        </Card>
      ))}
    </Container>
  );
};

export default LibraryCard;
