import React from 'react';
import {
  Card, CardBody,
  CardTitle, Button, FormGroup
} from 'reactstrap';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { baseUrl } from './../config/urlConfig';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { signUpMutation} from './../mutations/mutations'

var md5 = require('md5');


class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      emailId: null,
      password: null,
      firstName: null,
      lastName: null,
      userType: null,
      address: null,
      phone: null
    }
    this.signUp = this.signUp.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeRadioHandler = this.changeRadioHandler.bind(this);
  }

  submitForm(e){
    e.preventDefault()
    console.log(this.state);
    this.props.signUpMutation({
        variables: {
          emailId: this.state.emailId,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userType: this.state.userType,
          address: this.state.address,
          phone: this.state.phone,
        },
        //refetchQueries: [{ query: getBooksQuery }]
    });

}

  signUp(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('emailId', this.state.emailId);
    data.append('password', this.state.password);
    data.append('firstName', this.state.firstName);
    data.append('lastName', this.state.lastName);
    data.append('userType', this.state.userType);
    data.append('address', this.state.address);
    data.append('phone', this.state.phone);

    fetch(baseUrl+'/api/auth/signUp', {
      method: 'POST',
      body: data
    })
      .then((response) => {
        console.log(response)
        return response.json();
      }).then((jsonRes) => {
        console.log("jsonRes is: ", jsonRes);
        if (jsonRes.success == false) {
          console.log("Couldnt signUp");
        } else {
          console.log(" Registered ! ", jsonRes);
          if (this.state.userType === "buyer")
            this.props.history.push("/login");
          else {
            var payload = {
              emailId: this.state.emailId,
              userType: this.state.userType
            }
            this.props.history.push('/signUpOwner');
          }
        }
      })
  }

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
  }

  changeHandler(event) {
    console.log(event.target.value);
    let key = event.target.name;
    let value = event.target.value;
    console.log("key is ", key);
    this.setState({ [key]: value });
    console.log("state is ", this.state);
  }

  changeRadioHandler(event) {
    let value = event.target.value;
    console.log("value is ", value);
    this.setState({ userType: value });
  }


  handlePasswordChange = (event) => {
    var pword = md5(event.target.value);
    this.setState({ password: pword });
  }


  render() {
    return <div className="container">
      <Card>
        <CardBody>
          <CardTitle><h3>Sign up for Grubhub account!</h3></CardTitle>
          <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.signUp}>
            <FormGroup>
              <AvField type="text" label="First Name:" name="firstName" id="firstName" onChange={this.changeHandler} placeholder="name" required />
            </FormGroup>
            <FormGroup>
              <AvField type="text" name="lastName" label="Last Name:" id="lastName" onChange={this.changeHandler} placeholder="name" required />
            </FormGroup>
            <FormGroup>
              <AvField type="email" name="emailId" id="emailId" label="Email:" onChange={this.changeHandler} placeholder="email" required />
            </FormGroup>
            <FormGroup>
              <AvField type="password" name="password" id="password" label="Password:" onChange={this.handlePasswordChange} placeholder="password" required />
            </FormGroup>
            <FormGroup>
              <AvField type="phone" name="phone" id="phone" label="Phone:" onChange={this.changeHandler} placeholder="phone" required />
            </FormGroup>
            <FormGroup>
              <AvField type="address" name="address" id="address" label="Address:" onChange={this.changeHandler} placeholder="address" required />
            </FormGroup>
            <AvRadioGroup inline name="userType" label="Account type" required>
              <AvRadio label="Buyer" value="buyer" name="userType" id="buyer" onChange={this.changeRadioHandler} />
              <AvRadio label="Owner" value="owner" name="userType" id="owner" onChange={this.changeRadioHandler} />
            </AvRadioGroup>
            <Button type="submit" >Submit</Button>
          </AvForm>
        </CardBody>
      </Card>
    </div>
  }
}


export default compose(
  graphql(signUpMutation, { name: "signUpMutation" })
)(SignUp);