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
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardImg: {
    width: "230px",
    height: "230px",
    objectFit: "cover",
    position: "absolute",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  content: {
    width: "230px",
  },
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
  gameTitle: {
    textAlign: "center",
    color: "white",
    fontSize: "20px",
  },
  gameCreator: {
    textAlign: "center",
    color: "grey",
    fontSize: "15px",
  },
  gameDescr: {
    color: "white",
    fontSize: "15px",
  },
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
        <div className="card">
          <img src={game.image} alt={game.name} className={classes.cardImg} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.gameTitle}>{game.name}</Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.gameCreator}
              >
                {game.creator}
              </Typography>
              <Typography className={classes.gameDescr}>
                {game.description.length > 60
                  ? game.description.slice(0, 60) + "..."
                  : game.description}
              </Typography>
            </CardContent>
          </div>
          {/* <CardMedia className={classes.cover} image={game.image} /> */}
        </div>
      ))}
    </Container>
  );
};

export default LibraryCard;
