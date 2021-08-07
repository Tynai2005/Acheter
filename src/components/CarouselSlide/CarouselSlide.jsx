import { Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useGames } from "../../contexts/GameContext";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "100%",
    height: "100%",
  },
  slides: {
    height: "100%",
    objectFit: "fill",
  },
  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "15px 40px",
  },
}));
const CarouselSlide = () => {
  const classes = useStyles();
  const { getGamesData, gamesData, changeId } = useGames();

  useEffect(() => {
    getGamesData();
  }, []);

  return (
    <Container style={{ maxHeight: "800px" }}>
      <Carousel className={classes.carousel}>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={gamesData[0]?.image}
            alt="First slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(1)}>
              See more
            </Button>
          </Carousel.Caption>
          {/* <video style={{ height: 700, width: "100%" }} controls>
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              type="video/mp4"
            ></source>
            Sorry, your browser doesn't support videos.
          </video> */}
        </Carousel.Item>

        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={gamesData[1]?.image}
            alt="Second slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(2)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={gamesData[2]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(3)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={gamesData[3]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(4)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselSlide;
