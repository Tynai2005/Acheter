import React, { useContext } from "react";
import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
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
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { Pagination } from "@material-ui/lab";
import { Carousel, Container } from "react-bootstrap";
import EditProduct from "../EditProduct/EditProduct";
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
  addProduct: {
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
  menuMobile: {
    left: 15,
    backgroundColor: "white",
    color: "black",
    opacity: "80%",
    zIndex: 1,
  },
}));
const ProductsList = () => {
  const { logged } = useContext(AuthContext);
  const classes = useStyles();
  const { getProductsData, productsData, modal, pages, history } = useProducts();
  const [page, setPage] = useState(getCurrentPage());
  const [sortMenu, setSortMenu] = useState(false);
  const [genre, setGenre] = useState(getGenre());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  
  useEffect(() => {
    getProductsData();
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
      getProductsData();
      setGenre(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("genre", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
    setGenre(e.target.value);
  };

  const changeMinPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
    setMinPrice(value);
  };

  const changeMaxPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_lte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
    setMaxPrice(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("price_gte");
    search.delete("price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  };


  const handlePage = (e, page) => {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
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
    // <Container className={classes.container}>
    //   {modal ? <EditProduct /> : null}
    //   <Grid
    //     className={classes.grids}
    //     style={{ justifyContent: "space-between", margin: "20px 0" }}
    //   >
    //     <div>
    //       <button onClick={() => setSortMenu(!sortMenu)}>Filter</button>
    //       {sortMenu ? (
    //         <div className={classes.menuMobile}>
    //           <RadioGroup value={genre} onChange={changeGenre}>
    //             <h5>By Genre:</h5>
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="RPG"
    //               control={<Radio />}
    //               label="RPG"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Survival"
    //               control={<Radio />}
    //               label="Survival"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="MOBA"
    //               control={<Radio />}
    //               label="MOBA"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Sandbox"
    //               control={<Radio />}
    //               label="Sandbox"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Shooter"
    //               control={<Radio />}
    //               label="Shooter"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Fighting"
    //               control={<Radio />}
    //               label="Fighting"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Sport"
    //               control={<Radio />}
    //               label="Sport"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="Open World"
    //               control={<Radio />}
    //               label="Open World"
    //             />
    //             <FormControlLabel
    //               className={classes.mobileMenuItem}
    //               value="all"
    //               control={<Radio />}
    //               label="All"
    //             />
    //           </RadioGroup>
    //           <h5>By Price:</h5>
    //           <div className={classes.mobilePriceFilter}>
    //             <TextField
    //               className={classes.priceInputs}
    //               value={minPrice}
    //               onChange={(e) => changeMinPrice(e.target.value)}
    //               type="number"
    //               label="Min Price($)"
    //               defaultValue="100"
    //             />
    //             <TextField
    //               className={classes.priceInputs}
    //               value={maxPrice}
    //               onChange={(e) => changeMaxPrice(e.target.value)}
    //               type="number"
    //               label="Max Price($)"
    //               defaultValue="1000"
    //             />
    //           </div>
    //           <div>
    //             <Button variant="outlined" onClick={resetPrice}>
    //               Reset Price Filter
    //             </Button>
    //           </div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {logged && logged.isAdmin ? (
    //       <Link to="/addproduct" className={classes.addProduct}>
    //         <Button variant="contained" className={classes.addBtn}>
    //           Add Product
    //         </Button>
    //       </Link> 
    //     ) : null}
    //   </Grid>
    //   <Grid className={classes.grids}>
    //     {productsData.length > 0 ? (
    //       productsData.map((product) => {
    //         return <ProductCard product={product} />;
    //       })
    //     ) : (
    //       <h2 className={classes.sorryH1}>Sorry, there are no such products...</h2>
    //     )}
    //   </Grid>
    //   <div style={{ margin: "20px auto" }}>
    //     <Pagination
    //       size="large"
    //       color="secondary"
    //       count={pages}
    //       variant="outlined"
    //       shape="rounded"
    //       page={+page}
    //       onChange={handlePage}
    //     />
    //   </div>
    // </Container>
    <div>
      products list
    </div>
  );
};

export default ProductsList;
