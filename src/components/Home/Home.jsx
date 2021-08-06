import React from "react";

import Body from "../Body/Body";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useGames } from "../../contexts/GameContext";
import EditGame from "../EditGame.jsx/EditGame";
import GamesListPreview from "../GamesListPreview/GamesListPreview";
const Home = () => {
  const { modal } = useGames();
  return (
    <div>
      <CarouselSlide />
      <Body />
      <Link to="/addgame">Add Game</Link>
      {modal ? <EditGame /> : null}
      <GamesListPreview />
    </div>
  );
};

export default Home;
