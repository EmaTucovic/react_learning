import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './Button.js';
import {sortBy} from 'lodash';
import classNames from 'classnames';



const SORTS = {
	NONE : list => list,
	TITLE : list => sortBy(list, 'title'),
	AUTHOR : list => sortBy(list, 'author'),
	COMMERNTS : list => sortBy(list, 'num_comments').reverse(),
	POINTS : list => sortBy(list, 'points').reverse()
}

//This component on click sets a sortKey
const Sort = ({sortKey, onSort, activeSortKey, children}) => {

    //1. way without lib classnames
    //const sortClass = ['button-inline'];
    // In Button comp pass property : className = { sortClass.join(' ') }
     // if( activeSortKey === sortKey) {
    //     sortClass.push('button-active');
    // }


    const sortClass = classNames(
        'button-inline',
        {'button-active' : sortKey === activeSortKey});

    return (
        <Button
            className = {sortClass} 
            onClick = { () => onSort(sortKey) } >
            {children}
        </Button>
    );
}

export function Table({list, onDismiss, sortKey, isSortReverse, onSort}) {
    
    Table.propTypes = {
        list: PropTypes.array.isRequired,
        onDismiss: PropTypes.func.isRequired,
    };

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
        <div className="table">
            <div className ="table-header">
            <span style={{ width: '40%' }}><Sort sortKey = {"TITLE"} onSort = {onSort} activeSortKey = {sortKey}>
                Title
            </Sort></span>
             <span style={{ width: '30%' }}><Sort sortKey = {"AUTHOR"} onSort = {onSort} activeSortKey = {sortKey}>
                Author
            </Sort></span>
             <span style={{ width: '10%' }}><Sort sortKey = {"COMMERNTS"} onSort = {onSort} activeSortKey = {sortKey}>
                Comments
            </Sort></span>
            <span style={{ width: '10%' }}>
            <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey = {sortKey} >
                Points
            </Sort></span>
             <span style={{ width: '10%' }}>
                Archive
            </span>
            </div>
            <ol style={{ paddingLeft: '0' }}>
                { reverseSortedList.map( (item)=> 
                        <li key = {item.objectID} className="table-row">
                        <span style={{ width: '40%' }}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={{ width: '30%' }}>{item.author}</span>
                        <span style={{ width: '10%' }}>{item.num_comments}</span>
                        <span style={{ width: '10%' }}>{item.points}</span>

                        <Button 
                            onClick = {() => onDismiss(item.objectID) }
                            className="button-inline"
                            > 
                            Dismiss 
                        </Button>
                        </li>) 
                }
            </ol>
        </div>
    );
    
}


