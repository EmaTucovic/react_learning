import React from "react";
import list from "./constants.js";
import {Search} from "./Search";
import {Button} from "./Button";


//url constants for API request
const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 5;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='; //use this const to add page parameter to API request
const PARAM_HPP = 'hitsPerPage=';


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

		//In order to have a client cache for each result, you have to store multiple results rather than one result in your internal component state.
		// The results object will be a map with the search term as key and the result as value.
		this.state = {
			searchTerm : DEFAULT_QUERY,
			results: null, //[{ hits: [], page : numb}, {...}]
			searchKey: '' // it reflects "searchTerm"
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
		this.setSearchTopstories = this.setSearchTopstories.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
	}

	//About events:
	//onDismiss() method in the onClick function gets enclosed by another function.
	//Only that way you can sneak in the objectID property. Otherwise you would have to define the function outside.

	onDismiss(id){
		const {searchKey, results} = this.state;
		const {hits, page} = results[searchKey];
		//We never mutate state obj, but create new obj like this:
		const updatedHits = hits.filter( (item) => item.objectID !== id );

		this.setState ( {
			//result : Object.assign( {}, this.state.result, {hits: updatedHits})
			results : {
				...results,
				[searchKey]: { hits : updatedHits, page}
			}
		});
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
		const { searchTerm , searchKey, results} = this.state; 
		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = ( results && results[searchKey] && results[searchKey].hits) || [];
		var obj = list.find( (el)=> el.objectID == "11488633");
		//console.log(result); //Result is an object with property hits that is array of interest
		
		//Key should be specified inside the array
		//Keys must be uniqe among the sibiling
		//Keys are not passed as props to my component, same value pass in different vay if you need it
		return(
		<div className = {page}>
			<Search  value = {searchTerm} onChange = {this.onSearchChange}  onSubmit = {this.handleSearchSubmit}>
				Search
			</Search>
			<ol>
			{list.map( (item)=>
					<li >
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
			<Button onClick = {() => this.fetchSearchTopStories(searchKey, page +1)} > 
				More
			</Button>
		</div>
		);
	}
	
	//This is called when an instance of component is created = once; not when state is updated and rerendering happend
	componentDidMount(){
		const {searchTerm} = this.state;
		this.setState({searchKey : searchTerm});
		this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
	}

	fetchSearchTopStories(searchTerm, page) {
		//native React fetch API function
		// It returns a promise and default is GET request
		// The response needs to get transformed to json, that's a mandatory step in a native fetch,
		// and can finally be set in the internal component state.
		console.log("fetchig");
		var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
		console.log(url);
		fetch(url)
			.then( response => response.json())
			.then( result => this.setSearchTopstories(result))
			.catch( e => e);
	}

	setSearchTopstories(result) {
		const { hits, page } =  result;
		const { searchKey, results } = this.state;

		const oldHits = results && results[searchKey]
			? results[searchKey].hits
			: [];

		const updatedHits = [
			...oldHits,
			...hits
		];

		this.setState( {
			results : { 
				...results,//all other results by searchkey
				//[searchKey] is an ES6 computed property name. It helps you to allocate values dynamically in an object.
				[searchKey] :{ hits : updatedHits, page }
			}
		});
	}

	handleSearchSubmit(event) {
		const {searchTerm} = this.state;
		//You must do this because native browser behaviour for submit callback in form is to relload!
		//If you do not do this the page will always reload and start from the scratch 
		event.preventDefault(); 
		this.setState( { searchKey : searchTerm} );
		if(this.needsToSearchTopstories(searchTerm)){
			this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
		}
	}

	needsToSearchTopstories(searchTerm) {
		return !this.state.results[searchTerm]; 
	}
	
}


