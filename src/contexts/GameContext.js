import React, { createContext } from "react";

export const gameContext = createContext();

export const useGames = () => useContext(gameContext);

const GameContext = () => {
  return <div></div>;
};

export default GameContext;
