import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Listings from '../../Components/Listings/Listings';
import Thread from '../Thread/Thread';
import {Link,Route,Switch,Router} from 'react-router-dom';
import data from '../../Mocks/subreddit-data.json';  

import axios from 'axios';
//import ginprodReducer from '../../store/reducers/production';


let inDev = false;

export class Subreddit extends Component {
    state ={
        name:'OneTwoThree',
        bio:'',
        threads:[],
        moderators:[],
        subscribers: 0,
        date:'',
        rules:[],
        posts:[],
        subscribed:false,
        adminview:true,
        threadCreation:false
    }
  
    componentDidMount () { 

      console.log("mounted");

      if(inDev === false ) // && ginprodReducer.globalInProduction)
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
              bio: resp.data.Bio,
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
          rules:data.subreddit.rules,
        });
      }
   }
   srSubscribe = (e) => {
      e.preventDefault();
      console.log('Subscribe Clicked');
      let headers = {
        auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJmZmZmIiwiaWF0IjoxNTU1MzYxODI3fQ.Bk7rNdYB1ccV7MhKqoOGGOp-ppj4as0BeNZ3GkA7Tns'
      }
      let SubredditName = this.state.name;
      axios.post( 'http://localhost:4000/sr/'+SubredditName+'/subs',null, {"headers": headers})
      .then(res => {
        if (res.status==200)
        {
          console.log(res);
          
          console.log('subscribed!')
          this.setState({
            subscribed:true
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
    console.log('Unsubscribe Clicked');
    let headers = {
      auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJmZmZmIiwiaWF0IjoxNTU1MzYxODI3fQ.Bk7rNdYB1ccV7MhKqoOGGOp-ppj4as0BeNZ3GkA7Tns'
    }
    let SubredditName = this.state.name;
    axios.delete( 'http://localhost:4000/sr/'+SubredditName+'/subs',{"headers": headers})
    .then(res => {
      if (res.status==200)
      {
        console.log(res);
        this.setState({
          subscribed:false
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
  delSubreddit = (e) => { 
    e.preventDefault();
    console.log('Del Subreddit Clicked');
    let headers = {
      auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
    }
    let SubredditName = this.state.name;
    axios.delete( 'http://localhost:4000/sr/'+SubredditName,{"headers": headers})
    .then(res => {
      console.log(res);
      if (res.status==200)
      { 
        alert("Subreddit Deleted Successfully!");
        this.setState({
          subscribed:false
        }
        );
      }
      else if (res.status===401)
      {
        alert("You're Not Authorised");
        return Response.json;
      }
    })
    .catch(error => {
      alert("Error Caught");
    })

  }
  createThreadSidebar = (e) =>{
    e.preventDefault();
    console.log('Clicked on create thread sidebar');
    // if(subscribed==false)
    // {
    //   alert('Cant Create Post without subscribing')
    // }
    this.setState({
      threadCreation:true
    })
  }
  CancelCreation = (e) => {
    e.preventDefault();
    console.log('Clicked on Cancel thread sidebar');
    this.setState({
      threadCreation:false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
   
      const srdata= {
        "title" : document.getElementById("threadTitleField").value,
        "threadBody" : document.getElementById("threadBodyField").value
      }
    
 
    let headers = {
      auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
    }
    let SubredditName = this.state.name;
    axios.post('http://localhost:4000/sr/'+SubredditName+'/thread',srdata,{"headers": headers})
    .then(res => {
      console.log(res);
      if (res.status==200)
      { 
        alert("Thread Created Successfully!");
        let srName= this.state.name;
        axios.get('http://localhost:4000/sr/'+srName+'/meta')
        .then(resp => {
          console.log(resp);
          if (resp.status==200)
          {
            console.log(resp.data.rules);
            this.setState({
              threads:resp.data.posts
            })
          }
        })
      }else if (res.status===401 || res.status===404)
      {
        alert("Thread Creation Unsuccessful");
        return Response.json;
      }
     })
     .catch(error => {
       alert("Error Caught");
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
                <div> 
                    {
                      this.state.threads.map(thread => {
                      //console.log(thread);
                      let srName=this.state.name;
                      let post = {
                        title:'',
                        body:''
                      }
                      axios.get('http://localhost:4000/sr/'+srName+'/thread/'+thread)
                      .then(resp => {
                            //console.log(resp);
                            if (resp.status==200)
                            {
                              console.log(resp.data)
                              post.title=resp.data.title;
                              post.body=resp.data.body;
                            }
                            else if (resp.status===404){
                              alert("Thread Not Found");
                              return Response.json;
                            }
                          })
                          .catch(error => {
                            alert("Error Caught");
                          })
                          return(
                            <div className="subredditPageThread">
                            {console.log(post.body)}
                              <Thread props={{title:post.title, content:post.content, subreddit: this.state.name}}/>                         }
                            </div>
                          );
                        })
                      }
                      
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
                <button className="srSidebarSubscribeButton" onClick={this.createThreadSidebar}>CREATE A POST</button>
              </div>
              { 
                this.state.threadCreation ?
              <div className="subredditSidebarComponent">
                <h5>CREATE A POST</h5>
                <hr></hr>
                <form onSubmit={this.handleSubmit}>
                  <div className="formGroupSrComponent">
                  <label for="ThreadTitle">Enter Title</label>
                  <textarea type="textarea" name="text" id="threadTitleField" placeholder = "Enter Title Here" />   
                  </div>
                  <div className="formGroupSrComponent">
                  <label for="ThreadBody">Enter Thread Body</label>
                  <textarea type="textarea" name="text" id="threadBodyField" placeholder = "Enter Body Here" />  
                  </div>
                  <button className="srSidebarSubscribeButton">CREATE</button>
                  <button className="srSidebarSubscribeButton" onClick={this.CancelCreation}>CANCEL</button>  
                </form>
              </div> : <div></div>
              }
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
              {
                this.state.adminview ?  <button className="srDeleteButton" onClick={this.delSubreddit}>Delete Subreddit</button> : <div></div>
              }
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
