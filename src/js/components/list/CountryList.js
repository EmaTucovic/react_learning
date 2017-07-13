import React from "react";

export class CountryList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            result: []
        }
    }
    componentWillMount(){
        var url = ` http://services.groupkt.com/state/get/IND/all`;
        fetch(url)
            .then( response => response.json())
            .then( result => this.setState({result : result.RestResponse.result}))
            .catch( e => e);
    }

    render(){
        const {result} = this.state;
        return (
            <ul>
            {result.map( item => 
                <li>
                    <span> {item.capital}</span>
                </li>
            )}
            </ul>
            
        );
    }
}

