import React from 'react';
import RestaurantContainer from './RestaurantContainer';


class SearchContent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div style={{ color: "black" }}>
            {this.props.searchList ?
                <RestaurantContainer restaurants={this.props.searchList} display="tuple" /> :
                <RestaurantContainer restaurants={this.props.restaurants} display="tuple" />
            }
        </div>
    }
}


export default SearchContent;