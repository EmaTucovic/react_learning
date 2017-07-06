import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import {List} from "./List";
import {CountryList} from "./CountryList";

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
        <Header title = "Capitals"/> 
        <CountryList />
      </div>
    );
  }

}
