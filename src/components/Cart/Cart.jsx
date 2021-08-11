import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GAMES_API, JSON_API_USERS } from "../../helper/consts";
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
    marginRight: "20px",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const [cartGames, setCartGames] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let cart = [];

  const getGameFromCart = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const gamesData = await axios(GAMES_API);
    let sum = 0;
    gamesData.data.map((game) => {
      curUser.cart.map((gameId) => {
        if (game.id == gameId) {
          // let newCartGames = [...cartGames];
          // newCartGames.push(game);
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
        <Container>
          <h2 className={classes.title}>Your cart</h2>
          {cartGames.map((game) => (
            <Container className={classes.container}>
              <Grid className={classes.grids}>
                <img src={game.image} className={classes.img} />
                <div className={classes.text}>{game.name}</div>
              </Grid>
              <Grid className={classes.grids}>
                <div className={classes.price}>{game.price}$</div>
              </Grid>
            </Container>
          ))}
          <h2 className={classes.title}>Total price: {totalPrice}</h2>
        </Container>
      ) : (
        <h3 style={{ color: "white" }}>There isnt games in your cart</h3>
      )}
    </>
  );
};

export default Cart;
