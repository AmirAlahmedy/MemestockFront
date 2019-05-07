import React, { Component } from 'react';
import './CreateSubreddit.css';
import axios from '../../axios-orders';

class CreateSubreddit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Subreddit: '',
      Rule1: '',
      Rule2: '',
      Rule3: '',
      moderators: [],
      bio: '',
      error: false,
      errornumber: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  };
 /**
     * Sets the state with changed image path in the input fields of create subreddit form
     * @function handleFileChange
     * @param {event} - onChange event 
     */
  handleFileChange(e) {
    const files = e.target.files;
    if (!files || !files.length) return;
    const reader = new FileReader();

    reader.onload = (evtReader) => {
      if (!evtReader.target.result) return;
      this.setState({
        image: evtReader.target.result
      });
    }
    reader.readAsDataURL(files[0]);
  }
  /**
     * Sets the state with changed value in the input fields of create subreddit form
     * @function handleChange
     * @param {event} - onChange event 
     */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * For sending a creation of subreddit request to the backend 
     * @function handleSubmit
     * @param {event} - onClick event 
     */

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      error:false,
      errornumber:0
    })

    let checker = "";
    const srRules = [
      document.getElementById("srSubredditRule1").value, 
      document.getElementById("srSubredditRule2").value, 
      document.getElementById("srSubredditRule3").value
    ];
    if (document.getElementById("srSubredditName").value === checker) {
      this.setState({ UIErr: "Please provide a Subreddit name!" });
      this.setState({
        error:true,
        errornumber:1
      })
      return;
    }
    else if (!(srRules[0] || srRules[1] || srRules[2])) {
      this.setState({ UIErr: "Please provide at least 1 Subreddit Rule!" })
      this.setState({
        error:true,
        errornumber:2
      })
      return;
    }
    else if (document.getElementById("srSubredditBio").value === checker) {
      this.setState({ UIErr: "Please provide a Subreddit Bio For the audience!" })
      this.setState({
        error:true,
        errornumber:3
      })
      return;
    }
    else if (!this.state.image) {
      this.setState({ UIErr: "Please provide a Subreddit Cover Photo!" })
      this.setState({
        error:true,
        errornumber:4
      })
      return;
    }
    //Add more moderators should be optional...
    // else if (document.getElementById("srSubredditModerator").value===checker)
    // { 
    //   this.setState({UIErr: "Please provide a Subreddit Bio For the audience!"})
    //   return ;
    // }
    let newmods = this.state.moderators;
    const modInput = document.getElementById("srSubredditModerator");
    if (modInput.value.trim() && modInput.value.trim() !== ",") {
      newmods.push(modInput.value.split(",").map(val => val.trim()).filter(val => val));
    }

    var srdata = {
      srName: document.getElementById("srSubredditName").value,
      srRules: srRules.filter(rule => Boolean(rule)),
      modUsername: newmods.length ? newmods : null,
      bio: document.getElementById("srSubredditBio").value,
      base64image: this.state.image
    }
    let headers = {
      auth: localStorage.getItem("token")
    }
    axios.post('sr/create', srdata, { "headers": headers })
      .then(res => {
        console.log(res);
        console.log(res.status);
        window.location.href = "/r/" + srdata.srName;
      })
      .catch(error => {
        alert(error.response);

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
        {
          this.state.error ? <div>

          </div> : <div></div>
        }
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <div className="formGroupSubredditComponent">
            <label for="SubredditName">Enter Subreddit Name</label>
            <br></br>
            <input type="text" name="text" id="srSubredditName" placeholder="Think of something remarkable!" onChange={this.handleChange} value={this.state.value} />
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 1 ?
                    <div className="errorMessageCreateSubreddit">
                      *Please provide a Subreddit Title
                    </div> : <div></div>
                }
              </div> : <div></div>
          }
          <div className="formGroupSubredditComponent">
            <label for="SubredditRule">Subreddit Rule - 1:</label>
            <textarea type="textarea" name="text" id="srSubredditRule1" placeholder="ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value} />
          </div>
        
          <div className="formGroupSubredditComponent">
            <label for="SubredditRule">Subreddit Rule - 2:</label>
            <textarea type="textarea" name="text" id="srSubredditRule2" placeholder="ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value} />
          </div>
          <div className="formGroupSubredditComponent">
            <label for="SubredditRule">Subreddit Rule - 3:</label>
            <textarea type="textarea" name="text" id="srSubredditRule3" placeholder="ex: Flamers will be banned! " onChange={this.handleChange} value={this.state.value} />
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 2 ?
                    <div className="errorMessageCreateSubreddit">
                      *Please provide at least 1 Subreddit Rule!
                    </div> : <div></div>
                }
              </div> : <div></div>
          }
          <div className="formGroupSubredditComponent">
            <label for="SubredditBio">Subreddit Bio:</label>
            <textarea type="textarea" name="text" id="srSubredditBio" placeholder="ex: This subreddit is for people who..etc. " onChange={this.handleChange} value={this.state.value} />
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 3 ?
                    <div className="errorMessageCreateSubreddit">
                      *Please provide a bio for the subreddit
                    </div> : <div></div>
                }
              </div> : <div></div>
          }
          <div className="formGroupSubredditComponent">
            <label for="SubredditModeator">Extra Moderators:</label>
            <textarea type="textarea" name="text" id="srSubredditModerator" placeholder="Usernames separated by commas. EX: Mahmoud, Mohamed, JamesBond" onChange={this.handleChange} value={this.state.value} />
          </div>
          <div className="formGroupSubredditComponent imageContainer">
            <label for="coverPhoto" className="srSubredditPageCreateButton">Cover</label>
            <input type="file" className="threadPhotoInput" name="coverPhoto" id="coverPhoto" onChange={this.handleFileChange} />
            {this.state.image ?
              <div className="uploadedImage" style={{ backgroundImage: `url(${this.state.image})` }}></div>
              : null}
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 4 ?
                    <div className="errorMessageCreateSubreddit">
                      *Please provide a Subreddit Cover Photo!
                    </div> : <div></div>
                }
              </div> : <div></div>
          }
          <button className="srSubredditPageCreateButton">CREATE</button>
        </form>
      </div>

    )
  }
}
export default CreateSubreddit;
