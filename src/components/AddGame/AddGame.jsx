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
    margin: "0 10px",
  },
}));
const AddGame = () => {
  const [vid, setVid] = useState("https://www.youtube.com/embed/");
  const classes = useStyles();
  const { addNewGame, history } = useGames();
  const [priceRadios, setPriceRadios] = useState(false);

  const [gameInfo, setGameInfo] = useState({
    name: "",
    description: "",
    image: "",
    video: "",
    price: 0,
    creator: "",
    genre: "",
    comments: [],
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
            setGameInfo({ ...gameInfo, creator: e.target.value });
          }}
          type="text"
          placeholder="Creator"
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
        <textarea
          onChange={(e) => {
            setGameInfo({ ...gameInfo, video: e.target.value });
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
            setGameInfo({ ...gameInfo, image: e.target.value });
          }}
          type="text"
          placeholder="Image"
        />
        <br />
        {!priceRadios ? (
          <div>
            <input
              onChange={(e) => {
                setGameInfo({ ...gameInfo, price: Number(e.target.value) });
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
              setGameInfo({ ...gameInfo, price: Number(0) });
              setPriceRadios(!priceRadios);
            }}
          />
          Free to play
        </div>
        <div>
          <p> Choose game genre:</p>

          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setGameInfo({ ...gameInfo, genre: "RPG" });
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
                setGameInfo({ ...gameInfo, genre: "Survival" });
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
                setGameInfo({ ...gameInfo, genre: "Sandbox" });
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
                setGameInfo({ ...gameInfo, genre: "Shooter" });
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
                setGameInfo({ ...gameInfo, genre: "Fighting" });
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
                setGameInfo({ ...gameInfo, genre: "MOBA" });
              }}
            />
            MOBA
          </div>
        </div>
        <br />
        <Button
          className={classes.btns}
          variant="secondary"
          onClick={() => history.push("/gameslist")}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            console.log(gameInfo);
            addNewGame(gameInfo);
          }}
          className={classes.btns}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddGame;
