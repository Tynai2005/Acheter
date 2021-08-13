import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGames } from "../../contexts/GameContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  editBtn: {
    backgroundColor: "inherit",
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  deleteBtn: {
    border: "0",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
  },
}));
const GameCard = ({ game }) => {
  const classes = useStyles();
  const { deleteGame, setEditGameInfo, history } = useGames();
  const { logged } = useAuth();

  return (
    <div className="game-card" style={{ marginBottom: "30px" }}>
      <div
        className="game-img-div"
        onClick={() => {
          history.push(`gameDetails/${game.id}`);
        }}
      >
        <img
          className="game-card-img"
          src={game.image}
          alt={`${game.name} img`}
        />
      </div>
      <div className="game-card-info">
        <div style={{ fontFamily: "Roboto", color: "gainsboro" }}>
          {game.name}
        </div>
        <div style={{ color: "silver", fontSize: "12px" }}>{game.creator}</div>
        <div style={{ color: "gainsboro", fontSize: "15px" }}>
          {game.price == 0 ? "Free to play" : game.price + "$"}
        </div>
        {logged && logged.isAdmin ? (
          <div>
            <button
              className={classes.deleteBtn}
              onClick={() => deleteGame(game.id)}
            >
              DELETE
            </button>
            <button
              className={classes.editBtn}
              onClick={() => setEditGameInfo(game.id)}
            >
              EDIT
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameCard;
