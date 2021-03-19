import React, { Component } from 'react'
import Userpost from './userpost';
import {ContextConsumer} from '../context'


var i = 0

export default class Posts extends Component {

    AddPost = (dispatch,CurrentUser,e) =>{

        i = i+1
        let post = {
            ...CurrentUser,
            likes: [],
            imagelink: "https://picsum.photos/"+Math.floor(Math.random() * 1921)+"/"+Math.floor(Math.random() * 1081),
            imagedescription: Math.floor(Math.random() * 101),
            comments: [],
            postid: 1+i,

        }
        dispatch({type: "ADD_NEW_USER_POST", post: post})
    }

    render() {
        return (
            <ContextConsumer>
                {
                    value => {
                        const {UserPosts, dispatch, CurrentUser} = value;
                        return(

                            <div>
                                <div className="float-left">
                                    <div onClick={this.AddPost.bind(this, dispatch,CurrentUser)} className="btn btn-success fae-addpost-btn border-circle">+</div>
                                </div>
                                <div className="fae-post">
                                    {
                                    UserPosts.map(item =>{
                                        return(

                                            <Userpost key={item.postid} array={item} />
                                        )
                                    })
                                    }
                                </div>


                            </div>
                        )
                    }
                }

            </ContextConsumer>
        )
    }
}
