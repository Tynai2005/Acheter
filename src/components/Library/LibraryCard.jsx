import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { PRODUCTS_API, JSON_API_USERS } from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardImg: {
    width: "230px",
    height: "230px",
    objectFit: "cover",
    position: "absolute",
    zIndex: "1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "100%",
  },
  content: {
    width: "230px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "10px !important",
  },

  productTitle: {
    textAlign: "center",
    color: "white",
    fontSize: "20px",
  },
  productCreator: {
    textAlign: "center",
    color: "grey",
    fontSize: "15px",
  },
  productDescr: {
    color: "white",
    fontSize: "15px",
  },
  noProduct: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  libraryText: {
    color: "white",
    margin: "20px",
  },
  playBtn: {
    color: "white",
    backgroundColor: "green",
    border: "0",
    borderRadius: "5px",
    zIndex: "0",

    width: "100%",
  },
}));

const LibraryCard = () => {
  const [libraryProduct, setLibraryProduct] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let library = [];
  const curUser = JSON.parse(localStorage.getItem("user"));
  const getProducts = async () => {
    const { data } = await axios(PRODUCTS_API);

    data.map((product) => {
      curUser.library.map((libProduct) => {
        if (product.id === libProduct) {
          library.push(product);
        }
      });
    });

    setLibraryProduct(library);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h2 className={classes.libraryText}>Your library</h2>
      {curUser.library.length > 0 ? (
        <Container className={classes.container}>
          {libraryProduct.map((product) => (
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className={classes.cardImg}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <div>
                    <Typography className={classes.productTitle}>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      className={classes.productCreator}
                    >
                      {product.creator}
                    </Typography>
                    <Typography className={classes.productDescr}>
                      {product.description.length > 60
                        ? product.description.slice(0, 60) + "..."
                        : product.description}
                    </Typography>
                  </div>
                  <Button className={classes.playBtn}>Play</Button>
                </CardContent>
              </div>
              {/* <CardMedia className={classes.cover} image={product.image} /> */}
            </div>
          ))}
        </Container>
      ) : (
        <h2 className={classes.noProduct}>There isn't products in your library</h2>
      )}
    </>
  );
};

export default LibraryCard;
