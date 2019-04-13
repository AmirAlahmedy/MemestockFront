import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Thread from '../Thread/Thread';
import {Link,Route,Switch } from 'react-router-dom';
import data from '../../Mocks/subreddit-data.json';  

import axios from 'axios';
//import ginprodReducer from '../../store/reducers/production';


let inDev = true;

export class Subreddit extends Component {
    state ={
        name:'OneTwoThree',
        bio:'',
        threads:[],
        moderators:[],
        subscribers: 0,
        date:'',
        rules:[],
        subscribed:false,
        adminview:true
    }
    
    componentDidMount () { 

      console.log("mounted");

      if(inDev === true ) // && ginprodReducer.globalInProduction)
      {
        let srName= this.state.name;
        axios.get('http://localhost:4000/sr/'+srName+'/meta')
        .then(resp => {
          console.log(resp);
          console.log(resp.data);
          if (resp.status==200)
          {
            console.log(resp.data.rules);
            this.setState({
              name:this.state.name,
              bio: 'same biooooooooooo',
              threads:resp.data.posts,
              //moderators:resp.data.ModIds,
              //subscribers:resp.data.SubCount,
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
      else {
        this.setState({
          bio:data.subreddit.bio,
          threads:data.subreddit.threads,
          moderators:data.subreddit.moderators,
          subscribers:data.subreddit.subscribers,
          date:data.subreddit.date,
          rules:data.subreddit.rules
        });
      }
   }
   
   srSubscribe = (e) => {
      e.preventDefault();
      console.log('clickedd');
      let SubredditName = this.state.name;
      axios.post( 'http://localhost:4000/sr/'+SubredditName+'/subs',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJUaGVUb2tlbkd1eSIsImlhdCI6MTU1NTEwMzY1OH0.Ah6DOjKr5NsQROmgUGqIcYKpjJST1esDDfH7FSQmZtw",SubredditName)
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
    axios.delete( 'http://localhost:4000/sr/'+SubredditName+'/subs',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJUaGVUb2tlbkd1eSIsImlhdCI6MTU1NTEwMzY1OH0.Ah6DOjKr5NsQROmgUGqIcYKpjJST1esDDfH7FSQmZtw",SubredditName)
    .then(res => {
      console.log(res);
      this.setState({
        subscribe:false
      });
    })
  }
  delSubreddit = (e) => { 
    e.preventDefault();
    console.log('clickedd');
    let SubredditName = this.state.name;
    axios.delete( 'http://localhost:4000/sr/'+SubredditName,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJUaGVUb2tlbkd1eSIsImlhdCI6MTU1NTEwMzY1OH0.Ah6DOjKr5NsQROmgUGqIcYKpjJST1esDDfH7FSQmZtw',SubredditName)
    .then(res => {
      console.log(res);
    })

  }
  /*
  createThread = (e) => {
    e.preventDefault();
    console.log('Clicked on create thread');
    let SubredditName = this.state.name;
    axios.post('http://localhost:4000/sr/'+SubredditName+'/thread',"GoodGuys")
  }
  */

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
              
              {/*this.state.threads.map(thread =>({
                return(
                  <div className="subredditPageThread">

                  </div>
                )
              })*/}
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
                <button className="srSidebarSubscribeButton" onClick={this.createThread}>CREATE A POST</button>
                {/*
                  this.state.adminview ?  <button className="srSidebarDeleteSubredditButton"  onClick={this.delSubreddit}>Delete Subreddit</button> 
                  : <div></div>
                  */
                }
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
/*
const mapStateToProps = state => {
  return {
    ginProd: state.globalInProduction
  };
};

export default connect(mapStateToProps)(Listings);
*/