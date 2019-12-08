import React from 'react';
import { onAddToCartSuccess } from './../actions/actions';
import { connect } from 'react-redux';
import ItemDetails from './ItemDetails';
import { baseUrl} from './../config/urlConfig'

class SectionView extends React.Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            quantity: 1
        };
        this.addToCart = this.addToCart.bind(this);
    }

    resetQuantity = () => {
        this.setState({ quantity: 1 });
    }

    addToCart(itemId, quantity, price, name) {
        let payload = {
            quantity: quantity,
            price: price,
            name: name
        }
        this.props.addToCartSuccessDispatch(payload);
        this.setState(prevState => ({
            modal: !prevState.modal,
            quantity: 1
        }));
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            quantity: 1
        }));
    }

    render() {
        return <div >
            <h4>{this.props.details.name}</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {this.props.details.menu &&
                    this.props.details.menu.map(item => {
                        return (
                            <ItemDetails details={item} addToCart={this.addToCart} />
                        )
                    })}
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCartSuccessDispatch: (payload) => { dispatch(onAddToCartSuccess(payload)) }
    }
}

export default connect(null, mapDispatchToProps)(SectionView);