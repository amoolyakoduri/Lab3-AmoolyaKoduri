import React from 'react';
import { Button } from 'reactstrap';
import './../css/Filters.css'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import isBuyer from './isBuyer';
import loginCheck from './LoginCheck'
import ls from 'local-storage';
import { baseUrl } from './../config/urlConfig'

class Filters extends React.Component {

  constructor() {
    super();
    this.state = {
      restaurant: "",
      item: "",
      cuisine: "",
      error: null
    }
  };

  changeHandler = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    this.setState({
      [key]: value
    }
    )
  }

  getResults = () => {
    var jwtToken = ls.get('jwtToken').substring(3);
    if (this.state.restaurant === "" && this.state.item === "" && this.state.cuisine === "") {
      this.setState({
        error: "Add filters please."
      })
      return null;
    } else {
      fetch(baseUrl+'/api/user/search', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer${jwtToken}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.restaurant,
          item: this.state.item,
          cuisine: this.state.cuisine
        })
      }).then((response) => {
        return response.json();
      }).then((myJson) => {
        if (myJson.success == false) {
        } else {
        }
      })
    }
  }


  handleInvalidSubmit = (event, errors, values) => {
    this.setState({
      email: values.email, error: true
    })
  }

  render() {
    return <div style={{ width: "300px", backgroundColor: "#fafafa", height: "100%", display: "flex", flexDirection: "column" }}>
      <h4 className="filterTitle">Filters</h4><a href="#" >Clear all!</a>
      <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
        <AvField type="text" label="Search for a restaurant:" name="restaurant" id="restaurant" onChange={this.changeHandler} placeholder="" />
        <AvField type="text" label="Search for an item:" name="item" id="item" onChange={this.changeHandler} placeholder="" />
        <AvField type="text" label="Search for a cuisine:" name="cuisine" id="cuisine" onChange={this.changeHandler} placeholder="" />
        <Button onClick={this.getResults}>Search</Button>
        {this.state.error && <div style={{ color: "red" }}>{this.state.error}</div>}
      </AvForm>
    </div>

  }
}



export default loginCheck(isBuyer(Filters));