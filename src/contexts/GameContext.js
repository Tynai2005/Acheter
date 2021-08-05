
import { AirportShuttle } from "@material-ui/icons";
import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { ACTIONS, GAMES_API, JSON_API_GAMES } from "../helpers/consts";


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
    case ACTIONS.GET_GAMES:
      return { ...state, gamesData: action.payload };
    default:
      return state;
  }
}


const GameContext = ({children}) => {

  const [state,dispatch] = useReducer(reducer,INIT_STATE)
  let history = useHistory()

  const getGamesData = async () => { 
    const {data} = await axios(GAMES_API)
    dispatch({
      type: ACTIONS.GET_GAMES_DATA,
      payload: data
    })
  }

  const addNewGame = async (newGame) => {
    await axios.post(GAMES_API,newGame)
    await getGamesData()
    history.push('/')  
  }

  const deleteGame = async (id) => {
    await axios.delete(`${GAMES_API}/${id}`)
    getGamesData()
  }

  const toggleModal = () => {
    dispatch({
      type: ACTIONS.MODAL,
      payload: !state.modal
    })
  }

  const setEditGameInfo = async (id) => {
    await getGameDetails(id)
    dispatch({
      type: ACTIONS.MODAL,
      payload: true
    })
  }

  const getGameDetails = async (id) => {
    const {data} = await axios(`${GAMES_API}/${id}`)
    dispatch({
      type:ACTIONS.GET_GAME_DETAILS,
      payload: data
    })
  }

  const saveEditedGame = async (id,editedGame) => {
    console.log(editedGame)
    const data = await axios.patch(`${GAMES_API}/${id}`,editedGame)
    toggleModal() 
    getGamesData()
  }

  const values = {
    getGamesData,
    addNewGame,
    deleteGame,
    setEditGameInfo,
    toggleModal,  
    getGameDetails,
    saveEditedGame,
    id: state.id,
    gamesData: state.gamesData,
    modal: state.modal,
    gameDetails: state.gameDetails
  }
  return <gameContext.Provider value={values}>
    {children}
  </gameContext.Provider>;

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
