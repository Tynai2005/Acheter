import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import GameCard from "../GameCard/GameCard";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  Grid,
  makeStyles,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from "@material-ui/lab";
import { Carousel, Container } from "react-bootstrap";
import EditGame from "../EditGame.jsx/EditGame";
import { getCurrentPage } from "../../helper/functions";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "80vh",
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
  sorryH1: {
    color: "white",
    height: "80vh",
  },
  addBtn: {
    backgroundColor: "green",
    color: "white",
  },
  mobileMenuItem: {
    backgroundColor: "#262626",
    paddingRight: "15px",
    margin: "0",
    marginRight: "5px",
    marginBottom: "5px",
  },
  menuMobile: {
    display: "flex",
    left: 15,
    backgroundColor: "inherit",
    color: "black",
    opacity: "80%",
    zIndex: "1",
    flexDirection: "column",
  },
  genres: {
    flexDirection: "row",
    color: "white",
  },
  priceInputs: {
    backgroundColor: "#262626",
    color: "white",
    marginRight: "5px",
  },
  inpColor: {
    color: "white",
  },
  resetBtn: {
    color: "white",
    backgroundColor: "#262626",
    borderRadius: "0",
    padding: "10px 20px",
  },
}));
const GamesList = () => {
  const { logged } = useAuth();
  const classes = useStyles();
  const { getGamesData, gamesData, modal, pages, history } = useGames();
  const [page, setPage] = useState(getCurrentPage());
  const [sortMenu, setSortMenu] = useState(false);
  const [genre, setGenre] = useState(getGenre());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  useEffect(() => {
    getGamesData();
    window.scrollTo(0, 0);
  }, []);
  function getGenre() {
    const search = new URLSearchParams(history.location.search);
    return search.get("genre");
  }

  function getMinPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_gte");
  }

  function getMaxPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_lte");
  }

  const changeGenre = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("genre");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getGamesData();
      setGenre(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("genre", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setGenre(e.target.value);
  };

  const changeMinPrice = (value) => {
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMinPrice(value);
  };

  const changeMaxPrice = (value) => {
    const search = new URLSearchParams(history.location.search);
    search.set("price_lte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMaxPrice(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("price_gte");
    search.delete("price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  };
  const handlePage = (e, page) => {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
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
        <div>
          <div className={classes.menuMobile}>
            <RadioGroup
              value={genre}
              onChange={changeGenre}
              className={classes.genres}
            >
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="RPG"
                control={<Radio />}
                label="RPG"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Survival"
                control={<Radio />}
                label="Survival"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="MOBA"
                control={<Radio />}
                label="MOBA"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Sandbox"
                control={<Radio />}
                label="Sandbox"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Shooter"
                control={<Radio />}
                label="Shooter"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Fighting"
                control={<Radio />}
                label="Fighting"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Sport"
                control={<Radio />}
                label="Sport"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="Open World"
                control={<Radio />}
                label="Open World"
              />
              <FormControlLabel
                className={classes.mobileMenuItem}
                value="all"
                control={<Radio />}
                label="All"
              />
            </RadioGroup>

            <div className={classes.mobilePriceFilter}>
              <TextField
                className={classes.priceInputs}
                value={minPrice}
                onChange={(e) => changeMinPrice(e.target.value)}
                type="number"
                label="Min Price($)"
                defaultValue="100"
                InputProps={{
                  className: classes.inpColor,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                className={classes.priceInputs}
                value={maxPrice}
                onChange={(e) => changeMaxPrice(e.target.value)}
                type="number"
                label="Max Price($)"
                defaultValue="1000"
                InputProps={{
                  className: classes.inpColor,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />

              <Button
                variant="outlined"
                onClick={resetPrice}
                className={classes.resetBtn}
              >
                Reset Price Filter
              </Button>
            </div>
          </div>
        </div>
        {logged && logged.isAdmin ? (
          <Link to="/addgame" className={classes.addGame}>
            <Button variant="contained" className={classes.addBtn}>
              Add Game
            </Button>
          </Link>
        ) : null}
      </Grid>
      <Grid className={classes.grids}>
        {gamesData.length > 0 ? (
          gamesData.map((game) => {
            return <GameCard game={game} />;
          })
        ) : (
          <h2 className={classes.sorryH1}>Sorry, there are no such games...</h2>
        )}
      </Grid>
      <div style={{ margin: "20px auto" }}>
        <Pagination
          size="large"
          color="secondary"
          count={pages}
          variant="outlined"
          shape="rounded"
          page={+page}
          onChange={handlePage}
        />
      </div>
    </Container>
  );
};

export default GamesList;
