import React from 'react';
import Details from './Details';
import RestaurantDetails from './RestaurantDetails';
import loginCheck from './LoginCheck';

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return <div class="container" style={{ border: "black" }}>
            <div>
                <img width="200px" src={"/" + this.props.displayPic}></img>
            </div>
            <Details />
            {this.props.userType === "owner" &&
                <RestaurantDetails />}
        </div>
    }
}


export default loginCheck(Profile);