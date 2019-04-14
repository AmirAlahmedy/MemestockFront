import React, { Component } from 'react';
//import './CreateSubreddit.css';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from 'axios';


class CreateSubreddit extends Component {
//assume all submitted for now
constructor(props) {
  super(props);
  this.state = {

    Subreddit: '',
    Rule1:'',
    Rule2 :'',
    Rule3 : '',
    bio:''
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
  srName : this.state.Subreddit,
  srRules: [this.state.Rule1,this.state.Rule2,this.state.Rule3]
  //bio:this.state.bio
  } 
  let checker ="";
  
  if (document.getElementById("subredditNameField").value===checker)
  {
    alert ("Please provide a Subreddit name!");
    return ;
  }
  else if (document.getElementById("SubredditRuleField1").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("SubredditRuleField2").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("SubredditRuleField3").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("SubredditBioField").value===checker)
  { alert ("Please provide a Subreddit Bio For the audience!");
    return ;
  }
  
  //  axios({
  //   method: 'post', //you can set what request you want to be
  //   url: 'http://localhost:4000/sr/create',
  //   data: {srName: srdata.srName,srRules:srdata.srRules},
  //   headers: {
  //     auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHb29kR3V5cyIsImlhdCI6MTU1NTEwMDEyOX0.Fz8Abtwx-vmoKnncKdmJr-_kYb4Zl-YPQJeO26iMaFA'
  //   }
  // })
  let headers = {
    // 'Content-Type':'application/json',
    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHb29kR3V5cyIsImlhdCI6MTU1NTEwMDEyOX0.Fz8Abtwx-vmoKnncKdmJr-_kYb4Zl-YPQJeO26iMaFA'
   } 
  axios.post( 'http://localhost:4000/sr/create',srdata.srName, srdata.srRules, headers)             //srdata.srName,srdata.srRules,{headers: headers})// document.getElementById("subredditNameField").value, [document.getElementById("SubredditRuleField1").value,document.getElementById("SubredditRuleField2").value,document.getElementById("SubredditRuleField3").value]
  .then(res => {
    console.log(res);
    console.log(res.status);
        
    //in case sucess..
    alert("Your Subreddit was sucessfully Created");  
  })
  .catch(error => {
  console.log("Axios Error: ",error.response)
  // this.setState({
  // error:true,
  // submitting:false
  // });
  // if
  // (error.response.statusText==="Forbidden")
  // {
  //   alert("subject is too long");
  // }
  //   else if (error.response.statusText==="Not Found")
  // {
  //   alert ("User not Found");
  // }
  // else
  // {
  //  alert("internal server error");
  // }      
  });
}
  render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label for="subredditName">Subreddit Name</Label>
          <Input type="text" name="text" id="subredditNameField" placeholder="Think of something remarkable!" value={this.state.value} 
          onChange={this.handleChange} />
        </FormGroup>
        {/*
        <FormGroup>
          <Label for="rulesNumberSelect">Select Number of Rules to add!</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        */}
        <FormGroup>
          <Label for="SubredditRule">Subreddit Rule:</Label>
          <Input type="textarea" name="text" id="SubredditRuleField1" placeholder = "ex: Flamers will be banned! " value={this.state.value}  onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="SubredditRule">Subreddit Rule:</Label>
          <Input type="textarea" name="text" id="SubredditRuleField2" placeholder = "ex: Flamers will be banned! " value={this.state.value}  onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="SubredditRule">Subreddit Rule:</Label>
          <Input type="textarea" name="text" id="SubredditRuleField3" placeholder = "ex: Flamers will be banned! " value={this.state.value}  onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="SubredditRule">Subreddit Bio:</Label>
          <Input type="textarea" name="text" id="SubredditBioField" placeholder = "ex: This subreddit is for people who..etc. " value={this.state.value}  onChange={this.handleChange}/>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
      </div>
    )
  }
}
export default CreateSubreddit;
