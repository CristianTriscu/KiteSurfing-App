import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Paper } from "@material-ui/core";
import MapContainer from "./Maps";
import server from "../../ServerURL";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SimpleMenu from "./SimpleMenu";
import FormDialog from "./FiltersWindow";
import AddLocationDialog from "./AddLocationForm";
const columns = [
  { id: "id", label: "Favourite", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "country", label: "Country", minWidth: 100 },
  {
    id: "lat",
    label: "Latitude",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "long",
    label: "Longitude",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "probability",
    label: "Wind prob (%)",
    minWidth: 170,
    align: "right",
    format: (value) => parseFloat(value).toFixed(2),
  },
  {
    id: "month",
    label: "When to go",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const styles = (theme) => ({
  paper: {
    padding: 20,
    marginTop: "0.5rem",
    textAlign: "center",
    color: "black",
    width: "auto",
  },
  root: {
    width: "100%",
  },
  bg: {
    padding: 25,
    textAlign: "center",
    color: "black",
    backgroundColor: "#F6F7F8",
    minHeight: "100vh",
  },
});

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: [],
      favPlaces: [],
    };

    this.filterByCountry = (country) => {
      let fileteredByCountry = this.state.data.filter(
        (element) => element.country === country
      );
      this.setState({
        data: fileteredByCountry,
      });
    };

    this.filterByWindProbablity = (minWindProb) => {
      let filteredByWind = this.state.data.filter(
        (element) => element.probability >= minWindProb
      );

      this.setState({
        data: filteredByWind,
      });
    };
    this.containsFavPlace = (id, arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return true;
      }
      return false;
    };

    this.handleChangePage = (ev, newPage) => {
      this.setState({
        page: newPage,
      });
    };
    this.handleChangeRowsPerPage = (ev) => {
      this.setState({
        rowsPerPage: ev.target.value,
        page: 0,
      });
    };

    this.handleLogout = () => {
      this.props.history.push("/LogIn");
    };

    this.loadData = async () => {
      try {
        const response = await fetch(server + "spot");
        const data = await response.json();
        this.setState({
          data: data,
        });
        //console.log(this.state.data);
      } catch (err) {
        alert(err.toString());
      }
    };

    this.loadFaves = async () => {
      try {
        const response = await fetch(server + "favourites");
        const data = await response.json();
        this.setState({
          favPlaces: data,
        });
        //console.log(this.state.favPlaces)
      } catch (err) {
        alert(err.toString());
      }
    };
  }

  componentDidMount() {
    this.loadData();
    this.loadFaves();
  }
  render() {
    const props = this.props;
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#011627",
          }}
        >
          <Toolbar>
            <Typography id="slogan" fontSize="15rem" variant="h6">
              Kite
            </Typography>

            <div style={{ flex: 1 }}></div>

            <AddLocationDialog loadData={this.loadData} />
            <SimpleMenu></SimpleMenu>
          </Toolbar>
        </AppBar>

        <div className={classes.bg}>
          <MapContainer
            loadFaves={this.loadFaves}
            markers={this.state.data}
            favPlaces={this.state.favPlaces}
            className="mapContainer"
          />
          <Paper
            style={{ backgroundColor: "#C6CCD2" }}
            className={classes.paper}
          >
            <FormDialog
              loadData={this.loadData}
              filterByCountry={this.filterByCountry}
              filterByProb={this.filterByWindProbablity}
              data={this.state.data}
            ></FormDialog>
          </Paper>
          <Paper
            style={{ backgroundColor: "#C6CCD2" }}
            className={classes.paper}
          >
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.data
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];

                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "id" &&
                                  this.containsFavPlace(
                                    value,
                                    this.state.favPlaces
                                  ) ? (
                                    <StarIcon style={{ color: "#FF9529" }} />
                                  ) : null}

                                  {column.id === "id" &&
                                  !this.containsFavPlace(
                                    value,
                                    this.state.favPlaces
                                  ) ? (
                                    <StarBorderIcon
                                      style={{ color: "#FF9529" }}
                                    />
                                  ) : null}

                                  {column.format && typeof value === "number"
                                    ? !column.id === "id"
                                      ? column.format(value)
                                      : value
                                    : column.id === "id"
                                    ? null
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.state.data.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(DashBoard));
