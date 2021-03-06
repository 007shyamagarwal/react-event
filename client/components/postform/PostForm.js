import React, { Component } from 'react'
import store from '../../redux/store'
import { createPost } from '../../redux/actions'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class PostForm extends React.Component{

    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
        this.enableButton=this.enableButton.bind(this);
        this.disableButton=this.disableButton.bind(this);
        this.state={
            text: '',
            type: '',
            message: '',
            canSubmit: false,
        }
    }
    handleSubmit(data){
        console.log('data from post form: ' + JSON.stringify(data))
        this.setState({
            type: 'info',
            message: 'Sending info ...'
        });
        let dispatch = store.dispatch
        dispatch(createPost(data))
            .then( () => { browserHistory.push('/home') })
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }
  
	
    render(){
        return (
            <div className='container'>
                <Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="">
                    <Input type='textarea' name='text' className='form-control' componentClass='textarea'
                        placeholder='Event Description' value={this.state.text} title='Text'
                        required/>
                    <p/>
                    <Button type="submit" disabled={!this.state.canSubmit} >Post</Button>	
                    {status} 
                </Form>
            </div>
        )
    }
}

export default PostForm