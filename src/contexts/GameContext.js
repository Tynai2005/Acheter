import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";

import { ACTIONS, GAMES_API, JSON_API_USERS } from "../helper/consts";

export const gameContext = createContext();

export const useGames = () => useContext(gameContext);

const INIT_STATE = {
  gamesData: [],
  gameDetails: {},
  modal: false,
  id: null,
  pages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_GAME_DETAILS:
      return { ...state, gameDetails: action.payload };
    case ACTIONS.GET_GAMES_DATA:
      return {
        ...state,
        gamesData: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / gamesCount),
      };
    case ACTIONS.MODAL:
      return { ...state, modal: action.payload };
    case ACTIONS.CHANGE_ID:
      return { ...state, id: action.payload };
    case ACTIONS.GET_GAMES:
      return { ...state, gamesData: action.payload };
    default:
      return state;
  }
};

let gamesCount = 10;

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [isAllGames, setIsAllGames] = useState(false);
  const history = useHistory();

  const getGamesData = async () => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", gamesCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await axios(`${GAMES_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_GAMES_DATA,
      payload: data,
    });
  };

  const addNewGame = async (newGame) => {
    if(newGame.creator.trim().length > 0 && newGame.description.trim().length > 0 && newGame.genre.trim().length > 0 && newGame.image.trim().length > 0 && newGame.name.trim().length > 0  && newGame.video.trim().length > 0){
      if(Number(newGame.price) >= 0){
        await axios.post(GAMES_API, newGame);
        await getGamesData();
        history.push('/gameslist');
      }else{
        alert('The price cannot be negative')
      }
    }else{
        alert('Fill all the fields')
      }
  };

  const deleteGame = async (id) => {
    await axios.delete(`${GAMES_API}/${id}`);
    getGamesData();
  };

  const toggleModal = () => {
    dispatch({
      type: ACTIONS.MODAL,
      payload: !state.modal,
    });
  };

  const setEditGameInfo = async (id) => {
    await getGameDetails(id);
    dispatch({
      type: ACTIONS.MODAL,
      payload: true,
    });
  };

  const getGameDetails = async (id) => {
    const { data } = await axios(`${GAMES_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_GAME_DETAILS,
      payload: data,
    });
  };

  const saveEditedGame = async (id, editedGame) => {
    console.log(editedGame);
    if(editedGame?.creator?.length > 0 && editedGame?.description?.length > 0 && editedGame?.genre?.length > 0 && editedGame?.image?.length > 0 && editedGame?.name?.length > 0  && editedGame?.video?.length > 0){
      if(Number(editedGame.price) >= 0){
        const data = await axios.patch(`${GAMES_API}/${id}`, editedGame);
        toggleModal();
        getGamesData();
      }else{
        alert('The price cannot be negative')
      }
    }else{
        alert('Fill all the fields')
    }

  };

  const toggleComment = async (id, editedGame) => {
    console.log(editedGame);
    const data = await axios.patch(`${GAMES_API}/${id}`, editedGame);
    getGamesData();
  };

  const changeId = (id) => {
    dispatch({
      type: ACTIONS.CHANGE_ID,
      payload: id,
    });
    history.push(`/gamedetails/${id}`);
  };

  const changeGenre = async (selectedGenre) => {
    const { data } = await axios(GAMES_API);
    console.log(data);
    let newData = data.filter((game) => game.genre == selectedGenre);
    dispatch({
      type: ACTIONS.GET_GAMES_DATA,
      payload: newData,
    });
  };

  const toHome = () => {
    setIsAllGames(false);
    history.push("/gameslist");
  };

  const toGamesList = () => {
    setIsAllGames(true);
    history.push("/");
  };

  const deleteCartGame = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const newCart = curUser.cart.filter((game) => game !== id);
    const newUser = { ...curUser, cart: newCart };
    localStorage.setItem("user", JSON.stringify(newUser));
    axios.patch(`${JSON_API_USERS}/${curUser.id}`, newUser);
  };

  const toLibrary = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios(JSON_API_USERS);
    data.map((user) => {
      if (Array.isArray(id)) {
        id.map((cartGame) => {
          if (user.name === curUser.name) {
            const edittedUser = { ...user };
            edittedUser.library.push(cartGame);
            edittedUser.cart = [];
            axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
            localStorage.setItem("user", JSON.stringify(edittedUser));
          }
        });
      } else if (!Array.isArray(id) && user.name === curUser.name) {
        const edittedUser = { ...user };
        edittedUser.library.push(id);
        axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
        localStorage.setItem("user", JSON.stringify(edittedUser));
      }
    });
  };

  const values = {
    toLibrary,
    deleteCartGame,
    getGamesData,
    addNewGame,
    deleteGame,
    setEditGameInfo,
    toggleModal,
    getGameDetails,
    saveEditedGame,
    changeId,
    changeGenre,
    toggleComment,
    setIsAllGames,
    toHome,
    toGamesList,
    isAllGames,
    pages: state.pages,
    history,
    id: state.id,
    gamesData: state.gamesData,
    modal: state.modal,
    gameDetails: state.gameDetails,
  };
  return <gameContext.Provider value={values}>{children}</gameContext.Provider>;
};

export default GameContextProvider;
