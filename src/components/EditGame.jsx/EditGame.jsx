import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useGames } from "../../contexts/GameContext";
const useStyles = makeStyles((theme) => ({
  modalMarg: {
    marginTop: "40px",
  },
}));
const EditGame = () => {
  const { modal, gameDetails, saveEditedGame, toggleModal } = useGames();
  const classes = useStyles();
  let [editedGame, setEditedGame] = useState({
    name: gameDetails.name,
    description: gameDetails.description,
    image: gameDetails.image,
    video: gameDetails.video,
    price: gameDetails.price,
    genre: gameDetails.genre,
    discount: gameDetails.discount,
    isDiscount: gameDetails.discount,
    comments: gameDetails.comments,
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
            setEditedGame({ ...editedGame, name: e.target.value });
            gameDetails.name = e.target.value;
          }}
          type="text"
          name=""
          id=""
          placeholder="Name"
          value={gameDetails.name}
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setEditedGame({ ...editedGame, description: e.target.value });
            gameDetails.description = e.target.value;
          }}
          type="text"
          name=""
          id=""
          placeholder="Description"
          value={gameDetails.description}
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setEditedGame({ ...editedGame, image: e.target.value });
            gameDetails.image = e.target.value;
          }}
          type="text"
          name=""
          id=""
          placeholder="Phono"
          value={gameDetails.image}
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setEditedGame({ ...editedGame, price: Number(e.target.value) });
            gameDetails.price = e.target.value;
          }}
          type="number"
          name=""
          id=""
          placeholder="Price"
          value={gameDetails.price}
        />
      </div>
      <div>
        Choose game genre:
        <div>
          <input
            onChange={(e) => {
              setEditedGame({ ...editedGame, name: e.target.value });
              gameDetails.name = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Name"
            value={gameDetails.name}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedGame({ ...editedGame, description: e.target.value });
              gameDetails.description = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Description"
            value={gameDetails.description}
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setEditedGame({ ...editedGame, image: e.target.value });
              gameDetails.image = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="img(url)"
            value={gameDetails.image}
          />
        </div>
        <div>
          Choose game genre:
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setEditedGame({ ...editedGame, genre: "RPG" });
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
                setEditedGame({ ...editedGame, genre: "Survival" });
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
                setEditedGame({ ...editedGame, genre: "Sandbox" });
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
                setEditedGame({ ...editedGame, genre: "Shooter" });
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
                setEditedGame({ ...editedGame, genre: "Fighting" });
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
              setEditedGame({ ...editedGame, genre: "MOBA" });
            }}
          />
          MOBA
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
          onClick={() => saveEditedGame(gameDetails.id, editedGame)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    );
};

export default EditGame;
