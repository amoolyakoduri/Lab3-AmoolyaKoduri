import React from 'react';
import SectionView from './SectionView';
import isBuyer from './isBuyer';
import loginCheck from './LoginCheck';
import ls from 'local-storage';

class PlaceOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let restDetails = ls.get("currentRest");
        console.log("restDetails",restDetails)
        return <div style={{ display: "flex", flexDirection: "row" }}>
            <div class="container" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                        <img width="200px" src={"/" + restDetails.displayPic} />
                    </div>
                    <h3>{restDetails && restDetails.name}</h3>
                </div>
                {restDetails && restDetails.sections &&
                    restDetails.sections.map(section => {
                        return section.menu.length != 0 ? <SectionView details={section} /> : null
                    })
                }
            </div>
        </div>
    }
}


export default loginCheck(isBuyer(PlaceOrder));