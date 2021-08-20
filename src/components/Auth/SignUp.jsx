import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router";
import {app} from "../../base";

const useStyles = makeStyles((theme) => ({
  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 20px",
  },
  inps: {
    margin: "10px 0",

    borderBottom: "1px white solid",
  },
  inpColor: {
    color: "white",
  },
  cont: {
    margin: "50px",
  },
  visBtn: {
    color: "white",
    marginLeft: "-50px",
  },
  grids: {
    display: "flex",
    alignItems: "center",
  },
}));

  const SignUp = () => {

    const classes = useStyles();

    const {
      visible,
      typePass,
      handleInpType,
      setVisible,
      setInpType,
      history,
    } = useContext(AuthContext);

    const [newUser, setNewUser] = useState({
      nickname: "",
      name: "",
      password: "",
      cart: [],
      library: [],
      isAdmin: false,
      id: "", 
    });

    const handleSignUp = async (event) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(newUser.name, newUser.password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    };

  return (
    <Container component="main" maxWidth="xs">
      <form action="" className={classes.cont}>
        <Grid container>
          <div>
            <Typography component="h1" variant="h5" style={{ color: "white" }}>
              Registration
            </Typography>
          </div>
          <Grid>
            <TextField
              variant="filled"
              className={classes.inps}
              name="nickname"
              required
              label="Nickname"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) =>
                setNewUser({ ...newUser, nickname: e.target.value })
              }
            />
            <TextField
              variant="filled"
              className={classes.inps}
              name="email"
              required
              label="Email Address"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Grid className={classes.grids}>
              <TextField
                variant="filled"
                className={classes.inps}
                name="password"
                type={typePass}
                required
                label="Password"
                InputProps={{
                  className: classes.inpColor,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <IconButton
                className={classes.visBtn}
                onClick={() => {
                  setVisible(!visible);
                  handleInpType();
                }}
              >
                {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>
          </Grid>
          <Button
            className={classes.btns}
            style={{ marginRight: "25px" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            Close
          </Button>
          <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleSignUp(e);
              setVisible(false);
              setInpType(false);
            }}
          >
            Sign up
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
