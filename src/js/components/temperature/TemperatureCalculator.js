import React from 'react';
import TemperatureInput from './TemperatureInput.js';

const scaleNames = {
    c : "Celsius",
    f : "Fahrenheit"
}

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            temperatureCel : '',
            temperaturefahr : '',
            scale : ''
        }

        this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
        this.convertToCel = this.convertToCel.bind(this);
        this.convertToFarh = this.convertToFarh.bind(this);
        this.tryConvert = this.tryConvert.bind(this);
    }

    handleTemperatureChange(temperature, scale) {
        //this.setState({temperatureCel : temperature, scale});
        if( scale === 'f'){
            let ct =  this.tryConvert(temperature, this.convertToCel);
            this.setState({
                temperatureCel : ct,
                temperaturefahr: temperature,
                scale
            });
            
        } else {
            let ft = this.tryConvert(temperature, this.convertToFarh);
            this.setState({
                temperatureCel : temperature,
                temperaturefahr: ft,
                scale
            })
        }
    }

    convertToCel(temperature){
        return (temperature - 32) * 5 / 9;
    }

    convertToFarh(temperature){
         return (temperature * 9 / 5) + 32;
    }

    tryConvert(temperature, convert){
        const input = parseFloat(temperature);
        if(Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
    
    render() {

        const {temperatureCel, temperaturefahr, scale} = this.state;

        return (
            <div>  
                <TemperatureInput
                    scale = {'c'}
                    temperature = {temperatureCel}
                    onTemperatureChange = {this.handleTemperatureChange}
                />
                <TemperatureInput
                    scale = {'f'}
                    temperature = {temperaturefahr}
                    onTemperatureChange = {this.handleTemperatureChange}
                />
                
            </div>
        );
    }
}