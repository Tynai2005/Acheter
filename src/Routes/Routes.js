import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import GameContextProvider from "../contexts/GameContext";
import AddGame from "../components/AddGame/AddGame";
import GameDetails from "../components/GameDetails/GameDetails";
import GameContext from "../contexts/GameContext";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <GameContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
<Route exact path="/gamedetails/:id" component={GameDetails} />
        <Route exact path="/addgame" component={AddGame} />
          </Switch>
        </GameContextProvider>
      </BrowserRouter>
    </div>

  );
};

export default Routes;
