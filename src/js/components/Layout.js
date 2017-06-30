import React from "react";

import Footer from "./Footer";
import Header from "./Header";

import list from "./constants.js"


//You should make sure that the key attribute is a stable identifier



export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      list,
      searcTerm : "",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header changeTitle = {this.changeTitle.bind(this)} title={this.state.title} />

        <div>
        { this.state.list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
        </div>
        

        <Footer />
      </div>
    );
  }


  // constructor(props){
  //   super(props);
  //   this.state = {
  //     list,

  //     searcTerm = ""
  //   };
  //   //Bind class methods
  //   //if you dont bind and call it from some other method it will fail
  //   this.onDismiss = this.onDismiss.bind(this);
  // }

  // //Remove clicked item from list
  // onDismiss(id){
  //   const updatedList = this.state.list.filter( (item) => { return item.objectID !== id;});
  //   //now update the state but remember that this is immutable, so you create brand new
  //   this.state.setState({ list: updatedList });
  // }

  // onSearchChange(e){
  //   const searcTerm = e.target.value;
  //   this.setState({ searchTerm });
  // }

  // render(){
  // //put all in curly brackets when you use map
  // return (
  //   <h1>hi</h1>
  //   <div className = "Layout">
  //     <input 
  //       type ="text"
  //       onChange = {this.onSearchChange.bind(this)}
  //     />

  //     { this.state.list.filter(
  //         //function takes search term
  //         //returns true or false and keeps only true items
  //       )
  //       .map(item => 
  //         <div key = {item.objectID}>
  //           <span>
  //             <a href = {item.url}> {item.title} </a>
  //           </span>
  //           <span>{item.author}</span>
  //           <span>{item.num_comments}</span>
  //           <span>{item.points}</span>
  //           <span>
  //             <button
  //               onClick = { () => this.onDismiss(item.objectID)}
  //               type = "button"
  //               > Dismiss 
  //             </button>
  //           </span>
  //         </div>
  //       )}
  //   </div>
  // );
  // }



}
