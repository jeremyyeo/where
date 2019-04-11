import React, { Fragment } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import ServiceLocation, { latestBusLocations } from "./ServiceLocation";
import { redIcon, greenIcon } from "./Marker";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

class Map extends React.Component {
  state = {
    location: { lat: -41.301907, long: 174.774041 },
    activeBusses: 0,
    busInfo: {}
  };

  resetMap(lat, long) {
    if (this.map != undefined) {
      this.map.remove();
    }
    this.map = L.map("map", {
      center: [lat, long],
      zoom: 15,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      detectRetina: true,
      maxZoom: 19
    }).addTo(this.map);

    L.marker([lat, long])
      .addTo(this.map)
      .bindTooltip("Wellington");
  }

  componentDidMount() {
    let { lat, long } = this.state.location;
    this.resetMap(lat, long);
    let markings = 0;

    setInterval(async () => {
      if (markings > 200) {
        this.resetMap(lat, long);
        markings = 0;
      }
      let allBusses = await latestBusLocations();
      try {
        this.setState({ activeBusses: allBusses.length, busInfo: allBusses });
        for (var i = 0; i < allBusses.length; i++) {
          let busDelayMins = allBusses[i][2] / 60;
          let busDelayString;
          // prettier-ignore
          if (busDelayMins > 0) {
            busDelayString = `${busDelayMins.toFixed(2)} mins ahead of schedule`;
          } else if (busDelayMins < 0) {
            busDelayString = `${Math.abs( busDelayMins.toFixed(2))} mins behind schedule`;
          } else {
            busDelayString = "on time";
          }

          L.marker([allBusses[i][0], allBusses[i][1]], {
            icon: busDelayMins >= 0 ? greenIcon : redIcon
          })
            .bindTooltip(
              `Bus ${allBusses[i][3]} is ${busDelayString} <br/> heading ${
                allBusses[i][4]
              } to ${allBusses[i][5]}.`
            )
            .addTo(this.map);
          markings += 1;
        }
      } catch (error) {}
    }, 1000);
  }

  render() {
    const { activeBusses, busInfo } = this.state;
    return (
      <Fragment>
        <ServiceLocation activeBusses={activeBusses} busInfo={busInfo} />
        <Wrapper width="100%" height="80vh" id="map" />
      </Fragment>
    );
  }
}

export default Map;
