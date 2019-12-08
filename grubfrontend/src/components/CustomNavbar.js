import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import pic from './../grub.png'
import { Link } from 'react-router-dom';
import ls from 'local-storage';
import { baseUrl } from './../config/urlConfig';
 
class CustomNavbar extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  login(e) {
    e.preventDefault();
    window.location.href = '/login'
  }

  signUp(e) {
    e.preventDefault();
    window.location.href = "/signUp"
  }

  logout(e) {
    e.preventDefault();
    fetch(baseUrl+'/api/auth/logout')
      .then(res => res.json())
      .then(res => {
        ls.set('isLoggedIn', false);
        ls.clear();
        window.location.href = '/login'
      })

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    console.log("in navbar");
    let nav = null;
    let isLoggedIn = ls.get("isLoggedIn");
    if (isLoggedIn)
      nav = (<div style={{ display: "flex", flexDirection: "row" }}>
        <NavItem>
          <Link style={{ color: "#606369" }} to={this.props.userType === "buyer" ? "/lets-eat" : "/home"}>Home</Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Hi, {ls.get('userDetails').firstName}!
      </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem divider />
            <DropdownItem>
              <Link style={{ color: "#606369" }} to="/account" >Account</Link>
            </DropdownItem>
            <DropdownItem>
              <Button onClick={this.logout} >Log out!</Button>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </div>)
    else
      nav = <div><Button onClick={this.login}>Login</Button> <Button onClick={this.signUp}>SignUp</Button>
      </div>

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to={this.props.userType === "buyer" ? "/lets-eat" : "/home"}><img style={{ height: "50px", width: "85px" }} src={pic} /></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/Home"></NavLink>
              </NavItem>
              {nav}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default CustomNavbar;