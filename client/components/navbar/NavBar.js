import React, { Component } from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap'
import Logout from '../logout/Logout'
import  { logoutUser } from '../../redux/actions'
import Auth from '../../auth/auth'
import store from '../../redux/store'
import { browserHistory } from 'react-router'

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser=this.logoutUser.bind(this);
    }
    logoutUser(e){
        e.preventDefault()
        let dispatch = store.dispatch
        dispatch(logoutUser())
    }
	
    render(){
    //   console.log("sjslfdj",this.props);
        let whenLoggedIn = <div className="relevant-nav-item">
            <NavItem className="nav-item" eventKey={2} href="/new">Post</NavItem>
            <NavDropdown className="nav-item" eventKey={3} title="Account" id="basic-nav-dropdown">
                {/*<MenuItem eventKey={3.1}>Settings</MenuItem>
							<MenuItem divider />*/}
                <MenuItem eventKey={3.3} onClick={this.logoutUser}>Logout</MenuItem>
            </NavDropdown>
        </div>
        let relevantNavItem = Auth.loggedIn() ? whenLoggedIn : <NavItem eventKey={3} href="/login">Login</NavItem>;
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/home">Event Feed</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight   >
                    <NavItem  eventKey={1} href="/home">Feed</NavItem>

                    { relevantNavItem }
									
                </Nav>
            </Navbar>
        )
    }
};

export default NavBar