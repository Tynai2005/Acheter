import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

import { ACTIONS, PRODUCTS_API, JSON_API_USERS } from "../helper/consts";

export const productContext = createContext();

export const useProducts = () => useContext(productContext);

const INIT_STATE = {
  productsData: [],
  productDetails: {},
  modal: false,
  id: null,
  pages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case ACTIONS.GET_PRODUCTS_DATA:
      return {
        ...state,
        productsData: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / productsCount),
      };
    case ACTIONS.MODAL:
      return { ...state, modal: action.payload };
    case ACTIONS.CHANGE_ID:
      return { ...state, id: action.payload };
    case ACTIONS.GET_PRODUCTS:
      return { ...state, productsData: action.payload };
    default:
      return state;
  }
};

let productsCount = 10;

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [isAllProducts, setIsAllProducts] = useState(false);
  const history = useHistory();
  const buyNow = JSON.parse(localStorage.getItem("buyNow"));

  useEffect(() => {
    localStorage.setItem("buyNow", JSON.stringify([]));
  }, []);

  const getProductsData = async () => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", productsCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await axios(`${PRODUCTS_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_PRODUCTS_DATA,
      payload: data,
    });
  };

  const addNewProduct = async (newProduct) => {
    if (
      newProduct.creator.trim().length > 0 &&
      newProduct.description.trim().length > 0 &&
      newProduct.genre.trim().length > 0 &&
      newProduct.image.trim().length > 0 &&
      newProduct.name.trim().length > 0 &&
      newProduct.video.trim().length > 0
    ) {
      if (Number(newProduct.price) >= 0) {
        await axios.post(PRODUCTS_API, newProduct);
        await getProductsData();
        history.push("/productslist");
      } else {
        alert("The price cannot be negative");
      }
    } else {
      alert("Fill all the fields");
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    getProductsData();
  };

  const toggleModal = () => {
    dispatch({
      type: ACTIONS.MODAL,
      payload: !state.modal,
    });
  };

  const setEditProductInfo = async (id) => {
    await getProductDetails(id);
    dispatch({
      type: ACTIONS.MODAL,
      payload: true,
    });
  };

  const getProductDetails = async (id) => {
    const { data } = await axios(`${PRODUCTS_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_PRODUCT_DETAILS,
      payload: data,
    });
  };

  const saveEditedProduct = async (id, editedProduct) => {
    console.log(editedProduct);
    if (
      editedProduct?.creator?.length > 0 &&
      editedProduct?.description?.length > 0 &&
      editedProduct?.genre?.length > 0 &&
      editedProduct?.image?.length > 0 &&
      editedProduct?.name?.length > 0 &&
      editedProduct?.video?.length > 0
    ) {
      if (Number(editedProduct.price) >= 0) {
        const data = await axios.patch(`${PRODUCTS_API}/${id}`, editedProduct);
        toggleModal();
        getProductsData();
      } else {
        alert("The price cannot be negative");
      }
    } else {
      alert("Fill in all the fields");
    }
  };

  const toggleComment = async (id, editedProduct) => {
    console.log(editedProduct);
    const data = await axios.patch(`${PRODUCTS_API}/${id}`, editedProduct);
    getProductsData();
  };

  const changeId = (id) => {
    dispatch({
      type: ACTIONS.CHANGE_ID,
      payload: id,
    });
    history.push(`/productdetails/${id}`);
  };

  const changeGenre = async (selectedGenre) => {
    const { data } = await axios(PRODUCTS_API);
    console.log(data);
    let newData = data.filter((product) => product.genre == selectedGenre);
    dispatch({
      type: ACTIONS.GET_PRODUCTS_DATA,
      payload: newData,
    });
  };

  const toHome = () => {
    setIsAllProducts(false);
    history.push("/productslist");
  };

  const toProductsList = () => {
    setIsAllProducts(true);
    history.push("/");
  };

  const deleteCartProduct = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const newCart = curUser.cart.filter((product) => product !== id);
    const newUser = { ...curUser, cart: newCart };
    localStorage.setItem("user", JSON.stringify(newUser));
    axios.patch(`${JSON_API_USERS}/${curUser.id}`, newUser);
  };

  const toLibrary = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios(JSON_API_USERS);

    if (buyNow > 0) {
      data.map((user) => {
        if (user.name === curUser.name) {
          const edittedUser = { ...user };
          edittedUser.library.push(buyNow);
          axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
          localStorage.setItem("user", JSON.stringify(edittedUser));
        }
      });
    } else {
      data.map((user) => {
        if (Array.isArray(id)) {
          id.map((cartProduct) => {
            if (user.name === curUser.name) {
              const edittedUser = { ...user };
              edittedUser.library.push(cartProduct);
              edittedUser.cart = [];
              axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
              localStorage.setItem("user", JSON.stringify(edittedUser));
            }
          });
        } else if (!Array.isArray(id) && user.name === curUser.name) {
          const edittedUser = { ...user };
          edittedUser.library.push(id);
          axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
          localStorage.setItem("user", JSON.stringify(edittedUser));
        }
      });
    }
  };

  const values = {
    toLibrary,
    deleteCartProduct,
    getProductsData,
    addNewProduct,
    deleteProduct,
    setEditProductInfo,
    toggleModal,
    getProductDetails,
    saveEditedProduct,
    changeId,
    changeGenre,
    toggleComment,
    setIsAllProducts,
    toHome,
    toProductsList,
    isAllProducts,
    pages: state.pages,
    history,
    id: state.id,
    productsData: state.productsData,
    modal: state.modal,
    productDetails: state.productDetails,
  };
  return <productContext.Provider value={values}>{children}</productContext.Provider>;
};

export default ProductContextProvider;
