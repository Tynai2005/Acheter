import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddGame from "../components/AddGame/AddGame";
import GameDetails from "../components/GameDetails/GameDetails";
import Home from "../components/Home/Home";
import GameContext from "../contexts/GameContext";

const Routes = () => {
  return (
    <BrowserRouter>
    <GameContext>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gamedetails/:id" component={GameDetails} />
        <Route exact path="/addgame" component={AddGame} />
      </Switch>
    </GameContext>
    </BrowserRouter>
  );
};

export default Routes;
