import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Container } from "react-bootstrap";

const GamesList = () => {
  const { getGamesData, gamesData } = useGames();

  useEffect(() => {
    getGamesData();
  }, []);

  return (
    <Container className="container-div">
      {gamesData &&
        gamesData.map((game) => {
          return <GameCard game={game} />;
        })}
    </Container>
  );
};

export default GamesList;
