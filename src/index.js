import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import styled from "styled-components";
import Map from "./Map";

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%
  grid-gap: 10px;
`;

ReactDOM.render(
  <AppWrapper>
    <Map stops="yes" />
  </AppWrapper>,
  document.getElementById("root")
);
