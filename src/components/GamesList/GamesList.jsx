import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Carousel, Container } from "react-bootstrap";

const GamesList = () => {
  const { getGamesData, gamesData } = useGames();

  useEffect(() => {
    getGamesData();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container-div">
          {gamesData &&
            gamesData.map((game) => {
              console.log(game);
              return <GameCard game={game} />;
            })}
        </div>
      </div>
    </Container>
  );
};

export default GamesList;
