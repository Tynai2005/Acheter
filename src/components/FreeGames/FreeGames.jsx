import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import { GAMES_API } from "../../helper/consts";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "300px",
    backgroundColor: "#242424",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  card: {
    width: "355px",
    height: "250px",
    margin: "30px 0",
  },
  title: {
    color: "white",
    fontFamily: "Roboto",
    color: "gainsboro",
    fontSize: "20px",
  },
  creator: { color: "silver", fontSize: "16px" },
}));

const FreeGames = () => {
  let counter = 0;
  const { history } = useGames();
  const { gamesData, getGamesData } = useGames();
  //   const [games, setGames] = useState([]);
  //   const getGames = async () => {
  //     const { data } = await axios(GAMES_API);
  //     setGames(data);
  //   };
  useEffect(() => {
    getGamesData();
  }, []);
  //   console.log(games);
  const classes = useStyles();
  return (
    <Container style={{ margin: "30px 0" }}>
      <h4
        style={{ color: "white", margin: "20px 0", fontFamily: "Noto Sans JP" }}
      >
        Free games
      </h4>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          {gamesData &&
            gamesData.map((game) => {
              if (game.price == 0 && counter < 4) {
                counter++;
                return (
                  <div className={classes.card}>
                    <img
                      src={game.image}
                      className="free-card-img"
                      onClick={() => {
                        history.push(`gameDetails/${game.id}`);
                      }}
                    />

                    <div className={classes.title}>{game.name}</div>
                    <div className={classes.creator}>{game.creator}</div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      ;
    </Container>
  );
};

export default FreeGames;
