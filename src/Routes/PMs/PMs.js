import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import './PMs.css';
import Head from './Head';
import Inbox from './pages/inbox';
import Sent from './pages/sent';
import Aux from '../../Components/HOC/Auxiliary';
import Popup from "reactjs-popup";
import axios from '../../axios-orders';
import classes from './PMs.module.css';


class PMs extends Component {
  //assume all submitted for now
  constructor(props) {
    super(props);
    this.state = {

      To: '',
      Subject: '',
      Message: '',
      submitting: false,
      error: false,
      errors:'',
      success:''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  // updating state values with form inputs each time it changes.
  /**
    * Handles change in PM inputs.
    * @function handleChange
    * @param {event} e - The change of the PM inputs.
    */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //submitting the request
  /**
   * Handles PM submit.
   * @function handleSubmit
   * @param {event} e - The submission of the PM form.
   */
  handleSubmit(event) {
    event.preventDefault();
    const msg = {
      receiverUsername: this.state.To,
      subject: this.state.Subject,
      messageBody: this.state.Message,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    //checking before posting request if a field isn't filled with any ''

    let checker = "";

    if (document.getElementById("1").value === checker) {
      alert("Please provide a username");
      return;
    }
    else if (document.getElementById("2").value === checker) {
      alert("Please provide a Subject");
      return;
    }

    else if (document.getElementById("3").value === checker) {
      alert("Please provide a Message");
      return;
    }
    console.log(msg);
    axios.post('me/pm/compose', msg, {
      headers: {
        auth: localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          error: false,
          submitting: false,
        });

        //in case sucess..
        this.setState({
         success : "Message Successfully Delievered"
        });

      })
      .catch(error => {
        console.log(error.response)
        this.setState({
          error: true,
          submitting: false
        });
        if (error && error.response && error.response.statusText) {
          if (error.response.data.error === "overLengthedSubject") {
            this.setState({
              errors: "*" + error.response.data.error +",subject Too long"
          });
            
          }
          else if (error.response.data.error === "receiverNotFound") {
            this.setState({
              errors: "*" + error.response.data.error
          });
            return;
          }
          else if (error.response.data.error === "selfMessage") {
            
            this.setState({
              errors: "*" + error.response.data.error +", Trying to send a message to yourself"
          });
            return;
          }
          else if (error.response.data.error === "blockedFromSending") {
            
            this.setState({
              errors: "*" + error.response.data.error +",Reciever blocked you"
          });
            return;
          }
        }


      });

  }


  render() {
    let error =this.state.errors != ""?<p className={classes.Invalid}>{this.state.errors}</p>:null
    let success =this.state.success != ""?<p className={classes.Invalid}>{this.state.success}</p>:null
    return (
     
      <Router>
        <Aux>
          <div style={{width: "100%"}}>
          <Head />
          <Route path="/PM" exact component={Inbox} />
          <Route path="/Sent" component={Sent} />

          
          <div className="container">
            <div className="pm-form">
            
            



              <Route exact path="/PM/Compose" render={props => (
                <React.Fragment>
                {error}
                {success} 
                {this.setState.errors=""}
              {this.setState.success=""}
             
         
             
                <form name="myForm"
                    onSubmit={this.handleSubmit}>
                    
                    <div>
                      <textarea
                        className="To"
                        name="To"
                        id="1"
                        placeholder="Username, or /r/name for that subreddit's moderators"
                        value={this.state.value}
                        onChange={this.handleChange}

                      />
                    </div>

                    <div>
                      <textarea
                        className="Subject"
                        name="Subject"
                        id="2"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Subject"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Your message."
                        className="Message"
                        name="Message"
                        id="3"
                        value={this.state.value}
                        onChange={this.handleChange}

                      />
                    </div>
                    <input type="submit" value="Submit" />

                  </form>
                
                  
                </React.Fragment>
              )} />



            </div>
          </div>
          </div>
        </Aux>
      </Router>

    );
  }
}

export default withRouter(PMs);
