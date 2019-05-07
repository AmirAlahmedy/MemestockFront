import React, { Component } from 'react'

import defImage from '../../assets/images/redditor.png'
import axios from 'axios';
import './CardUser.css';
import { NavLink } from 'react-router-dom';

export class CardUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            subscriptions: [],
            cakeday: '',
            bloxkeduser: ''
        };
    }

     /**
     * Gets the current user name from the local storage
     * @function getCurrentUser
     */
    getCurrentUser() {
        return localStorage.getItem("Username");
    }

     /**
     * Handles blocking a user
     * @function handleBlock
     */
    handleBlock() {

        var headers = {
            'auth': localStorage.getItem("token")
        }
        var data = {
            blockeduser: this.state.username
        }

        axios.put('me/user/block/', data, { headers: headers }
        )
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    alert("User is blocked!");
                } else if (res.status === 401 || res.status === 404) {
                    alert(" Unsuccessful");
                    return Response.json;
                }
            })
            .catch(error => {
                alert("Error Caught");
            })
    }


     /**
     * Handles adding a friend
     * @function handleBlock
     */
    handleFriend() {
        var headers = {
            'auth': localStorage.getItem("token")
        }
        let data = this.state.username
        axios.put('me/user/Add/', data, { headers: headers }
        )

            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    alert("Friend Request Sent!");
                } else if (res.status === 401 || res.status === 404) {
                    alert("Friend Request Sent Unsuccessful");
                    return Response.json;
                }
            })
            .catch(error => {
                alert("Error Caught");
            })
    }
    componentDidMount() {

        var headers = {
            'auth': localStorage.getItem("token")
        }

        let username = this.getCurrentUser();

    };

    render() {
        return (

            <sidebar className='gamb'>

                <div className="userImage" style={{ backgroundImage: `url(defImage)` }}>
                </div>

                <div className="user">{this.props.q}</div>
                <div className="tanihetta">

                    <h5  >Cake Day</h5>
                    <h6>  {this.props.cake}</h6>

                    <input class="btn btn-primary" type="submit" id="addFriend" value="Add as a friend" onClick={this.handleFriend} />
                    <input class="btn btn-primary" type="submit" id="blockfriend" value="Block friend" onClick={this.handleBlock} />



                </div>



                <div></div>

            </sidebar>

        )
    }
}


export default CardUser
