
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState,useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {app} from "../../base";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

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
  text: {
    color: "white",
    margin: "10px 0",
  },
  visBtn: {
    color: "white",
    marginLeft: "-50px",
  },
  grids: {
    display: "flex",
    alignItems: "center",
  },
  containers: {
    display: "flex",
    flexDirection: "column",
  },
}));

// const LogIn = () => {
//   const classes = useStyles();
//   const {
//     login,
//     exist,
//     visible,
//     handleVisible,
//     typePass,
//     handleInpType,
//     history,
//   } = useContext(AuthContext);
//   const [newUser, setNewUser] = useState({
//     nickname: "",
//     name: "",
//     password: "",
//     cart: [],
//     library: [],
//     isAdmin: false,
//     id: "", 
//   });


const Login = () => {

  const classes = useStyles();

    const {
    login,
    exist,
    visible,
    handleVisible,
    typePass,
    handleInpType,
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

  const handleLogin = async (event) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(newUser.name, newUser.password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    };

  const { currentUser } = useContext(AuthContext);

  return (
    <Container component="main" maxWidth="xs">
      <form action="" className={classes.cont}>
        <Grid container className={classes.containers}>
          <div>
            <Typography component="h1" variant="h5" style={{ color: "white" }}>
              Authorization
            </Typography>
          </div>
          <Grid className={classes.grids}>
            <TextField
              variant="filled"
              className={classes.inps}
              name="email"
              required
              label="Email"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />
          </Grid>
          <Grid className={classes.grids}>
            <TextField
              variant="filled"
              className={classes.inps}
              type={typePass}
              name="password"
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
                handleVisible();
                handleInpType();
              }}
            >
              {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Grid>
          <Grid>
            {!exist ? (
              <Typography className={classes.text}>
                No such user exists. Wanna <Link to="/signup">sign up</Link>?
              </Typography>
            ) : null}
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
              onClick={(e) => handleLogin(e)}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
