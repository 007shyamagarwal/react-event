import React, { Component } from 'react'
import CommentForm from '../commentform/CommentForm'

import Proptypes from  'prop-types';    //added for new features

class CommentsBox extends React.Component{
	constructor(){
		super();
	}

	render(){
		return (
			<div>
				<CommentForm postId={this.props.postId} 
					onCommentSubmit={this.props.onCommentSubmit} />
				{ this.props.comments.map( comment => {
					return <div className="comment-row"><span> <b>{comment.name}:</b> {comment.comment} </span></div>
				})}
			</div>
		)
	}
}

export default CommentsBox