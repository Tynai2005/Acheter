import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, JSON_API_GAMES } from "../helper/consts";

export const gameContext = createContext();

export const useGames = () => useContext(gameContext);

const INIT_STATE = {
  gamesData: [],
  gamesDetails: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_GAMES:
      return { ...state, gamesData: action.payload };
    default:
      return state;
  }
};

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getGamesData = async () => {
    const { data } = await axios(JSON_API_GAMES);
    dispatch({
      type: ACTIONS.GET_GAMES,
      payload: data,
    });
  };
  const value = {
    getGamesData,
    gamesData: state.gamesData,
  };
  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};

export default GameContextProvider;
