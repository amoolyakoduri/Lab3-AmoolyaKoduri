import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import Login from './Login';
import BuyerHome from './BuyerHome';
import Search from './Search';
import Account from './Account';
import Profile from './Profile';
import SignUpOwner from './SignUpOwner';
import SignUp from './SignUp';
import OwnerHome from './OwnerHome';
import OwnerMenu from './OwnerMenu';
import DraggableOrders from './DraggableOrders';
import { isLoggedIn } from '../helpers';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { baseUrl } from './../config/urlConfig';
import PlaceOrder from './PlaceOrder';

class Main extends React.Component {

    componentDidMount() {
        if (isLoggedIn()) {
            fetch(baseUrl+'/api/getUserDetailsFromSession')
                .then(res => res.json())
                .then(res => {
                })
                .catch(e => { })
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Route path="/" component={CustomNavbar} />
                    <Route path="/login" component={Login} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/signUpOwner" component={SignUpOwner} />
                    <Route path="/lets-eat" component={BuyerHome} />
                    <Route path="/search" component={Search} />
                    <Route path="/account" component={Account} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/home" component={OwnerHome} />
                    <Route path="/menu" component={OwnerMenu} />
                    <Route path="/placeOrder" component={PlaceOrder}/>
                    <Route path="/upcomingOrders" render={() => <DndProvider backend={HTML5Backend}>
                        <DraggableOrders />
                    </DndProvider>} />
                </Router>
            </div>
        )
    }
}

export default Main;