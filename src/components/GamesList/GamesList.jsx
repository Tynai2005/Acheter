import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Pagination } from '@material-ui/lab';  
import { Carousel, Container} from "react-bootstrap";
import {Link} from "react-router-dom"
import SvgIcon from '@material-ui/core/SvgIcon';  
import EditGame from "../EditGame.jsx/EditGame";
import { getCurrentPage } from "../../helper/functions";
import { useState } from "react";

const GamesList = () => {
  const { getGamesData, gamesData,modal,pages,history} = useGames();
  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    getGamesData();
  }, []);

  const handlePage = (e,page) => {
    const search = new URLSearchParams(window.location.search);
    search.set('_page', page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setPage(page);
  };


  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div style={{display: 'flex',flexDirection:'column',alignItems:'center'}}>
    <Container className="container-div">
      <Link to="/addgame">Add Game</Link>
      {modal ? <EditGame /> : null}
      <div><Link to='/'><HomeIcon/></Link></div>
      {gamesData &&
        gamesData.map((game) => {
          return <GameCard game={game} />;
        })}
    </Container>
    <div style={{ margin: '20px auto' }}>
        <Pagination style={{color: 'wheat'}} color='secondary' count={pages} variant="outlined" shape="rounded" page={+page} onChange={handlePage} />
    </div>
    </div>
  );
};

export default GamesList;
