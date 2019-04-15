import React, { Component } from 'react'
import Button from '../UI/Button/Button';
import defImage from '../../assets/images/redditor.png'
const CardProf = props => {
    return (
       <sidebar className='gamb'>
        <div className="awelhetta">
            <img src={defImage} alt="soret reddit"/>
        </div>

        <div className="tanihetta">
        <h5>Cake Day</h5> 

        <h5>Email</h5>

        </div>

           <button>New Post</button>
       </sidebar>
    )
  }


export default CardProf
