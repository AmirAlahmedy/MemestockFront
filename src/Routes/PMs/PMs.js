import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './PMs.css';
import Head from  './components/Head';
import inbox from  './components/pages/inbox';
import sent from  './components/pages/sent';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
class PMs extends Component {
   //assume all submitted for now
   constructor(props) {
    super(props);
    this.state = {
   
      To: 'Mohamed',
      Subject:'Software',
      Message :'we need to handle our project'
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) { 
      event.preventDefault();
      let checker ="";

      if (document.getElementById("1").value===checker)
      {
        alert ("Please provide a username");
        return false;
      }
      else if (document.getElementById("2").value===checker)
      
        {alert ("Please provide a Subject");
      return false;}
      
    else if  (document.getElementById("3").value===checker)
    {
      alert ("Please provide a Message");
      return false;
    }
  }
    
    
  
 render()
  {

    return (
      <Router>
             <Head/>
      
          <div className="container">
                  <div className="pm-form">
                      

                            <Route exact path="/" render = {props=>(
                              <React.Fragment>
                          
                                <form name="myForm"
                              onSubmit={this.handleSubmit}>
                              <div>
                                <label>To:</label>
                                <textarea className="To"
                                          id="1"
                                placeholder ="(username, or /r/name for that subreddit's moderators)"
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                
                                           /> 
                                </div>
                        
                                <div>
                                <label>Subject:</label>
                                <textarea className="Subject"
                                            id="2"
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                 />
                                </div>
                          
                                <div>
                                <label>Your Message:</label>
                               <textarea className="Message"
                                          id="3"
                                 value={this.state.value} 
                                 onChange={this.handleChange} 
                                  />  
                               </div>
                               <input type="submit" value="Submit" />      
                               </form>


                              </React.Fragment>
                            )} />
                              
                          <Route path="/inbox" component={inbox}/>
                          <Route path="/sent" component={sent}/>
                    </div>    
           </div>
    
  </Router>
    
    );
    }
}

export default PMs;
