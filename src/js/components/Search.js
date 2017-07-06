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

       let input; //we will access to the reference of thr DOM node, but here we are not using it because we do not have lifecucle method 
        return(
             <form onSubmit={onSubmit}>
                <input
                type="text"
                value={value}
                onChange={onChange}
                ref = { (node) => input = node}
                />
                <button type="submit">
                {children}
                </button>
            </form>
        );
}


//All Ract components are PURE FUNC WITH RESPECT TO THEIR PROPS
//so they do not modify their props!!


//If we want to access the DOM node and use its reference we need lifecycle method to trigger a function, so we need smart component
        // class Search extends React.Component {

        //     //Triger focus on DOM node
        //     componentDidMount() {
        //         this.input.focus();
        //     }

        //     render() {
        //         const {
        //         value,
        //         onChange,
        //         onSubmit,
        //         children
        //         } = this.props;

        //         return (
        //         <form onSubmit={onSubmit}>
        //             <input
        //             type="text"
        //             value={value}
        //             onChange={onChange}
        //             ref={(node) => { this.input = node; }}
        //             />
        //             <button type="submit">
        //             {children}
        //             </button>
        //         </form>
        //         );
        //     }
        // }
