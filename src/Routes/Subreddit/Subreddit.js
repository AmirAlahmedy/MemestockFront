import React, { Component } from 'react';
import './Subreddit.css';
import defImage from '../../assets/images/subreddit.png';
import Listings from '../../Components/Listings/Listings';
import Thread from '../Thread/Thread';
import { Link, Route, Switch, Router } from 'react-router-dom';
import data from '../../Mocks/subreddit-data.json';

import axios from '../../axios-orders';


let inDev = false;

export class Subreddit extends Component {
  state = {
    name: window.location.href.split("/").pop(),
    bio: '',
    threads: [],
    moderators: '',
    moderatorsList: [],
    subscribers: 0,
    subscribersList: [],
    date: '',
    rules: [],
    posts: [],
    subscribed: false,
    adminview: false,
    threadCreation: false,
    subredditEdit: false,
    threadsContent: [],
    flair: null,
    spoiler: false,
  }

  componentDidMount() {

    console.log("mounted");

    if (inDev === false) // && ginprodReducer.globalInProduction)
    {
      let srName = this.state.name;
      axios.get('/sr/' + srName + '/meta')
        .then(resp => {
          console.log(resp);
          console.log(resp.data);
          if (resp.status == 200) {
            console.log(resp.data);
            this.setState({
              name: this.state.name,
              bio: resp.data.Bio,
              threads: resp.data.posts,
              moderators: resp.data.adminUsername,
              moderatorsList: resp.data.modUsername ? resp.data.modUsername : [resp.data.adminUsername],
              subscribers: resp.data.subscribed_users.length,
              subscribersList: resp.data.subscribed_users,
              subscribed: resp.data.subscribed_users.includes(localStorage.getItem("Username")) ? true : false,
              adminview: resp.data.modUsername.includes(localStorage.getItem("Username")) ? true : false,
              date: resp.data.date,
              rules: resp.data.rules,
              cover: resp.data.subredditFile
            }, () => {
              const isAdmin = this.state.moderators === localStorage.getItem("Username")
                || this.state.moderatorsList.includes(localStorage.getItem("Username"));
              this.setState({
                adminview: isAdmin,
                //subscribed: isAdmin
              })
            })
            for (const threadID of resp.data.posts) {
              axios.get(`/sr/${srName}/thread/${threadID}`)
                .then(resp => {
                  if (resp.data && resp.status === 200) {
                    let threads = this.state.threadsContent;
                    threads.push(resp.data);
                    this.setState({
                      threadsContent: threads
                    });
                  }
                });
            }
          }
          else if (resp.status === 404) {
            alert("Subreddit Not Found");
            return Response.json;
          }
        })
        .catch(error => {
          // alert(cons);
          console.log(error);
        })
    }
    else {

      this.setState({
        bio: data.subreddit.bio,
        threads: data.subreddit.threads,
        moderators: data.subreddit.adminUsername,
        subscribers: data.subreddit.subscribers,
        date: data.subreddit.date,
        rules: data.subreddit.rules,
      });
    }
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("Username");
    for (let i = 0; i < this.state.subscribers; i++) {
      if (username == this.state.subscribersList[i] || username == this.state.moderatorsList[i] || username == this.state.moderatorsList) {
        this.setState({
          subscribed: true
        })
      }
      if (username == this.state.moderators) {
        this.setState({
          adminview: true
        })
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  handleChange(e) {
    this.setState({
      spoiler: e.target.checked
    });
  }

  /**
   * For sending a subscribe request to the backend and updating the subscribed boolean state
   * @function srSubscribe
   * @param {event} - onClick event 
   */
  srSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe Clicked');
    let headers = {
      auth: localStorage.getItem("token")
    }
    let SubredditName = this.state.name;
    axios.post('/sr/' + SubredditName + '/subs', null, { "headers": headers })
      .then(res => {
        if (res.status == 200) {
          console.log(res);

          console.log('subscribed!')
          this.setState({
            subscribed: true
          }
          );
        } else if (res.status === 404) {
          alert("Subreddit Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
  }
  /**
    * For sending an Unsubscribe request to the backend and updating the subscribed boolean state
    * @function srUnSubscribe
    * @param {event} - onClick event 
    */
  srUnSubscribe = (e) => {
    e.preventDefault();
    console.log('Unsubscribe Clicked');
    let headers = {
      auth: localStorage.getItem("token")
    }
    let SubredditName = this.state.name;
    axios.delete('/sr/' + SubredditName + '/subs', { "headers": headers })
      .then(res => {
        if (res.status == 200) {
          console.log(res);
          this.setState({
            subscribed: false
          }
          );
        } else if (res.status === 404) {
          alert("Subreddit Not Found");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
  }
  /**
    * For sending an delete request to the backend to delete the entire subreddit from the database
    * @function srUnSubscribe
    * @param {event} - onClick event 
    */
  delSubreddit = (e) => {
    e.preventDefault();
    console.log('Del Subreddit Clicked');
    let headers = {
      auth: localStorage.getItem("token")
    }
    let SubredditName = this.state.name;
    axios.delete('/sr/' + SubredditName, { "headers": headers })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          alert("Subreddit Deleted Successfully!");
          this.setState({
            subscribed: false
          }
          );
        }
        else if (res.status === 401) {
          alert("You're Not Authorised");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })

  }
  /**
    * For changing the GUI and showing the fields for the thread creation
    * @function createThreadSidebar
    * @param {event} - onClick event 
    */
  createThreadSidebar = (e) => {
    e.preventDefault();
    console.log('Clicked on create thread sidebar');
    if (this.state.subscribed == false) {
      //CANNOT CREATE A POST UNLESS SUBSCRIBED
      alert('CANNOT CREATE A POST UNLESS SUBSCRIBED');
    }
    else {
      this.setState({
        threadCreation: true
      })

    }
  }
  /**
         * For changing the GUI and hiding the fields for the thread creation
         * @function CancelCreation
         * @param {event} - onClick event 
         */
  CancelCreation = (e) => {
    e.preventDefault();
    console.log('Clicked on Cancel thread sidebar');
    this.setState({
      threadCreation: false
    })
  }
  editSubreddit = (e) => {
    e.preventDefault();
    console.log("Clicked on the edit subredditbutton");
    if (this.state.adminview == false) {
      //CANNOT CREATE A POST UNLESS SUBSCRIBED
      alert('CANNOT EDIT A SUBREDDIT UNLESS IS MODERATOR');
    }
    else {
      this.setState({
        subredditEdit: true
      })
    }
  }
  cancelSubreddit = (e) => {
    e.preventDefault();
    console.log('Clicked on Cancel thread sidebar');
    this.setState({
      subredditEdit: false
    })
  }

  /**
   * For sending an post request to the backend and creating a thread in this subreddit
   * @function handleSubmit
   * @param {event} - onClick event 
   */
  handleSubmit = (e) => {
    e.preventDefault();

    const srdata = {
      "title": document.getElementById("threadTitleField").value,
      "threadBody": document.getElementById("threadBodyField").value,
      "spoiler": this.state.spoiler
    }
    if (this.state.imagePost) {
      srdata.base64image = this.state.imagePost
    }
    let headers = {
      auth: localStorage.getItem("token")
    }
    let SubredditName = this.state.name;
    axios.post('/sr/' + SubredditName + '/thread', srdata, { "headers": headers })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          alert("Thread Created Successfully!");
        } else if (res.status === 401 || res.status === 404) {
          alert("Thread Creation Unsuccessful");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Errorrrrrrr Caught");
      })
  }

  handleEdit = (e) => {
    e.preventDefault();
    let newmods = this.state.moderatorsList;
    const newMod = document.getElementById("subredditmoderatorField").value;
    if (newMod) {
      newmods.push(newMod);
    }
    const srdata = {
      "newName": document.getElementById("subredditNameField").value,
      "newRules": [document.getElementById("subredditRule1Field").value, document.getElementById("subredditRule2Field").value, document.getElementById("subredditRule3Field").value],
      "newBio": document.getElementById("subredditBioField").value,
      "newMods": newmods,
      "base64image": this.state.image
    }

    let headers = {
      auth: localStorage.getItem("token")
    }
    let SubredditName = this.state.name;
    axios.put('/sr/' + SubredditName, srdata, { "headers": headers })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          alert("Thread Created Successfully!");
          let srName = this.state.name;
          axios.get('/sr/' + srName + '/meta')
            .then(resp => {
              console.log(resp);
              if (resp.status == 200) {
                console.log(resp.data.rules);
                console.log("length", resp.data.posts.length)
                window.location.href = "/r/" + SubredditName;
              }
            })
        } else if (res.status === 401 || res.status === 404) {
          alert("Thread Creation Unsuccessful");
          return Response.json;
        }
      })
      .catch(error => {
        alert("Error Caught");
      })
  }
  getThreads() {
    if (!this.state.threadsContent) return;
    return this.state.threadsContent.map(thr =>
      <Thread
        id={thr._id}
        username={thr.creatorUsername}
        subreddit={thr.subredditName}
        title={thr.title}
        content={thr.body}
        upvotes={thr.votes}
      />);
  }
  /**
  * For changing the GUI and hiding the fields for the thread creation
  * @function CreateFlair 
  * @param {event} - Submition event 
  */
  CreateFlair(e) {
    e.preventDefault();

    let body = {
      srName: this.state.name,
      flair: e.target.querySelector('.flairInput').value
    }
    let headers = {
      'auth': localStorage.getItem('token')
    }
    axios.post('/user/CreateFlair', body, { "headers": headers })
      .then(response => {
        console.log('flair response', response);
        //Na hash3'al l server bta3 l backend 3andi 3shan hazbot feeh 7agat 
        //Ha sharo fa l mafrod ysht3'al...
        this.setState({
          flair: body.flair
        })
      })
      .catch(error => {

      })
  }
  handleNewImage(e) {
    const files = e.target.files;
    if (!files || !files.length) return;

    const reader = new FileReader();

    reader.onload = (eReader) => {
      if (!eReader.target || !eReader.target.result) return;
      this.setState({
        image: eReader.target.result
      });
    }

    reader.readAsDataURL(files[0]);

  }
  handleNewImagePost(e) {
    const files = e.target.files;
    if (!files || !files.length) return;

    const reader = new FileReader();

    reader.onload = (eReader) => {
      if (!eReader.target || !eReader.target.result) return;
      this.setState({
        imagePost: eReader.target.result
      });
    }

    reader.readAsDataURL(files[0]);

  }
  render() {
    console.log(this.state.flair);
    return (
      <div className="subredditFixed">
        <section id="subredditShowcase" style={{ backgroundImage: this.state.cover ? `url(http://18.217.163.16/api${this.state.cover})` : null }}>
          <img src={defImage} alt="Subreddit Default" />
          <h1>r/{this.state.name}</h1>
        </section>

        {/*<nav id="subredditNavbar">
          <div className="subredditContainer">
            <div id="subredditSort">
              <div className="subredditContainer">

                <div className="srSortdropdownMenu">
                  <button className='srSortdropButton'>
                    Sorting <i class="downIcon fas fa-sort-down"></i>
                  </button>
                  <div role='menu' className='srdropList'>
                    <ul className='srSortdropUl'>
                      <li className='srSortdropdownItem' className='sort toHome'>Hot</li>
                      <li className='srSortdropdownItem' className='sort toHome'>New</li>
                      <li className='srSortdropdownItem' className='sort toHome'>Controversial</li>
                      <li className='srSortdropdownItem' className='sort toHome'>Top</li>
                      <li className='srSortdropdownItem' className='sort toHome'>Rating</li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </nav>*/}
        <div class="subredditContainer">
          <section id="subredditPageContent">
            <div>
              {this.getThreads()}

            </div>
          </section>

          <aside id="subredditSidebarContainer">
            <div className="subredditSidebarComponent">
              <h5>COMMUNITY DETAILS</h5>
              <div className="srSidebarCompTitle">
                <img src={defImage} alt="Subreddit Default" />
                r/{this.state.name}
              </div>
              <div className="srSidebarSubscribers">
                {this.state.subscribers} <br />
                Subscribers
                </div>
              <div className="srSidebarBio">
                <p>{this.state.bio}</p>
              </div>
              {
                this.state.moderators === localStorage.getItem("Username") ? <span></span>
                  : this.state.subscribed ? <button className="srSidebarSubscribeButton" onClick={this.srUnSubscribe}>UNSUBSCRIBE</button>
                    : <button className="srSidebarSubscribeButton" onClick={this.srSubscribe}>SUBSCRIBE</button>
              }
              <button className="srSidebarSubscribeButton" onClick={this.createThreadSidebar}>CREATE A POST</button>
            </div>
            {
              this.state.subredditEdit ?
                <div className="subredditSidebarComponent">
                  <h5>EDIT SUBREDDIT</h5>
                  <hr></hr>
                  <form onSubmit={this.handleEdit}>
                    <div className="formGroupSrComponent">
                      <label for="Subreddit New Name">Enter Subreddit Name</label>
                      <textarea type="textarea" name="text" id="subredditNameField" placeholder="Enter Name Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="Rule1">Enter Rule </label>
                      <textarea type="textarea" name="text" id="subredditRule1Field" placeholder="Enter Rule Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="Rule2">Enter Rule </label>
                      <textarea type="textarea" name="text" id="subredditRule2Field" placeholder="Enter Rule Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="Rule3">Enter Rule </label>
                      <textarea type="textarea" name="text" id="subredditRule3Field" placeholder="Enter Rule Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="Bio">Enter Bio </label>
                      <textarea type="textarea" name="text" id="subredditBioField" placeholder="Enter Bio Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="Bio">Add a new moderator </label>
                      <textarea type="textarea" name="text" id="subredditmoderatorField" placeholder="Enter Moderator Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="cover">Cover </label>
                      <input type="file" name="cover" id="cover" onChange={this.handleNewImage.bind(this)} />
                    </div>
                    <button className="srSidebarSubscribeButton">Edit Subreddit</button>
                    <button type="button" className="srSidebarSubscribeButton" onClick={this.cancelSubreddit}>CANCEL</button>
                  </form>
                </div> : <div></div>
            }
            {
              this.state.threadCreation ?
                <div className="subredditSidebarComponent">
                  <h5>CREATE A POST</h5>
                  <hr></hr>
                  <form onSubmit={this.handleSubmit}>
                    <div className="formGroupSrComponent">
                      <label for="ThreadTitle">Enter Title</label>
                      <textarea type="textarea" name="text" id="threadTitleField" placeholder="Enter Title Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="ThreadBody">Enter Thread Body</label>
                      <textarea type="textarea" name="text" id="threadBodyField" placeholder="Enter Body Here" />
                    </div>
                    <div className="formGroupSrComponent">
                      <label for="coverPost">Cover </label>
                      <input type="file" name="coverPost" id="coverPost" onChange={this.handleNewImagePost.bind(this)} />
                    </div>
                    <div className="formGroupThreadCheckbox">
                      <label className="spoilerLabel" for="Spoiler">Is it a spoiler?</label>
                      <input type="checkbox" name="Spoiler" id="Spoiler" onChange={this.handleChange} value={this.state.spoiler} />
                    </div>
                    <button className="srSidebarSubscribeButton" >CREATE</button>
                    <button className="srSidebarSubscribeButton" onClick={this.CancelCreation}>CANCEL</button>
                  </form>
                </div> : <div></div>
            }
            <div className="subredditSidebarComponent">
              <h5>MODERATORS & ADMINS</h5>
              <ul>
                {/*<li className="moderatorSr" ><Link to={`/user/${this.state.moderators}`}>u/{this.state.moderators}</Link></li> */}
                {
                  this.state.moderatorsList.map(moderator => {
                    return (
                      <li className="moderatorSr" key={moderator}><Link to={`/user/${this.state.moderators}`}>u/{this.state.moderators}</Link></li>
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
                    return (
                      <li className="rulesSr" key={rule}>{rule}</li>
                    );
                  })
                }
              </ol>
            </div>

            {
              this.state.adminview ? <button className="srSidebarSubscribeButton" onClick={this.editSubreddit}>Edit Subreddit</button> : <div></div>
            }
            {
              this.state.adminview ? <button className="srDeleteButton" onClick={this.delSubreddit}>Delete Subreddit</button> : <div></div>
            }
            <div className="subredditSidebarComponent flairComp">
              <h5>CREATE YOUR OWN NAME</h5>
              <form id='flairForm' onSubmit={this.CreateFlair.bind(this)}>
                <input
                  className='flairInput'
                  type='text'
                  placeholder='Flair' />
                <button className="srSidebarSubscribeButton" type='submit' >Create a flair</button>
              </form>

            </div>

          </aside>

        </div>
      </div >
    )
  }
}

export default Subreddit
