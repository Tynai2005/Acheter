import React from "react";

import Body from "../Body/Body";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
     import { Link } from "react-router-dom";
import { useGames } from "../../contexts/GameContext";
import EditGame from "../EditGame.jsx/EditGame";
import GamesList from "../GamesList/GamesList";
const {modal} = useGames()
const Home = () => {
  return (
    <div>
      <CarouselSlide />
      <Body />
      <Link to='/addgame'>Add Game</Link>
      {modal ? <EditGame/> : null}
      <GamesList/>
    </div>
  );

};

export default Home;
