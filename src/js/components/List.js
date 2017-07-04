import React from "react";
import list from "./constants.js";
import {Search} from "./Search";
import {Button} from "./Button";


//url constants for API request
const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


//Define higher order function (takes f as par and/or returns funnction as par) 
function isSearched(searchTerm){
	console.log("search");
	//return function that will return boolean based on cond
	return function(item){
		//console.log(item);
		//console.log(!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()));
		return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}

export class List extends React.Component {

	constructor(){
		super();

		this.state = {
			list: list,
			searchTerm : DEFAULT_QUERY,
			result: null
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
		this.setSearchTopstories = this.setSearchTopstories.bind(this);
	}

	//About events:
	//onDismiss() method in the onClick function gets enclosed by another function.
	//Only that way you can sneak in the objectID property. Otherwise you would have to define the function outside.

	onDismiss(id){
		console.log("on dismiss");
		console.log(this.state.result);
		//Now the response is complex object with one property hits that is of interest!
		// we never mutate the state like this :
		//this.state.result.hits = updatedList;
		//We create new obj like this:
		const updatedHits = this.state.result.hits.filter( (item) => item.objectID !== id );
		console.log(updatedHits);
		this.setState ( {
			//result : Object.assign( {}, this.state.result, {hits: updatedHits})
			result : {...this.state.result, hits : updatedHits}
		});
		console.log(this.state.result);
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
		const { searchTerm , result} = this.state; 
		//console.log(result); //Result is an object with property hits that is array of interest
		
		//Key should be specified inside the array
		//Keys must be uniqe among the sibiling
		//Keys are not passed as props to my component, same value pass in different vay if you need it
		return(
		<div>
			<Search  value = {searchTerm} onChange = {this.onSearchChange} />
			<ol>
			{result 
				? result.hits.filter(isSearched(searchTerm)).map( (item)=>
					<li key = {item.objectID}>
						<span>
						<a href={item.url}>{item.title}</a>
					</span>
					<span>{item.author}</span>
					<span>{item.num_comments}</span>
					<span>{item.points}</span>
					<Button onClick = {()=> this.onDismiss(item.objectID)} > Dismiss </Button>
					</li>) 
				: null
			}
			</ol>
		</div>
		);
	}

	componentDidMount(){
		const {searchTerm} = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	fetchSearchTopStories(searchTerm) {
		//native React fetch API function
		// It returns a promise and default is GET request
		// The response needs to get transformed to json, that's a mandatory step in a native fetch,
		// and can finally be set in the internal component state.
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
			.then( response => response.json())
			.then( result => this.setSearchTopstories(result))
			.catch( e => e);
	}

	setSearchTopstories(topstories) {
		this.setState( {result : topstories});
	}
}


