import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { GAMES_API, JSON_API_USERS } from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Button } from "@material-ui/core";

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
    zIndex: "1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "100%",
  },
  content: {
    width: "230px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "10px !important",
  },

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
  noGame: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  libraryText: {
    color: "white",
    margin: "20px",
  },
  playBtn: {
    color: "white",
    backgroundColor: "green",
    border: "0",
    borderRadius: "5px",
    zIndex: "0",

    width: "100%",
  },
}));

const LibraryCard = () => {
  const [libraryGame, setLibraryGame] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let library = [];
  const curUser = JSON.parse(localStorage.getItem("user"));
  const getGames = async () => {
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
    <>
      <h2 className={classes.libraryText}>Your library</h2>
      {curUser.library.length > 0 ? (
        <Container className={classes.container}>
          {libraryGame.map((game) => (
            <div className="card">
              <img
                src={game.image}
                alt={game.name}
                className={classes.cardImg}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <div>
                    <Typography className={classes.gameTitle}>
                      {game.name}
                    </Typography>
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
                  </div>
                  <Button className={classes.playBtn}>Play</Button>
                </CardContent>
              </div>
              {/* <CardMedia className={classes.cover} image={game.image} /> */}
            </div>
          ))}
        </Container>
      ) : (
        <h2 className={classes.noGame}>There isn't games in your library</h2>
      )}
    </>
  );
};

export default LibraryCard;
