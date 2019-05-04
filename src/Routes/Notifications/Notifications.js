import React, { Component } from 'react';
import './Notifications.css';
import axios from '../../axios-orders';
import Aux from '../../Components/HOC/Auxiliary';

class Notifications extends Component{
    state = {}
    header = {
        SyncToken: localStorage.getItem('token')
    }
    params = {
        startPosition: 0
    }
    componentDidMount = () => {
        axios.get('/notif/', {headers: this.header})
            .then( response => {
                console.log(response);
                this.setState({
                    notif: response.data.notifications
                })
            })
            .catch( error => {
                console.log(error);
            })
    }

    getNotif(){
        if(!this.state.notif) return;
        return this.state.notif.map( noti => 
        <Noti
            user={noti.username}
            message={noti.message}
        />);
    }    
    render(){
        console.log(this.state.notif);
        return(<p>ssdasdad</p>/*<Aux>{this.getNotif()}</Aux>*/);
    }
}

class Noti extends Component{
    render(){
        return(
            <div className='notiContainer'>
              <p>{this.props.user}</p>  {this.props.message}
            </div>
        );
    }
}

export default Notifications;