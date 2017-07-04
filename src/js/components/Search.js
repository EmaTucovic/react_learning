import React from "react";

//Destructuring in f signature: f have argg "props"
//Remember: dump component is a FUNCTION that have PROPS AS INPUT and COMPONENT as output!
export function Search ({value, onChange}){
        // Do destructuring here or in function signature
       // const {value, onChange} = props;
        return(
            
            <form>
                <div>Search:</div>
                <input type ="text" value = {value} onChange = {onChange}/>
            </form>
        );
}