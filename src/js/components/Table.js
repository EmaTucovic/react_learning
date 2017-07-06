import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './Button.js';

export function Table({list, onDismiss}) {
    
    Table.propTypes = {
        list: PropTypes.array.isRequired,
        onDismiss: PropTypes.func.isRequired,
    };

    return (
        <div>cao
        <ol>
			{list.map( (item)=> 
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


