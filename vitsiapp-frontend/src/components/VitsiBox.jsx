import React, { Component } from "react";

import relativeTime from "dayjs/plugin/relativeTime"
//@ts-ignore
import dayjs from "dayjs";


//Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export class vitsiBox extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      vitsi: { body, voteCount, createdAt },
    } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">{body}</Typography>
          <Typography variant="h7">{voteCount} Tykkäystä</Typography>
          <Typography variant="body1">{dayjs(createdAt).fromNow()}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default vitsiBox;
