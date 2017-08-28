import React from 'react';
import { MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Logout extends React.Component{
    render(){
        const { logoutUser } = this.props

        return (
            <MenuItem eventKey={2.3} onClick={this.logoutUser}>Logout</MenuItem>
        )
    }
}

export default Logout

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired
}