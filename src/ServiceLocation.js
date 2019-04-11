import React, { Component } from "react";
import styled from "styled-components";

const Header = styled.div`
  margin-top: 0px;
  font-weight: bold;
  color: navy;
`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function latestBusLocations() {
  try {
    let response = await fetch(
      "https://cors.io/?https://www.metlink.org.nz/api/v1/ServiceLocation/3"
    );
    let data = await response.json();
    let services = data.Services;
    await sleep(1000);
    response = await fetch(
      "https://cors.io/?https://www.metlink.org.nz/api/v1/ServiceLocation/27"
    );
    data = await response.json();
    let services2 = data.Services;
    for (var i = 0; i < services2.length; i++) {
      services.push(services2[i]);
    }
    const serviceDetails = services.map(service => [
      +service.Lat,
      +service.Long,
      +service.DelaySeconds,
      +service.ServiceID,
      service.Direction,
      service.DestinationStopName
    ]);
    return serviceDetails;
  } catch (error) {
    return "An error occured.";
  }
}

export default class ServiceLocation extends Component {
  render() {
    let { activeBusses, busInfo } = this.props;
    return (
      <div>
        <Header>{`${activeBusses} active busses as of ${new Date().toLocaleString()}`}</Header>
        {/* <pre>{JSON.stringify(busInfo, null, 2)}</pre> */}
      </div>
    );
  }
}
