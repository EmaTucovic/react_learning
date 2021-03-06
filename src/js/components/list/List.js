import React from "react";
//import PropTypes from 'prop-types';
import {Search} from "./Search";
import {Button} from "./Button";
import {Table} from "./Table";
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,

  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from "../../constants/listConstants.js";
//import {sortBy} from 'lodash';


//Define higher order function (takes f as par and/or returns funnction as par) 
// function isSearched(searchTerm){
// 	//return function that will return boolean based on cond
// 	return function(item){
// 		//console.log(item);
// 		//console.log(!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()));
// 		return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
// 	}
// }

//this higher order funct returns funct
//like utility func: does not have or need this (List)
const updatesearchTopStoriesState = (hits, page) => (prevState) => {
			const { searchKey, results } = prevState;

			const oldHits = results && results[searchKey]
				? results[searchKey].hits
				: [];

			const updatedHits = [
				...oldHits,
				...hits
			];
			return { results : { 
						...results,//all other results by searchkey
						//[searchKey] is an ES6 computed property name. It helps you to allocate values dynamically in an object.
						[searchKey] :{ hits : updatedHits, page }
					}
			}
}

export class List extends React.Component {

	constructor(){
		super();

		// The process of refactoring substate from one component to another is known as lifting state.
		// In your case you want to move state that isn't used in the List component closer to the Table component.
		// The state moves down from parent to child component.

		//In order to have a client cache for each result, you have to store multiple results rather than one result in your internal component state.
		// The results object will be a map with the search term as key and the result as value.
		this.state = {
			searchTerm : DEFAULT_QUERY,
			results: null, //[{ hits: [], page : numb}, {...}]
			searchKey: '', // it reflects "searchTerm",
			page : 0
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
		//console.log(result); //Result is an object with property hits that is array of interest
		
		//Key should be specified inside the array
		//Keys must be uniqe among the sibiling
		//Keys are not passed as props to my component, same value pass in different vay if you need it
		return(
		<div className = {page}>
			<Search  value = {searchTerm} onChange = {this.onSearchChange}  onSubmit = {this.handleSearchSubmit}>
				Search
			</Search>
			<Table 
				list = {list}
				onDismiss = {this.onDismiss}
			/>
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
		var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
		//console.log("url in fetch func",url);
		fetch(url)
			.then( response => response.json())
			.then( result => this.setSearchTopstories(result))
			.catch( e => e);
	}

	setSearchTopstories(result) {

		const { hits, page } =  result;
		//update the state depending on the previous state asynchronously : setState is async f
		//You should use setstate with cb
		//const { searchKey, results } = this.state;

		//setState receive function cb as arg
		//updatesearchTopStoriesState returns function
		this.setState( updatesearchTopStoriesState (hits, page) );
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


