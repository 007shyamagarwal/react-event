import React from 'react';
import Formsy from 'formsy-react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Proptypes from  'prop-types';    //added for new features

var createReactClass = require('create-react-class');
//used instead of  React.createClass
const Input = createReactClass({
    mixins: [Formsy.Mixin],
    changeValue(event) {
        this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    },
    render() {

        const className = 'form-group' + (this.props.className || ' ') +
          (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

        const errorMessage = this.getErrorMessage();

        return (
            <div className={className}>
                <FormGroup bsSize={this.props.bsSize}>
                    <ControlLabel htmlFor={this.props.name}>{this.props.title}</ControlLabel>
                    <FormControl type={this.props.type || 'text'} placeholder={ this.props.placeholder }
                        name={this.props.name} componentClass={this.props.componentClass}
                        onChange={this.changeValue}
                        value={this.getValue()}
                        checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null} />
                </FormGroup>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

export default Input;