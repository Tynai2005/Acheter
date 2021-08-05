import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useGames } from "../../contexts/GameContext";
const useStyles = makeStyles((theme) => ({
  text: {
    color: "white",
  },
}));
const AddGame = () => {
<<<<<<< HEAD
    const {addNewGame} = useGames()
    const [gameInfo,setGameInfo] = useState({
        name:'',
        creator:'',
        description:'',
        image:'',
        price:0,
        genre:'',
        discount:0,
        isDiscount:false
    })
    return (
        <div>   
            <input onChange={(e) => {setGameInfo({...gameInfo,name: e.target.value})}} type="text" placeholder='Name'/><br />
            <input onChange={(e) => {setGameInfo({...gameInfo,creator: e.target.value})}} type="text" placeholder='Creator'/><br />
            <input onChange={(e) => {setGameInfo({...gameInfo,description: e.target.value})}} type="text" placeholder='Description'/><br />
            <input onChange={(e) => {setGameInfo({...gameInfo,image: e.target.value})}} type="text" placeholder='Image'/><br />
            <input onChange={(e) => {setGameInfo({...gameInfo,price: e.target.value})}} type="number" placeholder='Price($)'/><br />
            <input onChange={(e) => {setGameInfo({...gameInfo,discount: e.target.value})}} type="number" placeholder='Discount(%)'/><br />
            <div>Is discount?</div>
            <div><input onChange={(e) => {setGameInfo({...gameInfo,isDiscount: true})}} name='isdiscount' type="radio"/><span>Yes</span></div>
            <div><input onChange={(e) => {setGameInfo({...gameInfo,isDiscount: false})}} name='isdiscount' type="radio"/><span>No</span></div>
            <div>
            Choose game genre:
            <div><input type="radio" name="genreRadio" id="" onChange={() => {setGameInfo({...gameInfo,genre:'rpg'})}}/>RPG</div>
            <div><input type="radio" name="genreRadio" id="" onChange={() => {setGameInfo({...gameInfo,genre:'sandbox'})}}/>Sandbox</div>
            <div><input type="radio" name="genreRadio" id="" onChange={() => {setGameInfo({...gameInfo,genre:'shooter'})}}/>Shooter</div>
            <div><input type="radio" name="genreRadio" id="" onChange={() => {setGameInfo({...gameInfo,genre:'fighting'})}}/>Fighting</div>
            </div>
            <br />
            <button onClick={() => {
                console.log(gameInfo);
                addNewGame(gameInfo)}} >Добавить</button>
=======
  const classes = useStyles();
  const { addNewGame } = useGames();
  const [gameInfo, setGameInfo] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    genre: "",
    discount: 0,
    isDiscount: false,
  });
  return (
    <div className={classes.text}>
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
      <div>Is discount?</div>
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
>>>>>>> 20c39f9286a055e6ac53ec293479c11ef522157c
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
    </div>
  );
};

export default AddGame;
