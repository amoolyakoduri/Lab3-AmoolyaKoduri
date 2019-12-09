import React from 'react';
import JumbotronHome from './JumbotronHome';
import isBuyer from './isBuyer';
import RestoCard from './RestoCard';
import loginCheck from './LoginCheck'
import ls from 'local-storage';
import ReactPaginate from 'react-paginate';
import './../css/pagination.css';
import {baseUrl} from './../config/urlConfig';
import { graphql, Query } from 'react-apollo';
import { getUserDetails} from './../queries/queries';
import { gql } from 'apollo-boost';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
class BuyerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pastOrders: [],
            restaurants: [],
            upcomingOrders: [],
            offset: 0,
            data: [],
            elements: [],
            perPage: 5,
            currentPage: 0,
        }
    }

    setElementsForCurrentPage() {
        let elements = this.state.data
            .slice(this.state.offset, this.state.offset + this.state.perPage)
            .map(rest =>
                (<div><RestoCard details={rest} /><hr /></div>)
            );
        this.setState({ elements: elements });
    }

    componentDidMount() {
        var jwtToken = ls.get('jwtToken').substring(3);
        fetch(baseUrl+'/api/user/getRestaurants', {
            method: 'GET',
            headers: { "Authorization": `Bearer ${jwtToken}` },
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            console.log("myJson is ", myJson)
            this.setState({
                data: myJson.payload,
                pageCount: Math.ceil(myJson.payload.length / this.state.perPage)
            }, () => this.setElementsForCurrentPage());
            ls.set("restaurants",myJson.payload);
        })
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }

    render() {
        console.log(this.props);
        let paginationElement;
        if (this.state.pageCount > 1) {
            paginationElement = (
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"span"}
                    previousLinkClassName={"previous_page"}
                    nextLinkClassName={"next_page"}
                    activeClassName={"span.active"}
                />
            );
        }
        return <div style={{ textAlign: "center" }}>
            <JumbotronHome />
            {this.state.data &&
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{paginationElement}</div>
                    <div style={{ border: "#d0dcdc", width: "fit-content", textAlign: "center", position: "absolute", left: "40%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        {this.state.elements}
                    </div >
                </div>
            }
        </div>
    }
}

export default graphql(getUserDetails)(loginCheck(isBuyer(BuyerHome)));