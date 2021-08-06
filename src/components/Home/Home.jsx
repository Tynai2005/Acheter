import React, { useEffect } from "react";

import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useGames } from "../../contexts/GameContext";
import EditGame from "../EditGame.jsx/EditGame";
import GamesList from "../GamesList/GamesList";
import { Container } from "@material-ui/core";

const Home = () => {
  const { modal } = useGames();
  return (
    <Container>
      <CarouselSlide />

      <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
        Best games of this summer
      </h4>

      <Link to="/addgame">Add Game</Link>
      {modal ? <EditGame /> : null}
      <GamesList />
    </Container>
  );
};

export default Home;
