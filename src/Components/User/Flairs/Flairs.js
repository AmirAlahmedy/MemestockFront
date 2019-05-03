import React, { Component } from 'react';
import './Flairs.css';
import axios from '../../../axios-orders';





class Flairs extends Component {
        state = {
                // flairs: [
                //         'ali'
                // ],
                // correspondingSubreddits: [
                //         'test'
                // ]
                response: []
        }
        header = {
                'auth': localStorage.getItem('token')
            }
        componentDidMount(){
                console.log('token for flairs',this.header.auth);
                axios.get('user/Flairs', {headers: this.header})
                    .then( res => {
                            console.log(res);
                        this.setState({
                                response: res.data
                        })
                            
                    })
                    .catch( error => {

                if(error.status === 404){

                        this.setState({
                                // flairs: [],
                                // correspondingSubreddits: []
                                response: []
                        })
                        
                }
                })
            }

        /**
         * For generating flairs
         * @function getFlairs
         */
         getFlairs() {
        if (this.state.response === 0) return;
        return this.state.response.map(el => <Flair
                flair={el.flair}
                sub={el.srName}
        />)
        }

        render() {
                console.log(this.state);
             if( this.state.response.length > 0 ){

                     return(
                         <div>{this.getFlairs()}</div>
                        );
                }else{
                        return(
                                <em style={{color: 'red'}}>You have no flairs</em>
                        );
                }
        }
} 
class Flair extends Component{

        render(){
                return(
                        <div>Flair: {this.props.flair} Subreddit: {this.props.sub}</div>
                        );
        }
}
export default Flairs;