import React, { useEffect } from "react";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import EditProduct from "../EditProduct/EditProduct";
import ProductsListPreview from "../ProductsListPreview/ProductsListPreview";
import { Container } from "@material-ui/core";
import FreeProducts from "../FreeProducts/FreeProducts";

const Home = () => {
  const { modal } = useProducts();
  return (
    <Container>
      <CarouselSlide />

      {modal ? <EditProduct /> : null}

      <ProductsListPreview />

      <FreeProducts />
    </Container>
  );
};

export default Home;
