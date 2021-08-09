import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from '@material-ui/lab';  
import { Carousel, Container} from "react-bootstrap";  
import EditGame from "../EditGame.jsx/EditGame";
import { getCurrentPage } from "../../helper/functions";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  grids: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  addGame: {
    textDecoration: "none",
    color: "white",
  },
  sorryH1:{
    color: 'white',
    height:'80vh'
  }
}));
const GamesList = () => {
  const { logged } = useAuth();
  const classes = useStyles();
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
    <Container className={classes.container}>
      {modal ? <EditGame /> : null}
      <Grid
        className={classes.grids}
        style={{ justifyContent: "space-between", margin: "20px 0" }}
      >
        <Link to="/">
          <HomeIcon />
        </Link>
        {logged && logged.isAdmin ? (
          <Link to="/addgame" className={classes.addGame}>
            <Button variant="contained" color="primary">
              Add Game
            </Button>
          </Link>
        ) : null}
      </Grid>
      <Grid className={classes.grids}>
        {gamesData.length > 0 ? 
          (gamesData.map((game) => {
            return <GameCard game={game} />;
          })) : <h1 className={classes.sorryH1}>Sorry, there are no such games...</h1>}
      </Grid>
    <div style={{ margin: '20px auto' }}>
      <Pagination size="large" color='secondary' count={pages} variant="outlined" shape="rounded" page={+page} onChange={handlePage} />
    </div>
    </Container>
  );
};

export default GamesList;
