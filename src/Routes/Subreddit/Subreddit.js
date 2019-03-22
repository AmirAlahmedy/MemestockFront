import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Listing from '../../Components/Listings/Listings';
import Thread from '../Thread/Thread';
import {Link,Route,Switch } from 'react-router-dom';

export class Subreddit extends Component {
    state ={
        name:'Jazztheory',
        bio:'r/JazzTheory is the place where you can ask and answer thought provoking questions regarding music theory and jazz harmony',
        threads:[
          {
            username: 'GiantSteps_',
            subreddit: 'jazztheory',
            title: 'Modal Harmony Interchange',
            content: 'Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played',
            upvotes:0
          
          },
          {
            username: 'WreakingHavoc',
            subreddit: 'jazztheory',
            title: 'Circle of Fifth',
            content: 'Circle of Fifth is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played Modal Harmony is easier explained than played',
            upvotes:124
          }
        ],
        moderators:['GiantSteps_','WreakingHavoc','CluelessBastard','IronIce','ArmagedonIsNear'],
        subscribers:100
    }
  render() {
    return (
      <div className="subredditFixed">
        <section id="subredditShowcase">
            <img src={defImage} alt="Subreddit Default"/>
            <h1>r/{this.state.name}</h1>
        </section>
        <nav id="subredditNavbar">
           <div className="subredditContainer">
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
            <section id="subredditPageContent">
              {/** 
              {this.state.threads.map(thread =>({
                return(
                  <div>

                  </div>
                )
              })}*/}
              <div className="subredditPageThread">
              <Thread/>
              </div>
              
              <div className="subredditPageThread">
              <Thread/>
              </div>
              <div className="subredditPageThread">
              <Thread/>
              </div>
              
              <div className="subredditPageThread">
              <Thread/>
              </div>
              
              
            </section> 
            
            <aside id="subredditSidebarContainer">
              <div className="subredditSidebarComponent">
                <h5>COMMUNITY DETAILS</h5>
                <div className="srSidebarCompTitle">
                  <img src={defImage} alt="Subreddit Default"/>
                  r/{this.state.name}
                </div>
                <div className="srSidebarSubscribers">
                  {this.state.subscribers} <br/>
                  Subscribers
                </div>
                <div className="srSidebarRules">
                  <p>{this.state.bio}</p>
                </div>
                <button className="srSidebarSubscribeButton" >SUBSCRIBE</button>
                <button className="srSidebarSubscribeButton" >CREATE A POST</button>
              </div>
              <div className="subredditSidebarComponent">
                <h5>MODERATORS</h5>
                <ul>
                  {
                    this.state.moderators.map(moderator => {
                      return ( 
                        <li className="moderatorSr" key={moderator}>u/{moderator}</li>
                      );
                        })
                  }
                </ul>
              </div>
            </aside>
            
        <footer id="subreddit-footer">
            <p>Copyright &copy; 2019 Memestock</p>
        </footer>
        </div>
      </div>
    )
  }
}

export default Subreddit
