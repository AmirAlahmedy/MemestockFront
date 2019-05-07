import React, { Component } from 'react';
import './Flairs.css';
import axios from '../../../axios-orders';
import Aux from '../../HOC/Auxiliary';




class Flairs extends Component {
        state = {
        
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

                                response: []
                        })
                        
                }
                })
            }

        /**
         * Renders flairs component
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
                         <table className="table">
                                 <tr>
                                         <td><strong>Subreddit</strong></td>
                                         <td><strong>Flair</strong></td>
                                 </tr>
                                {this.getFlairs()}
                         </table>
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
                {console.log(this.props.flair)}

                return(
                        <Aux>

                                {/* <div className='labels'>
                                        <div id="l1">        
                                        <label style={{backgroundColor: '#0079D3', color: 'white', padding: '5px', borderRadius: '3px', fontSize: '14px', fontWeight: 'bold'}}>FLAIR</label> 
                                        </div>
                                        <div style={{width: '25px'}}></div>
                                        <div id="l2">
                                        <label style={{backgroundColor: '#0079D3', color: 'white', padding: '5px', borderRadius: '3px', fontSize: '14px', fontWeight: 'bold'}}>Subreddit</label>
                                        </div> 
                                        
                                </div>

                                <div className='list'>
                                        <div>{this.props.flair}</div>
                                        <div style={{width: '25px'}}></div>
                                        <div>{this.props.sub}</div>
                                </div> */}

                                <tr>        
                                        {/* {this.props.flar.map(((flair, i) => {
                                                return 
                                        }))} */}
                                        <td>{this.props.sub}</td>
                                        <td>{this.props.flair}</td>    
                                       
                                </tr>

                        </Aux>

                        );
        }
}
export default Flairs;