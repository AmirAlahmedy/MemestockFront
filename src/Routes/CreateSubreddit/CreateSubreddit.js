import React, { Component } from 'react';
import './CreateSubreddit.css';
import axios from '../../axios-orders';

class CreateSubreddit extends Component {

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
  /**
     * For sending a creation of subreddit request to the backend 
     * @function handleSubmit
     * @param {event} - onClick event 
     */

handleSubmit (e){
  e.preventDefault();

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
  var srdata ={
    srName : document.getElementById("srSubredditName").value,
    srRules: [document.getElementById("srSubredditRule1").value,document.getElementById("srSubredditRule2").value,document.getElementById("srSubredditRule3").value]
    } 
  let headers = {
        auth: localStorage.getItem("token") 
  } 
    axios.post( 'sr/create',srdata,{"headers": headers})
    .then(res => {
      console.log(res);
      console.log(res.status);
      window.location.href = "/r/" + srdata.srName;
    })
    .catch(error => {
    console.log("Axios Error: ",error.response)

  });
}

componentDidMount() {
  document.body.classList.add("verticalAlign");
}
componentWillUnmount() {
  document.body.classList.remove("verticalAlign");
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
