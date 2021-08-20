import React from "react";
import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: "30px",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  seeMore: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
const ProductsListPreview = () => {
  const classes = useStyles();
  const { getProductsData, productsData, history } = useProducts();

  useEffect(() => {
    getProductsData();
  }, []);

  let counter = 0;

  return (
    <Container className={classes.container}>
      <Grid className={classes.seeMore}>
        <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
          All products
        </h4>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/productslist");
          }}
        >
          See More
        </Button>
      </Grid>
      <Grid className={classes.review}>
        {productsData &&
          productsData.map((product) => {
            if (counter < 5) {
              counter++;
              return <ProductCard product={product} />;
            }
          })}
      </Grid>
    </Container>
  );
};

export default ProductsListPreview;
