import React from "react";

//import Footer from "./Footer";
import Header from "./list/Header";
// import {List} from "./list/List";
//import {CountryList} from "./list/CountryList"; // add  <Header title = "Capitals"/> <CountryList/>

//import Calculator from "./temperature/TemperatureCalculator"; //<Calculator />

import List from "./list2/List";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Welcome",
      
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

   render() {
    return (
      <div>
        <Header changeTitle = {this.changeTitle.bind(this)} title={this.state.title} />
        <List />  
      </div>
    );
  }

}
