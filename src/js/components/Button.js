import React from "react";
import PropTypes from 'prop-types';


//React comes with a built-in type checker to prevent bugs. You can use PropTypes to describe your component interface.
// All the props that get passed from a parent component to a child component get validated based on the PropTypes interface assigned to the child component.

export function Button ({onClick, className ='', children}){

    //You take every argument from the function signature and assign a PropType to it.
    Button.propTypes = {
            onClick: PropTypes.func.isRequired,
            className: PropTypes.string,
            children: PropTypes.node.isRequired,
        }

       // const {onClick, className ='', children} = props;
        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
             </button>
        );
}