import React from 'react';
import { isBuyer, isLoggedIn } from './../helpers/index';
import Unauthorized from './Unauthorized';
import ls from 'local-storage';

const isBuyerComponent = (WrappedComponent) => {
    class WrappedComponentFromBuyer extends React.Component {
        render() {
            const { props } = this;
            return isLoggedIn() && isBuyer(ls.get("userDetails").userType) ? <WrappedComponent {...props} /> : <Unauthorized />
        };
    }
    return WrappedComponentFromBuyer;
}

export default isBuyerComponent;
