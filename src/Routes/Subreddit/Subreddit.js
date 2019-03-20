import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Listing from '../../Components/Listings/Listings';
import Thread from '../Thread/Thread';
import {Link,Route,Switch } from 'react-router-dom';

export class Subreddit extends Component {
    state ={
        name:'Jazztheory',
        rules:'/r/Jazz Theory is the place where you can ask and answer thought provoking questions regarding music theory and jazz harmony',
        threads:[],
        moderators:['Karim','Kaka'],
        subscriber:100,

    }
  render() {
    return (
      <div className="subredditFixed">
        <section id="subredditShowcase">
            <img src={defImage} alt="Subreddit Default"/>
            <h1>r/{this.state.name}</h1>
        </section>
        <nav id="subredditNavbar">
           <div class="subredditContainer">
              <div>
                 <span className='srLinks'><Link to='./r/'>Posts</Link></span>
                 <span className='srLinks'><Link to='./r/Rules'>Rules</Link></span>
              </div>
            </div> 
            <div id="subredditSort">
              <div className="subredditContainer">
                
                <div className="srSortdropdownMenu">
                    <button className='srSortdropButton'>
                        SORT
                    </button>
                    <div role='menu' className='srdropList'>
                        <ul className='srSortdropUl'>
                            <li className='srSortdropdownItem' className='sort toHome'>Hot</li>
                            <li className='srSortdropdownItem'className='sort toHome'>New</li>
                            <li className='srSortdropdownItem'className='sort toHome'>Controversial</li>
                            <li className='srSortdropdownItem'className='sort toHome'>Top</li>
                            <li className='srSortdropdownItem'className='sort toHome'>Rating</li>
                        </ul>

                    </div>
                </div>
              </div>
            </div>
        </nav>
        <div class="subredditContainer">
            <section id="subredditPageThreads">
                <Thread/>
            </section>
            <aside id="subredditSidebarContainer">
              <div className="subredditSidebarComponent">
                tita fl nana
              </div>
              <div className="subredditSidebarComponent">
              </div>
            </aside>
        </div>
      </div>
    )
  }
}

export default Subreddit
