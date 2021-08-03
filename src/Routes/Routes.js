import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddGame from "../components/AddGame/AddGame";
import GameDetails from "../components/GameDetails/GameDetails";
import Home from "../components/Home/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gamedetails/:id" component={GameDetails} />
        <Route exact path="/addgame" component={AddGame} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
