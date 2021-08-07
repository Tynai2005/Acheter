import { Container, makeStyles, TextField, Button } from "@material-ui/core";

import React from "react";
import { useState } from "react";
import { useGames } from "../../contexts/GameContext";
import { RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "slateblue",
  },

  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 20px",
  },
}));
const AddGame = () => {
  const classes = useStyles();
  const { addNewGame } = useGames();
  const [gameInfo, setGameInfo] = useState({
    name: "",
    description: "",
    image: "",
    video: null,
    price: 0,
    genre: "",
    discount: 0,
    isDiscount: false,
  });
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px",
        color: "white",
      }}
    >
      <div className={classes.text}>
        <h1>Game creator</h1>
        <br />

        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, description: e.target.value });
          }}
          type="text"
          placeholder="Description"
        />

        <br />
        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, image: e.target.value });
          }}
          type="text"
          placeholder="Image"
        />
        <br />
        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, price: e.target.value });
          }}
          type="number"
          placeholder="Price($)"
        />
        <br />
        <p>Discount</p>
        <div>
          <input
            onChange={(e) => {
              setGameInfo({ ...gameInfo, isDiscount: true });
            }}
            name="isdiscount"
            type="radio"
          />
          <span>Have discount</span>
        </div>
        <div>
          <input
            onChange={(e) => {
              setGameInfo({ ...gameInfo, isDiscount: false });
            }}
            name="isdiscount"
            type="radio"
          />
          <span>Dont have discount</span>
        </div>
        {gameInfo.isDiscount ? (
          <input
            onChange={(e) => {
              setGameInfo({ ...gameInfo, discount: e.target.value });
            }}
            type="number"
            placeholder="Discount(%)"
          />
        ) : null}
        <div>
          <p> Choose game genre:</p>

          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setGameInfo({ ...gameInfo, genre: "rpg" });
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
                setGameInfo({ ...gameInfo, genre: "survival" });
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
                setGameInfo({ ...gameInfo, genre: "sandbox" });
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
                setGameInfo({ ...gameInfo, genre: "shooter" });
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
                setGameInfo({ ...gameInfo, genre: "fighting" });
              }}
            />
            Fighting
          </div>
        </div>
        <br />
        <Button
          onClick={() => {
            console.log(gameInfo);
            addNewGame(gameInfo);
          }}
          className={classes.btns}
        >
          Добавить
        </Button>
      </div>
    </Container>
  );
};

export default AddGame;
