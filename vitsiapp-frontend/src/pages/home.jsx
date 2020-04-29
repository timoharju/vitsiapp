import React, { Component } from "react";
import axios from "axios";

import VitsiBox from "../components/VitsiBox";
import VitsiForm from "../components/VitsiForm";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";



class home extends Component {
  state = {
    vitsit: null,
  };

  componentDidMount() {
    axios
      .get("https://europe-west1-vitsi-app-80584.cloudfunctions.net/api/vitsit")
      .then((res) => {
        console.log(res.data);
        this.setState({
          vitsit: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentVitsitMarkup = this.state.vitsit ? (
      this.state.vitsit.map(vitsi => (
        <p>
          <VitsiBox vitsi={vitsi} />
        </p>
      ))
    ) : (
      <div id="data">
        <p>Lataa..</p>
      </div>
    );

    return (
      <Grid container spacing={16}>
        <Grid style={{maxHeight: 600, overflow: 'auto'}} item sm={4} xs={6}>
          <Typography variant="body1"></Typography>{recentVitsitMarkup}
        </Grid>
        <VitsiForm></VitsiForm>
      </Grid>
      
      
    );
  }
}

export default home;
