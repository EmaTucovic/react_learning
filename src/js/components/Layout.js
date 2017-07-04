import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import list from "./constants.js";
import {List} from "./List";
import {CountryList} from "./CountryList";





//You should make sure that the key attribute is a stable identifier

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Welcome 2",
      list 
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  

  render() {
    const numbers = [1,2,3,4,5];
    const {list, searchTerm} = this.state;
    return (
      <div>
        <Header changeTitle = {this.changeTitle.bind(this)} title={this.state.title} />
        <List />  
        <Header title = "Capitals"/> 
        <CountryList />
      </div>
    );
  }

}
