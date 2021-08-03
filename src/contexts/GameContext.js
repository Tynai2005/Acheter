import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { ACTIONS } from "../helpers/consts";

export const gameContext = createContext();

export const useGames = () => useContext(gameContext);

const INIT_STATE = {
  gamesData: [],
  gameDetails: {},
  modal: false,
  id: null,
}

const reducer = (state = INIT_STATE, action) => {
  switch(action.type){
    case ACTIONS.GET_GAME_DETAILS:
      return {...state, gameDetails: action.payload} 
    case ACTIONS.GET_GAMES_DATA:
      return {...state, gamesData: action.payload}
    case ACTIONS.MODAL:
      return {...state, modal: action.payload}
    case ACTIONS.CHANGE_ID:
      return {...state, id: action.payload}
  }
}


const GameContext = () => {

  const [state,dispatch] = useReducer(reducer,INIT_STATE)
  let history = useHistory()
  return <gameContext.Provider>

  </gameContext.Provider>;
};

export default GameContext;
