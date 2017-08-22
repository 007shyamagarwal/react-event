import React, { Component } from 'react'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap' 
import { commentPost } from '../../redux/actions'
import store from '../../redux/store'
import Proptypes from  'prop-types';    //added for new features

class CommentForm extends  React.Component{

    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
        this.enableButton=this.enableButton.bind(this);
        this.disableButton=this.disableButton.bind(this);
        this.state={
            comment: '',
            status: '',
            canSubmit: false

        };
    }
    handleSubmit(data){
        this.props.onCommentSubmit(data, this.props.postId)
        this.setState({comment: undefined})
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }
    /*
	// getInitialState(){
	// 	return {
	// 		comment: '',
	// 		status: '',
	// 		canSubmit: false
	// 	}
	// }
*/
    render(){
        return (
            <div>
                <Form inline onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="">
                    <Input type='text' name='comment' className='form-control' withoutLabel='true'
                        placeholder='any query on event' value={this.state.comment} title='Comment' bsSize='small'
                        required/>
                    <Button type="submit" disabled={!this.state.canSubmit} >Post</Button>	
					
                </Form>
            </div>
        )
    }
}

export default CommentForm