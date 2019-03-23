import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import './PMs.css';
import Head from  './Head';
import inbox from  './pages/inbox';
import sent from  './pages/sent';
import Aux from '../../Components/HOC/Auxiliary';

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

   /**
     * Handles change in PM inputs.
     * @function handleChange
     * @param {event} e - The change of the PM inputs.
     */
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Handles PM submit.
     * @function handleSubmit
     * @param {event} e - The submission of the PM form.
     */
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
        <Aux>


             <Head/>
      
          <div className="container">
                 <div className="pm-form">
                      

                  <Route exact path="/PM/Compose" render = {props=>(
                    <React.Fragment>
                    
                      <form name="myForm"
                        onSubmit={this.handleSubmit}>
                        <div>
                          <label>To:</label>
                          <textarea 
                              className="To"
                              id="1"
                              placeholder ="(username, or /r/name for that subreddit's moderators)"
                              value={this.state.value} 
                              onChange={this.handleChange} 
                           
                              /> 
                        </div>
                  
                          <div>
                            <label>Subject:</label>
                            <textarea 
                                className="Subject"
                                id="2"
                                value={this.state.value} 
                                onChange={this.handleChange} 
                               
                            />
                          </div>
                    
                          <div>
                            <label>Your Message:</label>
                            <textarea 
                                className="Message"
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
    
          </Aux>
      </Router>
    
    );
    }
}

export default withRouter(PMs);
