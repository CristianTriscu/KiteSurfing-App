import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import KeyboardIcon from '@material-ui/icons/Keyboard';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
const styles = (theme) => ({
 



  paper: {
    padding: 20,
    paddingTop:"5rem",
    marginTop:"5rem",
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bg}>
        <Paper className={classes.paper} >
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
                  <TextField id="input-Email" label="E-mail" />
                </Grid>
              </Grid>
            </FormControl>
          </div>
          <div className="customDiv2"/> 
          <div className={classes.margin}>
            <FormControl>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <KeyboardIcon/>
                </Grid>
                <Grid item>
                  <TextField id="input-Password" label="Password" />
                </Grid>
              </Grid>
            </FormControl>
          </div>
          <div className="customDiv"> 
          
          <Button variant="contained" color="primary">
            Log In
          </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
