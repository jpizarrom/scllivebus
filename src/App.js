import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";
import styles from './App.style';
import config from "./config.json";
import VehicleSocket from "./VehicleSocket";
import { connect } from "react-redux";

import SearchBar from './SearchBar';
import * as searchActions from "./actions/search";
import { bindActionCreators } from "redux";
import ReactGA from 'react-ga';
import Moment from 'react-moment';

const { accessToken, style } = config;

const maxBounds = [
  [-70.9689, -33.6369], // South West
  [-70.3159, -33.2772], // North East
];

class App extends Component {

  state = {
    // center: [-0.109970527, 51.52916347],
    center: [-70.64794101900515, -33.48742705566642],
    zoom: [11],
    skip: 0,
    // vehicles: new Map(),
    popupShowLabel: true
  };

  _markerClick = (vehicle, { feature }) => {
    ReactGA.modalview('/'+vehicle.type.toLowerCase()+'/'+vehicle.routeNumber.toLowerCase()+'/'+vehicle.vehicleID.toLowerCase());
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      vehicle,
    });
  }

  _onDrag = () => {
    if (this.state.vehicle) {
      // this.setState({
      //   vehicle: null,
      // });
    }
  }

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  _onControlClick = (map, zoomDiff) => {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
  };

  _popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  toggle = true;

  _onFitBoundsClick = () => {
    // if (this.toggle) {
  //     this.setState({
  //       fitBounds: [[-0.122555629777, 51.4734862092], [-0.114842, 51.50621]]
  //     });
    // } else {
      this.setState({
        // this won't focus on the area as there is a maxBounds
        fitBounds: [[-70.7288, -33.4843], [-70.5655, -33.3943]]
      });
    // }

    this.toggle = !this.toggle;
  };

  render() {
    const { vehicles } = this.props;
    const { vehicle, popupShowLabel, fitBounds } = this.state;

    const _this = this;
    vehicles
    .filter(function(v) { return vehicle && v.vehicleID===vehicle.vehicleID && v!==vehicle; })
    .map(function(v) {
      _this.setState({
        vehicle:v
      })
    })

    return (
      <div>
          <SearchBar placeholder='route' onTermChange={this.props.actions.search_route} />
          <SearchBar placeholder='vehicle id' onTermChange={this.props.actions.search_id} />
      <VehicleSocket>
        <ReactMapboxGl
          style={style}
          fitBounds={fitBounds}
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={7}
          maxZoom={15}
          maxBounds={maxBounds}
          accessToken={accessToken}
          onDrag={this._onDrag}
          containerStyle={styles.container}>

          <ZoomControl
            zoomDiff={1}
            onControlClick={this._onControlClick}/>

          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "bus-15" }}>
            {
              vehicles
                .map((st, index) => (
                  <Feature
                    key={st.vehicleID}
                    onMouseEnter={this._onToggleHover.bind(this, "pointer")}
                    onMouseLeave={this._onToggleHover.bind(this, "")}
                    onClick={this._markerClick.bind(this, st)}
                    coordinates={[st.longitude,st.latitude]}/>
                ))
            }
          </Layer>
          {
            vehicle && (
              <Popup
                key={vehicle.vehicleID}
                offset={[0, -50]}
                coordinates={[vehicle.longitude,vehicle.latitude]}>
                <div>
                  <span style={{
                    ...styles.popup,
                    display: popupShowLabel ? "block" : "none"
                  }}>
                    {vehicle.routeNumber}
                  </span>
                  <div onClick={this._popupChange.bind(this, !popupShowLabel)}>
                    {
                      popupShowLabel ? "Hide" : "Show"
                    }
                  </div>
                </div>
              </Popup>
            )
          }
        </ReactMapboxGl>
        </VehicleSocket>
        {
          vehicle && (
            <div style={styles.stationDescription}>
              <p>{ vehicle.routeNumber }</p>
              <p>{ vehicle.vehicleID } </p>
              <p><Moment format="DD-MM-YYYY HH:mm:ss" parse="DD-MM-YYYY HH:mm:ss Z" tz="America/Santiago">{ vehicle.dateTrans } Z </Moment></p>
            </div>
          )
        }
        <div style={{
        ...styles.btnWrapper,
        ...(vehicle && styles.btnStationOpen)
      }}>
          <button style={styles.btn} onClick={this._onFitBoundsClick}>Fit to bounds</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      vehicles: state.vehicles.filtered
    }
}

// export default connect(mapStateToProps)(App)

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);