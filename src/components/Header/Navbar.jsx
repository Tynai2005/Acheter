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
import { useAuth } from "../../contexts/AuthContext";
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
  const { logged } = useAuth();

  const [sortMenu, setSortMenu] = useState(false);
  const [sortMenuMobile, setSortMenuMobile] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { getGamesData, history } = useGames();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
        {logged ? (
          <MenuItem>
            <Button onClick={() => history.push("/library")}>Library</Button>
          </MenuItem>
        ) : null}

        <MenuItem onClick={handleProfileMenuOpen}>
          <Button>Cart</Button>
        </MenuItem>
      </Menu>
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
                }}
              >
                All Games
              </Button>
              {logged ? (
                <Button
                  className={classes.navbarBtn}
                  onClick={() => history.push("/library")}
                >
                  Library
                </Button>
              ) : null}

              <Button
                onClick={() => history.push("/cart")}
                className={classes.navbarBtn}
              >
                Cart
              </Button>
            </div>

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
