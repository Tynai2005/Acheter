import React from 'react';
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Carousel, Container } from "react-bootstrap";
import Button from '@material-ui/core/Button';

const GamesListPreview = () => {
    const { getGamesData, gamesData,history } = useGames();

    useEffect(() => {
      getGamesData();
    }, []);

    let counter = 0
  
    return (
      <Container className="container-div"> 
      <div><Button variant="contained" color="primary" onClick={() => {history.push('/gameslist')}}>See More</Button></div>
        {gamesData &&
          gamesData.map((game) => {
            if (counter < 5){
                counter++
                return <GameCard game={game} />
            };
          })}
      </Container>
    );
};

export default GamesListPreview;