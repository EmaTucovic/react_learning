import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './Button.js';
import {sortBy} from 'lodash';



const SORTS = {
	NONE : list => list,
	TITLE : list => sortBy(list, 'title'),
	AUTHOR : list => sortBy(list, 'author'),
	COMMERNTS : list => sortBy(list, 'num_coments').reverse(),
	POINTS : list => sortBy(list, 'points').reverse()
}

//This component on click sets a sortKey
const Sort = ({sortKey, onSort, children}) =>
    <Button onClick = { () => onSort(sortKey) } >
        {children}
    </Button>

export function Table({list, onDismiss, sortKey, isSortReverse, onSort}) {
    
    Table.propTypes = {
        list: PropTypes.array.isRequired,
        onDismiss: PropTypes.func.isRequired,
    };

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
        <div>
            <div className ="table-header">
            <span><Sort sortKey = {"TITLE"} onSort = {onSort}>
                Title
            </Sort></span>
             <span><Sort sortKey = {"AUTHOR"} onSort = {onSort}>
                Author
            </Sort></span>
             <span><Sort sortKey = {"COMMENTS"} onSort = {onSort}>
                Comments
            </Sort></span>
            <span>
            <Sort sortKey={'POINTS'} onSort={onSort} >
                Points
            </Sort></span>
             <span>
                Archive
            </span>
            </div>
            <ol>
                { reverseSortedList.map( (item)=> 
                        <li key = {item.objectID} >
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>

                        <Button onClick = {() => onDismiss(item.objectID) }> Dismiss </Button>
                        </li>) 
                }
            </ol>
        </div>
    );
    
}


