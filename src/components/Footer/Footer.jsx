import { Container, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",

    backgroundColor: "black",
  },
  icons: {
    color: "white",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Container>
        <IconButton>
          <InstagramIcon className={classes.icons} />
        </IconButton>
        <IconButton>
          <YouTubeIcon className={classes.icons} />
        </IconButton>
      </Container>
    </div>
  );
};

export default Footer;
