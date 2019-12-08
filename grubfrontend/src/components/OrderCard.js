import React from 'react';
import {
  Card, CardText, CardBody, CardImg,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './../css/Order.css';
import { withRouter } from 'react-router-dom';
import '../css/OrderCard.css'
import ls from 'local-storage';
import { baseUrl } from './../config/urlConfig'


class OrderCard extends React.Component {
  constructor() {
    super();
  }

  goToChat = (details) => {
    this.props.history.push({
      pathname: '/chat/',
    })
  }

  repeatOrder = (event) => {
    event.preventDefault();
    var jwtToken = ls.get('jwtToken').substring(3);
    fetch(baseUrl+'/api/user/getRestDetailsByRestName/' + this.props.details.restName,{
      method: 'GET',
      headers: {"Authorization" : `Bearer ${jwtToken}`}})
      .then((response) => {
        return response.json();
      }).then((myJson) => {
        if (myJson.success == false){}
        else 
{}
      })
    this.props.history.push("/cart");
  }



  render() {
    var details = this.props.details;
    return (<Card >
      <CardImg style={{width: '250px'}}  src={'/'+details.restPic} alt="Card image cap" />
      <CardBody>
        <CardTitle>{details.restName}</CardTitle>
        <CardSubtitle>Amount: {details.amt}</CardSubtitle>
        Order Status : {details.status}
        <Button onClick={this.repeatOrder}>Repeat Order</Button>
        <Button onClick={()=>{this.goToChat(details)}}>Chat!</Button>
      </CardBody>
    </Card>)
  }
}



export default withRouter(OrderCard);