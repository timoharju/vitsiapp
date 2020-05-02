import React, { Component } from "react";
import axios from "axios";

//Material-ui
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Grid";

export class VitsiBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      fetchIsLoading: false,
      voteIsLoading: false,
      count: 0,
    };
    this.fetchclick = this.fetchclick.bind(this);
    this.voteclick = this.voteclick.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://europe-west1-vitsi-app-80584.cloudfunctions.net/api/vitsit/random"
      )
      .then((res) => {
        this.setState({
          data: res.data,
          fetchIsLoading: false,
          voteIsLoading: false,
        });
      })
      .catch((err) => console.log(err));
  }
  voteclick() {
    axios
      .get(
        `https://europe-west1-vitsi-app-80584.cloudfunctions.net/api/vitsit/${this.state.data.vitsiId}/vote`,
        {}
      )
      .then(() => {
        this.setState({ voteIsLoading: true, count: this.state.count + 1 });
      })

      .catch((err) => console.log(err));

    alert("Peukutit vitsiä");
  }

  fetchclick() {
    this.setState({ fetchIsLoading: true });
    axios
      .get(
        "https://europe-west1-vitsi-app-80584.cloudfunctions.net/api/vitsit/random",
        {}
      )
      .then((response) => {
        this.setState({
          data: response.data,
          fetchIsLoading: false,
          voteIsLoading: false,
          count: 0,
        });
      })
      .catch((err) => {
        this.setState({
          data: err,
          fetchIsLoading: false,
          voteIsLoading: false,
        });
      });
  }

  render() {
    return (
      <Container classname="BC-container">
        <Button
          color="primary"
          onClick={this.voteclick}
          disabled={this.state.voteIsLoading}
        >
          Peukuta 👍
        </Button>
        <Button
          color="secondary"
          onClick={this.fetchclick}
          disabled={this.state.fetchIsLoading}
        >
          Uusi vitsi🔁
        </Button>
        <Typography>{this.state.data.body}</Typography>
        <Typography>
          {this.state.data.voteCount + this.state.count} 👍
        </Typography>
      </Container>
    );
  }
}

export default VitsiBox;
