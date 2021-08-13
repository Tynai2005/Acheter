import React, { useEffect } from "react";

import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useGames } from "../../contexts/GameContext";
import EditGame from "../EditGame.jsx/EditGame";

import GamesListPreview from "../GamesListPreview/GamesListPreview";

import { Container } from "@material-ui/core";
import { Button } from "bootstrap";
import FreeGames from "../FreeGames/FreeGames";

const Home = () => {
  const { modal } = useGames();
  return (
    <Container>
      <CarouselSlide />

      {modal ? <EditGame /> : null}

      <GamesListPreview />

      <FreeGames />
    </Container>
  );
};

export default Home;
