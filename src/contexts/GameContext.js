import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

import { ACTIONS, GAMES_API } from "../helper/consts";

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
        pages: Math.ceil(action.payload.headers['x-total-count'] / gamesCount),
      }
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

let gamesCount = 4

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory();

  const getGamesData = async () => {
    const search = new URLSearchParams(history.location.search);
    search.set('_limit', gamesCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await axios(`${GAMES_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_GAMES_DATA,
      payload: data,
    });
  };

  const addNewGame = async (newGame) => {
    await axios.post(GAMES_API, newGame);
    await getGamesData();
    history.push("/");
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
    const data = await axios.patch(`${GAMES_API}/${id}`, editedGame);
    toggleModal();
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
    const {data} = await axios(GAMES_API)
    console.log(data)
    let newData = data.filter((game) => game.genre == selectedGenre) 
    dispatch({
      type: ACTIONS.GET_GAMES_DATA,
      payload: newData,
    });
  }

  const values = {
    getGamesData,
    addNewGame,
    deleteGame,
    setEditGameInfo,
    toggleModal,
    getGameDetails,
    saveEditedGame,
    changeId,
    changeGenre,
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
