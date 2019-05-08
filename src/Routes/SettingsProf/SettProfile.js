import React from 'react'
import './SettProfile.css'
import axios from "../../axios-orders";

class SettProfile extends React.Component {
  constructor(props) {
      super(props);
      this.state = { about: '' };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAboutChange = this.handleAboutChange.bind(this);
  }

  /**
     * Sets the about state with new user input
     * @function handleAboutChange
     * @param {event} - change event
     */
  handleAboutChange(e) {
    this.setState({ about: e.target.value });
}

 /**
     * Submits the new about
     * @function handleSubmit
     * @param {event} - submisson event
     */
  handleSubmit(e) {
    e.preventDefault();
    var data = {
      About:this.state.about
  };

  var headers = {
    'auth': localStorage.getItem("token")
}

alert(data);




axios.put('me/edit/About', data, { headers: headers })
.then(res => {
  console.log(res);
  if (res.status == 200) {
      alert("About changed Successfully!");
  } else if (res.status === 401 || res.status === 404) {
      alert("About changes Unsuccessful");
      return Response.json;
  }
})
.catch(error => {
  alert("Error With About");
})





  }
  render() {
  return (
      <form className="form-h" onSubmit={this.handleSubmit}>
    <div class="ayhaga">
              <h3 class="profile-info">Profile Information</h3>

              <div className="display-box">
                  <p>Set a display name. This does not change your username.</p>
                  <input className="optionalName" placeholder="Display Name (optional)" type="text" id="displayname" onChange={this.handleDisplayName} />
              </div>

              <div className="about-box">

                <div className="ab1">
                  <h3 class="profile-info">About</h3>
                  <p>A brief description of yourself shown on your profile.</p>
                </div>

                <div className="ab2">
                  <textarea placeholder="About (optional)" className="txtArea" id="about" onChange={this.handleAboutChange}></textarea>
                  </div>
                  <div class="char">200 Characters</div>
                  <input class="btn btn-primary" type="submit" id="submit" value="Save" />
    
              </div>


        </div>
        </form>
  )
}
}

export default SettProfile
