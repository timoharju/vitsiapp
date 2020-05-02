import React, { Component } from "react";

//Component imports
import VitsiBox from "../components/VitsiBox";
import VitsiForm from "../components/VitsiForm";
import Container from "@material-ui/core/Grid";

class home extends Component {
  render() {
    return (
      <Container classname="Home-container">
        <VitsiBox></VitsiBox>
        <VitsiForm></VitsiForm>
      </Container>
    );
  }
}

export default home;
