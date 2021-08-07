import { Button, colors, makeStyles, Typography } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useGames } from "../../contexts/GameContext";
import { borderRadius, display, width } from "@material-ui/system";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  details: {
    margin: "30px 0",
    width: "80%",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  hr: {
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    margin: "50px 0",
  },
  homeLink: {
    color: "white",
    textDecoration: "none",
  },
  h1: {
    color: "white",
    marginBottom: "30px",
  },
  p: {
    color: "silver",
    marginTop: "20px",
  },
  left: {
    width: "50%",
  },
  vl: {
    width: "2.1px",
    height: "100px",
    backgroundColor: "white",
    borderRadius: "2px",
    opacity: "20%",
    display: "inline-block",
  },
  genre: {
    display: "flex",
    width: "100px",
    justifyContent: "space-between",
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const GameDetails = () => {
  const { id, gameDetails, getGameDetails } = useGames();
  const [buttonColor, setButtonColor] = useState("primary");

  const classes = useStyles();
  useEffect(() => {
    getGameDetails(id);
  }, [id]);
  return (
    <div className={classes.detailsContainer}>
      <div className={classes.details}>
        <div>
          <Link to="/" className={classes.homeLink}>
            <HomeIcon />
          </Link>
        </div>
        <hr className={classes.hr} />
        <div style={{ display: "flex" }}>
          <div className={classes.left}>
            <h1 className={classes.h1}>{gameDetails.name}</h1>
            <div>{gameDetails.video}</div>
            <p className={classes.p}>{gameDetails.description}</p>{" "}
            <div className={classes.genre}>
              <div class={classes.vl}></div>
              <div>
                <h6 className={classes.p}>Genre:</h6>
                <h5 className={classes.h1}>{gameDetails.genre}</h5>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <Button variant="contained" color="primary">
              Buy now
            </Button>
            <Button
              variant="outlined"
              color={buttonColor}
              onClick={() => setButtonColor("secondary")}
            >
              Add to wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
