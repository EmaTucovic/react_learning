//Meaning of THIS

//1. Bind eventHandlerFunction in constructor or where are you passinj it

            // this.eventHandlerFunction = this.eventHandlerFunction.bind(this)

//2. use experimental PROPERTY INITIALIZER SYNTAX
// We are defining function in class (property) and with this syntax ensuring "this" is bound withiin eventHandlerFunction
            // class Comp extends React.Component{
            //     eventHandlerFunction = () => { console.log( 'this is', this)}

            //     render() {
            //     return (
            //     <button onClick={this.eventHandlerFunction}
            //         Click me
            //     </button>
            //     );
            // }
            // }


//3. Use arrow funct in callback and this will have value of that class

            // class LoggingButton extends React.Component {
            //   handleClick() {
            //     console.log('this is:', this);
            //   }

            //   render() {
            //     // This syntax ensures `this` is bound within handleClick
            //     return (
            //       <button onClick={(e) => this.handleClick(e)}>
            //         Click me
            //       </button>
            //     );
            //   }
            // }

//The problem with this syntax is that a different callback is created each time the LoggingButton renders. 
//In most cases, this is fine. However, if this callback is passed as a prop to lower components, 
//those components might do an extra re-rendering. We generally recommend binding in the constructor or using the property initializer syntax,
// to avoid this sort of performance problem.

