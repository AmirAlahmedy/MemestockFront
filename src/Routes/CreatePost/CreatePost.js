import React, { Component } from 'react';
//import './CreateSubreddit.css';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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


handleSubmit (e){
  e.preventDefault();
  var srdata ={
  title : this.state.title,
  body : this.state.body,
  subreddit : this.state.subreddit
  } 
  let checker ="";
  
  if (document.getElementById("threadSubredditNameField").value===checker)
  {
    alert ("Please provide an existing Subreddit name!");
    return ;
  }
  else if (document.getElementById("ThreadTitleFieldinCreation").value===checker)
  { alert ("Please provide a Thread Title!");
    return ;
  }
  else if (document.getElementById("ThreadBodyFieldinCreation").value===checker)
  { alert ("Please provide a Thread Body!");
    return ;
  }

  let headers = {
    // 'Content-Type':'application/json',
    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHb29kR3V5cyIsImlhdCI6MTU1NTEwMDEyOX0.Fz8Abtwx-vmoKnncKdmJr-_kYb4Zl-YPQJeO26iMaFA'
   } 
  axios.post( 'http://localhost:4000/sr/'+srdata.subreddit+'/thread',srdata.title, srdata.body, headers)             //srdata.srName,srdata.srRules,{headers: headers})// document.getElementById("subredditNameField").value, [document.getElementById("SubredditRuleField1").value,document.getElementById("SubredditRuleField2").value,document.getElementById("SubredditRuleField3").value]
  .then(res => {
    console.log(res);
    console.log(res.status);
        
    //in case sucess..
    alert("Your Thread was sucessfully Created");  
  })
  .catch(error => {
  console.log("Axios Error: ",error.response)
  });
}
  render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label for="threadSubredditName">Subreddit Name</Label>
          <Input type="text" name="text" id="threadSubredditNameField" placeholder="It Should be an existing subreddit" value={this.state.value} 
          onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="threadTitle">Thread Title:</Label>
          <Input type="textarea" name="text" id="ThreadTitleFieldinCreation" placeholder = "Enter Title here" value={this.state.value}  onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="threadBody">Thread Body:</Label>
          <Input type="textarea" name="text" id="ThreadBodyFieldinCreation" placeholder = "Enter Body here" value={this.state.value}  onChange={this.handleChange}/>
         </FormGroup>

        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
      </div>
    )
  }
}
export default CreatePost;
