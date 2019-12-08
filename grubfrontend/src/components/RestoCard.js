import React from 'react';
import {
  Card, CardText, CardBody, CardImg,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import ls from 'local-storage';

class RestoCard extends React.Component {

  constructor(props) {
    super(props);
    this.placeOrder = this.placeOrder.bind(this);
  }

  placeOrder(details,event) {
    event.preventDefault();
    ls.set("currentRest",details);
    this.props.history.push("/placeOrder");
  }

  render() {
    var details = this.props.details;
    return <Card>
      <CardImg style={{ width: "250px" }} src={'/' + details.displayPic} alt="Card image cap" />
      <CardBody>
        <CardTitle>{details.name}</CardTitle>
        <CardSubtitle>{details.cuisine}</CardSubtitle>
        <CardText>{details.address}</CardText>
        <Button onClick={(event) => this.placeOrder(details,event)}>Order!</Button>
      </CardBody>
    </Card>
  }
}

export default withRouter(RestoCard);