import React from 'react';
import { Table, Button, Collapse, CardBody, Card, FormGroup, Input } from 'reactstrap';
import isOwner from './isOwner';
import loginCheck from './LoginCheck';
import OrderItems from './OrderItems';
import ls from 'local-storage';
import { baseUrl } from './../config/urlConfig';

const orderStatus = [
    { name: "New" },
    { name: "Preparing" },
    { name: "Ready" },
    { name: "Delivered" },
    { name: "Cancelled" }
]


class OwnerHome extends React.Component {

    constructor() {
        super();
        this.state = {
            status: "",

        }
        this.menu = this.menu.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    menu(event) {
        event.preventDefault();
        this.props.history.push("/menu");
    }

    componentDidMount() {
        var jwtToken = ls.get('jwtToken').substring(3);
        fetch(baseUrl+'/api/rest/getRestDetails/' + this.props.emailId, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${jwtToken}` }
        })
            .then((response) => {
                return response.json();
            }).then((myJson) => {
                if (myJson.success == false) {
                } else {
                }
            }).then(() => {
                fetch( baseUrl+'/api/rest/getOrders/' + this.props.restDetails.name, {
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${jwtToken}` }
                })
                    .then((response) => {
                        return response.json();
                    }).then((myJson) => {
                        if (myJson.success == false) {
                        } else {
                        }
                    })
            }).then(() => {
                fetch( baseUrl+'/api/rest/getPastOrders/' + this.props.restDetails.name, {
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${jwtToken}` }
                })
                    .then((response) => {
                        return response.json();
                    }).then((myJson) => {
                        if (myJson.success == false) {
                        } else {
                        }
                    })
            })
    }

    changeHandler = (orderId, event) => {
        var jwtToken = ls.get('jwtToken').substring(3);
        var status = event.target.value;
        this.setState({ status: event.target.value })
        fetch( baseUrl+'/api/rest/updateOrder', {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                orderId: orderId,
                status: event.target.value
            })
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            if (myJson.success == false){}
            else {
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    render() {
        return <div className="container" style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <Button onClick={this.menu}>Go To Menu</Button>
            </div>
            <h4>
                Current Orders:
            </h4>{
                this.props.orders &&
                <Table>
                    <thead>
                        <tr>
                            <th>OrderId</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Bill</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.orders.map(order => {
                                var index = orderStatus.findIndex(s => s.name === order.status)
                                return (<tr>
                                    <td><Button color="white" onClick={this.toggle}>{order._id}</Button></td>
                                    <td>{order.name}</td>
                                    <td>{order.address}</td>
                                    <td>{order.amt}</td>
                                    <td>
                                        <FormGroup>
                                            <Input type="select" onChange={(event) => this.changeHandler(order._id, event)} name="status" id="status">
                                                {
                                                    orderStatus.map((o, i) => {
                                                        if (i < index)
                                                            return <option disabled value={o.name} name={o.name} >{o.name}</option>
                                                        else
                                                            return <option value={o.name} name={o.name} >{o.name}</option>
                                                    }
                                                    )
                                                }
                                            </Input>

                                        </FormGroup>
                                    </td>
                                    <Collapse isOpen={this.state.collapse}>
                                        <OrderItems order={order} />
                                    </Collapse>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            }
            <h4>
                Past Orders:
            </h4>
            {this.props.pastOrders &&
                <Table>
                    <thead>
                        <tr>
                            <th>OrderId</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Bill</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.pastOrders.map(order => {
                                return (<tr>
                                    <td><Button color="white" onClick={this.toggle}>{order._id}</Button></td>
                                    <td>{order.name}</td>
                                    <td>{order.address}</td>
                                    <td>{order.amt}</td>
                                    <td>
                                        {order.status}
                                    </td>
                                    <Collapse isOpen={this.state.collapse}>
                                        <OrderItems order={order} />
                                    </Collapse>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            }
        </div>
    }
}

export default loginCheck(isOwner(OwnerHome));