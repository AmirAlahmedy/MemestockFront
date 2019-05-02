import React from 'react'
import './SettProfile.css'

class SettProfile extends React.Component {
  constructor(props) {
      super(props);
      this.state = { about: '' };
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
  return (
      <form className="form-h" onSubmit={this.handleSubmit}>
    <div class="ayhaga">
             <h2>Customize Profile</h2>
              <h3 class="profile-info">Profile Information</h3>

              <div className="display-box">
                 <h3 class="display-info">Display Information</h3>


                  <p>Set a display name. This does not change your username.</p>


                  <div className="box">
                  <input class="optional-name" placeholder="Display Name (optional)" type="text"  maxLength="15" id="displayname" onChange={this.handleDisplayName} />
                  
                                    </div>

              </div>

              <div className="about-box">

                <div className="ab1">
                  <h3>About</h3>
                  <p>A brief description of yourself shown on your profile.</p>
                </div>

                <div className="ab2">
                  <textarea placeholder="About (optional)" maxLength="200" rows="5"  id="about"></textarea>
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
