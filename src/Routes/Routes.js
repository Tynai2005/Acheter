import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import GameContextProvider from "../contexts/GameContext";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <GameContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </GameContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
