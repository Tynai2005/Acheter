import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import ProductContextProvider from "../contexts/ProductContext";
import AddProduct from "../components/AddProduct/AddProduct";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Footer from "../components/Footer/Footer";
import ProductsList from "../components/ProductsList/ProductsList";
import LogIn from "../components/Auth/LogIn";
import AuthContextProvider from "../contexts/AuthContext";
import SignUp from "../components/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { CardTravel } from "@material-ui/icons";
import Cart from "../components/Cart/Cart";
import Purchase from "../components/Purchase/Purchase";
import Library from "../components/Library/Library";
import AboutUs from "../components/Information/AboutUs";
import Contacts from "../components/Information/Contacts";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <ProductContextProvider>
            <Header />
            <Switch>
              <Route exact path="/aboutus" component={AboutUs} />
              <Route exact path="/contacts" component={Contacts} />
              <ProtectedRoute exact path="/library" component={Library} />
              <ProtectedRoute exact path="/purchase" component={Purchase} />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={Home} />
              <Route exact path="/productdetails/:id" component={ProductDetails} />
              <ProtectedRoute exact path="/addproduct" component={AddProduct} />
              <Route exact path="/productslist" component={ProductsList} />
            </Switch>
            <Footer />
          </ProductContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
