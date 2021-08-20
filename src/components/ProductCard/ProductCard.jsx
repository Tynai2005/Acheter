import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  editBtn: {
    backgroundColor: "inherit",
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  deleteBtn: {
    border: "0",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
  },
}));
const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { deleteProduct, setEditProductInfo, history } = useProducts();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="product-card" style={{ marginBottom: "30px" }}>
      {/* <div
        className="product-img-div"
        onClick={() => {
          history.push(`productdetails/${product.id}`);
        }}
      >
        <img
          className="product-card-img"
          src={product.image}
          alt={`${product.name} img`}
        />
      </div>
      <div className="product-card-info">
        <div style={{ fontFamily: "Roboto", color: "gainsboro" }}>
          {product.name}
        </div>
        <div style={{ color: "silver", fontSize: "12px" }}>{product.creator}</div>
        <div style={{ color: "gainsboro", fontSize: "15px" }}>
          {product.price == 0 ? "Free to play" : product.price + "$"}
        </div>
        {logged && logged.isAdmin ? (
          <div>
            <button
              className={classes.deleteBtn}
              onClick={() => deleteProduct(product.id)}
            >
              DELETE
            </button>
            <button
              className={classes.editBtn}
              onClick={() => setEditProductInfo(product.id)}
            >
              EDIT
            </button>
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default ProductCard;
