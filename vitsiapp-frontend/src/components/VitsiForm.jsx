import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//MaterialUI
import Grid from "@material-ui/core/Grid";
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
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <Grid container className="vF-container">
        <Grid item sm>
          <Typography variant="body1">
            Tähän voit kirjoittaa oman vitsisi. Vitsisi saa olla enintään 160
            kirjainmerkin pituinen.:
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              multiline
              rows={2}
              rowsMax={4}
              id="body"
              name="body"
              type="body"
              label="Kirjoita vitsisi tähän"
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
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
VitsiForm.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default VitsiForm;
