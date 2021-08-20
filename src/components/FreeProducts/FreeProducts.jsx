import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { PRODUCTS_API } from "../../helper/consts";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "300px",
    backgroundColor: "#242424",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  card: {
    width: "355px",
    height: "250px",
    margin: "30px 0",
  },
  title: {
    color: "white",
    fontFamily: "Roboto",
    color: "gainsboro",
    fontSize: "20px",
  },
  creator: { color: "silver", fontSize: "16px" },
}));

const FreeProducts = () => {
  let counter = 0;
  const { history } = useProducts();
  const { productsData, getProductsData } = useProducts();
  //   const [products, setProducts] = useState([]);
  //   const getProducts = async () => {
  //     const { data } = await axios(PRODUCTS_API);
  //     setProducts(data);
  //   };
  useEffect(() => {
    getProductsData();
  }, []);
  //   console.log(products);
  const classes = useStyles();
  return (
    <Container style={{ margin: "30px 0" }}>
      <h4
        style={{ color: "white", margin: "20px 0", fontFamily: "Noto Sans JP" }}
      >
        Free products
      </h4>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          {productsData &&
            productsData.map((product) => {
              if (product.price == 0 && counter < 4) {
                counter++;
                return (
                  <div className={classes.card}>
                    <img
                      src={product.image}
                      className="free-card-img"
                      onClick={() => {
                        history.push(`productDetails/${product.id}`);
                      }}
                    />

                    <div className={classes.title}>{product.name}</div>
                    <div className={classes.creator}>{product.creator}</div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      ;
    </Container>
  );
};

export default FreeProducts;
