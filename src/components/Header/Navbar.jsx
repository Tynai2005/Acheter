import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ClickAwayListener,
} from "@material-ui/core";
import { useGames } from "../../contexts/GameContext";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import zIndex from "@material-ui/core/styles/zIndex";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navbarBtn: {
    color: "white",
    textDecoration: "none",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    height: "20%",
  },
  appBar: {
    backgroundColor: "#1a1a1a",
    opacity: "90%",
  },

  menu: {
    position: "absolute",
    left: 15,
    backgroundColor: "white",
    color: "black",
    opacity: "80%",
  },
  priceInputs: {
    width: "100px",
  },

  menuMobile: {
    position: "absolute",
    left: 15,
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    opacity: "80%",
    zIndex: 1,
  },
  mobileMenuItem: {
    marginTop: "-15px",
  },
  mobilePriceFilter: {
    display: "flex",
  },
  mobileBurger: {
    position: "relative",
  },
}));

export default function PrimarySearchAppBar() {
  const [sortMenu, setSortMenu] = useState(false);
  const [sortMenuMobile, setSortMenuMobile] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { getGamesData, history } = useGames();
  const [genre, setGenre] = useState(getGenre());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function getGenre() {
    const search = new URLSearchParams(history.location.search);
    return search.get("genre");
  }

  function getMinPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_gte");
  }

  function getMaxPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_lte");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searching = (e) => {
    history.push("/gameslist");
    const search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
  };

  const changeGenre = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("genre");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getGamesData();
      setGenre(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("genre", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setGenre(e.target.value);
  };

  const changeMinPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMinPrice(value);
  };

  const changeMaxPrice = (value) => {
    console.log(value);
    const search = new URLSearchParams(history.location.search);
    search.set("price_lte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMaxPrice(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("price_gte");
    search.delete("price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getGamesData();
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        className={classes.mobileBurger}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <Button
            onClick={() => {
              history.push("/gameslist");
              setSortMenuMobile(!sortMenuMobile);
              setSortMenu(false);
            }}
          >
            Filter
          </Button>
        </MenuItem>
        <MenuItem>
          <Button>Library</Button>
        </MenuItem>

        <MenuItem onClick={handleProfileMenuOpen}>
          <Button>Cart</Button>
        </MenuItem>
      </Menu>
      {sortMenuMobile ? (
        <div className={classes.menuMobile}>
          <RadioGroup value={genre} onChange={changeGenre}>
            <h5>By Genre:</h5>
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="RPG"
              control={<Radio />}
              label="RPG"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="Survival"
              control={<Radio />}
              label="Survival"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="MOBA"
              control={<Radio />}
              label="MOBA"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="Sandbox"
              control={<Radio />}
              label="Sandbox"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="Shooter"
              control={<Radio />}
              label="Shooter"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="Fighting"
              control={<Radio />}
              label="Fighting"
            />
            <FormControlLabel
              className={classes.mobileMenuItem}
              value="all"
              control={<Radio />}
              label="All"
            />
          </RadioGroup>
          <h5>By Price:</h5>
          <div className={classes.mobilePriceFilter}>
            <TextField
              className={classes.priceInputs}
              value={minPrice}
              onChange={(e) => changeMinPrice(e.target.value)}
              type="number"
              label="Min Price($)"
              defaultValue="100"
            />
            <TextField
              className={classes.priceInputs}
              value={maxPrice}
              onChange={(e) => changeMaxPrice(e.target.value)}
              type="number"
              label="Max Price($)"
              defaultValue="1000"
            />
          </div>
          <div>
            <Button variant="outlined" onClick={resetPrice}>
              Reset Price Filter
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.navbar}>
          <div className={classes.navbarSel}>
            <div className={classes.sectionDesktop}>
              <Button
                className={classes.navbarBtn}
                onClick={() => {
                  history.push("/gameslist");
                  setSortMenu(!sortMenu);
                  setSortMenuMobile(false);
                }}
              >
                Filter
              </Button>
              <Button className={classes.navbarBtn}>Library</Button>

              <Button
                onClick={() => history.push("/cart")}
                className={classes.navbarBtn}
              >
                Cart
              </Button>
            </div>

            {sortMenu ? (
              <div className={classes.menu}>
                <RadioGroup value={genre} onChange={changeGenre}>
                  <h5>By Genre:</h5>
                  <FormControlLabel
                    value="RPG"
                    control={<Radio />}
                    label="RPG"
                  />
                  <FormControlLabel
                    value="Survival"
                    control={<Radio />}
                    label="Survival"
                  />
                  <FormControlLabel
                    value="MOBA"
                    control={<Radio />}
                    label="MOBA"
                  />
                  <FormControlLabel
                    value="Sandbox"
                    control={<Radio />}
                    label="Sandbox"
                  />
                  <FormControlLabel
                    value="Shooter"
                    control={<Radio />}
                    label="Shooter"
                  />
                  <FormControlLabel
                    value="Fighting"
                    control={<Radio />}
                    label="Fighting"
                  />
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                </RadioGroup>
                <h5>By Price:</h5>
                <TextField
                  className={classes.priceInputs}
                  value={minPrice}
                  onChange={(e) => changeMinPrice(e.target.value)}
                  type="number"
                  label="Min Price($)"
                  defaultValue="100"
                />
                <TextField
                  className={classes.priceInputs}
                  value={maxPrice}
                  onChange={(e) => changeMaxPrice(e.target.value)}
                  type="number"
                  label="Max Price($)"
                  defaultValue="1000"
                />
                <div>
                  <Button variant="outlined" onClick={resetPrice}>
                    Reset Price Filter
                  </Button>
                </div>
              </div>
            ) : null}
            {/* </ClickAwayListener> */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.navbarSer}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                onChange={(e) => searching(e)}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
