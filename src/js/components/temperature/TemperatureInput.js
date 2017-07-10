import React from 'react';
//import Calculator from './TemperatureCalculator.js';

export default function TemperatureInput(props) {

    return (
        <fieldset>
            <legend> Enter temperature </legend>
            <input
                value = {props.temperature}
                onChange = { (e) => props.onTemperatureChange( e.target.value)}
            />
        </fieldset>
    );
}