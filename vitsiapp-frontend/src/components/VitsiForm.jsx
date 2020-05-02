import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//MaterialUI
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class VitsiForm extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const vitsiData = {
      body: this.state.body,
    };
    axios
      .post(
        "https://europe-west1-vitsi-app-80584.cloudfunctions.net/api/vitsit",
        vitsiData
      )
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });

    alert("Vitsi lähetetty");
    this.setState({
      body: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <Container className="VF-container">
        <Typography variant="body1">
          Tähän voit kirjoittaa oman vitsisi. Vitsisi saa olla enintään 160
          kirjainmerkin pituinen.
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
          inputProps={{
            maxLength: 160,
          }}
            maxLength="2"
            multiline
            rows={2}
            rowsMax={4}
            id="body"
            name="body"
            type="body"
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="buttonF"
          >
            Lähetä
          </Button>
        </form>
      </Container>
    );
  }
}
VitsiForm.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default VitsiForm;
