import { Container, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useGames } from "../../contexts/GameContext";
import { RadioGroup } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "slateblue",
  },
  text:{
    // width:'80%'
  }
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
    <div className={classes.text}>
    <Container className={classes.container}>
      <TextField
        onChange={(e) => {
          setGameInfo({ ...gameInfo, name: e.target.value });
        }}
        type="text"
        label="Name"
        variant='outlined'
      />
      <br />
      <TextField
        onChange={(e) => {
          setGameInfo({ ...gameInfo, description: e.target.value });
        }}
        type="text"
       label="Description"
       variant='outlined'/>
      <br />
      <TextField
        onChange={(e) => {
          setGameInfo({ ...gameInfo, image: e.target.value });
        }}
        type="text"
       label="Image"
       variant='outlined'/>
      <br />
      <TextField
        onChange={(e) => {
          setGameInfo({ ...gameInfo, video: e.target.value });
        }}
        type="text"
       label="Trailer"
       variant='outlined'/>
      <br />
      <TextField
        onChange={(e) => {
          setGameInfo({ ...gameInfo, price: e.target.value });
        }}
        type="number"
       label="Price($)"
       variant='outlined'/>
      <br />
      <div>Is discount?</div>
      <RadioGroup>
      <div>
        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, isDiscount: true });
          }}
          name="isdiscount"
          type="radio"
        />
        <span>Yes</span>
      </div>
      <div>
        <input
          onChange={(e) => {
            setGameInfo({ ...gameInfo, isDiscount: false });
          }}
          name="isdiscount"
          type="radio"
        />
        <span>No</span>
      </div>
      </RadioGroup>
      {gameInfo.isDiscount ? (
        <TextField
          onChange={(e) => {
            setGameInfo({ ...gameInfo, discount: e.target.value });
          }}
          type="number" 
          label="Discount(%)"
          variant='outlined'
        />
      ) : null}
      <div>
        Choose game genre:
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
      <button
        onClick={() => {
          console.log(gameInfo);
          addNewGame(gameInfo);
        }}
      >
        Добавить
      </button>
    </Container>
    </div>
  );
};

export default AddGame;