import React, { Component } from 'react';
import './CreatePost.css';
import Select from 'react-select';
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
      image: null,
      error: false,
      errornumber: 0,
      subscriptions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  };


 /**
  * For handling the spoiler checkbox change
  * @function handleChange 
  * @param {event} - Submition event 
  */
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
    this.setState({
      error: false,
      errornumber: 0
    })
    e.preventDefault();
    var srdata = {
      title: document.getElementById("threadPageTitleField").value,
      threadBody: document.getElementById("threadPageBodyField").value,
      postFile: {},
      spoiler: this.state.spoiler,
      base64image: this.state.image
    }
    let checker = "";

    // if (document.getElementById("threadPageSubredditNameField").value === checker) {
    //   //alert("Please provide an existing Subreddit name!");
    //   this.setState({
    //     error: true,
    //     errornumber: 1
    //   })
    //   return;
    // }
    // else
    if (document.getElementById("threadPageTitleField").value === checker) {
      this.setState({
        error: true,
        errornumber: 2
      })
      //alert("Please provide a Thread Title!");
      return;
    }
    else if (document.getElementById("threadPageBodyField").value === checker) {
      //alert("Please provide a Thread Body!");
      this.setState({
        error: true,
        errornumber: 3
      })
      return;
    }

    let subredditname = this.state.srName;
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
        alert(error.response);
        this.setState({
          error: true
        })
      });
  }
  componentDidMount() {
    document.body.classList.add("verticalAlign");
    axios.get("/me/About/" + localStorage.getItem('Username'), {headers: {auth: localStorage.getItem("token")}})
    .then(resp => {
      if(resp.data.Subscriptions.length || resp.data.moderates.length){
        this.setState({
          subscriptions: [...resp.data.Subscriptions, ...resp.data.moderates]
        });
      }
    })
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
  setSR(option){
    this.setState({
      srName: option.value
    });
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
            <Select 
              onChange={this.setSR.bind(this)}
              options={this.state.subscriptions.map(sr => {return {value: sr, label: sr}})}/>
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 1 ?
                    <div className="errorMessageCreatePost">
                      *Please provide an existing Subreddit name!
            </div> : <div></div>
                }
              </div> : <div></div>
          }
          <div className="formGroupThreadComponent">
            <label for="ThreadTitle">Thread Title</label>
            <textarea type="textarea" name="text" id="threadPageTitleField" placeholder="Enter Title Here" onChange={this.handleChange} value={this.state.value} />
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 2 ?
                    <div className="errorMessageCreatePost">
                      *Please provide a Thread Title!
            </div> : <div></div>
                }
              </div> : <div></div>
          }
          <div className="formGroupThreadComponent">
            <label for="ThreadBody">Thread Body</label>
            <textarea type="textarea" name="text" id="threadPageBodyField" placeholder="Enter Body Here" onChange={this.handleChange} value={this.state.value} />
          </div>
          {
            this.state.error ?
              <div>
                {
                  this.state.errornumber == 3 ?
                    <div className="errorMessageCreatePost">
                      *Please provide a Thread Body!
            </div> : <div></div>
                }
              </div> : <div></div>
          }

          <div className="formGroupThreadComponent imageContainer">
            <label className="threadPageCreateButton" for="coverPhoto">Photo</label>
            <input type="file" className="threadPhotoInput" name="coverPhoto" id="coverPhoto" onChange={this.handleFileChange} />
            {this.state.image ? 
            <div className="uploadedImage" style={{backgroundImage: `url(${this.state.image})`}}></div>
            : null}
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
