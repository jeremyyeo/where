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

const mapProvider =
  "https://api.mapbox.com/styles/v1/jeremyyeo/cjudgff9y1ns31fqd2oq29ark/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamVyZW15eWVvIiwiYSI6ImNqdWRnNmNqaTBrbWM0MHBhN2szMHpiOGsifQ.vVwACv-KjPDdi5Bo7GrjKA";
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

    L.tileLayer(mapProvider, {
      detectRetina: true,
      maxZoom: 19
    }).addTo(this.map);

    L.marker([lat, long])
      .addTo(this.map)
      .bindTooltip("Wellington");
  }

  updateState(busInfo) {
    this.setState();
  }

  componentDidMount() {
    let { lat, long } = this.state.location;
    this.resetMap(lat, long);
    let markings = 0;
    this.markingsGroup = L.featureGroup();

    setInterval(async () => {
      if (this.map.hasLayer(this.markingsGroup) && markings > 1000) {
        this.map.removeLayer(this.markingsGroup);
        this.markingsGroup.clearLayers();
        markings = 0;
      }
      let allBusses = await latestBusLocations();
      try {
        this.setState({ activeBusses: allBusses.length, busInfo: allBusses });
        for (var i = 0; i < allBusses.length; i++) {
          let busDelayMins = allBusses[i].delaySeconds / 60;
          let busDelayString;
          // prettier-ignore
          if (busDelayMins > 0) {
            busDelayString = `${busDelayMins.toFixed(2)} mins ahead of schedule`;
          } else if (busDelayMins < 0) {
            busDelayString = `${Math.abs( busDelayMins.toFixed(2))} mins behind schedule`;
          } else {
            busDelayString = "on time";
          }

          L.circle(allBusses[i].latLong, {
            color: busDelayMins >= 0 ? "green" : "red",
            radius: 25
          })
            .bindTooltip(
              `Bus ${allBusses[i].serviceID} (${
                allBusses[i].vehicleRef
              }) is ${busDelayString} <br/> heading ${
                allBusses[i].direction
              } to ${allBusses[i].destination}.`
            )
            .addTo(this.markingsGroup);
          markings += 1;
        }
      } catch (error) {}
      this.map.addLayer(this.markingsGroup);
    }, 5000);
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
