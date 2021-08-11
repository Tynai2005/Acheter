import {
  Button,
  colors,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import { borderRadius, display, width } from "@material-ui/system";
import { useState } from "react";
import GameComments from "../GameComments/GameComments";
import { GAMES_API, JSON_API_USERS } from "../../helper/consts";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  details: {
    margin: "30px 0",
    width: "80%",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  hr: {
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    margin: "50px 0",
  },
  homeLink: {
    color: "white",
    textDecoration: "none",
  },
  h1: {
    color: "white",
    marginBottom: "30px",
  },
  p: {
    color: "silver",
    marginTop: "20px",
  },
  left: {
    width: "70%",
  },
  right: {
    width: "30%",
  },
  vl: {
    width: "2.1px",
    height: "100px",
    backgroundColor: "white",
    borderRadius: "2px",
    opacity: "20%",
    display: "inline-block",
  },
  genre: {
    display: "flex",
    width: "100px",
    justifyContent: "space-between",
  },
  img: {
    maxWidth: "100%",
  },
  video: {
    width: "80%",
  },
  buyBtns: {
    marginTop: "10px",
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const GameDetails = () => {
  window.scrollTo(0, 0);
  const [open, setOpen] = useState(false);
  const { gameDetails, getGameDetails, history, toLibrary } = useGames();
  const { logged } = useAuth();
  const [buttonColorBoolean, setButtonColorBoolean] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");
  const classes = useStyles();
  const search = window.location.href;
  const addGameCart = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const usersCart = await axios(JSON_API_USERS);
    const gameToCart = await axios(
      `${GAMES_API}/${search.slice(34, search.length)}`
    );

    usersCart.data.map((user) => {
      if (curUser.name == user.name) {
        user.cart.push(gameToCart.data.id);
        axios.patch(`${JSON_API_USERS}/${user.id}`, user);
        curUser.cart.push(gameToCart.data.id);
        localStorage.setItem("user", JSON.stringify(curUser));
      }
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getGameDetails(search.slice(34, search.length));
  }, []);
  return (
    <Container>
      <div className={classes.detailsContainer}>
        <div className={classes.details}>
          <Link to="/">
            <HomeIcon />
          </Link>
          <hr className={classes.hr} />
          <div style={{ display: "flex" }}>
            <Grid className={classes.left}>
              <h1 className={classes.h1}>{gameDetails.name}</h1>
              <div>
                <iframe
                  height="300px"
                  className={classes.video}
                  src={gameDetails.video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <p className={classes.p}>{gameDetails.description}</p>
              <div className={classes.genre}>
                <div class={classes.vl}></div>
                <div>
                  <h6 className={classes.p}>Genre:</h6>
                  <h5 className={classes.h1}>{gameDetails.genre}</h5>
                </div>
              </div>
            </Grid>
            <Grid className={classes.right}>
              <div>
                <img
                  className={classes.img}
                  src={gameDetails.image}
                  alt="game img"
                />
              </div>
              {gameDetails.price > 0 ? (
                <>
                  <h3 style={{ color: "white" }}>{gameDetails.price}$</h3>
                  <div className={classes.buyBtns}>
                    <Button variant="contained" color="primary">
                      Buy now
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ color: "white" }}>Free to play</h3>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleOpen();
                      toLibrary(gameDetails.id);
                    }}
                  >
                    Add to library
                  </Button>
                </>
              )}

              <div className={classes.buyBtns}>
                {gameDetails.price > 0 ? (
                  <>
                    {logged ? (
                      <Button
                        variant="outlined"
                        color={buttonColor}
                        onClick={() => addGameCart()}
                      >
                        Add to wishlist
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color={buttonColor}
                        onClick={() => history.push("/login")}
                      >
                        Add to wishlist
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
            </Grid>
          </div>
        </div>
      </div>
      <GameComments />

      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Game has been added to your library!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GameDetails;
