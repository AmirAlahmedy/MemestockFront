import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../images/subreddit.png';

export class Subreddit extends Component {
    state ={
        name:'Jazztheory',
        threads:[]
    }
  render() {
    return (
      <div className="subredditFixed">
          <section id="showcase">
              <img src={defImage} alt="Subreddit Default"/>
              <h1>r/{this.state.name}</h1>
        </section>
        
      </div>
    )
  }
}

export default Subreddit
