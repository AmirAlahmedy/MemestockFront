import React, { Component } from 'react'
import Button from '../UI/Button/Button';
import defImage from '../../assets/images/redditor.png'
import axios from 'axios';
import './CardProf.css';
import { NavLink } from 'react-router-dom';

export class CardProf extends Component {
  state={
    threadCreation:false
  }
  gotoMod(){
    window.location.href = "/user/moderation";
}
  createThread = (e) =>{
    e.preventDefault();
    this.setState({
      threadCreation:true
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let checker ="";
    
    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;
    if (postTitle===checker)
    {
      alert ("Please provide a Thread title!");
      return ;
    }
    else if (postBody===checker)
    { 
      alert ("Please provide a Thread Body !");
      return ;
    }
    var headers = {
      'auth':  localStorage.getItem('token')
    }
    let postName = this.state.name;
    axios.post('http://18.217.163.16/sr/'+postName+'/thread',postTitle,postBody,{headers: headers})
    .then(res => {
      console.log(res);
      if (res.status==200)
      { 
        alert("Post is created!");
      }else if (res.status===401 || res.status===404)
      {
        alert("Post not created");
        return Response.json;
      }
     })
     .catch(error => {
       alert("Error Caught");
     })
  }

  render() {
    return (
      
       <sidebar className='gamb'>
        <div className="awelhetta">
            <img src={defImage} alt="soret reddit"/>
        </div>

        <div className="tanihetta">
        <h5>Cake Day</h5> 

        <h5>Email</h5>

        </div>

        <button  onClick={this.createThread} className='new-post-button'>New post</button>
        <a onClick={this.gotoMod.bind(this)} className='mod'>Profile Moderation</a>
        { 
                this.state.threadCreation ?
              <div className="subredditSidebarComponent">
                <h5>CREATE A POST</h5>
                <hr></hr>
                <form onSubmit={this.handleSubmit}>
                  <div className="formGroupSrComponent">
                  <label for="ThreadTitle">Enter Title</label>
                  <textarea type="textarea" name="text" id="postTitle" placeholder = "Enter Title Here" />   
                  </div>
                  <div className="formGroupSrComponent">
                  <label for="ThreadBody">Enter Body</label>
                  <textarea type="textarea" name="text" id="postBody" placeholder = "Enter Body Here" />  
                  </div>
                  <button className="srSidebarSubscribeButton">CREATE</button>
                </form>
              </div> : <div></div>
              }
       </sidebar>
       
    )
  }
}


export default CardProf
