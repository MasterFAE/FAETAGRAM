import React, { Component } from 'react'
import {ContextConsumer} from '../context'


export default class userpost extends Component {
    state = {
        comment: "",
    }
    getBestComment = (e) =>{
        const bestcomment = this.props.array.comments.find(item => item.likes>=0)
        if (bestcomment !== undefined){
            return(
                   <div> <b>{bestcomment.nickname}</b>: {bestcomment.comment} </div>
            )
            
        }
        else {
            return(
                   <div></div>
            )
        }
    }

    LikePost = (dispatch, e) =>{
        let {postid} = this.props.array
        dispatch({type:"LIKE_USER_POST", id: postid})
        
    }
    DisLikePost = (dispatch, e) => {
        let {postid} = this.props.array
        dispatch({type: "DISLIKE_USER_POST", id: postid})
    }

    EnterComment = (dispatch,e) =>{
        if (e.key === 'Enter' && this.state.comment.length>0){
            let {postid} = this.props.array
            dispatch({type: "SEND_COMMENT_TO_USER_POST", id: postid, comment: this.state.comment})
            this.setState({comment: ""})
        }
    }

    HandleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    render() {
        const props = this.props.array

        return (
            <ContextConsumer>
                {
                    value => {
                        const {dispatch} = value
                        const {CurrentUser} = value
                        return(
                            <div>
                                <div className="card fae-user-post" style={{width:550}}>
                                    <div className="card-header">
                                        <img onDoubleClick={this.LikePost.bind(this,dispatch)} className="post-image" alt="test" src={props.imagelink} />
                                    </div>
                                    <div className="card-body">
                                        <b>{props.nickname}</b>: {props.imagedescription}
                                        {
                                            props.likes.find(item => CurrentUser.user_id === item.user_id) === undefined
                                            ? <div className="float-right"> <i className="far fa-heart" onClick={this.LikePost.bind(this,dispatch)}></i> {props.likes.length}</div>
                                            : <div className="float-right"> <i className="fas fa-heart" onClick={this.DisLikePost.bind(this,dispatch)}></i> {props.likes.length}</div>
                                        
                                            
                                        }
                                    </div>
                                    <div className="card-footer">
                                        {this.getBestComment()}
                                        <input type="text" className="post-make-comment w-100" value={this.state.comment} onChange={this.HandleComment} onKeyDown={this.EnterComment.bind(this,dispatch)} placeholder="Enter your comment"></input>
                                        <br></br>
                                        <div className="post-comment-length text-center">There are {props.comments.length} more comments.</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }

            </ContextConsumer>


            
        )
    }
}
