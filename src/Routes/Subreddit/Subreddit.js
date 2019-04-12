import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Listing from '../../Components/Listings/Listings';
import Thread from '../Thread/Thread';
import {Link,Route,Switch } from 'react-router-dom';
import data from '../../Mocks/threads-data.json';  

import axios from 'axios';

export class Subreddit extends Component {
    state ={
        name:'Jazztheory',
        bio:'',
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
        subscribers:100,
        date:'10/10/2010',
        rules:['No Eating Disorders','Please be professional','Contact through moderators only'],
        subscribed:true,
    }
    
    componentDidMount () { 
      console.log("mounted");
      let srName= this.state.name;
      axios.get('http://localhost:4000/sr/'+srName+'/meta')
      .then(resp => {
        console.log(resp);
        if (resp.status==200)
        {
          console.log(resp.data.rules);
          this.setState({
            name:'Jazztheory',
            bio: 'same biooooooooooo',
            thread:resp.data.posts,
            moderators:['GiantSteps_','WreakingHavoc','CluelessBastard','IronIce','ArmagedonIsNear'],
            subscribers:100,
            date:resp.data.date,
            rules:resp.data.rules
          })
        }
        else if (resp.status===404){
          alert("Subreddit Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
   }
/*
     * For generating threads from a mock service
     * @function createSubreddit
     * @param {object} - object of the mocked subreddit
     *      
    createSubreddit = subreddit => <Subreddit 
                                    key={subreddit._id}
                                    name={subreddit.subredditName}
                                    bio={subreddit.bio} 
                                    threads={subreddit.threads}
    />;
    
    //createThreads = Threads => Threads.map(this.createThread);
*/
   srSubscribe = (e) => {
      e.preventDefault();
      console.log('clickedd');
      let SubredditName = this.state.name;
      axios.post( 'http://localhost:4000/sr/:SubredditName/subs',"qedwfruhssjdiuhd",SubredditName)
      .then(res => {
        if (res.status==200)
        {
          console.log(res);
          this.setState({
            subscribe:true
          }
          );
        }else if (res.status===404){
          alert("Subreddit Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
   }
   srUnSubscribe = (e) => {
    e.preventDefault();
    console.log('clickedd');
    let SubredditName = this.state.name;
    axios.delete( 'http://localhost:4000/sr/:SubredditName/subs',"qedwfruhssjdiuhd",SubredditName)
    .then(res => {
      console.log(res);
      this.setState({
        subscribe:false
      });
    })
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
                 <span className='srLinks'>Posts</span>
                 {/*<span className='srLinks'><Link to='./r/Rules'>Rules</Link></span>*/}
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
                <div className="srSidebarBio">
                  <p>{this.state.bio}</p>
                </div>
                {
                  this.state.subscribed ?  <button className="srSidebarSubscribeButton"  onClick={this.srUnSubscribe}>UNSUBSCRIBE</button> 
                  :<button className="srSidebarSubscribeButton"  onClick={this.srSubscribe}>SUBSCRIBE</button>
                }
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
              <div className="subredditSidebarComponent">
                <h5>RULES</h5>
                <ol>
                  {
                    this.state.rules.map(rule => {
                      let index=1;
                      return ( 
                        <li className="rulesSr" key={rule}>index{rule}</li>
                      );
                      index=index+1;
                      })
                  }
                </ol>
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
