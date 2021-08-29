import React from "react";
import Content from "./Content";
import Header from "./Header";

import styled from "styled-components";
import Navigation from "./Navigation";

class Dashboard extends React.Component {
  render() {
    return (
      <Background>
        {/* <Navigation/> */}
        <Header />
        <Content />
      </Background>
    );
  }
}

export default Dashboard;

const Background = styled.div`
  background-color: #111826;
  overflow: hidden;
`;
