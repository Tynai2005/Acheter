<<<<<<< .merge_file_a02872
import { Link } from "react-router-dom";
import React from "react";
=======

import { Link } from 'react-router-dom';
import React from 'react';
>>>>>>> .merge_file_a01796
import { useAuth } from "../../contexts/AuthContext";
import { useGames } from "../../contexts/GameContext";

const GameCard = ({ game }) => {
<<<<<<< .merge_file_a02872
  const { deleteGame, setEditGameInfo,history } = useGames();
=======
  const {deleteGame,setEditGameInfo,id,changeId} = useGames()
>>>>>>> .merge_file_a01796
  const { logged } = useAuth();
<<<<<<< HEAD

  return (
    <div className="game-card">
      <div className="game-img-div">
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
        {game.isDiscount ? (
          <div
            style={{
              fontSize: "14px",
              display: "flex",
              width: "80%",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "20px",
                backgroundColor: "royalblue",
                borderRadius: "5px",
                color: "gainsboro",
                fontSize: "11px",
              }}
            >
              -{game.discount}%
            </div>
            <div
              style={{
                textDecoration: "line-through",
                color: "silver",
                fontSize: "12px",
              }}
            >
              {game.price}$
            </div>
            <div style={{ color: "gainsboro", fontSize: "15px" }}>
              {Math.ceil(
                Number(game.price) -
                  (Number(game.price) / 100) * Number(game.discount)
              )}
              $
            </div>
          </div>
        ) : (
          <div style={{ color: "gainsboro", fontSize: "15px" }}>
            {game.price}$
=======
    return(
        <div className="game-card">
<<<<<<< .merge_file_a02872
          <div className="game-img-div" onClick={() => {history.push(`gameDetails/${game.id}`)}}>
            <img
              className="game-card-img"
              src={game.image}
              alt={`${game.name} img`}
            />
>>>>>>> f8433d2e2d124720ba42f19672fdb843d2b7f0ae
=======
          <div className="game-img-div">
            <img
              className="game-card-img"
              src={game.image}
              alt={'${game.name} img'}
            />
>>>>>>> 1bd7afa7d27edd4091c2c67dfda66733cf73e51e
>>>>>>> .merge_file_a01796
          </div>
          <div className="game-card-info">
            <div style={{ fontFamily: "Roboto", color: "gainsboro" }}>
              {game.name}
            </div>
            <div style={{ color: "silver", fontSize: "12px" }}>{game.creator}</div>
<<<<<<< .merge_file_a02872
              <div style={{ color: "gainsboro", fontSize: "15px" }}>
                {game.price}$
              </div>
=======
            {game.isDiscount ? (
              <div
                style={{
                  fontSize: "14px",
                  display: "flex",
                  width: "80%",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "20px",
                    backgroundColor: "royalblue",
                    borderRadius: "5px",
                    color: "gainsboro",
                    fontSize: "11px",
                  }}
                >
                  -{game.discount}%
                </div>
                <div
                  style={{
                    textDecoration: "line-through",
                    color: "silver",
                    fontSize: "12px",
                  }}
                >
                  {game.price}$
                </div>
                <div style={{ color: "gainsboro", fontSize: "15px" }}>
                  {Math.ceil(
                    Number(game.price) -
                      (Number(game.price) / 100) * Number(game.discount)
                  )}
                  $
                </div>
              </div>
            ) : (
              <div style={{ color: "gainsboro", fontSize: "15px" }}>
                {game.price}$
              </div>
            )}
>>>>>>> .merge_file_a01796
            {logged && logged.isAdmin ? (
              <div>
                <button onClick={() => deleteGame(game.id)}>DELETE</button>
                <button onClick={() => setEditGameInfo(game.id)}>EDIT</button>
              </div>
            ) : null}
          </div>
<<<<<<< .merge_file_a02872
      </div>
  );
=======
        </div>
      );
>>>>>>> .merge_file_a01796
};

export default GameCard;