import React from "react"


const Context = React.createContext();


const reducer = (state,action) => {
    switch(action.type){
        case "LIKE_USER_POST":
            state.UserPosts.find(item => item.postid === action.id).likes.push(state.CurrentUser)
            return state


        case "DISLIKE_USER_POST":
            let k = state.UserPosts.findIndex(item => item.postid === action.id)
            
            state.UserPosts[k].likes.splice(state.UserPosts[k].likes.findIndex(item => item.user_id === state.CurrentUser.user_id),1)
            return state

        case "SEND_COMMENT_TO_USER_POST":
            var i = state.UserPosts.findIndex(item => item.postid === action.id)
            let comment = {
                ...state.CurrentUser,
                likes: [],
                comment: action.comment
            }
            state.UserPosts[i].comments.push(comment)
            return state

        case "ADD_NEW_USER_POST":
            state.UserPosts.unshift(action.post)
            return state

        default:
            return state

    }
}

export class ContextProvider extends React.Component{
    
    
    state = {
        dispatch: action =>{
            this.setState(state => reducer(state,action))
        },
        UserPosts:[
            {
                nickname: "ozgEEE",
                showname: "Özge Parlak",
                postid: 1,
                likes:[
                    {
                    nickname: "Ahmetio190",
                    profile_picture: "https://via.placeholder.com/300x300",
                    showname: "Ahmet Özdür",
                    password: "12903asd",
                    description: "You only live once",
                    posts:[],
                    followers:[],
                    following: []}
                ],
                imagelink: "https://via.placeholder.com/500x600",
                imagedescription: "Geldim, gördüm ve aldım",
                comments:[
                    {
                        user_id:"a",
                        nickname: "Ahmetio190",
                        showname: "Ahmet Özdür",
                        password: "12903asd",
                        comment: "Yarrak gibi olm",
                        profile_picture: "https://via.placeholder.com/300x300",
                        description: "You only live once",
                        posts:[],
                        followers:[],
                        following: [],
                        likes:30,
                    },
                    {
                        user_id:"ab",
                        nickname: "Yurdakulistan",
                        showname: "Yurdakul Özdür",
                        profile_picture: "https://via.placeholder.com/300x300",
                        password: "12903asd2",
                        comment: "Yarrak gibi olmuş",
                        description: "You only live twice",
                        posts:[],
                        followers:[],
                        following: [],
                        likes:300,
                    },
                ]


            }


        ],
        CurrentUser:{
            user_id:"abb",
            nickname: "fAemeister.",
            showname: "Ahmet Özdür",
            password: "12903asd",
            profile_picture: "https://via.placeholder.com/300x300",
            description: "You only live once",
            posts:[],
            followers:[],
            following: [],

            
        }

    }

    render(){
        const {children} = this.props

        return(
            <Context.Provider value ={this.state}>
                {children}

            </Context.Provider>
        )
    }
}

export const ContextConsumer = Context.Consumer;