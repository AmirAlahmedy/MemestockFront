import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom';
import CardProf from '../CardProf/CardProf';
import CardUser from '../CardUser/CardUser';
import './User.css';
import axios from "../../axios-orders";
import Aux from '../HOC/Auxiliary';
import Moderation from '../../Routes/ModerationPage/ModerationPage';
import Flairs from './Flairs/Flairs';
import Thread from '../../Routes/Thread/Thread'
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      cakeday: '',
      savedPosts: [],
      checkuser: this.props.match.params.username || localStorage.getItem("Username"),
      posts: [],
      comments: []
    }
    //
    //Eshta na m3ak aho
  };

  getCurrentUser() {
    return localStorage.getItem("Username");
  }

  componentDidMount() {
    console.log("propaaat")
    console.log(this.props);
    console.log("username: ", this.state.checkuser);
    const headers = {
      'auth': localStorage.getItem("token")
    }
    let username = this.state.checkuser;
    axios.get('/user/info/' + username, { "headers": headers })
      .then(res => {
        console.log(res);
        console.log(res.data);

        if (res.status == 200) {
          this.setState({
            username: res.data.Username,
            cakeday: res.data.cakeday
          });

          //   for (let post of res.data.savedPosts) {
          //     axios.get('/user/info/'+ username , { "headers": headers })
          //        .then(res => {
          //           if (res.data && res.status === 200) {
          //              let posts = this.state.savedPosts;
          //              for(const postState of posts){
          //                 if(postState._id === post._id){
          //                   //Na b3ml 7aga h5lasha w a-chek
          //                   //msh mla7ez en fi syntax error aslun? :'D
          //                    postState.children = res.data;//di el req el betgeeb el posts beta3et
          //                    //el user w el mfrood enaha kda khelset yaani chayek keda
          //                 }
          //              }
          //              this.setState({
          //                 savedPosts: res.data.savedPosts
          //              })
          //           }
          //        });
          //  }
        }
      })
      .catch(error => {
        console.log(error.res)
        alert("Error")
      });

    axios.get(`/user/${this.state.checkuser}/posted`, { headers: headers })
      .then((resp) => {
        this.setState({
          comments: resp.data.comments,
          posts: resp.data.posts
        });

      })
      .catch(e => {
        //Imagine it's handling it...
      });



  }





  goTo(link) {
    return function () {
      window.location.href = link;
    }
  }

  render() {
    return (
      <Aux>

        <CardProf cake={this.state.cakeday} q={this.state.username}></CardProf>

          <div className="ana">
            <div className="aho">


              <nav className="navbar navbar-expand-lg navbar-light bg-light profnav">
                <ul className="navbar-nav mr-auto proful">

                  <li className="nav-item profit1">
                    <span className="nav-link"><a className='profit default' href="#posts">Posts</a></span>
                  </li>
                  <li className="nav-item profit1">
                    <span className="nav-link"><a className='profit' href="#comments">Comments</a></span>
                  </li>
                  {this.state.checkuser === localStorage.getItem("Username") ?
                    <li className="nav-item profit1">
                      <span className="nav-link"><a className='profit' href="#flair">Flairs</a></span>
                    </li>
                    : null}

                </ul>

              </nav>


            </div>





              <Route exact path='/moderation' component={Moderation} />

            {window.location.href.includes("#flair") && this.state.checkuser === localStorage.getItem("Username") ? <Flairs /> : null}
            {window.location.href.includes("#posts") || (!window.location.href.includes("#comments") && !window.location.href.includes("#flair")) ?
              this.state.posts.map(thr => {
                return (
                  <Thread
                    id={thr._id}
                    username={thr.creatorUsername}
                    subreddit={thr.subredditName}
                    title={thr.title}
                    content={thr.body}
                    upvotes={thr.votes}
                    isSpoiler={thr.spoiler}
                    image={thr.postFile === "none" ? null : thr.postFile}
                  />
                )
              })
              : null}

            {window.location.href.includes("#comments") ?
              this.state.comments.map(comment => {
                return (
                  <div className="commentContainer">
                    <a href={`/r/${comment.subreddit}`} className="commentSR">r/{comment.subreddit} </a>
                    <div className="commentUser">u/{comment.username} </div>
                    <div className={`comment ${comment.spoiler ? "spoiler" : ""}`}>{comment.content}</div>
                  </div>)
              })
              : null}

          </div>



      </Aux>







    )
  }
}

export default User

