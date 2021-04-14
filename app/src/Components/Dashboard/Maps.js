import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Button, Typography } from "@material-ui/core";
import InfoWindowEx from "../Dashboard/Infowindow";
import server from "../../ServerURL";
const mapStyles = {
  position: "relative",
  width: "90vw",
  height: "50vh",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  addLocationToFavourites = async (id) => {
    const { loadFaves } = this.props;
    try {
      const requsetOptions = {
        method: "POST",
        body: {
          id: id,
        },
      };
      const response = await fetch(server + "favourites", requsetOptions);
      const data = await response.json();
      //console.log(data);
      if (data.spot) {
        alert("Succes");
        loadFaves();
      } else {
        alert("Failed");
      }
    } catch (err) {
      alert(err.toString());
    }
  };

  removeLocationFromFavourites = async (id) => {
    const { loadFaves } = this.props;
    try {
      const requsetOptions = {
        method: "DELETE",
      };
      const response = await fetch(server + "favourites/" + id, requsetOptions);
      const data = await response.json();

      if (data.spot) {
        alert("Succes");
        loadFaves();
      } else {
        alert("Failed");
      }
    } catch (err) {
      alert(err.toString());
    }
  };

  handlesomeClick = () => {
    alert("this is some click");
  };

  containsFavPlace = (id, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return true;
    }
    return false;
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    const { markers } = this.props;
    const { favPlaces } = this.props;

    // console.log("Locatii");
    console.log(markers);
    // console.log("fav places");
    // console.log(favPlaces);
    return (
      <div id="mapBox">
        <Map
          google={this.props.google}
          zoom={2}
          style={mapStyles}
          initialCenter={{
            lat: 44.439663,
            lng: 26.096306,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.long }}
              onClick={this.onMarkerClick}
              id={marker.id}
              name={marker.name}
              icon={
                this.containsFavPlace(marker.id, favPlaces)
                  ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
              month={marker.month}
              country={marker.country}
              probability={marker.probability}
            ></Marker>
          ))}

          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <Typography variant="h5" size="50" align="left">
                {" "}
                {this.state.selectedPlace.name}
              </Typography>

              <Typography align="left">
                Wind probability:
                <Typography variant="subtitle2" align="left">
                  {this.state.selectedPlace.probability + " %"}
                </Typography>
              </Typography>
              <Typography align="left">
                Country:
                <Typography variant="subtitle2" align="left">
                  {this.state.selectedPlace.country}
                </Typography>
              </Typography>
              <Typography align="left">
                When to go:
                <Typography variant="subtitle2" align="left">
                  {" "}
                  {this.state.selectedPlace.month}
                </Typography>
              </Typography>

              {this.state.selectedPlace.icon ===
              "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" ? (
                <input
                  className="buttonRomove"
                  type="button"
                  value="Remove from faves"
                  onClick={() =>
                    this.removeLocationFromFavourites(
                      this.state.selectedPlace.id
                    )
                  }
                ></input>
              ) : (
                <input
                  className="buttonAdd"
                  type="button"
                  value="add to faves"
                  onClick={() =>
                    this.addLocationToFavourites(this.state.selectedPlace.id)
                  }
                ></input>
              )}
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "apikey-here",
})(MapContainer);
