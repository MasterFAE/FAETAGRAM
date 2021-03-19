import React, { Component } from 'react'
import {ContextConsumer} from '../context'


export default class FaeNav extends Component {
    render() {
        return (
            <ContextConsumer>
                {
                    value => {
                        const { CurrentUser} = value

                        return(
                            <div className="fae-nav">
                                <div className="fae-nav-user">
                                    <img alt="test" src={CurrentUser.profile_picture}></img> 
                                    <b>{CurrentUser.nickname}</b>

                                </div>
                                <h3>FAETAGRAM</h3>
                            </div>
                        )

                    }
                }

            </ContextConsumer>
        )
    }
}
