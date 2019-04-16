import React, { Component } from 'react';
import './CreatePost.css';

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from 'axios';


class CreatePost extends Component {
//assume all submitted for now
constructor(props) {
  super(props);
  this.state = {

    title: '',
    body:'',
    subreddit :''
  }
  
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
};



handleChange(event) {
this.setState({ [event.target.name]: event.target.value });
}

  /**
     * For sending a creation post request to the backend 
     * @function handleSubmit
     * @param {event} - onClick event 
     */
    
handleSubmit (e){
  e.preventDefault();
  var srdata ={
   title: document.getElementById("threadPageSubredditNameField").value,
   body : document.getElementById("threadPageBodyField").value
  } 
  let checker ="";
  
  if (document.getElementById("threadPageSubredditNameField").value===checker)
  {
    alert ("Please provide an existing Subreddit name!");
    return ;
  }
  else if (document.getElementById("threadPageTitleField").value===checker)
  { alert ("Please provide a Thread Title!");
    return ;
  }
  else if (document.getElementById("threadPageBodyField").value===checker)
  { alert ("Please provide a Thread Body!");
    return ;
  }

  let subredditname = document.getElementById("threadPageSubredditNameField").value;
  let headers = {
    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
   } 
  axios.post( 'http://localhost:4000/sr/'+subredditname+'/thread',srdata,{"headers": headers})            //srdata.srName,srdata.srRules,{headers: headers})// document.getElementById("subredditNameField").value, [document.getElementById("SubredditRuleField1").value,document.getElementById("SubredditRuleField2").value,document.getElementById("SubredditRuleField3").value]
  .then(res => {
    console.log(res);
    console.log(res.status);
    alert("Your Thread was sucessfully Created");  
  })
  .catch(error => {
  console.log("Axios Error: ",error.response)
  });
}
  render() {
    return (
      <div className="createPostContainer">
                <h3>CREATE A POST</h3>
                <hr></hr>
                <form onSubmit={this.handleSubmit}>
                  <div className="formGroupThreadComponent">
                  <label for="SubredditName">Enter Subreddit Name</label>
                  <br></br>
                  <input type="text" name="text" id="threadPageSubredditNameField" placeholder = "Enter Existing Subreddit Name" onChange={this.handleChange} value={this.state.value}/>   
                  </div>
                  <div className="formGroupThreadComponent">
                  <label for="ThreadTitle">Enter Title</label>
                  <textarea type="textarea" name="text" id="threadPageTitleField" placeholder = "Enter Title Here" onChange={this.handleChange} value={this.state.value}/>   
                  </div>
                  <div className="formGroupThreadComponent">
                  <label for="ThreadBody">Enter Thread Body</label>
                  <textarea type="textarea" name="text" id="threadPageBodyField" placeholder = "Enter Body Here" onChange={this.handleChange} value={this.state.value}/>  
                  </div>
                  <button className="threadPageCreateButton">CREATE</button>  
                </form>
      </div>
  
    )
  }
}
export default CreatePost;
