import React from 'react';
import TemperatureInput from './TemperatureInput.js';

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            temperature : ''
        }

        this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
    }

    handleTemperatureChange(temperature) {
        this.setState({temperature});
        //console.log("the state is ", this.state);
    }
    
    render() {

        const {temperature} = this.state;
        return (
            <div>
                <TemperatureInput
                    temperature = {temperature}
                    onTemperatureChange = {this.handleTemperatureChange}
                />
                <div>
                    <p> The state in Calculator function has temperature set to: {temperature} </p> 
                </div>
            </div>
        );
    }
}