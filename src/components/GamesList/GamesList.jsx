import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Carousel, Container } from "react-bootstrap";
import {Link} from "react-router-dom"
import SvgIcon from '@material-ui/core/SvgIcon';  

const GamesList = () => {
  const { getGamesData, gamesData } = useGames();

  useEffect(() => {
    getGamesData();
  }, []);


  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <Container className="container-div">
      <div><Link to='/'><HomeIcon/></Link></div>
      {gamesData &&
        gamesData.map((game) => {
          console.log(game);
          return <GameCard game={game} />;
        })}
    </Container>
  );
};

export default GamesList;
