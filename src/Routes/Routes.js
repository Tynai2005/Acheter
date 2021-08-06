import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import GameContextProvider from "../contexts/GameContext";
import AddGame from "../components/AddGame/AddGame";
import GameDetails from "../components/GameDetails/GameDetails";
import GameContext from "../contexts/GameContext";
import Footer from "../components/Footer/Footer";
import GamesList from "../components/GamesList/GamesList";

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
            <Route exact path="/gameslist" component={GamesList} />
          </Switch>
          <Footer />
        </GameContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
