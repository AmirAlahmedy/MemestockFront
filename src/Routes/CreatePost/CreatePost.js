import React, { Component } from 'react';
import './CreatePost.css';

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from '../../axios-orders';

class CreatePost extends Component {
  //assume all submitted for now
  constructor(props) {
    super(props);
    this.state = {

      title: '',
      body: '',
      spoiler: false,
      subreddit: '',
      image: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  };



  handleChange(e) {
    this.setState({
      spoiler: e.target.checked
    });
  }

  /**
     * For sending a creation post request to the backend 
     * @function handleSubmit
     * @param {event} - onClick event 
     */

  handleSubmit(e) {
    e.preventDefault();
    var srdata = {
      title: document.getElementById("threadPageTitleField").value,
      threadBody: document.getElementById("threadPageBodyField").value,
      postFile: {},
      spoiler: this.state.spoiler,
      base64image: this.state.image
    }
    let checker = "";

    if (document.getElementById("threadPageSubredditNameField").value === checker) {
      alert("Please provide an existing Subreddit name!");
      return;
    }
    else if (document.getElementById("threadPageTitleField").value === checker) {
      alert("Please provide a Thread Title!");
      return;
    }
    else if (document.getElementById("threadPageBodyField").value === checker) {
      alert("Please provide a Thread Body!");
      return;
    }

    let subredditname = document.getElementById("threadPageSubredditNameField").value;
    let headers = {
      auth: localStorage.getItem("token")
    }
    axios.post('/sr/' + subredditname + '/thread', srdata, { "headers": headers })
      .then(res => {
        console.log(res);
        console.log(res.status);
        window.location.href = "/thread/" + res.data._id + "?srName=" + subredditname;
      })
      .catch(error => {
        console.log("Axios Error: ", error.response)
      });
  }
  componentDidMount() {
    document.body.classList.add("verticalAlign");
  }
  componentWillUnmount() {
    document.body.classList.remove("verticalAlign");
  }

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
  render() {
    return (
      <div className="createPostContainer">
        <h3>CREATE A POST</h3>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <div className="formGroupThreadComponent">
            <label for="SubredditName">Subreddit Name</label>
            <br></br>
            <input type="text" name="text" id="threadPageSubredditNameField" placeholder="Enter Existing Subreddit Name" onChange={this.handleChange} value={this.state.value} />
          </div>
          <div className="formGroupThreadComponent">
            <label for="ThreadTitle">Thread Title</label>
            <textarea type="textarea" name="text" id="threadPageTitleField" placeholder="Enter Title Here" onChange={this.handleChange} value={this.state.value} />
          </div>
          <div className="formGroupThreadComponent">
            <label for="ThreadBody">Thread Body</label>
            <textarea type="textarea" name="text" id="threadPageBodyField" placeholder="Enter Body Here" onChange={this.handleChange} value={this.state.value} />
          </div>
          <div className="formGroupThreadComponent">
            <label for="coverPhoto">Cover Photo:</label>
            <input type="file" name="coverPhoto" id="coverPhoto" onChange={this.handleFileChange} />
          </div>
          <div className="formGroupThreadCheckbox">
            <label className="spoilerLabel" for="Spoiler">Is it a spoiler?</label>
            <input type="checkbox" name="Spoiler" id="Spoiler" onChange={this.handleChange} value={this.state.spoiler} />
          </div>

          <button className="threadPageCreateButton">CREATE</button>

        </form>
      </div >

    )
  }
}
export default CreatePost;
