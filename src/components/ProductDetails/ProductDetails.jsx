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
import React, { useContext } from "react";
import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { borderRadius, display, width } from "@material-ui/system";
import { useState } from "react";
import ProductComments from "../ProductComments/ProductComments";
import { PRODUCTS_API, JSON_API_USERS } from "../../helper/consts";
import axios from "axios";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";

const useStyles = makeStyles(() => ({
  details: {
    margin: "30px 0",
    width: "80%",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const {
    productDetails,
    getProductDetails,
    history,
    toLibrary,
    deleteCartProduct,
    toProductsList,
  } = useProducts();
  const { logged } = useContext(AuthContext);

  const [buttonColor, setButtonColor] = useState("primary");
  const classes = useStyles();
  const search = window.location.href;
  const curUser = JSON.parse(localStorage.getItem("user"));
  const curProductId = search.slice(37, search.length);

  useEffect(async () => {
    getProductDetails(search.slice(37, search.length));
    const { data } = await axios(`${PRODUCTS_API}/${curProductId}`);
    data.likes.map((like) => {
      if (like == curUser?.id) {
        setIsLiked(true);
      }
    });
    const likes = await axios(`${PRODUCTS_API}/${curProductId}`);
    setLikesCount(likes.data.likes.length);
    window.scrollTo(0, 0);
  }, []);

  const addProductCart = async () => {
    const usersCart = await axios(JSON_API_USERS);
    const productToCart = await axios(`${PRODUCTS_API}/${curProductId}`);

    usersCart.data.map((user) => {
      if (curUser.name == user.name) {
        user.cart.push(productToCart.data.id);
        axios.patch(`${JSON_API_USERS}/${user.id}`, user);
        curUser.cart.push(productToCart.data.id);
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
    getProductDetails(search.slice(37, search.length));
  }, []);

  const like = async () => {
    const { data } = await axios(`${PRODUCTS_API}/${curProductId}`);
    data.likes.push(curUser?.id);
    await axios.patch(`${PRODUCTS_API}/${curProductId}`, data);
    setIsLiked(true);
    setLikesCount(data.likes.length);
  };

  const dislike = async () => {
    const { data } = await axios(`${PRODUCTS_API}/${curProductId}`);
    const newLikes = data.likes.filter((like) => like != curUser?.id);
    console.log(newLikes);
    const newData = { ...data, likes: newLikes };
    await axios.patch(`${PRODUCTS_API}/${curProductId}`, newData);
    setIsLiked(false);
    setLikesCount(newLikes.length);
  };

  const toBuyNow = (id) => {
    if (!localStorage.getItem("buyNow")) {
      localStorage.setItem("buyNow", []);
      localStorage.setItem("buyNow", JSON.stringify(id));
    }
    localStorage.setItem("buyNow", JSON.stringify(id));
  };

  return (
    // <Container>
    //   <div className={classes.detailsContainer}>
    //     <div className={classes.details}>
    //       <Link to="/" onClick={toProductsList}>
    //         <HomeIcon />
    //       </Link>
    //       <hr className={classes.hr} />
    //       <div style={{ display: "flex" }}>
    //         <Grid className={classes.left}>
    //           <h1 className={classes.h1}>{productDetails.name}</h1>
    //           <div>
    //             <iframe
    //               height="300px"
    //               className={classes.video}
    //               src={productDetails.video}
    //               title="YouTube video player"
    //               frameborder="0"
    //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //               allowfullscreen
    //             ></iframe>
    //           </div>
    //           <p className={classes.p}>{productDetails.description}</p>
    //           <div className={classes.genre}>
    //             <div class={classes.vl}></div>
    //             <div>
    //               <h6 className={classes.p}>Genre:</h6>
    //               <h5 className={classes.h1}>{productDetails.genre}</h5>
    //             </div>
    //           </div>
    //         </Grid>
    //         <Grid className={classes.right}>
    //           <div>
    //             <img
    //               className={classes.img}
    //               src={productDetails.image}
    //               alt="product img"
    //             />
    //           </div>
    //           {curUser ?               
    //           <div style={{ color: "white" }}>
    //             {isLiked ? (
    //               <FavoriteIcon
    //                 onClick={dislike}
    //                 style={{ color: "red", margin: "5px" }}
    //               />
    //             ) : (
    //               <FavoriteBorderSharpIcon
    //                 onClick={like}
    //                 style={{ color: "red", margin: "5px" }}
    //               />
    //             )}
    //             {likesCount} likes
    //           </div> : null}
    //           {productDetails.price > 0 ? (
    //             <>
    //               <h3 style={{ color: "white" }}>{productDetails.price}$</h3>
    //               <div className={classes.buyBtns}>
    //                 <Button
    //                   variant="contained"
    //                   color="primary"
    //                   onClick={() => {
    //                     history.push("/purchase");
    //                     toBuyNow(curProductId);
    //                   }}
    //                 >
    //                   Buy now
    //                 </Button>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <h3 style={{ color: "white" }}>Free to play</h3>

    //               {/* {finda.length > 0 ? (
    //                 <Button variant="contained" color="primary">
    //                   Delete from library
    //                 </Button>
    //               ) : ( */}
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={() => {
    //                   handleOpen();
    //                   toLibrary(productDetails.id);
    //                 }}
    //               >
    //                 Add to library
    //               </Button>
    //               {/* )} */}
    //             </>
    //           )}

    //           <div className={classes.buyBtns}>
    //             {productDetails.price > 0 ? (
    //               <>
    //                 {logged ? (
    //                   // curUser.cart.length > 0 ? (
    //                   //   curUser.cart.map((cartProduct) => {
    //                   //     cartProduct == curProductId ? (
    //                   //       <Button
    //                   //         variant="outlined"
    //                   //         color={buttonColor}
    //                   //         onClick={() => {
    //                   //           deleteCartProduct(curProductId);
    //                   //           getProductDetails(search.slice(34, search.length));
    //                   //         }}
    //                   //       >
    //                   //         Delete from wishlist
    //                   //       </Button>
    //                   //     ) : (
    //                   <Button
    //                     variant="outlined"
    //                     color={buttonColor}
    //                     onClick={() => {
    //                       addProductCart();
    //                     }}
    //                   >
    //                     Add to wishlist
    //                   </Button>
    //                 ) : (
    //                   //     );
    //                   //   })
    //                   // ) : (
    //                   //   <Button
    //                   //     variant="outlined"
    //                   //     color={buttonColor}
    //                   //     onClick={() => {
    //                   //       addProductCart();
    //                   //       getProductDetails(search.slice(34, search.length));
    //                   //     }}
    //                   //   >
    //                   //     Add to wishlist
    //                   //   </Button>
    //                   <Button
    //                     variant="outlined"
    //                     color={buttonColor}
    //                     onClick={() => history.push("/login")}
    //                   >
    //                     Add to wishlist
    //                   </Button>
    //                 )}
    //               </>
    //             ) : null}
    //           </div>
    //         </Grid>
    //       </div>
    //       <hr className={classes.hr} />
    //       <ProductComments />
    //     </div>
    //   </div>
    //   <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
    //     <Alert onClose={handleClose} severity="success">
    //       Product has been added to your library!
    //     </Alert>
    //   </Snackbar>
    // </Container>
    <div>
      game details
    </div>
  );
};

export default ProductDetails;
