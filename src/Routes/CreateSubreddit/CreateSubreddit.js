import React, { Component } from 'react';
import './CreateSubreddit.css';

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
  
  if (document.getElementById("srSubredditName").value===checker)
  {
    alert ("Please provide a Subreddit name!");
    return ;
  }
  else if (document.getElementById("srSubredditRule1").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("srSubredditRule2").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("srSubredditRule3").value===checker)
  { alert ("Please provide a Subreddit Rule!");
    return ;
  }
  else if (document.getElementById("srSubredditBio").value===checker)
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
    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJLYXJpbSIsImlhdCI6MTU1NTI4NTc5M30.nKpRwi_EfA6ZBmGoE56MlRJ-N7DpdxmEyjua0h8UyKg'
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

      <div className="createSubredditContainer">
      <h3>CREATE A SUBREDDIT</h3>
      <hr></hr>
      <form onSubmit={this.handleSubmit}>
        <div className="formGroupSubredditComponent">
        <label for="SubredditName">Enter Subreddit Name</label>
        <br></br>
        <input type="text" name="text" id="srSubredditName" placeholder = "Think of something remarkable!" onChange={this.handleChange} value={this.state.value}/>   
        </div>
        <div className="formGroupSubredditComponent">
        <label for="SubredditRule">Subreddit Rule:</label>
        <textarea type="textarea" name="text" id="srSubredditRule1" placeholder = "ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value}/>   
        </div>
        <div className="formGroupSubredditComponent">
        <label for="SubredditRule">Subreddit Rule:</label>
        <textarea type="textarea" name="text" id="srSubredditRule2" placeholder = "ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value}/>  
        </div>
        <div className="formGroupSubredditComponent">
        <label for="SubredditRule">Subreddit Rule:</label>
        <textarea type="textarea" name="text" id="srSubredditRule3" placeholder = "ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value}/>  
        </div>
        <div className="formGroupSubredditComponent">
        <label for="SubredditBio">Subreddit Bio:</label>
        <textarea type="textarea" name="text" id="srSubredditBio" placeholder = "ex: This subreddit is for people who..etc. " onChange={this.handleChange} value={this.state.value}/>  
        </div>
        <button className="srSubredditPageCreateButton">CREATE</button>  
      </form>
      </div>
   
    )
  }
}
export default CreateSubreddit;
