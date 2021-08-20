import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useProducts } from "../../contexts/ProductContext";
const useStyles = makeStyles((theme) => ({
  modalMarg: {
    marginTop: "40px",
  },
}));
const EditProduct = () => {
  const { modal, productDetails, saveEditedProduct, toggleModal } = useProducts();
  const [priceRadios, setPriceRadios] = useState(false);
  const classes = useStyles();
  let [editedProduct, setEditedProduct] = useState({
    name: productDetails.name,
    description: productDetails.description,
    creator: productDetails.creator,
    image: productDetails.image,
    video: productDetails.video,
    price: productDetails.price,
    genre: productDetails.genre,
    comments: productDetails.comments,
    likes: productDetails.likes,
  });

  return (
    <Modal show={modal} className={classes.modalMarg}>
      <Modal.Header>
        <Modal.Title>Redacting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            onChange={(e) => {
              setEditedProduct({ ...editedProduct, name: e.target.value });
              productDetails.name = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Name"
            value={productDetails.name}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedProduct({ ...editedProduct, creator: e.target.value });
              productDetails.creator = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Creator"
            value={productDetails.creator}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedProduct({ ...editedProduct, description: e.target.value });
              productDetails.description = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Description"
            value={productDetails.description}
          />
        </div>
        <div>
          <textarea
            onChange={(e) => {
              setEditedProduct({ ...editedProduct, video: e.target.value });
              productDetails.video = e.target.value;
            }}
            style={{ width: "189px" }}
            type="text"
            name=""
            id=""
            placeholder="Trailer"
            value={productDetails.video}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedProduct({ ...editedProduct, image: e.target.value });
              productDetails.image = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Phono"
            value={productDetails.image}
          />
        </div>

        {!priceRadios ? (
          <div>
            <input
              onChange={(e) => {
                setEditedProduct({ ...editedProduct, price: Number(e.target.value) });
                productDetails.price = e.target.value;
              }}
              type="number"
              name=""
              id=""
              placeholder="Price"
              value={productDetails.price}
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
              setEditedProduct({ ...editedProduct, price: Number(0) });
              setPriceRadios(!priceRadios);
            }}
          />
          Free to play
        </div>
        <div>
          <div>
            Choose product genre:
            <div>
              <input
                type="radio"
                name="genreRadio"
                id=""
                onChange={() => {
                  setEditedProduct({ ...editedProduct, genre: "RPG" });
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
                  setEditedProduct({ ...editedProduct, genre: "Survival" });
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
                  setEditedProduct({ ...editedProduct, genre: "Sandbox" });
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
                  setEditedProduct({ ...editedProduct, genre: "Shooter" });
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
                  setEditedProduct({ ...editedProduct, genre: "Fighting" });
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
                  setEditedProduct({ ...editedProduct, genre: "MOBA" });
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
                  setEditedProduct({ ...editedProduct, genre: "Sport" });
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
                  setEditedProduct({ ...editedProduct, genre: "Open World" });
                }}
              />
              Open World
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => saveEditedProduct(productDetails.id, editedProduct)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProduct;
