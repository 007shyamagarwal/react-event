import React, { Component } from 'react'
import Post from '../post/Post'
import store from '../../redux/store'
import { fetchPosts, commentPost } from '../../redux/actions'
import { browserHistory } from 'react-router'

class Posts extends  React.Component{
    constructor(){
        super();
        this.handleCommentSubmit=this.handleCommentSubmit.bind(this);
        this.state={
            posts: [],
        }
    }

    handleCommentSubmit(data, postId){
        // make post comment request, receive post and update list of posts
        data.postId = postId
        let dispatch = store.dispatch
        dispatch(commentPost(data))
            .then( (updatedPost) => {
                if(updatedPost.hasOwnProperty('error')){
                    alert('error replying to post')
                }else{					
                    // set state to current post
                    let newPosts = this.state.posts.map( post => {
                        if(post._id != updatedPost._id)
                            return post 
                        else
                            return updatedPost
							
                    })

                    this.setState({
                        posts: newPosts
                    })
                }
				
            })
    }
 
    componentDidMount(){
        let dispatch = store.dispatch
        dispatch(fetchPosts())
            .then( (posts) => {
                this.setState({
                    posts: posts
                })
            })
    }

    componentWillUnmount(){

    }

    render(){
        return (
            <div className='container'>
                { this.state.posts.map( post => {
                    return <Post key={post._id} post={post} 
                        onCommentSubmit={this.handleCommentSubmit} />
                }) }
            </div>
			
        )
    }
};

export default Posts