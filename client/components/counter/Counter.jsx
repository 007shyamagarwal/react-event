import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends React.Component{
    constructor(){
        super();
        this.state={
            count:0,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
	
    /*
	getInitialState(){
		return {
			count: 0
		};
	}
*/
    handleSubmit(){
        this.setState({
            count: this.state.count? this.state.count + 1 : 1
        });
    }

    render(){
        return(
            <div> 
                {this.state.count} times clicked
                <p/>
                <button onClick={this.handleSubmit} style={{width: 100, height: 40}}>Click Me!</button>
            </div>
        )
    }
};

Counter = connect()(Counter)

export default Counter