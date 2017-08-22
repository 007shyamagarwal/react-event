import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import { connect } from 'react-redux' 
import Proptypes from  'prop-types';
class App extends  React.Component{


    render(){

        return (
            <div>
                <NavBar />
                {this.props.children}	
            </div>		
        )
    }
};

export default App