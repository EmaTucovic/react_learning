import React from "react";

//From React point of view functional and class comp are equivalent
//When React sees an element representing a user-defined component,
// it passes JSX attributes to this component as a single object. We call this object "props".
//This is way bellow function is valid React comp! :)

//Destructuring in f signature: f have argg "props"
//Remember: dump component is a FUNCTION that have PROPS AS INPUT and COMPONENT as output!
export function Search ({value, onChange, onSubmit, children}){
        // Do destructuring here or in function signature
       // const {value, onChange} = props;
        return(
             <form onSubmit={onSubmit}>
                <input
                type="text"
                value={value}
                onChange={onChange}
                />
                <button type="submit">
                {children}
                </button>
            </form>
        );
}


//All Ract components are PURE FUNC WITH RESPECT TO THEIR PROPS
//so they do not modify their props!!
