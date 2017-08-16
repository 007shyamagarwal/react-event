import React, { Component } from 'react'

class PostApp extends React.Component{

	render(){
		return (
			<div>
				{ this.props.children }
			</div>
		)
	}
}

export default PostApp