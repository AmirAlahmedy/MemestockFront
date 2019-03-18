import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../images/subreddit.png';
import Listing from '../Components/Listings';
import Thread from './Thread';

export class Subreddit extends Component {
    state ={
        name:'Jazztheory',
        threads:[]
    }
  render() {
    return (
      <div className="subredditFixed">
        <section id="subredditShowcase">
            <img src={defImage} alt="Subreddit Default"/>
            <h1>r/{this.state.name}</h1>
        </section>
        <div class="subredditContainer">
            <section id="subredditPageThreads">
                {/*<Listing/>*/}
                <Thread/>
            </section>
            <aside id="subredditSidebar">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum similique, laudantium omnis, nostrum impedit non, itaque placeat expedita inventore numquam nam velit dolorem in consequuntur eaque quis officiis necessitatibus harum.
            </aside>
        </div>
      </div>
    )
  }
}

export default Subreddit
