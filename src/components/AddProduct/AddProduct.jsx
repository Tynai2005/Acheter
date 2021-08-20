import { Container, makeStyles, TextField, Button } from "@material-ui/core";

import React from "react";
import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "slateblue",
  },

  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 20px",
    margin: "0 10px",
  },
}));
const AddProduct = () => {
  const [vid, setVid] = useState("https://www.youtube.com/embed/");
  const classes = useStyles();
  const { addNewProduct, history } = useProducts();
  const [priceRadios, setPriceRadios] = useState(false);

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    image: "",
    video: "",
    price: 0,
    creator: "",
    genre: "",
    comments: [],
    likes: [],
  });
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px 0",
        color: "white",
      }}
    >
      <div className={classes.text}>
        <h1>Product creator</h1>
        <br />

        <input
          onChange={(e) => {
            setProductInfo({ ...productInfo, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          onChange={(e) => {
            setProductInfo({ ...productInfo, creator: e.target.value });
          }}
          type="text"
          placeholder="Creator"
        />
        <br />
        <input
          onChange={(e) => {
            setProductInfo({ ...productInfo, description: e.target.value });
          }}
          type="text"
          placeholder="Description"
        />
        <br />
        <textarea
          onChange={(e) => {
            setProductInfo({ ...productInfo, video: e.target.value });
            setVid(e.target.value);
          }}
          style={{ width: "188px" }}
          type="text"
          placeholder="Trailer"
          value={vid}
        />
        <br />
        <input
          onChange={(e) => {
            setProductInfo({ ...productInfo, image: e.target.value });
          }}
          type="text"
          placeholder="Image"
        />
        <br />
        {!priceRadios ? (
          <div>
            <input
              onChange={(e) => {
                setProductInfo({ ...productInfo, price: Number(e.target.value) });
              }}
              type="number"
              placeholder="Price($)"
            />
            <br />
          </div>
        ) : null}
        <div>
          <input
            type="radio"
            name="priceRadio"
            id=""
            onChange={() => {
              setProductInfo({ ...productInfo, price: Number(0) });
              setPriceRadios(!priceRadios);
            }}
          />
          Free to play
        </div>
        <div>
          <p> Choose product genre:</p>

          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "RPG" });
              }}
            />
            RPG
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Survival" });
              }}
            />
            Survival
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Sandbox" });
              }}
            />
            Sandbox
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Shooter" });
              }}
            />
            Shooter
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Fighting" });
              }}
            />
            Fighting
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "MOBA" });
              }}
            />
            MOBA
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Sport" });
              }}
            />
            Sport
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setProductInfo({ ...productInfo, genre: "Open World" });
              }}
            />
            Open World
          </div>
        </div>
        <br />
        <Button
          className={classes.btns}
          variant="secondary"
          onClick={() => history.push("/productslist")}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            addNewProduct(productInfo);
          }}
          className={classes.btns}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddProduct;
