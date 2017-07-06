//https://facebook.github.io/react/docs/typechecking-with-proptypes.html

//you can catch a lot of bugs with typechecking.
//React has some built-in typechecking abilities. 

//To run typechecking on the props for a component, you can assign the special propTypes property:

        // import PropTypes from 'prop-types';

        // class Greeting extends React.Component {
        // render() {
        //     return (
        //     <h1>Hello, {this.props.name}</h1>
        //     );
        // }
        // }

        // Greeting.propTypes = {
        // name: PropTypes.string
        // };

// PropTypes exports a range of validators that can be used to make sure the data you receive is valid. 
//In this example, we're using PropTypes.string. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console.
//For performance reasons, propTypes is only checked in development mode.


//// You can declare that a prop is a specific JS primitive: PropTypes.string, array, bool, func, number, object, symbol
//Anything that can be rendered: numbers, strings, elements or an array : PropTypes.node
//React el :  .element
// You can also declare that a prop is an instance of a class. This uses
// JS's instanceof operator.
     //optionalMessage: PropTypes.instanceOf(Message)

//...
