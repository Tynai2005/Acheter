import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GAMES_API, JSON_API_USERS } from "../../helper/consts";
import DeleteIcon from "@material-ui/icons/Delete";
import { useGames } from "../../contexts/GameContext";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "white",
    marginLeft: "10px",
    fontSize: "20px",
  },
  img: {
    width: "15%",
    borderRadius: "10px",
  },
  grids: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(32 32 32)",
  },
  title: {
    color: "white",
  },
  container: {
    display: "flex",
  },
  price: {
    color: "white",
  },
  deleteBtn: {
    color: "white",
  },
  noGame: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  buyGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  buyBtn: {
    color: "white",
    backgroundColor: "green",
  },
  main: {
    height: "100vh",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const [cartGames, setCartGames] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { deleteCartGame, history } = useGames();
  let cart = [];

  const getGameFromCart = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const gamesData = await axios(GAMES_API);
    let sum = 0;
    gamesData.data.map((game) => {
      curUser.cart.map((gameId) => {
        if (game.id == gameId) {
          cart.push(game);
          sum += game.price;
          setTotalPrice(sum);
        }
      });
    });
    setCartGames(cart);
  };
  useEffect(() => {
    getGameFromCart();
  }, []);

  return (
    <>
      {cartGames.length > 0 ? (
        <Container className={classes.main}>
          <h2 className={classes.title}>Your cart</h2>
          {cartGames.map((game) => (
            <Container className={classes.container}>
              <Grid className={classes.grids}>
                <img src={game.image} className={classes.img} />
                <div className={classes.text}>{game.name}</div>
              </Grid>
              <Grid className={classes.grids}>
                <div className={classes.price}>{game.price}$</div>
                <IconButton
                  onClick={async () => {
                    await deleteCartGame(game.id);
                    getGameFromCart();
                  }}
                >
                  <DeleteIcon className={classes.deleteBtn} />
                </IconButton>
              </Grid>
            </Container>
          ))}
          <Grid className={classes.buyGrid}>
            <h2 className={classes.title}>Total price: {totalPrice}</h2>
            <Button
              className={classes.buyBtn}
              onClick={() => history.push("/purchase")}
            >
              Buy
            </Button>
          </Grid>
        </Container>
      ) : (
        <h2 className={classes.noGame}>There isn't games in your cart</h2>
      )}
    </>
  );
};

export default Cart;
