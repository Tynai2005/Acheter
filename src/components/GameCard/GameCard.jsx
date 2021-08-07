import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGames } from "../../contexts/GameContext";

const GameCard = ({ game }) => {
  const { deleteGame, setEditGameInfo, id, changeId } = useGames();
  const { logged } = useAuth();
    return(
        <div className="game-card">
          <div className="game-img-div" onClick={() => changeId(game.id)}>
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
                {game.price}$
              </div>
            {logged && logged.isAdmin ? (
              <div>
                <button onClick={() => deleteGame(game.id)}>DELETE</button>
                <button onClick={() => setEditGameInfo(game.id)}>EDIT</button>
              </div>
            ) : null}
          </div>
        ) : (
          <div style={{ color: "gainsboro", fontSize: "15px" }}>
            {game.price}$
          </div>
        )}
        {logged && logged.isAdmin ? (
          <div>
            <button onClick={() => deleteGame(game.id)}>DELETE</button>
            <button onClick={() => setEditGameInfo(game.id)}>EDIT</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameCard;
