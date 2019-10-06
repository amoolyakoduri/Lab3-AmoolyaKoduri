import React from 'react';
import OrdersContainer from './OrdersContainer';
import JumbotronHome from './JumbotronHome';
import RestaurantContainer from './RestaurantContainer';
import isBuyer from './isBuyer';
import loginCheck from './LoginCheck'
import { connect } from 'react-redux';
import { onGetPastOrdersFailure, onGetUpcomingOrdersFailure, onGetUpcomingOrdersSuccess, onGetPastOrdersSuccess, onGetRestaurantsSuccess } from './../actions/actions'



class BuyerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pastOrders: [],
            restaurants: [],
            upcomingOrders: []
        }
    }

    componentDidMount() {
        fetch('/api/pastOrders/' + this.props.emailId, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            if (myJson.payload == null) {
                console.log("Couldnt fetch past orders");
                this.props.getPastOrdersFailureDispatch();
            } else {
                this.props.getPastOrdersSuccessDispatch(myJson.payload);
            }
        })
        fetch('/api/getRestaurants', {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            console.log("myJson is ", myJson)
            this.props.getRestaurantsSuccessDispatch(myJson);
        })
        fetch('/api/upcomingOrders/' + this.props.emailId, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            if (myJson.payload == null) {
                console.log("Couldnt fetch past orders");
                this.props.getUpcomingOrdersFailureDispatch();
            } else {
                this.props.getUpcomingOrdersSuccessDispatch(myJson.payload);
            }
        })
    }

    render() {
        return <div >
            <JumbotronHome />
            <div className="container">
                <h1 style={{ textAlign: "center", color: "black" }}>Your Upcoming Orders</h1>
            </div>
            {this.props.upcomingOrders &&
                <OrdersContainer orders={this.props.upcomingOrders} display="card" />
            }
            <div className="container">
                <h1 style={{ textAlign: "center", color: "black" }}>Your Past Orders</h1>
            </div>
            {this.props.pastOrders &&
                <OrdersContainer orders={this.props.pastOrders} display="card" />
            }{this.props.restaurants &&
                <RestaurantContainer restaurants={this.props.restaurants} display="cards" />}
        </div>
    }
}

const mapStateToProps = (state) => {
    const { pastOrders, emailId, restaurants, upcomingOrders } = state;
    return { pastOrders, emailId, restaurants, upcomingOrders };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPastOrdersSuccessDispatch: (payload) => { dispatch(onGetPastOrdersSuccess(payload)) },
        getPastOrdersFailureDispatch: () => { dispatch(onGetPastOrdersFailure()) },
        getRestaurantsSuccessDispatch: (restaurants) => { dispatch(onGetRestaurantsSuccess(restaurants)) },
        getUpcomingOrdersSuccessDispatch: (payload) => { dispatch(onGetUpcomingOrdersSuccess(payload)) },
        getUpcomingOrdersFailureDispatch: () => { dispatch(onGetUpcomingOrdersFailure()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(loginCheck(isBuyer(BuyerHome)));