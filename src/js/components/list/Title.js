 import React from "react";

// tateless functional dumb component
//Get an input (props) and return an output (component instance)
//do not have lifecycle methods (constructor, render,...)

//Use this when you do not need internal comp state 
//Start with this dump component

export default function Title (props) {
    return (
      <h1>{props.title}</h1>
    );
}
