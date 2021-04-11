import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import server from "../../ServerURL.js";

const styles = (theme) => ({
  paper: {
    padding: 20,
    paddingTop: "5rem",
    marginTop: "5rem",
    textAlign: "center",
    color: "black",
  },
  bg: {
    padding: 25,
    textAlign: "center",
    color: "black",
    backgroundColor: "#9B9DC0",
    minHeight: "100vh",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
      error: null,
      errorOpen: null,
    };

    this.handleChange = (name) => (e) => {
      this.setState({
        [name]: e.target.value,
      });
    };

    this.handleLogIn = async (e) => {
      try {
        e.preventDefault();
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: this.state.emailInput,
            password: this.state.passwordInput,
          }),
        };
        const response = await fetch(server+"login", requestOptions);
        const data = await response.json();
        //console.log(data);
        if (data) {
          localStorage.setItem("id", JSON.stringify(data.id));
          localStorage.setItem("userId", JSON.stringify(data.userId));
          props.history.push("/Dashboard")
        } else {
          this.setState({
            errorOpen: true,
            error: "Something is not right. You should try again",
          });
        }
      } catch (err) {
        alert(err.toString());
      }
    };
  }
  render() {
    const props = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.bg}>
        <Paper className={classes.paper}>
          <div className={classes.margin}>
            <FormControl>
              <Grid container spacing={1} alignItems="flex-end">
                Kite logo here
              </Grid>
            </FormControl>
          </div>
          <div className={classes.margin}>
            <FormControl>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField 
                  onChange={this.handleChange}
                  id="input-Email" label="E-mail" 
                  type="email"
                  />
                </Grid>
              </Grid>
            </FormControl>
          </div>
          <div className="customDiv2" />
          <div className={classes.margin}>
            <FormControl>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <KeyboardIcon />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={this.handleChange}
                    id="input-Password"
                    label="Password"
                    type="password"
                  />
                </Grid>
              </Grid>
            </FormControl>
          </div>
          <div className="customDiv">
            <Button
              onClick={this.handleLogIn}
              variant="contained"
              color="primary"
            >
              Log In
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
