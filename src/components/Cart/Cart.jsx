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
import { PRODUCTS_API, JSON_API_USERS } from "../../helper/consts";
import DeleteIcon from "@material-ui/icons/Delete";
import { useProducts } from "../../contexts/ProductContext";

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
  noProduct: {
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
    minHeight: "100vh",
    margin: "20px auto",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { deleteCartProduct, history } = useProducts();
  let cart = [];

  const getProductFromCart = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const productsData = await axios(PRODUCTS_API);
    let sum = 0;
    productsData.data.map((product) => {
      curUser.cart.map((productId) => {
        if (product.id == productId) {
          cart.push(product);
          sum += product.price;
          setTotalPrice(sum);
        }
      });
    });
    setCartProducts(cart);
  };
  useEffect(() => {
    getProductFromCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        <Container className={classes.main}>
          <h2 className={classes.title}>Your cart</h2>
          {cartProducts.map((product) => (
            <Container className={classes.container}>
              <Grid className={classes.grids}>
                <img src={product.image} className={classes.img} />
                <div className={classes.text}>{product.name}</div>
              </Grid>
              <Grid className={classes.grids}>
                <div className={classes.price}>{product.price}$</div>
                <IconButton
                  onClick={async () => {
                    await deleteCartProduct(product.id);
                    getProductFromCart();
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
        <h2 className={classes.noProduct}>There isn't products in your cart</h2>
      )}
    </>
  );
};

export default Cart;
