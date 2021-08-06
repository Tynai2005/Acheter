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
import LogIn from "../components/Auth/LogIn";
import AuthContextProvider from "../contexts/AuthContext";
import SignUp from "../components/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";


const Routes = () => {
  return (
    <div>
      <BrowserRouter>

        <AuthContextProvider>
          <GameContextProvider>
            <Header />
            <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={Home} />
              <Route exact path="/gamedetails/:id" component={GameDetails} />
              <ProtectedRoute exact path="/addgame" component={AddGame} />
                
            </Switch>
            <Footer />
          </GameContextProvider>
        </AuthContextProvider>

      </BrowserRouter>
    </div>
  );
};

export default Routes;
