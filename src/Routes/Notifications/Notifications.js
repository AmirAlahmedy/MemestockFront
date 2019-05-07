import React, { Component } from 'react';
import './Notifications.css';
import axios from '../../axios-orders';
import Aux from '../../Components/HOC/Auxiliary';
import Button from '../../Components/UI/Button/Button';

class Notifications extends Component {
    state = {}
    header = {
        auth: localStorage.getItem('token')
    }
    params = {
        startPosition: 0
    }
    componentDidMount = () => {
        axios.get('notif?startPosition=0', { headers: this.header })
            .then(response => {
                console.log(response);
                this.setState({
                    notif: response.data.notifications
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    /**
     *Maps notifications into components
     * @function getNotif
     */
    getNotif() {
        if (!this.state.notif) return;
        return this.state.notif.map(noti =>
            <Noti
                user={noti.username}
                message={noti.message}
            />);
    }
    render() {
        console.log(this.state.notif);
        return (

            <div className='allNotiWrapper'>
                <p> {this.getNotif()} </p>
            </div>

        );
    }
}

class Noti extends Component {
    render() {
        return (

            <div className='notiContainer'>
                {this.props.message}
                {/** E3ml mark (un)read w mark (un)read all w enak lama tdoos 3ala notification yroo7 yshoof l post aw l inbox  */}
                {/* <button className='markOne'>Mark as read</button> */}
            </div>

        );
    }
}

export default Notifications;