import React from 'react';
import * as URL_CONSTANT from "../../constants/listConstants";
import {Table, TableHeader} from "./Table";
import {sortBy} from 'lodash';

//This is example of simple sort
// you have one main smart component List that holds hits and sortKey and function sortBy
// Everything is passed as props to dump components that only render things and see onClick event that triger onSort funct
//These components are TableHeader -> Sort -> Button
//Compont Table receive props hits


const SORTS = {
	NONE : list => list,
	TITLE : list => sortBy(list, 'title'),
	AUTHOR : list => sortBy(list, 'author'),
	COMMERNTS : list => sortBy(list, 'num_comments').reverse(),
	POINTS : list => sortBy(list, 'points').reverse()
}

class List extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page : 0,
            hits : [], // array
            sortKey : 'NONE',
            isSortReverse : false
        }
        this.getData = this.getData.bind(this);
        this.setResultInState = this.setResultInState.bind(this);
        this.onSort = this.onSort.bind(this);
    }

   componentWillMount(){
       this.getData();
   }

    render(){
        let {hits} = this.state;
        return(
            <div className = "table">
            <TableHeader onSort = {this.onSort}/> 
            <Table list = {hits} />
            </div>
        );
    }

    onSort(sortKey){

        let sortedList = SORTS[sortKey](this.state.hits);

        const isSortReverse = sortKey === this.state.sortKey && this.state.isSortReverse === false;
        if(isSortReverse){
            // you clicked twice -> reverse sort
            sortedList = sortedList.reverse();
        } 
        this.setState({hits : sortedList, sortKey, isSortReverse});

        
    }

    getData(){
        var url = `${URL_CONSTANT.PATH_BASE}${URL_CONSTANT.PATH_SEARCH}?${URL_CONSTANT.PARAM_SEARCH}react&${URL_CONSTANT.PARAM_PAGE}${this.state.page}&${URL_CONSTANT.PARAM_HPP}${URL_CONSTANT.DEFAULT_HPP}`;
       
        fetch(url)
            .then( (response) => response.json())
            .then( (result) => this.setResultInState(result))
            .catch( (er) => er)
    }

    setResultInState(result){
        let {hits, page} = result;
        this.setState( { hits, page  });
    }
}

export default List;
