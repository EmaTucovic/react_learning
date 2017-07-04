import React from "react";
import list from "./constants.js";
import {Search} from "./Search";
import {Button} from "./Button";


//Define higher order function (takes f as par and/or returns funnction as par) 
function isSearched(searchTerm){
	console.log("search");
	//return function that will return boolean based on cond
	return function(item){
		console.log(item);
		console.log(!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()));
		return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}

export class List extends React.Component {

	constructor(){
		super();

		this.state = {
			list: list,
			searchTerm : ""
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	//About events:
	//onDismiss() method in the onClick function gets enclosed by another function.
	//Only that way you can sneak in the objectID property. Otherwise you would have to define the function outside.

	onDismiss(id){
		console.log("on dismiss");
		//create new array that has no id
		const updatedList = this.state.list.filter( (item) => item.objectID !== id);
		this.setState( { list: updatedList } );

	}

	onSearchChange(event){
		this.setState({
			searchTerm : event.target.value
		});
  	}

	// Form elements such as <input>, <textarea> and <select> hold their own state. 
	// They modify the value internally once someone changes it from the outside. 
	// In React that's called an uncontrolled component, because it handles its own state. 
	// In React you should make sure to make those elements controlled components.
	//You only have to set the value attribute of the input field
	//The value is allready set on some state property

	render(){
		//Destructuring
		const { list, searchTerm} = this.state; 
		//Here each item from array, we transform in REACT element
		//Key should be specified inside the array
		//Keys must be uniqe among the sibiling
		//Keys are not passed as props to my component, same value pass in different vay if you need it
		return(
		<div>
			<Search  value = {searchTerm} onChange = {this.onSearchChange} />
			<ol>
			{list.filter(isSearched(searchTerm)).map( (item)=>
				<li key = {item.objectID}>
					<span>
					<a href={item.url}>{item.title}</a>
				</span>
				<span>{item.author}</span>
				<span>{item.num_comments}</span>
				<span>{item.points}</span>
				<Button onClick = {()=> this.onDismiss(item.objectID)} > Dismiss </Button>
				</li>)
			}
			</ol>
		</div>
		);
	}
}


//Just example
export function ListNumbers (props){

	const numbers = props.numbers;
	//create an array of react elements
	const listElements = numbers.map( (number) =>
		<li key = {number.toString()} > {number} </li>
		);

	return (
		<ul> {listElements} </ul>
		);
}



//Now you can say in some other module :
// const numbers = [1,2,3,4,5];
//ReactDOM.render(<ListNumbers numbers = {numbers} /> , document.getElementById('root'));