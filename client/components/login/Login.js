import React, { Component } from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import Auth  from '../../auth/auth'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { storeToken, setLoggedIn, receiveLogin } from '../../redux/actions'
import * as actionCreators from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { Form } from 'formsy-react'
import Input from '../input/Input'
import { Button } from 'react-bootstrap'

 class Login extends  React.Component{
		
	constructor(){
		super();
		this.state = {
			type: null,
			message: null,
			canSubmit:true,
			email:null,
			password:null,


		};
		this.handleEmailChange=this.handleEmailChange.bind(this);
		this.handlePasswordChange=this.handlePasswordChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.enableButton=this.enableButton.bind(this);
		this.disableButton=this.disableButton.bind(this);
	}
		

	handleSubmit(data){
		this.setState({
			type: 'info',
			message: 'Sending info ...'
		});

		Auth.login(data, (err, res) => {
			if(err || !res){
				this.setState({
					email: '',
					password: '',
					type: 'error',
					message: 'Invalid email or password'
				});
			} else {
				// store token and redirect user
				let response = res.body
				let token = response.token
				let user = response.user
				store.dispatch(storeToken(token))
				
				// for auth, in the end, will use just one
				store.dispatch(setLoggedIn(true))
				store.dispatch(receiveLogin(response))
				localStorage.setItem('userId', user._id)
				localStorage.setItem('userEmail', user.email)
				localStorage.setItem('userName', user.name)
				localStorage.setItem('token', token)

				const { location } = this.props

				if (location.state && location.state.nextPathname) {
					browserHistory.push(location.state.nextPathname)
				} else {
					console.log('using home')
					browserHistory.push('/home')
				}
			}
		});

	}

	handleEmailChange = (e) => {
    	this.setState({email: e.target.value});
  	}

  	handlePasswordChange = (e) =>{
    	this.setState({password: e.target.value});
  	}

  	enableButton() {
  		this.setState({ canSubmit: true });
  	}

  	disableButton() {
  		this.setState({ canSubmit: false });
  	}

  	getInitialState(){
		return {
			loggedIn: Auth.loggedIn(),
			canSubmit: false
		}
	}

	render(){
		// redirect home if already logged in
		if(Auth.loggedIn()){
			browserHistory.push('/home')
		}
		// messages
		if (this.state.type && this.state.message) {
    		var classString = 'alert alert-' + this.state.type;
    		var status = <div id="status" className={classString} ref="status">
                   {this.state.message}
                 </div>;
  		}
		return (
			<div className='container'  style={{width:350,marginLeft:'35%',marginTop:'9%'}}>
				<Form onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
					<Input type='text'   name='email' className='form-control' 
						placeholder='Email' value={this.state.email} title='Email'
						validations="isEmail" validationError="This is not a valid email" required/>
					<p/>
					<Input type='password' name='password'   className='form-control' 
						placeholder='Password' value={this.state.password} title='Password'
						required/>

					{status} 
						
					<p/>
					<Button type="submit" style={{marginLeft:'40%'}} disabled={!this.state.canSubmit}>Log In</Button>	

					<p/>
					<Link style={{marginLeft:'31%'}} to='/register'>New to this ?? Click here!!</Link>
				</Form>
			</div>
		)
	}
};

function mapStateToProps(state, props){
	return { 
		token: state.token,
		state: state,
		propsStore: props.store
	}
}

function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Login
